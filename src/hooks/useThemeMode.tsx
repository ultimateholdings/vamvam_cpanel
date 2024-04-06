import { useState } from "react";
import { STORAGE_KEY } from "../helper/enums";

const useThemeMode = () => {
  const [theme, setTheme] = useState<string>(() => {
    const mode = localStorage.getItem(STORAGE_KEY.theme);
    const theme = mode || "light";
    changeBodyClass(theme);
    return theme;
  });

  function setThemeMode(mode: string) {
    changeBodyClass(mode);
    setTheme(mode);
  }

  function changeBodyClass(mode: string) {
    const className = "dark";
    const bodyClass = window.document.body.classList;
    mode === "dark" ? bodyClass.add(className) : bodyClass.remove(className);
    localStorage.setItem(STORAGE_KEY.theme, mode);
    localStorage.setItem("chakra-ui-color-mode", mode);
  }

  return [theme, setThemeMode];
};

export default useThemeMode;
