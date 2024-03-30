import { Toaster } from "react-hot-toast";
import useThemeMode from "../../hooks/useThemeMode";

const Toast = () => {
  const [theme] = useThemeMode();
  const isDarkTheme = theme === "dark";

  const style = isDarkTheme
    ? {
        background: "#333",
        color: "#fff",
      }
    : undefined;

  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        blank: { style },
        error: {
          style: {
            ...style,
            color: isDarkTheme ? "#ff7f7f" : "red",
            // border: '1px solid red',
          },
        },
        success: {
          duration: 5000,
          style: {
            ...style,
            color: isDarkTheme ? "#afe1af" : "green",
            // border: '1px solid green',
          },
        },
      }}
    />
  );
};

export default Toast;
