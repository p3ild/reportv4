import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

/**
 * Sticky nhiều dòng có class `.row-sticky`, hỗ trợ scroll ngang và dọc.
 * Áp dụng border cho tất cả các dòng: nếu dòng trước là sticky thì bỏ border-top.
 */
export function useStickyRows(tableRef, data) {
  const { globalOverlay } = useCoreMetaState(
    useShallow((state) => ({
      globalOverlay: state.globalOverlay,
    }))
  );

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const applySticky = () => {
      const thead = table.querySelector("thead");

      const theadRows = Array.from(table.querySelectorAll("thead tr"));
      const tbodyRows = Array.from(table.querySelectorAll("tbody tr"));

      let top = 0;
      thead.style.position = "sticky";
      thead.style.top = `${top}px`;
      thead.style.zIndex = "2";
      thead.style.background = "white";
      theadRows.forEach((row, index) => {
        const isFirstRow = index === 0;

        top += row.getBoundingClientRect().height;

        Array.from(row.cells).forEach((cell) => {
          cell.style.background = "white"; // giữ đồng bộ nền
          // cell.style.borderBottom = "1px solid #000 !important";
          // cell.style.borderTop = "none !important";
          // if (isFirstRow) {
          //   cell.style.borderTop = "";
          // }
        });
      });
      let groupStickyMap = new Map();
      tbodyRows.forEach((row) => {
        const group = row.dataset.group;
        const isSticky = row.classList.contains("row-sticky");
        if (group && isSticky) {
          if (!groupStickyMap.has(group)) groupStickyMap.set(group, []);
          groupStickyMap.get(group)?.push(row);
        }
      });

      tbodyRows.forEach((row, index) => {
        const isSticky = row.classList.contains("row-sticky");
        const isNextRowSticky =
          tbodyRows[index + 1] &&
          tbodyRows[index + 1].classList.contains("row-sticky");
        // Dù là sticky hay không, đều xử lý border theo quy tắc
        Array.from(row.cells).forEach((cell) => {
          cell.style.background = "white"; // giữ đồng bộ nền
          // cell.style.borderBottom = isNextRowSticky
          //   ? "none !important"
          //   : "1px solid #000 !important";
          // cell.style.borderTop = "none !important";
          cell.style.fontWeight = isSticky ? "700" : "400";
        });
      });
      groupStickyMap.forEach((rows) => {
        // Stack sticky rows
        let groupOffset = top;
        rows.forEach((row, idx) => {
          row.style.position = "sticky";
          row.style.top = `${groupOffset}px`;
          row.style.zIndex = `${2 + idx}`; // stack with increasing zIndex
          groupOffset += row.getBoundingClientRect().height;
          Array.from(row.cells).forEach((cell) => {
            cell.style.background = "white"; // giữ đồng bộ nền
            // cell.style.borderTop = "1px solid black !important";
          });
        });
      });
    };

    applySticky();

    window.addEventListener("resize", applySticky);
    // window.addEventListener("scroll", applySticky, { passive: true });

    const resizeObserver = new ResizeObserver(applySticky);
    resizeObserver.observe(table);

    return () => {
      window.removeEventListener("resize", applySticky);
      // window.removeEventListener("scroll", applySticky);
      resizeObserver.disconnect();
    };
  }, [tableRef.current, JSON.stringify(data)]);
}
