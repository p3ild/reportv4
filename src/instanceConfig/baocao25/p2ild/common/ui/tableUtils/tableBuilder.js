import DataTable from 'datatables.net-dt';
import JSZip from 'jszip/dist/jszip.min.js';
import 'datatables.net-buttons/js/buttons.html5.mjs';


DataTable.defaults.column.orderSequence = ['desc', 'asc', ''];
DataTable.type('num', 'detect', () => true)
// DataTable.type('num', 'className','number')
window.JSZip = JSZip;

export default ({ tableID, tableObject, exportExcel = false }) => {
    let table = null
    try {
        tableObject?.current?.destroy();
    } catch (e) {
        console.log()
    } finally {
        table = new DataTable(tableID, {
            order: [],
            ordering: false,
            autoWidth: false,
            paging: false,
            searching: false,
            info: false,
            responsive: true,
            layout: {
                topStart: {
                    buttons: [
                        // 'copyHtml5',
                        // 'csvHtml5',
                        //  'pdfHtml5',
                        exportExcel ? {
                            extend: 'excelHtml5',
                            text: 'Save current page(excelHtml5)' + Math.random(),
                            exportOptions: {
                                modifier: {
                                    page: 'current'
                                }
                            }
                        } : null,
                    ].filter(e => e)
                }
            },
        });
        tableObject.current = table

        return table
    }

}