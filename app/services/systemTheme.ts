import { useEffect, useState } from "react";
import Theme from "@/app/resources/Theme";
import Colors from "@/app/resources/Colors";

function useSystemTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    const setTheme = (isDark: boolean) => {
      setIsDarkMode(isDark);
      Theme.setTheme(
        isDark ? Colors.systemTheme.dark : Colors.systemTheme.light
      );
    };

    setTheme(matchMedia.matches);

    const handler = (event: MediaQueryListEvent) => {
      setTheme(event.matches);
    };

    matchMedia.addEventListener("change", handler);

    return () => {
      matchMedia.removeEventListener("change", handler);
    };
  }, []);

  return { isDarkMode };
}

export default useSystemTheme;
