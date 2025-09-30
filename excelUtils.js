// import TableToExcel from "./excel-parser/tableToExcel";
import TableToExcel from "./excel-parser/tableToExcel";
import { wait } from "./network";
import { getPickerStateByPath } from "./stateManage/corePickerState";
import { getCoreMetaStateByPath } from "./stateManage/metadataState";
import { compareString } from "./utils/stringutils";


export async function exportToExcel() {
    const setTriggerDownloadExcel = getCoreMetaStateByPath('actions.setTriggerDownloadExcel')
    const isTriggerDownloadExcel = getCoreMetaStateByPath('isDownloadExcelTrigger')
    const excelOptions = getCoreMetaStateByPath('excelOptions')
    const corePicker = getPickerStateByPath('corePicker')
    try {
        if (isTriggerDownloadExcel) {
            return;
        }
        setTriggerDownloadExcel(true);
        // --------------------- Try to use datatable to export excel ---------------------
        // Enable in tableBuilder.js
        let isDataTableExportAvailable = document.querySelector('.buttons-excel.buttons-html5');

        if (isDataTableExportAvailable) {
            exportToExcel_Datatable()
            setTriggerDownloadExcel(false);
            return;
        }

        // --------------------- Use linways/table-to-excel ---------------------
        await wait(300)
        const uri = 'data:application/vnd.ms-excel;base64,';
        const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';

        const base64 = (s) => window.btoa(unescape(encodeURIComponent(s)));

        const format = function (template, context) {
            return template.replace(/{(\w+)}/g, (m, p) => context[p])
        };
        const ori = document.getElementsByClassName('report-content')[0];
        let clone = ori.cloneNode(true);

        Array.from(clone.getElementsByClassName('no-print')).forEach(e => e.remove())

        let skipConvertNumericCells = excelOptions?.skipConvertNumericCells || false;
        !skipConvertNumericCells && convertNumericCells(clone, 'en');

        //Excel get table only
        if (excelOptions?.excelOnlyTable) clone = document.getElementsByClassName('report-table-main')[0].getElementsByTagName('table')[0];
        const ctx = {
            worksheet: 'Worksheet',
            table: clone.innerHTML,
        };

        const link = document.createElement("a");
        let periods = corePicker?.periodSelected?.outputDataDhis2?.split(';');
        let listReport = getCoreMetaStateByPath('listReport');
        let reportTarget = getCoreMetaStateByPath('reportTarget');
        let currentReportData = listReport?.find(e => e.id == reportTarget?.reportID);
        let defaultNameReport =
            [
                currentReportData.title
                || excelOptions.excelFileName
                || compareString.cleanStr(
                    currentReportData?.displayName
                ) || 'BaoCao',
                corePicker.orgSelected.displayName,
                periods?.[0],
                periods?.length > 1 ? periods?.[periods?.length - 1] : undefined
            ].filter(e => e).join('_');


        //Newway
        TableToExcel.convert(clone, {
            name: defaultNameReport + ".xlsx",
            autoStyle: false,
            font: "Times New Roman",
            sheet: {
                name: "Sheet 1",
            }
        });
        // revertConvertNumericCells()


        //OldWay
        return;
        link.download = `${defaultNameReport}.xls`;
        link.href = uri + base64(format(template, ctx));
        link.click();
    } catch (e) {
        console.log(e)
    } finally {
        setTriggerDownloadExcel(false)
    }

};
async function exportToExcel_Datatable() {
    let buttonDownloadExcel = document.querySelector('.buttons-excel.buttons-html5');
    buttonDownloadExcel.click();
};


function convertNumericCells(document, toLocale = 'en',) {
    const cells = Array.from(document.querySelectorAll('td'))

    let originalClones = []
    let decimal, thousand;
    if (toLocale === 'en') {
        decimal = '.';
        thousand = '';
    } else {
        console.warn('Unsupported toLocale:', toLocale);
        return;
    }
    let valueDetect = cells.map(e => e.textContent);
    for (let index = 0; index < cells.length; index++) {
        let cell = cells[index];
        let text = cell.textContent.trim();
        originalClones[index] = cell.cloneNode(true);

        if (text && text != "") {
            let oriText = '' + text;
            if (toLocale === 'en') {
                text = text.replace(/\./g, '<<<THOUSAND>>>');
                text = text.replace(/,/g, decimal);
                text = text.replace(/<<<THOUSAND>>>/g, thousand);
            }
            if (isFinite(text)) {
                cell.setAttribute('data-t', 'n');
            } else {
                text = oriText
            }
        }
        cell.textContent = text;
    };

    let revertConvertNumericCells = () => {
        cells.forEach((cell, index) => {
            const clone = originalClones[index];
            if (clone) {
                cell.replaceWith(clone);
            }
        })
    }
    return { revertConvertNumericCells };
}