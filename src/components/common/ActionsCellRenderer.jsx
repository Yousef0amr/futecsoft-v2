import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import AppStrings from "./../../config/appStrings";
import { DeleteOutline } from "@mui/icons-material";
import NavButton from "./NavButton";

const ActionsCellRenderer = ({ node, api, handleOnEditClick, handleDeleteClick, editContent ,path ,title, navButton = false }) => {
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
        {editContent ? editContent : t(AppStrings.edit)}
      </button>
      <button
        className="button-secondary removeButton"
        onClick={onRemoveClick}
      >
        <DeleteOutline style={{ fontSize: "20px" }} />
      </button>
      { navButton &&    <NavButton icon={'add'} node={node}  title={title} path={path} />}
    </div>
  );
};

export default ActionsCellRenderer;
