import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AppStrings from './../config/appStrings';

import ActiveEditor from '../components/common/ActiveEditor';


export const useBranchColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "BranchId", headerName: t(AppStrings.branchId), filter: 'agNumberColumnFilter' },
        { field: "BranchNameAr", headerName: t(AppStrings.branchNameAr), filter: 'agTextColumnFilter' },
        { field: "BranchNameEn", headerName: t(AppStrings.branchNameEn), filter: 'agTextColumnFilter' },
        { field: "TaxId", headerName: t(AppStrings.taxId), filter: 'agNumberColumnFilter' },
        { field: "Phones", headerName: t(AppStrings.phones), filter: 'agNumberColumnFilter' },
        { field: "Mobiles", headerName: t(AppStrings.mobiles), filter: 'agNumberColumnFilter' },
        { field: "Website", headerName: t(AppStrings.website), filter: 'agTextColumnFilter' },
        { field: "Email", headerName: t(AppStrings.email), filter: 'agTextColumnFilter' },
        { field: "Address", headerName: t(AppStrings.address), filter: 'agTextColumnFilter' },
        { field: "City", headerName: t(AppStrings.city), filter: 'agTextColumnFilter' },
        { field: "Street", headerName: t(AppStrings.street), filter: 'agTextColumnFilter' },
    ], [t]);
};

export const useProductColDefs = ({ handleActiveChange = () => { } }) => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        {
            field: "ImgPath",
            headerName: t(AppStrings.icon),
            filter: 'agTextColumnFilter',
            cellRenderer: (params) => {
                const base64String = params.value;
                if (base64String) {
                    return (
                        <img
                            src={params.value}
                            style={{ margin: '10px', width: 64, height: 64 }}
                            alt="----"
                        />
                    );
                } else {
                    return <div>لا توجد صورة</div>;
                }
            }
        },
        { field: "Id", headerName: t(AppStrings.productId), filter: 'agNumberColumnFilter' },

        { field: i18n.language === 'en' ? "NameEn" : "NameAr", headerName: t(i18n.language === 'en' ? AppStrings.productNameEn : AppStrings.productNameAr), filter: 'agTextColumnFilter' },

        { field: "Father", headerName: t(AppStrings.category), filter: 'agTextColumnFilter' },
        { field: "Barcode", headerName: t(AppStrings.barcode), filter: 'agTextColumnFilter' },
        { field: "Price", headerName: t(AppStrings.price), filter: 'agNumberColumnFilter' },
        { field: "TaxPercentage", headerName: t(AppStrings.taxPercentage), filter: 'agNumberColumnFilter' },
        {
            field: "Discountable",
            headerName: t(AppStrings.discountable),
            filter: 'agTextColumnFilter',
            cellRenderer: ActiveEditor,
            cellRendererParams: {
                handleActiveChange: handleActiveChange,
                field: "Discountable"
            }
        },
        {
            field: "IsService",
            headerName: t(AppStrings.isService),
            filter: 'agTextColumnFilter',
            cellRenderer: ActiveEditor,
            cellRendererParams: {
                handleActiveChange: handleActiveChange,
                field: "IsService"
            }
        },
        {
            field: "IsActive",
            headerName: t(AppStrings.isActive),
            filter: 'agTextColumnFilter',
            cellRenderer: ActiveEditor,
            cellRendererParams: {
                handleActiveChange: handleActiveChange,
                field: "IsActive"
            }

        },
        {
            field: "Saleable",
            headerName: t(AppStrings.saleable),
            filter: 'agTextColumnFilter',
            cellRenderer: ActiveEditor,
            cellRendererParams: {
                handleActiveChange: handleActiveChange,
                field: "Saleable"
            }
        },
        {
            field: "Taxable",
            headerName: t(AppStrings.taxable),
            filter: 'agTextColumnFilter',
            cellRenderer: ActiveEditor,
            cellRendererParams: {
                handleActiveChange: handleActiveChange,
                field: "Taxable"
            }
        },

    ], [t, i18n, handleActiveChange]);
};

export const useComponentsColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "ArName", headerName: t(AppStrings.productNameAr), filter: 'agTextColumnFilter' },
        { field: "EnName", headerName: t(AppStrings.productNameEn), filter: 'agTextColumnFilter' },
        { field: "FoodQty", headerName: t(AppStrings.quantity), filter: 'agTextColumnFilter' },
        { field: "UnitAr", headerName: t(AppStrings.unit) + ' -- Ar', filter: 'agNumberColumnFilter' },
        { field: "UnitEn", headerName: t(AppStrings.unit) + ' -- En', filter: 'agNumberColumnFilter' },
        { field: "Note", headerName: t(AppStrings.note), filter: 'agTextColumnFilter' },
    ], [t]);
};
export const usePricesAndCostsColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "ID", headerName: t(AppStrings.productId), filter: 'agTextColumnFilter' },
        { field: "Barcode", headerName: t(AppStrings.barcode), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "En_Name" : "Ar_Name", headerName: t(i18n.language === 'en' ? AppStrings.productNameEn : AppStrings.productNameAr), filter: 'agTextColumnFilter' },
        { field: "Price1", headerName: t(AppStrings.price), filter: 'agTextColumnFilter' },
        { field: "Price2", headerName: t(AppStrings.price2), filter: 'agNumberColumnFilter' },
        { field: "Price3", headerName: t(AppStrings.price3), filter: 'agNumberColumnFilter' },
        { field: "Price4", headerName: t(AppStrings.price4), filter: 'agTextColumnFilter' },
    ], [t, i18n]);
};

export const useCategoriesColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "Id", headerName: t(AppStrings.categoryId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "NameEn" : "NameAr", headerName: t(i18n.language === 'en' ? AppStrings.categoryNameEn : AppStrings.categoryNameAr), filter: 'agTextColumnFilter' },
        { field: "Warehouse", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
        { field: "Saleable", headerName: t(AppStrings.saleable), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
};


export const useUnitsColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "UnitID", headerName: t(AppStrings.unitId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "Unit_EN" : "Unit_AR", headerName: t(i18n.language === 'en' ? AppStrings.unitNameEn : AppStrings.unitNameAr), filter: 'agTextColumnFilter' },
        { field: "Active", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
};


export const useFlavorsColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "FlavorNo", headerName: t(AppStrings.flavorId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "FlavorEN" : "FlavorAR", headerName: t(i18n.language === 'en' ? AppStrings.flavorNameEn : AppStrings.flavorNameAr), filter: 'agTextColumnFilter' },
        { field: "TagDesc", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "Price", headerName: t(AppStrings.price), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
};


export const useOffersColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "OfferId", headerName: t(AppStrings.offerId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "ProductNameEn" : "ProductNameAr", headerName: t(i18n.language === 'en' ? AppStrings.offerNameEn : AppStrings.offerNameAr), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "OfferTypeEn" : "OfferTypeAr", headerName: t(i18n.language === 'en' ? AppStrings.offerTypeEn : AppStrings.offerTypeAr), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "offerValueEn" : "offerValueAr", headerName: t(AppStrings.offerValue), filter: 'agTextColumnFilter' },
        { field: "FromDate", headerName: t(AppStrings.from_date), filter: 'agTextColumnFilter' },
        { field: "ToDate", headerName: t(AppStrings.to_date), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
};



export const useDiscountsColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "Serial", headerName: t(AppStrings.discountId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "DiscountTypeEN" : "DiscountTypeAR", headerName: t(i18n.language === 'en' ? AppStrings.discount_type_en : AppStrings.discount_type_ar), filter: 'agTextColumnFilter' },
        { field: "DiscountPercentage", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
};


export const useTaxsColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "TaxId", headerName: t(AppStrings.tax_type_id), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "TaxEn" : "TaxAr", headerName: t(i18n.language === 'en' ? AppStrings.tax_type_en : AppStrings.tax_type_ar), filter: 'agTextColumnFilter' },
        { field: "TaxPercentage", headerName: t(AppStrings.taxPercentage), filter: 'agTextColumnFilter' },
        { field: "TaxIsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
        { field: "IsDefault", headerName: t(AppStrings.isDefault), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
};

export const currenciesFormFields = [
    { name: 'CurrencyId', label: AppStrings.currencyId, required: true, type: 'number', disabled: true },
    { name: 'IDigits', label: AppStrings.iDigits, required: true, type: 'number' },
    { name: 'IsDefault', label: AppStrings.isDefault, type: 'check' },
]


export const useCurrenciesColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "CurrencyId", headerName: t(AppStrings.currencyId), filter: 'agTextColumnFilter' },
        { field: "IDigits", headerName: t(AppStrings.iDigits), filter: 'agTextColumnFilter' },
        { field: "IsDefault", headerName: t(AppStrings.isDefault), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t]);
};


export const usePaymentTypesColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "Ptype", headerName: t(AppStrings.paymentTypeId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "PaymentEnDesc" : "PaymentArDesc", headerName: t(i18n.language === 'en' ? AppStrings.paymentTypeEn : AppStrings.paymentTypeEn), filter: 'agTextColumnFilter' },
        { field: "CompanyID", headerName: t(AppStrings.deliveryCompany), filter: 'agTextColumnFilter' },
        { field: "Commissions", headerName: t(AppStrings.commissions), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
        { field: "CashMoney", headerName: t(AppStrings.cashMoney), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
        { field: "IsCredit", headerName: t(AppStrings.isCredit), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
}


export const useSuppliersColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "SupplierId", headerName: t(AppStrings.supplierId), filter: 'agTextColumnFilter' },
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "SupplierCompany", headerName: t(AppStrings.supplierCompany), filter: 'agTextColumnFilter' },
        { field: "ContactName", headerName: t(AppStrings.contactName), filter: 'agTextColumnFilter' },
        { field: "Email", headerName: t(AppStrings.email), filter: 'agTextColumnFilter' },
        { field: "Phones", headerName: t(AppStrings.phones), filter: 'agTextColumnFilter' },
        { field: "Mobiles", headerName: t(AppStrings.mobiles), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t]);
}
export const useDeliveryCompaniesColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "CompanyID", headerName: t(AppStrings.deliveryCompanyId), filter: 'agTextColumnFilter' },
        { field: "CompanyName", headerName: t(AppStrings.deliveryCompanyName), filter: 'agTextColumnFilter' },
        { field: "Email", headerName: t(AppStrings.email), filter: 'agTextColumnFilter' },
        { field: "Phone", headerName: t(AppStrings.phones), filter: 'agTextColumnFilter' },
        { field: "percent", headerName: t(AppStrings.deliveryPercentage), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "PriceCategoryEn" : "PriceCategoryAr", headerName: t(AppStrings.priceCategory), filter: 'agTextColumnFilter' },
        { field: "Active", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
}


export const useDeliveryDiscountColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "LineID", headerName: t(AppStrings.discountId), filter: 'agTextColumnFilter' },
        { field: "CompanyDesc", headerName: t(AppStrings.deliveryCompany), filter: 'agTextColumnFilter' },
        { field: "FromDate", headerName: t(AppStrings.from_date), filter: 'agTextColumnFilter' },
        { field: "ToDate", headerName: t(AppStrings.to_date), filter: 'agTextColumnFilter' },
        { field: "DiscountValue", headerName: t(AppStrings.deliveryPercentage), filter: 'agTextColumnFilter' },
        { field: "BranchID", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t]);
}
export const useUserGroupColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "GroupId", headerName: t(AppStrings.groupId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "GroupEnName" : "GroupArName", headerName: t(i18n.language === 'en' ? AppStrings.group_name_en : AppStrings.group_name_ar), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
}



export const useUsersColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "UserNo", headerName: t(AppStrings.userId), filter: 'agTextColumnFilter' },
        { field: "UserName", headerName: t(AppStrings.username), filter: 'agTextColumnFilter' },
        { field: "BranchDesc", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "GroupEnName" : "GroupArName", headerName: t(i18n.language === 'en' ? AppStrings.group_name_en : AppStrings.group_name_ar), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t, i18n]);
}

export const useUserPermissionsColDefs = () => {
    const { t, } = useTranslation();

    return useMemo(() => [
        { field: "UserNo", headerName: t(AppStrings.userId), filter: 'agTextColumnFilter' },
        { field: "UserName", headerName: t(AppStrings.username), filter: 'agTextColumnFilter' },
        { field: "BranhDesc", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "IsActive", headerName: t(AppStrings.isActive), filter: 'agTextColumnFilter', cellRenderer: (params) => params.value ? t(AppStrings.yes) : t(AppStrings.no) },
    ], [t,]);
}

export const useInvoicesColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "DocID", headerName: t(AppStrings.invoiceId), filter: 'agTextColumnFilter' },
        { field: "InvoiceNo", headerName: t(AppStrings.invoiceNo), filter: 'agTextColumnFilter' },
        { field: "DocDate", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "SupplierDesc", headerName: t(AppStrings.suppliers), filter: 'agTextColumnFilter' },
        { field: "SubTotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "Tax", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "GrandTotal", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
        { field: "PaymentDescAr", headerName: t(AppStrings.paymentType), filter: 'agTextColumnFilter' },
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
    ], [t]);
}

export const useInvoicesItemsColDefs = ({
    products = [],
    units = [],
    getSelectedVaule
}) => {
    const { t } = useTranslation();

    return useMemo(() => [
        {
            field: 'ItemID',
            headerName: t(AppStrings.productId),
            type: 'singleSelect',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            valueOptions: products.map((product) => product.value),
            getOptionLabel: (value) => {
                const selectedProduct = products.find((product) => product.value === value);
                return selectedProduct ? selectedProduct.label : '';
            },
            preProcessEditCellProps: (params) => {
                getSelectedVaule(params.props.value);
                return params.props;
            },
            required: true
        },

        {
            field: 'UnitID',
            headerName: t(AppStrings.unit),
            type: 'singleSelect',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            valueOptions: units.map((unit) => unit.value),
            getOptionLabel: (value) => {
                const selectedUnit = units.find((unit) => unit.value === value);
                return selectedUnit ? selectedUnit.label : '';
            },
            required: true
        },
        {
            field: 'Qty',
            headerName: t(AppStrings.quantity),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: true
        },
        {
            field: 'UnitPrice',
            headerName: t(AppStrings.price),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: true
        },
        {
            field: 'DiscountPercentage',
            headerName: t(AppStrings.discount_percentage),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: false,
            defaultValue: 0
        },
        {
            field: 'Discount',
            headerName: t(AppStrings.taxValue),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: false,
            defaultValue: 0
        },
    ], [t, products, units, getSelectedVaule]);
};


export const useItemsUnitsColDefs = ({
    units = []
}) => {
    const { t } = useTranslation();

    return useMemo(() => [
        {
            field: 'UnitId',
            headerName: t(AppStrings.unit),
            type: 'singleSelect',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            valueOptions: units.map((u) => u.value),
            getOptionLabel: (value) => {
                const selectedUnit = units.find((u) => u.value === value);
                return selectedUnit ? selectedUnit.label : '';
            },
            required: true
        },
        {
            field: 'Barcode',
            headerName: t(AppStrings.barcode),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: true
        },
        {
            field: 'Factor',
            headerName: t(AppStrings.factor),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: true
        },
        {
            field: 'IsSmall',
            headerName: t(AppStrings.isSmall),
            type: 'singleSelect',
            valueOptions: [true, false],
            getOptionLabel: (v) => v === true ? t(AppStrings.yes) : t(AppStrings.no),
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: false,
            defaultValue: false
        },
        {
            field: 'Price1',
            headerName: t(AppStrings.price1),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: false,
            defaultValue: 0
        },
        {
            field: 'Price2',
            headerName: t(AppStrings.price2),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: false,
            defaultValue: 0
        },
        {
            field: 'Price3',
            headerName: t(AppStrings.price3),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: false,
            defaultValue: 0
        },
        {
            field: 'Price4',
            headerName: t(AppStrings.price4),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            editable: true,
            required: false,
            defaultValue: 0
        },
    ], [t, units]);
};

export const useVoucherInputItemsColDefs = ({
    products = [],
    units = [],
    getSelectedVaule
}) => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        {
            field: "ItemID", type: 'singleSelect', headerName: t(AppStrings.productId), flex: 1, editable: true, valueOptions: products.map((product) => product.value),
            getOptionLabel: (value) => {
                const selectedProduct = products.find((product) => product.value === value);
                return selectedProduct ? selectedProduct.label : '';
            },
            preProcessEditCellProps: (params) => {
                getSelectedVaule(params.props.value);
                return params.props;
            }, headerAlign: "center", filterable: true
        },
        {
            field: "UnitID",
            headerName: t(i18n.language === 'en' ? AppStrings.unitNameEn : AppStrings.unitNameAr),
            flex: 1,
            type: 'singleSelect',
            editable: true,
            headerAlign: "center",
            valueOptions: units.map((unit) => unit.value),
            getOptionLabel: (value) => {
                const selectedUnit = units.find((unit) => unit.value === value);
                return selectedUnit ? selectedUnit.label : '';
            },
            filterable: true
        },
        { field: "Qty", headerName: t(AppStrings.quantity), flex: 1, editable: true, headerAlign: "center", filterable: true },
        { field: "UnitPrice", headerName: t(AppStrings.price), flex: 1, editable: true, headerAlign: "center", filterable: true },
    ], [t, i18n, products, units, getSelectedVaule]);
}

export const useVoucherItemsColDefs = (
    {
        products = [],
        units = [],
        getSelectedVaule
    }
) => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        {
            field: "ItemID", type: 'singleSelect', headerName: t(AppStrings.productId), flex: 1, editable: true, valueOptions: products.map((product) => product.value),
            getOptionLabel: (value) => {
                const selectedProduct = products.find((product) => product.value === value);
                return selectedProduct ? selectedProduct.label : '';
            },
            preProcessEditCellProps: (params) => {
                getSelectedVaule(params.props.value);
                return params.props;
            }, headerAlign: "center", filterable: true
        },
        {
            field: "UnitID",
            headerName: t(i18n.language === 'en' ? AppStrings.unitNameEn : AppStrings.unitNameAr),
            flex: 1,
            type: 'singleSelect',
            editable: true,
            headerAlign: "center",
            valueOptions: units.map((unit) => unit.value),
            getOptionLabel: (value) => {
                const selectedUnit = units.find((unit) => unit.value === value);
                return selectedUnit ? selectedUnit.label : '';
            },
            filterable: true
        },
        { field: "Qty", headerName: t(AppStrings.quantity), flex: 1, editable: true, headerAlign: "center", filterable: true },
        { field: "Cost", headerName: t(AppStrings.price), flex: 1, editable: true, headerAlign: "center", filterable: true },
    ], [t, i18n, products, units, getSelectedVaule]);
}

export const useVoucherInputColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "DocId", headerName: t(AppStrings.voucherId), filter: 'agTextColumnFilter' },
        { field: "DocDate", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "SubTotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "Tax", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "GrandTotal", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
        { field: "Note", headerName: t(AppStrings.note), filter: 'agTextColumnFilter' },
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
    ], [t]);
}

export const useVoucherOutputColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "DocNo", headerName: t(AppStrings.voucherId), filter: 'agTextColumnFilter' },
        { field: "CreatedByDesc", headerName: t(AppStrings.createdBy), filter: 'agTextColumnFilter' },
        { field: "DocDate", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "Note", headerName: t(AppStrings.note), filter: 'agTextColumnFilter' },
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
    ], [t]);
}


export const useVoucherTransferColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "DocNo", headerName: t(AppStrings.invoiceId), filter: 'agTextColumnFilter' },
        { field: "TransferNo", headerName: t(AppStrings.voucherId), filter: 'agTextColumnFilter' },
        { field: "CreatedByDesc", headerName: t(AppStrings.createdBy), filter: 'agTextColumnFilter' },
        { field: "DocDate", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "Note", headerName: t(AppStrings.note), filter: 'agTextColumnFilter' },
        { field: "FromWarehouseName", headerName: t(AppStrings.from_branch), filter: 'agTextColumnFilter' },
        { field: "ToWarehouseName", headerName: t(AppStrings.to_branch), filter: 'agTextColumnFilter' },
    ], [t]);
}





export const useInvoicesByDateColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "InvoiceNo", headerName: t(AppStrings.invoiceNo), filter: 'agTextColumnFilter' },
        { field: "RealTime", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "Time", headerName: t(AppStrings.time), filter: 'agTextColumnFilter' },
        { field: "InvoiceSubTotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "InvoiceDiscountTotal", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "InvoiceTaxTotal", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "InvoiceGrandTotal", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
        { field: "PaymentDesc", headerName: t(AppStrings.paymentType), filter: 'agTextColumnFilter' },
    ], [t]);
}


export const useSalesCategoryColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "Column1", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "Category", headerName: t(AppStrings.category), filter: 'agTextColumnFilter' },
        { field: "Subtotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "DiscountV", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "TaxV", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "GrandTotal", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
    ], [t]);
}


export const useItemsProfitColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "Item", headerName: t(AppStrings.productId), filter: 'agTextColumnFilter' },
        { field: "ItemDesc", headerName: t(AppStrings.product), filter: 'agTextColumnFilter' },
        { field: "Qty", headerName: t(AppStrings.quantitySold), filter: 'agTextColumnFilter' },
        { field: "Subtotal", headerName: t(AppStrings.totalSales), filter: 'agTextColumnFilter' },
        { field: "Discount", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "ReturnQty", headerName: t(AppStrings.quantityReturned), filter: 'agTextColumnFilter' },
        { field: "Return", headerName: t(AppStrings.totalReturn), filter: 'agTextColumnFilter' },
        { field: "Cost", headerName: t(AppStrings.unitCost), filter: 'agTextColumnFilter' },
        { field: "Profit", headerName: t(AppStrings.profitValue), filter: 'agTextColumnFilter' },
        { field: "ProfitPer", headerName: t(AppStrings.profitPercentage), filter: 'agTextColumnFilter' },
    ], [t]);
}

export const useDailyProfitColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "Item", headerName: t(AppStrings.productId), filter: 'agTextColumnFilter' },
        { field: "ItemDesc", headerName: t(AppStrings.product), filter: 'agTextColumnFilter' },
        { field: "SalesDate", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "Qty", headerName: t(AppStrings.quantitySold), filter: 'agTextColumnFilter' },
        { field: "Subtotal", headerName: t(AppStrings.totalSales), filter: 'agTextColumnFilter' },
        { field: "Discount", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "ReturnQty", headerName: t(AppStrings.quantityReturned), filter: 'agTextColumnFilter' },
        { field: "Return", headerName: t(AppStrings.totalReturn), filter: 'agTextColumnFilter' },
        { field: "Cost", headerName: t(AppStrings.unitCost), filter: 'agTextColumnFilter' },
        { field: "Profit", headerName: t(AppStrings.profitValue), filter: 'agTextColumnFilter' },
        { field: "ProfitPer", headerName: t(AppStrings.profitPercentage), filter: 'agTextColumnFilter' },
    ], [t]);
}


export const useInventoryStatementColDefs = () => {
    const { t, i18n } = useTranslation();

    return useMemo(() => [
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "ID", headerName: t(AppStrings.productId), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "En_Name" : "Ar_Name", headerName: t(i18n.language === 'en' ? AppStrings.productNameEn : AppStrings.productNameAr), filter: 'agTextColumnFilter' },
        { field: i18n.language === 'en' ? "Unit_EN" : "Unit_AR", headerName: t(i18n.language === 'en' ? AppStrings.unitNameEn : AppStrings.unitNameAr), filter: 'agTextColumnFilter' },
        { field: "QTY", headerName: t(AppStrings.quantity), filter: 'agTextColumnFilter' },
        { field: "COST", headerName: t(AppStrings.unitCost), filter: 'agTextColumnFilter' },
        { field: "Column1", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
    ], [t, i18n]);
}


export const useItemTransactionColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "ItemDesc", headerName: t(AppStrings.product), filter: 'agTextColumnFilter' },
        { field: "NOTE", headerName: t(AppStrings.description), filter: 'agTextColumnFilter' },
        { field: "DOCDATE", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "DOCNO", headerName: t(AppStrings.voucherId), filter: 'agTextColumnFilter' },
        { field: "INQTY", headerName: t(AppStrings.quantityIncoming), filter: 'agTextColumnFilter' },
        { field: "INCOST", headerName: t(AppStrings.costIncoming), filter: 'agTextColumnFilter' },
        { field: "OUTQTY", headerName: t(AppStrings.quantityOutgoing), filter: 'agTextColumnFilter' },
        { field: "OUTCOST", headerName: t(AppStrings.costOutgoing), filter: 'agTextColumnFilter' },
        { field: "BALANCEQTY", headerName: t(AppStrings.quantityBalance), filter: 'agTextColumnFilter' },
        { field: "BALANCECOST", headerName: t(AppStrings.costBalance), filter: 'agTextColumnFilter' },
    ], [t]);
}


export const useItemSalesColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "Warehouse", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "ID", headerName: t(AppStrings.productId), filter: 'agTextColumnFilter' },
        { field: "Product", headerName: t(AppStrings.product), filter: 'agTextColumnFilter' },
        { field: "FromDate", headerName: t(AppStrings.from_date), filter: 'agTextColumnFilter' },
        { field: "ToDate", headerName: t(AppStrings.to_date), filter: 'agTextColumnFilter' },
        { field: "Qty", headerName: t(AppStrings.quantity), filter: 'agTextColumnFilter' },
        { field: "Subtotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "Discount", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "TotalTax", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "GrandTotal", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
    ], [t]);
}

export const useFullSalesColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "ZDATE", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "Payment0", headerName: t(AppStrings.cashMoney), filter: 'agTextColumnFilter' },
        { field: "Payment1", headerName: t(AppStrings.credit_cards), filter: 'agTextColumnFilter' },
        { field: "SubTotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "Discount", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "RETURN", headerName: t(AppStrings.returnValue), filter: 'agTextColumnFilter' },
        { field: "TaxReturn", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "SALES", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
    ], [t]);
}


export const useFullSalesDetailsColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "ZDATE", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "Payment0", headerName: t(AppStrings.cashMoney), filter: 'agTextColumnFilter' },
        { field: "Payment1", headerName: t(AppStrings.visa), filter: 'agTextColumnFilter' },
        { field: "SubTotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "Discount", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "CashReturn", headerName: t(AppStrings.cashReturnValue), filter: 'agTextColumnFilter' },
        { field: "VisaReturn", headerName: t(AppStrings.visaReturnValue), filter: 'agTextColumnFilter' },
        { field: "TaxReturn", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "SALES", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
    ], [t]);
}



export const useReturnByInvoiceColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "ReturnID", headerName: t(AppStrings.returnId), filter: 'agTextColumnFilter' },
        { field: "ReturnDate", headerName: t(AppStrings.date), filter: 'agTextColumnFilter' },
        { field: "InvoiceNo", headerName: t(AppStrings.invoiceNo), filter: 'agTextColumnFilter' },
        { field: "ReturnedBy", headerName: t(AppStrings.cashier), filter: 'agTextColumnFilter' },
        { field: "ReturnsSubTotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "ReturnsDiscountTotal", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "ReturnsTaxTotal", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "ReturnsGrandTotal", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
    ], [t]);
}
export const useReturnByItemColDefs = () => {
    const { t } = useTranslation();

    return useMemo(() => [
        { field: "WarehouseName", headerName: t(AppStrings.branch), filter: 'agTextColumnFilter' },
        { field: "ID", headerName: t(AppStrings.productId), filter: 'agTextColumnFilter' },
        { field: "Item", headerName: t(AppStrings.product), filter: 'agTextColumnFilter' },
        { field: "Qty", headerName: t(AppStrings.quantity), filter: 'agTextColumnFilter' },
        { field: "SubTotal", headerName: t(AppStrings.subTotal), filter: 'agTextColumnFilter' },
        { field: "Discount", headerName: t(AppStrings.discount_percentage), filter: 'agTextColumnFilter' },
        { field: "TaxValue", headerName: t(AppStrings.taxValue), filter: 'agTextColumnFilter' },
        { field: "GrandTotal", headerName: t(AppStrings.grandTotal), filter: 'agTextColumnFilter' },
    ], [t]);
}









































