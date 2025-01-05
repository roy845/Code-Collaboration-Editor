import TableHeaders from "./TableHeaders";

type DataTableProps<T> = {
  items: T[];
  headers: string[];
  numOfHeaders: number;
  renderRow: (item: T, index: number) => JSX.Element;
};

function DataTable<T>({
  items,
  headers,
  numOfHeaders,
  renderRow,
}: DataTableProps<T>): JSX.Element {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-white">
      <thead className="text-xs text-white border border-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <TableHeaders numOfHeaders={numOfHeaders} labels={headers} />
      </thead>
      <tbody>{items?.map(renderRow)}</tbody>
    </table>
  );
}

export default DataTable;
