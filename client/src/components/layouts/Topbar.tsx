import AuthButton from "../auth/AuthButton";
import Header from "../common/Header";
import Links from "./Links";

type TopbarProps = {
  title?: string;
};
const Topbar = ({ title }: TopbarProps): React.JSX.Element => {
  return (
    <div className="bg-[#0d0c26] p-4 text-white flex items-center justify-between shadow-lg">
      <Header sm title={title} />
      <Links />
      <AuthButton />
    </div>
  );
};

export default Topbar;
