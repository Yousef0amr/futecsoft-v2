import AppRoutes from "./router/AppRoutes";
import { useTheme } from "./context/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


function App() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { i18n } = useTranslation()


  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'ar');
    document.body.style.direction = localStorage.getItem('lang') === 'en' ? 'ltr' : 'rtl';
  }, []);


  return (
    <div className={` ${darkMode ? ' dark-mode' : ''}`}>
      <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;
