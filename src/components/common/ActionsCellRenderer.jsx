import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import AppStrings from "./../../config/appStrings";
import { DeleteOutline } from "@mui/icons-material";

const ActionsCellRenderer = ({ node, api, handleOnEditClick, handleDeleteClick }) => {
  const { t } = useTranslation();
  const selectedRow = JSON.parse(localStorage.getItem("selectedRows"))
  const [active, setActive] = useState((selectedRow?.ItemId + selectedRow?.SubItem) === (node.data.ItemId + node.data.SubItem))

  const onRemoveClick = useCallback(() => {
    handleDeleteClick(node.data);
    localStorage.removeItem("selectedRows")
    setActive(false)
  }, [node, handleDeleteClick]);

  const onEditClick = useCallback(() => {
    const rowData = node.data;
    node.setSelected(true)
    localStorage.setItem("selectedRows", JSON.stringify(api.getSelectedRows()[0]));
    handleOnEditClick({ ...rowData, index: node.rowIndex })
  }, [node, handleOnEditClick, api]);




  return (
    <div className="buttonCell">
      <button
        className={"button-secondary editButton" + (active ? " activeEditButton" : "")}
        onClick={onEditClick}
      >
        {t(AppStrings.edit)}
      </button>
      <button
        className="button-secondary removeButton"
        onClick={onRemoveClick}
      >
        <DeleteOutline />
      </button>
    </div>
  );
};

export default ActionsCellRenderer;
