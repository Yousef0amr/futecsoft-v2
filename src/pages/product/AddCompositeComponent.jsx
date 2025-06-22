import React, { useEffect, useMemo } from 'react'
import ListCompositeProducts from '../../components/product/ListCompositeProducts'
import FormCard from '../../components/common/FormCard'
import { faArrowRight, faBarcode } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import FilterSearch from '../../components/common/FilterSearch'
import NavButton from '../../components/common/NavButton'
import { useLocation } from 'react-router-dom'
import useTableActions from '../../hooks/useTableActions'
import { routes } from '../../config/constants'
import useCompComponentsManagement from '../../hook/useCompComponentsManagement'
import useEntityOperations from '../../hooks/useEntityOperations'



const AddCompositeComponent = () => {
      const location = useLocation()
    const [quickFilterText, setQuickFilterText] = useState();
    const { defaultActions, handleCancel, active } = useTableActions({ path: null });

    const { data, isLoading, addEntity, isAdding, deleteEntity, isDeleting, isUpdating, updateEntity } = useCompComponentsManagement(location.state?.Id || location.state?.ItemId)
    const { t } = useTranslation();
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });


    const isEditing = active.editable;

    const componentData = useMemo(() => ({
        ItemID: location.state?.Id, Father: location.state?.CatID, Name: location.state?.NameAr, FoodQty: ''
    }), [location]);

    const [editData, setEditData] = useState();


    useEffect(() => {
           if (isEditing) {
                   setEditData({
                SubItem: active?.data?.SubItem,
                Father: active?.data?.Father,
                Unit: active?.data?.Unit,
                Note: active?.data?.Note || '',
                FoodQty: active?.data?.FoodQty,
                ItemID: active?.data?.ItemId,
                Name: active?.data?.ItemArName
            });
        } else {
            setEditData(componentData);
        }
    }, [active, isEditing, componentData]);


    const onSubmit = async (data) => {
        const operationType = isEditing ? "update" : "add";
        await handleEntityOperation({
            operation: operationType,
            data,
            cacheUpdater: (updatedData) => {
                isEditing
                    ? setEditData((prev) => ({ ...prev, FoodQty: updatedData?.FoodQty, Note: updatedData?.Note }))
                    : setEditData(componentData);
            },
            successMessage: isEditing
                ? AppStrings.component_updated_successfully
                : AppStrings.component_added_successfully,
            errorMessage: isEditing
                ? AppStrings.update_just_quentity_or_note
                : AppStrings.material_already_added,
        });
    };



    const handleOnDeleteClick = async () => {
        handleEntityOperation({
            operation: "delete",
            data: { ItemID: active.data.ItemId, SubItem: active.data.SubItem },
            successMessage: AppStrings.component_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
        })
    };

    const handleAddClick = () => {
        handleCancel();
        localStorage.removeItem("selectedRows");
    }

    return (
        <FormCard open={active.isOpen} handleDelete={handleOnDeleteClick} handleCancel={handleCancel} isLoading={isDeleting}
            icon={faBarcode} title={t(AppStrings.list_components)} navButton={
            
                    <NavButton icon={faArrowRight} title={AppStrings.back} path={routes.product.compositeComponents} />
            } optionComponent={
                <>
                    <FilterSearch onFilterTextBoxChanged={setQuickFilterText} />
                </>
            }>
            <ListCompositeProducts  isEditing={isEditing} handleAddClick={handleAddClick} resetForm={isAdding} actionLoading={isEditing ? isUpdating : isAdding} onSubmit={onSubmit} data={data} isLoading={isLoading} actions={defaultActions} quickFilterText={quickFilterText} defaultValuesEdit={editData} />
        </FormCard>
    )
}

export default AddCompositeComponent
