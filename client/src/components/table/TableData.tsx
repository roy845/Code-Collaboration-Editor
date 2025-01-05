type TableDataProps = {
  label: string | number;
};

const TableData = ({ label }: TableDataProps): JSX.Element => {
  return (
    <td className="py-4 px-6 text-center border text-white border-white ">
      {label}
    </td>
  );
};

export default TableData;
