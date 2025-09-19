import { min, toArray } from "lodash";
import { useCallback } from "react";
import { useResizeDetector } from "react-resize-detector";

const useSticky = (tableId) => {
  const onResize = useCallback(() => {
    applyStickyRowStyles({ tableId });
    // applyStickyColStyles({ tableId });
  }, []);
  const { ref } = useResizeDetector({ onResize });
  return ref;
};

export default useSticky;

function applyStickyRowStyles({ tableId }) {
  const thead = document.querySelectorAll(`table[id="${tableId}"] thead`)[0];

  if (!thead?.offsetHeight) return;
  let threadOffset = thead.offsetHeight - 10;
  const stickyRows = document.querySelectorAll(
    `table[id="${tableId}"] tbody tr[class*="sticky-row-"]`
  );
  let levelOffsets = {};

  let minLevel = min(
    toArray(stickyRows).map((row) => row.className.match(/sticky-row-(\d+)/)[1])
  );
  // applyStylingToTbodyRows(tbodyRows);

  stickyRows.forEach((row) => {
    const match = row.className.match(/sticky-row-(\d+)/);
    if (match) {
      let level = match[1],
        levelName = "level-" + match[1];
      if (level == minLevel) levelOffsets[levelName] = threadOffset;
      else
        levelOffsets[levelName] =
          levelOffsets[`level-${level - 1}`] + row.offsetHeight;

      row.style.position = "sticky";
      row.style.top = `${levelOffsets[levelName]}px`;
      row.style.zIndex = 4;
      row.style.background = "white";
    }
  });
}

function applyStickyColStyles({ tableId }) {
  const stickyCols = document.querySelectorAll(
    `table[id="${tableId}"] [class*="sticky-col"]`
  );
  let levelOffsets = {};

  let minLevel = min(
    toArray(stickyCols).map((col) => parseInt(col.getAttribute("sticky-col")))
  );
  [...stickyCols].forEach((col, index, arr) => {
    const level = col.getAttribute("sticky-col");
    if (level !== null) {
      let levelName = "level-" + level;
      if (level == minLevel) {
        levelOffsets[levelName] = -10;
      } else {
        levelOffsets[levelName] =
          levelOffsets[`level-${level - 1}`] + arr[index - 1].offsetWidth;
      }

      col.style.position = "sticky";
      col.style.left = `${levelOffsets[levelName]}px`;

      // Check if this cell is also in a sticky row (intersection)

      col.style.zIndex = 1; // Higher z-index for intersections
      col.style.background = "white";
    }
  });
}
