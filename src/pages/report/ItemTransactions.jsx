import React, { useState } from 'react'
import useBranchManagement from '../../hook/useBranchManagement';

import AppStrings from '../../config/appStrings';
import ListReport from './../../components/report/ListReport';
import { faList } from '@fortawesome/free-solid-svg-icons';
import {
    useLazyGetItemTransactionQuery
} from '../../features/reportsControllerSlice';
import { getItemTranscationReportFormFields } from '../../config/formFields';
import { useItemTransactionColDefs } from '../../config/agGridColConfig';
import useValidators from '../../hooks/useValidators';
import { useGetAllProductsQuery } from '../../features/productSlice';

const ItemTransactions = () => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const [branch, setBranch] = useState(null);
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery({
        Warehouse: branch,
        pageNumber: 1,
        pageSize: 10
    },
        {
            skip: !branch
        }
    );
    const [getItemTransaction, { data, isLoading }] = useLazyGetItemTransactionQuery();
    const { itemTransactionSchema } = useValidators()
    const [searchData, setSearchData] = React.useState({});

    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];


    const onSubmit = async (data) => {
        await getItemTransaction(data).unwrap();
        setSearchData(data);
    }

    const onChange = (value, name) => {
        if (name === 'Warehouse')
            setBranch(value);
    }

    return (
        <ListReport
            onChange={onChange}
            title={AppStrings.item_transaction}
            icon={faList}
            data={data}
            fields={getItemTranscationReportFormFields}
            schema={itemTransactionSchema}
            options={{ Warehouse: branches ? branches : [], ItemID: products ? products : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            useComponentsColDefs={useItemTransactionColDefs()}
            searchData={searchData}
        />
    )
}

export default ItemTransactions
