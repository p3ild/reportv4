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
              blocks: ouGroup.blocks,
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
          blocks: item.blocks,

          children: item.children.map((child) => {
            return {
              label: child.label,
              prefix: child.prefix,
              blocks: child.blocks,

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
            className={`${haveChildren ? `sticky-row-${level}` : ""} ${
              row.prefix || row.generatePrefix ? "[&>*]:!font-bold" : ""
            }`}
            data-group={id || row.id}
          >
            {/* Indentation: render empty cells for parent levels */}
            <td
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
              data-f-bold={haveChildren && "true"}
              data-b-a-s="thin"
              data-a-v="middle"
              data-a-indent={level}
              className="sticky-col"
              sticky-col={1}
            >
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
              <td
                data-a-wrap="true"
                data-b-a-s="thin"
                data-a-v="middle"
                data-width="40"
                data-f-bold={haveChildren && "true"}
                data-a-h="center"
                key={`${REPORT_NAME}-${row.id}-cell-${de}`}
                className={(row.blocks || []).includes(de) ? "blocked" : ""}
              >
                {!(row.blocks || []).includes(de)
                  ? row.getData
                    ? row.getData((data || []).filter((item) => item.dx === de))
                    : (data || []).find(
                        (item) => item.dx === de && item.ou === row.id
                      )?.value || 0
                  : ""}
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

  return (
    <>
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
      <table id={id} ref={ref} className={`report-table-main  min-w-[2000px]`}>
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
          <tr className="[&>*]:!font-bold">
            {Array.from({ length: dataElements.length + 2 })
              .fill(0)
              .map((_, index) => (
                <td
                  data-a-h="center"
                  data-a-wrap="true"
                  data-b-a-s="thin"
                  data-a-v="middle"
                  data-f-bold="true"
                  key={`${REPORT_NAME}-body-count-${index}`}
                  className={index < 2 ? "sticky-col" : ""}
                  // eslint-disable-next-line react/no-unknown-property
                  sticky-col={index}
                >
                  {index + 1}
                </td>
              ))}
          </tr>
          <tr className="[&>*]:!font-bold">
            <td
              data-a-wrap="true"
              data-b-a-s="thin"
              data-a-v="middle"
              className="sticky-col"
              sticky-col={0}
            />
            <td
              data-a-h="center"
              data-a-wrap="true"
              data-b-a-s="thin"
              data-a-v="middle"
              data-f-bold="true"
              className="sticky-col"
              sticky-col={1}
            >
              Tổng cộng
            </td>
            {dataElements.map((de) => (
              <td
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
          {renderRows(generateRowByOrgUnit())}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
