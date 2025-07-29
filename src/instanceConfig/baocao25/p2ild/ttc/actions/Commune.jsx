import { getDisableColDataObject, listingRowByOuGroup, sumMultiRow } from '../../common/ui/RowRender';
import { ORG_GROUP } from '../constant';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };

    let { listRow: rowAll } = await listingRowByOuGroup({
        ...props,
    });

    let { listRow: communeHFListRow } = await listingRowByOuGroup({
        ...props,
        orgUnitGroup: [ORG_GROUP.XA, ORG_GROUP.XA_CSYT_KHAC],
    });

    let rowTotal = sumMultiRow({
        ...props,
        listRow: [
            communeHFListRow[0],
        ],
        includeTotalRow: [
            "",
            <p>Tổng số</p>,
            rowAll[0]?.[2]?.value || '',
            rowAll[0]?.[3]?.value || '',
            rowAll[0]?.[4]?.value || '',
            rowAll[0]?.[5]?.value || '',
            rowAll[0]?.[6]?.value || ''
        ]
    });

    communeHFListRow = communeHFListRow.map(eachRow => {

        [2, 3, 4, 5, 6].forEach(colDisable => eachRow[colDisable] = getDisableColDataObject())

        return eachRow
    })

    return {
        SectionHeader: props.SectionHeader,
        TableHeader: props.HeaderUI({
            listColumnConfig: props.listColumnConfig,
            title: props.title,
            ...props
        }),
        dataByRow: [
            rowTotal,
            ...communeHFListRow,
        ]
    }
}
