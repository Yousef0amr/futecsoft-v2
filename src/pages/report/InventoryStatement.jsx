import React, { useState } from 'react'
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import ListReport from './../../components/report/ListReport';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import {
    useLazyGetInventoryStatementQuery
} from '../../features/reportsControllerSlice';
import {
    useGetCategoriesNoneCompostieQuery
} from '../../features/categorySlice';
import { getInventoryReportFormFields } from '../../config/formFields';
import { useInventoryStatementColDefs } from '../../config/agGridColConfig';
import useValidators from '../../hooks/useValidators';
const InventoryStatement = () => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const [branch, setBranch] = useState(null);
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesNoneCompostieQuery(
        {
            Warehouse: branch,
        },
        {
            skip: !branch
        }
    );
    const [searchData, setSearchData] = React.useState({});
    const [getInventoryStatement, { data, isLoading }] = useLazyGetInventoryStatementQuery();
    const { inventoryStatementSchema } = useValidators()



    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];

    const categories = !isLoadingCategories
        ? categoriesData?.map((item) => ({ value: item.CatID, label: item.Cat_AR_Name }))
        : [];


    const onSubmit = async (data) => {
        await getInventoryStatement(data).unwrap();
        setSearchData(data);
    }


    const onChange = (value, name) => {
        if (name === 'Warehouse')
            setBranch(value);
    }

    return (
        <ListReport
            onChange={onChange}
            title={AppStrings.inventory_statement}
            icon={faWarehouse}
            data={data}
            fields={getInventoryReportFormFields}
            schema={inventoryStatementSchema}
            options={{ Warehouse: branches ? branches : [], CateID: categories ? categories : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            useComponentsColDefs={useInventoryStatementColDefs()}
            searchData={searchData}
        />
    )
}

export default InventoryStatement
