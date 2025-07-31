import React from "react";
import {
  REPORT_NAME,
  ROW_GENERATE_FOR_COMMUNE_LEVEL,
  ROW_GENERATE_FOR_NATION_LEVEL,
  ROW_GENERATE_FOR_PROVINCE_LEVEL,
} from "../constants";
import useSticky from "../hooks/useSticky";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useShallow } from "zustand/react/shallow";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { flatten } from "../utils";
import { format } from "date-fns";

// eslint-disable-next-line react/prop-types
const DataTable = ({
  dataElements = [],
  headers = [],
  title = "",
  code = "",
  data,
  id,
  subTitle = "",
}) => {
  const { me } = useCoreMetaState(
    useShallow((state) => ({
      me: state.me,
    }))
  );
  const { corePicker } = useCorePickerState(
    useShallow((state) => ({
      corePicker: state.corePicker,
    }))
  );
  const { orgViewData } = me;
  const orgUnits = flatten(orgViewData?.[0]?.organisationUnits || []);

  const generateRowByOrgUnit = () => {
    if (!corePicker || !corePicker.pickCompleted) return [];
    let filterOrgUnits = [];
    switch (corePicker.orgSelected.level) {
      case 1:
        return corePicker.orgSelected.children.map((item) => ({
          id: item.id,
          label: item.displayName,
          generatePrefix: true,

          children: ROW_GENERATE_FOR_NATION_LEVEL.map((ouGroup) => {
            return {
              label: ouGroup.label,
              getData: (filteredData) => {
                return filteredData.reduce((prev, curr) => {
                  const foundOu = orgUnits.find(
                    (ou) =>
                      ou.id === curr.ou &&
                      ou.ancestors?.some((ancestor) => ancestor.id === item.id)
                  );
                  if (!foundOu) return prev;
                  const inOuGroup = foundOu.organisationUnitGroups.some((oug) =>
                    ouGroup.ougs.includes(oug.id)
                  );
                  if (!inOuGroup) return prev;

                  return prev + (Number(curr.value) || 0);
                }, 0);
              },
            };
          }),
        }));
      case 2:
        filterOrgUnits = orgUnits.filter((ou) =>
          ou.ancestors.some(
            (ancestor) => ancestor.id === corePicker.orgSelected.id
          )
        );
        return ROW_GENERATE_FOR_PROVINCE_LEVEL.map((item) => ({
          id: item.id,
          label: item.label,
          prefix: item.prefix,

          ...(item.ougs
            ? {
                children: filterOrgUnits
                  .filter((ou) =>
                    ou.organisationUnitGroups.some((oug) =>
                      item.ougs.includes(oug.id)
                    )
                  )
                  .map((ou) => ({
                    id: ou.id,
                    label: ou.displayName,
                    blocks: item.blocks,
                  }))
                  .sort((a, b) => a.label.localeCompare(b.label)),
              }
            : {
                children: item.children.map((child) => {
                  return {
                    label: child.label,
                    prefix: child.prefix,
                    blocks: child.blocks,
                    getData: (filteredData) => {
                      return filteredData.reduce((prev, curr) => {
                        const foundOu = orgUnits.find(
                          (ou) => ou.id === curr.ou
                        );
                        if (!foundOu) return prev;
                        const inOuGroup = foundOu.organisationUnitGroups.some(
                          (oug) => child.ougs.includes(oug.id)
                        );
                        if (!inOuGroup) return prev;

                        return prev + (Number(curr.value) || 0);
                      }, 0);
                    },
                    children: filterOrgUnits
                      .filter((ou) =>
                        ou.organisationUnitGroups.some((oug) =>
                          child.ougs.includes(oug.id)
                        )
                      )
                      .map((ou) => ({
                        id: ou.id,
                        label: ou.displayName,
                        blocks: child.blocks,
                      }))
                      .sort((a, b) => a.label.localeCompare(b.label)),
                  };
                }),
              }),
        }));
      case 3:
        filterOrgUnits = orgUnits.filter((ou) =>
          ou.ancestors.some(
            (ancestor) => ancestor.id === corePicker.orgSelected.id
          )
        );
        return filterOrgUnits
          .map((ou) => ({
            id: ou.id,
            label: ou.displayName,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
      // return ROW_GENERATE_FOR_COMMUNE_LEVEL.map((item) => ({
      //   id: item.id,
      //   label: item.label,
      //   prefix: item.prefix,
      //   getData: (filteredData) => {
      //     return filteredData.reduce((prev, curr) => {
      //       const foundOu = orgUnits.find(
      //         (ou) =>
      //           ou.id === curr.ou &&
      //           ou.ancestors?.some(
      //             (ancestor) => ancestor.id === corePicker.orgSelected.id
      //           )
      //       );
      //       if (!foundOu) return prev;
      //       const inOuGroup = foundOu.organisationUnitGroups.some((oug) =>
      //         item.ougs.includes(oug.id)
      //       );
      //       if (!inOuGroup) return prev;

      //       return prev + (Number(curr.value) || 0);
      //     }, 0);
      //   },
      //   children: filterOrgUnits
      //     .filter((ou) =>
      //       ou.organisationUnitGroups.some((oug) =>
      //         item.ougs.includes(oug.id)
      //       )
      //     )

      //     .map((ou) => ({
      //       id: ou.id,
      //       label: ou.displayName,
      //     }))
      //     .sort((a, b) => a.label.localeCompare(b.label)),
      // }));
      default:
        return [];
    }
  };

  const renderRows = (rows, level = 0, id = "") => {
    return rows.map((row, index) => {
      const haveChildren = row.children && row.children.length > 0;
      return (
        <React.Fragment key={row.id || index * level}>
          <tr
            className={`${haveChildren ? `sticky-row-${level}` : ""} ${
              row.prefix || row.generatePrefix ? "[&>*]:!font-bold" : ""
            }`}
            data-group={id || row.id}
          >
            {/* Indentation: render empty cells for parent levels */}
            <td
              data-f-name="Times New Roman"
              data-f-sz="12"
              data-a-wrap="true"
              data-b-a-s="thin"
              data-a-v="middle"
              data-f-bold={haveChildren && "true"}
              data-a-h="center"
              key={`prefix-${index}`}
              className="sticky-col"
              sticky-col={0}
            >
              {row.prefix || (row.generatePrefix && index + 1)}
            </td>
            <td
              data-f-name="Times New Roman"
              data-f-sz="12"
              data-f-bold={haveChildren && "true"}
              data-b-a-s="thin"
              data-a-v="middle"
              // data-a-indent={level}
              className="sticky-col"
              sticky-col={1}
            >
              <p
                className={`text-left whitespace-nowrap`}
                // style={{
                //   marginLeft: level && `${level}rem`,
                // }}
              >
                {row.label}
              </p>
            </td>
            {dataElements.map((de) => (
              <td
                data-f-name="Times New Roman"
                data-f-sz="12"
                data-a-wrap="true"
                data-b-a-s="thin"
                data-a-v="middle"
                data-width="40"
                data-f-bold={haveChildren && "true"}
                data-a-h="center"
                key={`${REPORT_NAME}-${row.id}-cell-${de}`}
              >
                {row.getData
                  ? row.getData((data || []).filter((item) => item.dx === de))
                  : (data || []).find(
                      (item) => item.dx === de && item.ou === row.id
                    )?.value || 0}
              </td>
            ))}
          </tr>

          {/* Recursively render children if they exist */}
          {haveChildren && renderRows(row.children, level + 1, id || row.id)}
        </React.Fragment>
      );
    });
  };

  const ref = useSticky(id);

  const checkHaveChildren = (array) =>
    array.some(
      (item) =>
        (item.id && orgUnits.some((ou) => ou.id === item.id)) ||
        (item.children ? checkHaveChildren(item.children) : true)
    );

  const haveChildren = checkHaveChildren(generateRowByOrgUnit());

  return (
    <>
      <table style={{ border: 0 }} className="sticky left-0">
        <tbody>
          {code && (
            <tr>
              <td
                data-f-name="Times New Roman"
                data-f-sz="12"
                style={{
                  width: "100vw",
                  fontSize: "16px",
                  border: 0,
                  textAlign: "left",
                }}
              >
                <p>{code || ""}</p>
              </td>
            </tr>
          )}
          <tr>
            <td
              data-f-name="Times New Roman"
              data-f-sz="12"
              colSpan={dataElements.length + 2}
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                textAlign: "left",
              }}
            >
              <p>
                Đơn vị báo cáo:{" "}
                {corePicker?.orgSelected?.displayName?.toUpperCase?.()}
              </p>
            </td>
          </tr>
          <tr>
            <td
              data-f-name="Times New Roman"
              data-f-sz="12"
              colSpan={dataElements.length + 2}
              data-a-h="center"
              data-a-v="center"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>{title?.toUpperCase()}</p>
            </td>
          </tr>
          <tr>
            <td
              data-f-name="Times New Roman"
              data-f-sz="12"
              colSpan={dataElements.length + 2}
              data-a-h="center"
              data-a-v="center"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>
                Báo cáo{" "}
                {[
                  corePicker?.periodSelected?.labelStartDate,
                  corePicker?.periodSelected?.labelEndDate
                    ? `${corePicker?.periodSelected?.labelEndDate}`
                    : undefined,
                ]
                  .filter((e) => e)
                  .join(" đến ")
                  .replaceAll("-", "/")}
              </p>
            </td>
          </tr>
          <tr>
            <td
              data-f-name="Times New Roman"
              data-f-sz="12"
              colSpan={dataElements.length + 2}
              data-a-h="center"
              data-a-v="center"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p className="italic">
                Ngày kết xuất báo cáo: {format(new Date(), "dd/MM/yyyy")} -
                Nguồn dữ liệu: Phần mềm Thống kê y tế
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        {subTitle && (
          <table className="!border-0">
            <tr>
              <td
                data-f-name="Times New Roman"
                data-f-sz="12"
                className="!border-0 font-bold"
                colSpan={dataElements.length + 2}
              >
                {subTitle}
              </td>
            </tr>
          </table>
        )}
        <table id={id} ref={ref} className={`report-table-main min-w-full`}>
          <thead>
            {headers.map((row, index) => {
              return (
                <tr
                  className="row-sticky !left-0"
                  key={`${REPORT_NAME}-header-${index}`}
                >
                  {row.map((cell, indexCell) => {
                    const { label, ...props } = cell;
                    return (
                      <th
                        data-f-name="Times New Roman"
                        data-f-sz="12"
                        data-a-h="center"
                        data-a-v="middle"
                        data-f-bold="true"
                        data-a-wrap="true"
                        data-b-a-s="thin"
                        key={`${REPORT_NAME}-header-${index}-cell-${indexCell}`}
                        {...props}
                      >
                        {label}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            <tr className="[&>*]:!italic">
              {Array.from({ length: dataElements.length + 2 })
                .fill(0)
                .map((_, index) => (
                  <td
                    data-f-name="Times New Roman"
                    data-f-sz="12"
                    data-a-h="center"
                    data-a-wrap="true"
                    data-b-a-s="thin"
                    data-a-v="middle"
                    data-f-italic="true"
                    key={`${REPORT_NAME}-body-count-${index}`}
                    className={index < 2 ? "sticky-col" : ""}
                    // eslint-disable-next-line react/no-unknown-property
                    sticky-col={index}
                  >
                    {index + 1}
                  </td>
                ))}
            </tr>
            <tr className={haveChildren ? "[&>*]:!font-bold" : ""}>
              <td
                data-f-name="Times New Roman"
                data-f-sz="12"
                data-a-wrap="true"
                data-b-a-s="thin"
                data-a-v="middle"
                className="sticky-col"
                sticky-col={0}
              />
              <td
                data-f-name="Times New Roman"
                data-f-sz="12"
                data-a-h={haveChildren ? "center" : "left"}
                data-a-wrap="true"
                data-b-a-s="thin"
                data-a-v="middle"
                data-f-bold={haveChildren ? "true" : "false"}
                className={`sticky-col ${
                  haveChildren ? "text-center" : "!text-left"
                } whitespace-nowrap`}
                sticky-col={1}
              >
                {haveChildren
                  ? "Tổng cộng"
                  : corePicker?.orgSelected?.displayName}
              </td>
              {dataElements.map((de) => (
                <td
                  data-f-name="Times New Roman"
                  data-f-sz="12"
                  data-a-h="center"
                  data-a-wrap="true"
                  data-b-a-s="thin"
                  data-a-v="middle"
                  data-f-bold="true"
                  key={`${REPORT_NAME}-total-cell-${de}`}
                >
                  {(data || []).find(
                    (item) =>
                      item.dx === de && item.ou === corePicker.orgSelected.id
                  )?.value || 0}
                </td>
              ))}
            </tr>

            {haveChildren && renderRows(generateRowByOrgUnit())}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
