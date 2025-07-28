import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useSingleBorderTable(
  tableRef,
  borderStyle = "1px solid #000",
  data
) {
  const { globalOverlay } = useCoreMetaState(
    useShallow((state) => ({
      globalOverlay: state.globalOverlay,
    }))
  );
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    const lastStickyRow = getLastStickyRow(table);
    const rows = Array.from(table.rows);
    if (!rows.length) return;

    // Calculate max column count based on colSpan
    let colCount = 0;
    let headerRows = [];
    rows.forEach((row) => {
      const isHeader = Array.from(row.cells).every(
        (cell) => cell.tagName === "TH"
      );
      if (isHeader) {
        headerRows.push(row);
      }
      let count = 0;
      for (const cell of row.cells) {
        count += cell.colSpan || 1;
      }
      colCount = Math.max(colCount, count);
    });

    const rowCount = rows.length;
    const grid = Array.from({ length: rowCount }, () =>
      Array(colCount).fill(null)
    );
    const cellPositions = new Map();

    // Fill grid and track positions
    rows.forEach((row, r) => {
      let c = 0;
      for (const cell of row.cells) {
        while (grid[r][c]) c++;
        const rowspan = cell.rowSpan || 1;
        const colspan = cell.colSpan || 1;
        cellPositions.set(cell, { row: r, col: c });

        for (let i = 0; i < rowspan; i++) {
          for (let j = 0; j < colspan; j++) {
            if (r + i < rowCount && c + j < colCount) {
              grid[r + i][c + j] = cell;
            }
          }
        }
        c += colspan;
      }
    });

    // Reset all borders
    rows.forEach((row) => {
      for (const cell of row.cells) {
        const style = cell.style;
        style.border = "none";
      }
    });

    // Apply smart borders
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        const cell = grid[r][c];
        if (!cell) continue;

        const pos = cellPositions.get(cell);
        if (!pos) continue;

        const { row: r0, col: c0 } = pos;

        const rowStart = pos.row;
        const colStart = pos.col;
        const rowEnd = rowStart + (cell.rowSpan || 1);
        const colEnd = colStart + (cell.colSpan || 1);
        const style = cell.style;

        // Only draw left border if no left neighbor
        if (c === c0) style.borderLeft = borderStyle;
        // Only draw top border if no top neighbor
        if (r === r0) style.borderTop = borderStyle;
        // Only draw right border if no right neighbor
        if (rowEnd === rowCount) style.borderBottom = borderStyle;
        if (colEnd === colCount) style.borderRight = borderStyle;

        // Force all 4 borders for sticky rows (prevent gaps)
        if (rowEnd === lastStickyRow) style.borderBottom = borderStyle;
      }
    }
  }, [
    tableRef.current,
    borderStyle,
    globalOverlay.isOpen,
    JSON.stringify(data),
  ]);
}

function getLastStickyRow(table) {
  if (!table) return null;

  const rows = Array.from(table.querySelectorAll("tr.row-sticky"));
  return rows.length ? rows[rows.length - 1].rowIndex + 1 : null;
}
