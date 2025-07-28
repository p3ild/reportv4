import { min, toArray } from "lodash";
import { useCallback } from "react";
import { useResizeDetector } from "react-resize-detector";

const useSticky = () => {
  const onResize = useCallback((payload) => {
    if (payload.width !== null && payload.height !== null) {
      let tableID = payload.entry.target.getAttribute("table_id");
      applyStickyRowStyles({ tableID });
    } else {
      console.log("Element unmounted");
    }
  }, []);
  const { ref } = useResizeDetector({ onResize });
  return ref;
};

export default useSticky;

function applyStickyRowStyles({ tableID }) {
  {
    const thead = document.querySelectorAll(
      `table[table_id="${tableID}"] thead`
    )[0];
    const tbodyRows = document.querySelectorAll(
      `table[table_id="${tableID}"] tbody tr`
    );
    if (!thead?.offsetHeight) return;
    let threadOffset = thead.offsetHeight - 10;
    const stickyRows = document.querySelectorAll(
      `table[table_id="${tableID}"] tbody tr[class*="sticky-row-"]`
    );
    let levelOffsets = {};

    let minLevel = min(
      toArray(stickyRows).map(
        (row) => row.className.match(/sticky-row-(\d+)/)[1]
      )
    );
    applyStylingToTbodyRows(tbodyRows);

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
        Array.from(row.cells).forEach((cell) => {
          setStyle(
            cell,
            {
              background: "white",
              "border-top": "1px solid black",
            },
            true
          );
        });
      }
    });
  }
  // applyStickyColStyles({table_id})
}
function setStyle(el, styles, important = false) {
  Object.entries(styles).forEach(([key, value]) => {
    el.style.setProperty(key, value, important ? "important" : "");
  });
}

function applyStylingToTbodyRows(rows) {
  rows.forEach((row, index) => {
    const isNextSticky = Array.from(rows[index + 1]?.classList || []).some(
      (cls) => cls.includes("sticky-row")
    );

    Array.from(row.cells).forEach((cell) => {
      setStyle(
        cell,
        {
          "border-bottom": isNextSticky ? "none" : "1px solid #000",
        },
        true
      );
    });
  });
}
