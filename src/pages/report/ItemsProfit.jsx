import React, { useState } from 'react'
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import ListReport from './../../components/report/ListReport';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import {
    useLazyGetItemsProfitsQuery
} from '../../features/reportsControllerSlice';
import {
    useGetCategoriesNoneCompostieQuery
} from '../../features/categorySlice';
import { getItemProfitReportFormFields } from '../../config/formFields';
import { useItemsProfitColDefs } from '../../config/agGridColConfig';
import useValidators from '../../hooks/useValidators';
const ItemsProfit = () => {
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
    const [getItemsProfits, { data, isLoading }] = useLazyGetItemsProfitsQuery();
    const { itemsProfitsSchema } = useValidators()



    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];

    const categories = !isLoadingCategories
        ? categoriesData?.map((item) => ({ value: item.CatID, label: item.Cat_AR_Name }))
        : [];


    const onSubmit = async (data) => {
        await getItemsProfits(data).unwrap();
        setSearchData(data);
    }

    const onChange = (value, name) => {
        if (name === 'Warehouse')
            setBranch(value);
    }


    return (
        <ListReport
            onChange={onChange}
            title={AppStrings.items_profits}
            icon={faChartPie}
            data={data}
            fields={getItemProfitReportFormFields}
            schema={itemsProfitsSchema}
            options={{ Warehouse: branches ? branches : [], FatherID: categories ? categories : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            useComponentsColDefs={useItemsProfitColDefs()}
            searchData={searchData}
        />
    )
}

export default ItemsProfit
