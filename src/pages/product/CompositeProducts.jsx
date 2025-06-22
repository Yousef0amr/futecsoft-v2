
import FormCard from '../../components/common/FormCard'
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';
import {routes } from '../../config/constants';
import AgGridTable from '../../components/common/AgGridTable';
import FilterSearch from '../../components/common/FilterSearch';
import { useProductColDefs } from '../../config/agGridColConfig';
import useProductManagement from '../../hook/useProductManagement';
import useTableActions from '../../hooks/useTableActions';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useEffect, useState } from 'react';



const getCompositeProducts = (data) => {
    return data?.filter(product => product.CompositeMaterial === true)
}

const CompositeProducts = () => {
   const { t } = useTranslation();

    const { data, isLoading, deleteEntity, isDeleting, updateEntity, updateEntityInCache, deleteEntityFromCache } = useProductManagement();
    const { handleEntityOperation } = useEntityOperations({ deleteEntity, updateEntity });
    const [quickFilterText, setQuickFilterText] = useState();
    const [loading, setLoading] = useState(true);
    const { defaultActions, active, handleCancel } = useTableActions({
        path: routes.product.compositeComponentsEdit
    });

    useEffect(() => {
        if (!isLoading) {
            setLoading(false);
        }
    }, [data, isLoading]);

    const handleActiveChange = (data) => {
        handleEntityOperation({
            operation: 'update',
            data: { ...data, Father: data.CatID, Warehouse: data.Tag, Icon: "..." },
            cacheUpdater: updateEntityInCache(data),
            successMessage: AppStrings.product_updated_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    const handleOnDeleteClick = async () => {
        const res = await handleEntityOperation({
            operation: "delete",
            data: { Id: active.data.Id },
            cacheUpdater: deleteEntityFromCache,
            cacheData: { id: active.data.Id },
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
        })

        console.log(res)
    };

        const productColDefs = useProductColDefs({ handleActiveChange })

    return (
        <FormCard
          open={active.isOpen}
       isLoading={isDeleting}
        handleCancel={handleCancel}
        handleDelete={handleOnDeleteClick}
        icon={faBarcode} title={t(AppStrings.add_new_product)}
               navButton={
                        <NavButton icon={'add'} node={{data : {CompositeMaterial : true}}} title={AppStrings.add_new_product} path={routes.product.compositeProductAdd} />
                    }
                    optionComponent={
                        <>
                            <FilterSearch onFilterTextBoxChanged={setQuickFilterText} />
                        </>
                    }>
              <AgGridTable
                           actions={{...defaultActions , navButton: true ,path: routes.product.compositeComponentsAdd, title: AppStrings.add_new_component}}
                           dynamicColumns={productColDefs}
                           rowData={getCompositeProducts(data || [])}
                           isLoading={loading}
                           quickFilterText={quickFilterText}
                       />
        </FormCard>
    )
}

export default CompositeProducts
