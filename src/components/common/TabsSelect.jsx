import React from 'react';
import { useTranslation } from 'react-i18next';

const TabsSelect = ({ handleTabClick, activeTab, options }) => {
    const { t } = useTranslation();

    return (
        options && options.length > 0 && (
            <div className="radio-inputs">
                {options.map((option) => (
                    <label className="radio" key={option.name}>
                        <input
                            type="radio"
                            name="radio"
                            checked={activeTab === option.name}
                            onChange={() => handleTabClick(option.name)}
                        />
                        <span className={activeTab === option.name ? "name activeTab" : "name"}>
                            {t(option.label)}
                        </span>
                    </label>
                ))}
            </div>
        )
    );
};

export default TabsSelect;
