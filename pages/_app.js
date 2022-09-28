import { createContext, useEffect, useState } from "react";
import "../styles/globals.css";

export const screenWidth = createContext();
function MyApp({ Component, pageProps }) {
  const [screen, setScreen] = useState();
  useEffect(() => {
    setScreen(window.screen.width);
    document.addEventListener("resize", () => {
      setScreen(window.screen.width);
    });
  }, []);
  return (
    <screenWidth.Provider value={screen}>
      <Component {...pageProps} />
    </screenWidth.Provider>
  );
}

export default MyApp;
