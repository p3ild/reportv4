import { wait } from "@core/network";
import { min, toArray } from "lodash";

export async function applyStickyTableStyles({ tableID }) {
    await wait(300);
    applyStickyColStyles({ tableID })
    applyStickyRowStyles({ tableID })
}

export function applyStickyRowStyles({ tableID }) {
    const thead = document.querySelectorAll(`table[table_id="${tableID}"] thead`)[0];
    if (!thead?.offsetHeight) return;
    let threadOffset = thead.offsetHeight - 10
    const stickyRows = document.querySelectorAll(`table[table_id="${tableID}"] tbody tr[class*="sticky-row-"]`);
    let levelOffsets = {};

    let minLevel = min(toArray(stickyRows).map(row => row.className.match(/sticky-row-(\d+)/)[1]));
    stickyRows.forEach(row => {
        const match = row.className.match(/sticky-row-(\d+)/);
        if (match) {
            let level = match[1], levelName = 'level-' + match[1];
            if (level == minLevel) levelOffsets[levelName] = threadOffset
            else levelOffsets[levelName] = levelOffsets[`level-${level - 1}`] + row.offsetHeight

            row.style.position = 'sticky';
            row.style.top = `${levelOffsets[levelName]}px`;
            row.style.zIndex = 5;
            row.style.background = 'white';
        }
    });

}

function getActualWidth(thElement) {
    if (!thElement) return '100px'
    if (thElement.style.width) return thElement.style.width

    const computedWidth = getComputedStyle(thElement).width
    if (computedWidth && computedWidth !== 'auto') return computedWidth

    return `${thElement.offsetWidth || 100}px`
}

function applyStickyStyles(element, calculatedOffset, widthValue, zIndex, bgColor = 'white') {
    element.style.position = 'sticky'
    element.style.left = `${calculatedOffset}px`
    element.style.zIndex = zIndex
    element.style.width = widthValue
    if (!element.style.background || element.style.background === 'white') {
        element.style.background = bgColor
    }
}

export function applyStickyColStyles({ tableID }) {
    const table = document.querySelector(`table[table_id="${tableID}"]`)
    if (!table) return

    const thead = table.querySelector('thead')
    const tbody = table.querySelector('tbody')
    if (!thead) return

    const theadRows = thead.querySelectorAll('tr')
    if (theadRows.length === 0) return

    let stickyColumnDict = {}

    theadRows.forEach((row, rowIndex) => {
        let actualColumnIndex = 0
        Array.from(row.children).forEach((th) => {
            const match = th.className.match(/sticky-col-(\d+)/)
            if (match) {
                const stickyIndex = parseInt(match[1])
                const hasStyleWidth = !!th.style.width

                // Only add if colIndex doesn't exist, or prefer one with style.width
                if (!stickyColumnDict[actualColumnIndex] ||
                    (hasStyleWidth && !stickyColumnDict[actualColumnIndex].hasStyleWidth)) {
                    let obj = {
                        colIndex: actualColumnIndex,
                        stickyIndex,
                        th,
                        width: getActualWidth(th),
                        rowIndex,
                        hasStyleWidth
                    }
                    stickyColumnDict[actualColumnIndex] = obj
                }
            }
            actualColumnIndex += parseInt(th.getAttribute('colspan')) || 1
        })
    })

    const stickyColumnIndexes = Object.values(stickyColumnDict)
    if (stickyColumnIndexes.length === 0) return

    stickyColumnIndexes.sort((a, b) => a.stickyIndex - b.stickyIndex)

    stickyColumnIndexes.forEach(({ colIndex, stickyIndex, width }) => {
        let calculatedOffset = -10
        // if (colIndex ==1) calculatedOffset +=12;
        for (let i = 0; i < stickyIndex; i++) {
            const prevColumnData = stickyColumnIndexes.find(col => col.stickyIndex === i)
            if (prevColumnData) {
                calculatedOffset += parseFloat(prevColumnData.width) || -10
            }
        }

        theadRows.forEach(row => {
            const targetTh = row.querySelector(`.sticky-col-${stickyIndex}`)
            if (targetTh) applyStickyStyles(targetTh, calculatedOffset, width, '6')
        })

        if (tbody) {
            tbody.querySelectorAll('tr').forEach(row => {
                const td = row.children[colIndex]
                if (td) applyStickyStyles(td, calculatedOffset, width, '4')
            })
        }
    })
}