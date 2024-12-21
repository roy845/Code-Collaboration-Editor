type LabelProps = {
  label: string;
};
const Label = ({ label }: LabelProps): JSX.Element => {
  return (
    <label
      htmlFor={label}
      className="flex items-start  text-sm text-white font-medium"
    >
      {label}
    </label>
  );
};

export default Label;
