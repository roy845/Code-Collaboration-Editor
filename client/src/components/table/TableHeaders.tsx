import TableHeader from "./TableHeader";

type TableHeadersProps = {
  numOfHeaders: number;
  labels: string[];
};

const TableHeaders = ({
  numOfHeaders,
  labels,
}: TableHeadersProps): JSX.Element => {
  return (
    <tr>
      {Array.from({ length: numOfHeaders }, (_, index: number) => (
        <TableHeader key={index} label={labels[index] || "N/A"} />
      ))}
    </tr>
  );
};

export default TableHeaders;
