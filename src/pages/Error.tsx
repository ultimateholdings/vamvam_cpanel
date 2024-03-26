import { Link, useRouteError } from "react-router-dom";
import { getAuthToken } from "../helper/utils";

const ErrorPage = () => {
  const error = useRouteError() as any;

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  const token = getAuthToken();

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen dark:bg-boxdark-2 dark:text-bodydark">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg font-semibold">{message}</p>
      <button className="px-8 py-2 mt-4 cursor-pointer rounded-lg border border-primary bg-primary">
        {token ? (
          <Link to="/">Go home</Link>
        ) : (
          <Link to="/signing">Sign in</Link>
        )}
      </button>
    </div>
  );
};

export default ErrorPage;
