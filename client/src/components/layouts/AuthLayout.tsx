import { Helmet } from "react-helmet";
import Header from "../common/Header";

type AuthLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

const AuthLayout = ({
  children,
  title,
  description,
  keywords,
  author,
}: AuthLayoutProps): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>
      <Header title={title} />
      <div className="flex-wrap">
        <main className="flex-1 p-4">{children}</main>
      </div>
    </>
  );
};

export default AuthLayout;
