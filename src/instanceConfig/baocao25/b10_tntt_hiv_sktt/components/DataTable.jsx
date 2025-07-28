import React, { useEffect, useRef, useState } from "react";
import {
  REPORT_NAME,
  ROW_GENERATE_FOR_COMMUNE_LEVEL,
  ROW_GENERATE_FOR_NATION_LEVEL,
  ROW_GENERATE_FOR_PROVINCE_LEVEL,
} from "../constants";
import { useSingleBorderTable } from "../hooks/useSingleBorderStyle";
import { useStickyRows } from "../hooks/ueStickyRow";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useShallow } from "zustand/react/shallow";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { flatten } from "../utils";
import { findHeaderIndex } from "../../p2ild/common/utils";
import { format } from "date-fns";

// eslint-disable-next-line react/prop-types
const DataTable = ({
  dataElements = [],
  headers = [],
  title = "",
  code = "",
}) => {
  const { _get, setGlobalOverlay, me } = useCoreMetaState(
    useShallow((state) => ({
      _get: state._get,
      setGlobalOverlay: state.actions.setGlobalOverlay,
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
  const [data, setData] = useState();
  const tableRef = useRef(null);
  useSingleBorderTable(tableRef, data);
  useStickyRows(tableRef);

  const getData = async () => {
    try {
      setGlobalOverlay({ isOpen: true });

      const result = await _get(
        `/api/analytics?dimension=dx:${dataElements.join(";")},ou:${
          corePicker.orgSelected.id
        };LEVEL-1;LEVEL-2;LEVEL-3;LEVEL-4&filter=pe:${
          corePicker.periodSelected.outputDataDhis2
        }`
      );
      const valueIndex = findHeaderIndex(result, "value");
      const dxIndex = findHeaderIndex(result, "dx");
      const ouIndex = findHeaderIndex(result, "ou");

      const dataResult = result.rows.map((row) => ({
        value: row[valueIndex],
        ou: row[ouIndex],
        dx: row[dxIndex],
      }));
      setData(dataResult);
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalOverlay({ isOpen: false });
    }
  };

  const generateRowByOrgUnit = () => {
    if (!corePicker || !corePicker.pickCompleted) return [];
    let filterOrgUnits = [];
    switch (corePicker.orgSelected.level) {
      case 1:
        return corePicker.orgSelected.children.map((item) => ({
          id: item.id,
          label: item.displayName,
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

          children: item.children.map((child) => {
            return {
              label: child.label,
              prefix: child.prefix,

              getData: (filteredData) => {
                return filteredData.reduce((prev, curr) => {
                  const foundOu = orgUnits.find((ou) => ou.id === curr.ou);
                  if (!foundOu) return prev;
                  const inOuGroup = foundOu.organisationUnitGroups.some((oug) =>
                    child.ougs.includes(oug.id)
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
                })),
            };
          }),
        }));
      case 3:
        return ROW_GENERATE_FOR_COMMUNE_LEVEL.map((item) => ({
          id: item.id,
          label: item.label,
          prefix: item.prefix,
          getData: (filteredData) => {
            return filteredData.reduce((prev, curr) => {
              const foundOu = orgUnits.find(
                (ou) =>
                  ou.id === curr.ou &&
                  ou.ancestors?.some(
                    (ancestor) => ancestor.id === corePicker.orgSelected.id
                  )
              );
              if (!foundOu) return prev;
              const inOuGroup = foundOu.organisationUnitGroups.some((oug) =>
                item.ougs.includes(oug.id)
              );
              if (!inOuGroup) return prev;

              return prev + (Number(curr.value) || 0);
            }, 0);
          },
          children: orgUnits
            .filter((ou) =>
              ou.organisationUnitGroups.some((oug) =>
                item.ougs.includes(oug.id)
              )
            )

            .map((ou) => ({
              id: ou.id,
              label: ou.displayName,
            })),
        }));
      default:
        return null;
    }
  };

  const renderRows = (rows, level = 0, id = "") => {
    return rows.map((row, index) => {
      const haveChildren = row.children && row.children.length > 0;
      return (
        <React.Fragment key={row.id || index * level}>
          <tr
            className={`${haveChildren ? "row-sticky" : ""} ${
              row.prefix ? "[&>*]:!font-bold" : ""
            }`}
            data-group={id || row.id}
          >
            {/* Indentation: render empty cells for parent levels */}
            <td key={`prefix-${index}`}>{row.prefix || index + 1}</td>
            <td>
              <p
                className={`text-left`}
                style={{
                  marginLeft: level && `${level}rem`,
                }}
              >
                {row.label}
              </p>
            </td>
            {dataElements.map((de) => (
              <td key={`${REPORT_NAME}-${row.id}-cell-${de}`}>
                {row.getData
                  ? row.getData(data.filter((item) => item.dx === de))
                  : data.find((item) => item.dx === de && item.ou === row.id)
                      ?.value || 0}
              </td>
            ))}
          </tr>

          {/* Recursively render children if they exist */}
          {haveChildren && renderRows(row.children, level + 1, id || row.id)}
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    if (corePicker && corePicker.pickCompleted) {
      getData();
    }
  }, [corePicker.pickCompleted]);

  return (
    <div className="flex flex-col gap-2">
      <table style={{ border: 0 }} className=" mb-5 sticky left-0">
        <tbody>
          {code && (
            <tr>
              <td
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
                  .join(" - ")}
              </p>
            </td>
          </tr>
          <tr>
            <td
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
                Ngày kết xuất dữ liệu cho báo cáo:{" "}
                {format(new Date(), "dd/MM/yyyy")} - Nguồn dữ liệu: Phần mềm
                Thống kê Y tế
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table ref={tableRef} className={`report-table-main  min-w-[2000px]`}>
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
        {data && (
          <tbody>
            <tr className="[&>*]:!font-bold">
              {Array.from({ length: dataElements.length + 2 })
                .fill(0)
                .map((_, index) => (
                  <td key={`${REPORT_NAME}-body-count-${index}`}>
                    {index + 1}
                  </td>
                ))}
            </tr>
            <tr className="[&>*]:!font-bold">
              <td />
              <td>Tổng cộng</td>
              {dataElements.map((de) => (
                <td key={`${REPORT_NAME}-total-cell-${de}`}>
                  {data.find(
                    (item) =>
                      item.dx === de && item.ou === corePicker.orgSelected.id
                  )?.value || 0}
                </td>
              ))}
            </tr>
            {renderRows(generateRowByOrgUnit())}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DataTable;
