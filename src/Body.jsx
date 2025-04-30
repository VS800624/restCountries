import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";

const Body = () => {
  // const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))
  // const [isDark, setIsDark] = useState(() => JSON.parse(localStorage.getItem('isDarkMode')))

  return <ThemeProvider>
  <Header />
  <Outlet />
</ThemeProvider>

}


export default Body;