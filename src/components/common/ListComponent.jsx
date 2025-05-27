import { useTranslation } from "react-i18next";
import { useState } from "react";
import useTableActions from "./../../hooks/useTableActions";
import useEntityOperations from "./../../hooks/useEntityOperations";
import FormCard from "./FormCard";
import AgGridTable from "./AgGridTable";
import FilterSearch from "./FilterSearch";
import NavButton from "./NavButton";


const ListComponent = ({
    entityName,
    editIcon = null,
    entityKey,
    fetchHook,
    columnDefsHook,
    routes,
    icon,
    deleteSuccessMessage,
    deleteErrorMessage,
    formTitle,
    addButtonTitle,
    optionId
}) => {
    const { t } = useTranslation();
    const [quickFilterText, setQuickFilterText] = useState();
    const { data, isLoading, deleteEntity, isDeleting, deleteEntityFromCache } = fetchHook();
    const columnDefs = columnDefsHook();
    const { active, handleCancel, defaultActions } = useTableActions({ path: routes.edit, editContent: editIcon });
    const { handleEntityOperation } = useEntityOperations({ deleteEntity });


    const handleOnDeleteClick = async () => {
        handleEntityOperation({
            operation: "delete",
            data: optionId ? { [entityKey]: active.data[entityKey], [optionId]: active.data[optionId] } : { [entityKey]: active.data[entityKey] },
            cacheUpdater: deleteEntityFromCache,
            cacheData: { id: active.data[entityKey] },
            successMessage: deleteSuccessMessage,
            errorMessage: deleteErrorMessage,
            finalCallback: handleCancel,
        });
    };

    return (
        <FormCard
            open={active.isOpen}
            handleCancel={handleCancel}
            isLoading={isDeleting}
            handleDelete={handleOnDeleteClick}
            icon={icon}
            title={t(formTitle)}
            optionComponent={
                <>
                    <FilterSearch onFilterTextBoxChanged={setQuickFilterText} />
                    <NavButton icon="add" title={t(addButtonTitle)} path={routes.add} />
                </>
            }
        >
            <AgGridTable
                actions={defaultActions}
                dynamicColumns={columnDefs}
                rowData={data}
                isLoading={isLoading}
                quickFilterText={quickFilterText}
            />
        </FormCard>
    );
};

export default ListComponent;
