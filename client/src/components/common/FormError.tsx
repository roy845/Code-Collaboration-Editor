type FormErrorsProps = {
  message: string | undefined;
};

const FormError = ({ message }: FormErrorsProps): JSX.Element => {
  return (
    <p className="flex items-start mt-2 text-sm text-red-600">*{message}</p>
  );
};

export default FormError;
