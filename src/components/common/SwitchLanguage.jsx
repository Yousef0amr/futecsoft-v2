import { Language } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

const SwitchLanguage = ({ handleDirection }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.getElementById("checkboxlang").checked = false;
        localStorage.setItem('lang', i18n.language);
        const direction = i18n.language === "en" ? "ltr" : "rtl";
        document.body.style.direction = direction;
        handleDirection(direction);

    };


    return (
        <div className="language-popup ">
            <input type="radio" readOnly checked={localStorage.getItem('lang') === 'en' ? false : true} name="language" id="arabic" onClick={() => changeLanguage("ar")} />
            <input type="radio" readOnly checked={localStorage.getItem('lang') === 'en' ? true : false} name="language" id="english" onClick={() => changeLanguage("en")} />
            <input type="checkbox" id="checkboxlang" />

            <label htmlFor="checkboxlang" className="language-popup__button" >
                <Language />
            </label>

            <div className="language-popup__list-container" style={i18n.language === "en" ? { left: '10px' } : { right: '10px' }}>
                <ul className="language-popup__list" style={i18n.language === "en" ? { direction: 'rtl' } : { direction: 'ltr' }}>
                    <li>
                        <label htmlFor="arabic">
                            <span >Ar</span>
                            <span>العربية</span>
                        </label>
                    </li>
                    <li>
                        <label htmlFor="english">
                            <span >En</span>
                            <span>English</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SwitchLanguage;
