import React from "react";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import Table, { SelectColumnFilter, AvatarCell } from "./Table";
import { getData } from "../store/dummy";
// import { scheduleData } from "../data/dummy"

const Timesheet = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const isStaff = true;
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter, // new
        filter: "includes", // new
      },
      {
        Header: "Action",
        accessor: "action"
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <div className="flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center bg-white dark:bg-stone-700 rounded-3xl overflow-x-auto drop-shadow-2xl">
      <Table columns={columns} data={data} />
    </div>
  );
};
export default Timesheet;
