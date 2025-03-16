
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import AppStrings from "../../config/appStrings";
import { Button } from "react-bootstrap";

const ActiveEditor = ({ node, api, handleActiveChange, field }) => {
    const [isActive, setIsActive] = useState(node.data[field]);
    const { t } = useTranslation();

    const onClick = (value) => {
        let updatedData = { ...node.data };
        updatedData[field] = value;
        handleActiveChange(updatedData);
        setIsActive(value);
    };

    return (
        <Button
            size="sm"
            onClick={() => onClick(!isActive)}
            variant={isActive ? "success" : "danger"}
            className="w-50"
        >
            {isActive ? t(AppStrings.yes) : t(AppStrings.no)}
        </Button>
    );
}

export default memo(ActiveEditor)


