import { useEffect, useState } from "react";

function useSystemTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    setIsDarkMode(matchMedia.matches);

    const handler = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    matchMedia.addEventListener("change", handler);

    return () => {
      matchMedia.removeEventListener("change", handler);
    };
  }, []);

  return { isDarkMode };
}

export default useSystemTheme;
