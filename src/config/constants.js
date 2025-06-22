import { faChartLine, faChartPie, faList, faReceipt, faWarehouse, faAddressBook, faBalanceScale, faBarChart, faBarcode, faCar, faCreditCard, faFileInvoice, faHeart, faMoneyBill, faMoneyBill1Wave, faPercent, faShuffle, faStar, faTruck, faUsd, faUser, faUserLock, faVcard, faWindowRestore, faDashboard } from '@fortawesome/free-solid-svg-icons';
import AppStrings from './../config/appStrings';
import { useTranslation } from 'react-i18next';



export const routes = {
    product: {
        list: '/products/list',
        add: '/products/add',
        edit: '/products/edit',
        compositeComponents: '/products/composite-products',
        compositeProductAdd: '/products/composite-products/add',
        compositeComponentsAdd: '/products/composite-components/add',
        pricesAndCosts: '/products/prices-and-costs',
        compositeComponentsEdit: '/products/composite-components/edit'
    },
    branch: {
        list: '/branches/list',
        add: '/branches/add',
        edit: '/branches/edit'
    },
    category: {
        list: '/categories/list',
        add: '/categories/add',
        edit: '/categories/edit'
    },
    unit: {
        list: '/units/list',
        add: '/units/add',
        edit: '/units/edit'
    },
    offer: {
        list: '/offers/list',
        add: '/offers/add',
        edit: '/offers/edit'
    },
    discountType: {
        list: '/discount-types/list',
        add: '/discount-types/add',
        edit: '/discount-types/edit'
    },
    tax: {
        list: '/taxes/list',
        add: '/taxes/add',
        edit: '/taxes/edit'
    },
    currency: {
        list: '/currencies/list',
        add: '/currencies/add',
        edit: '/currencies/edit'
    },
    paymentMethod: {
        list: '/payment-methods/list',
        add: '/payment-methods/add',
        edit: '/payment-methods/edit'
    },
    supplier: {
        list: '/suppliers/list',
        add: '/suppliers/add',
        edit: '/suppliers/edit'
    },
    delivery_company: {
        list: '/delivery/companies/list',
        add: '/delivery/companies/add',
        edit: '/delivery/companies/edit'
    },
    delivery_discount: {
        list: '/delivery/discounts/list',
        add: '/delivery/discounts/add',
        edit: '/delivery/discounts/edit'
    },
    user_group: {
        list: '/user-management/groups/list',
        add: '/user-management/groups/add',
        edit: '/user-management/groups/edit'
    },
    user: {
        list: '/user-management/users/list',
        add: '/user-management/users/add',
        edit: '/user-management/users/edit'
    },
    permission: {
        list: '/user-management/permissions/list',
        edit: '/user-management/permissions/edit',
        dashboard: '/user-management/permissions/dashboard'
    },
    invoice: {
        list: '/purchases/invoices/list',
        add: '/purchases/invoices/add',
        edit: '/purchases/invoices/edit'
    },
    input_voucher: {
        list: '/purchases/input-vouchers/list',
        add: '/purchases/input-vouchers/add',
        edit: '/purchases/input-vouchers/edit'
    },
    output_voucher: {
        list: '/purchases/output-vouchers/list',
        add: '/purchases/output-vouchers/add',
        edit: '/purchases/output-vouchers/edit'
    },
    transfer_voucher: {
        list: '/purchases/transfer-vouchers/list',
        add: '/purchases/transfer-vouchers/add',
        edit: '/purchases/transfer-vouchers/edit'
    },
    purchase_order: {
        list: '/purchases/purchase-orders/list',
        add: '/purchases/purchase-orders/add',
        edit: '/purchases/purchase-orders/edit'
    },
    provide_voucher: {
        list: '/purchases/provide-vouchers/list',
        add: '/purchases/provide-vouchers/add',
        edit: '/purchases/provide-vouchers/edit'
    },
    recieving_voucher: {
        list: '/purchases/recieving-vouchers/list',
        add: '/purchases/recieving-vouchers/add',
        edit: '/purchases/recieving-vouchers/edit'
    },
    reports: {
        fullSales: '/reports/full-sales',
        salesCategory: '/reports/sales-category',
        salesItems: '/reports/sales-items',
        salesCashier: '/reports/sales-cashier',
        bestSellerItems: '/reports/best-seller-items',
        bestSellerCategory: '/reports/best-seller-category',
        salesByDays: '/reports/sales-by-days',
        salesByHours: '/reports/sales-by-hours',
        salesmanSales: '/reports/salesman-sales',
        returnInvoices: '/reports/return-invoices',
        returnItems: '/reports/return-items',
        invoicesByDate: '/reports/invoices-by-date',
        itemTransaction: '/reports/item-transaction',
        inventoryStatement: '/reports/inventory-statement',
        dailyProfit: '/reports/daily-profit',
        itemsProfits: '/reports/items-profits',
        itemSalesTransaction: '/reports/item-sales-transaction',
        fullSalesWithDetails: '/reports/full-sales-with-details'
    },
}



export const longCacheTime = 3500;
export const shortCacheTime = 1000;


export const menuList = [

    {
        label: AppStrings.main_menu,
        icon: faList,
        subActions: [
            {
                label: AppStrings.branches,
                icon: faShuffle,
                type: 'unExpanded',
                subHref: routes.branch.add,
                href: routes.branch.list,
                subHrefEdit: routes.branch.edit
            },

            {
                label: AppStrings.units_of_measurement,
                icon: faBalanceScale,
                type: 'unExpanded',
                subHref: routes.unit.add,
                href: routes.unit.list,
                subHrefEdit: routes.unit.edit
            },

            {
                label: AppStrings.offers,
                icon: faStar,
                type: 'unExpanded',
                subHref: routes.offer.add,
                href: routes.offer.list,
                subHrefEdit: routes.offer.edit
            },
            {
                label: AppStrings.discount_types,
                icon: faPercent,
                type: 'unExpanded',
                subHref: routes.discountType.add,
                href: routes.discountType.list,
                subHrefEdit: routes.discountType.edit
            },
            {
                label: AppStrings.taxes,
                icon: faUsd,
                type: 'unExpanded',
                subHref: routes.tax.add,
                href: routes.tax.list,
                subHrefEdit: routes.tax.edit
            },
            {
                label: AppStrings.currencies,
                icon: faMoneyBill,
                type: 'unExpanded',
                subHref: routes.currency.add,
                href: routes.currency.list,
                subHrefEdit: routes.currency.edit
            },
            {
                label: AppStrings.payment_methods,
                icon: faCreditCard,
                type: 'unExpanded',
                subHref: routes.paymentMethod.add,
                href: routes.paymentMethod.list,
                subHrefEdit: routes.paymentMethod.edit
            },

        ]
    },
    {
        label: AppStrings.materials_list,
        icon: faBarcode,
        subActions: [
        
            {
                label: AppStrings.categories,
                icon: faWindowRestore,
                type: 'unExpanded',
                subHref: routes.category.add,
                href: routes.category.list,
                subHrefEdit: routes.category.edit
            },
                {
                label: AppStrings.readyProducts,
                icon: faBarcode,
                type: 'unExpanded',
                subHref: routes.product.add,
                href: routes.product.list,
                subHrefEdit: routes.product.edit
            },
                {
                label: AppStrings.compositeComponents,
                icon: faBarcode,
                type: 'unExpanded',
                href: routes.product.compositeComponents,
                 subHref: routes.product.compositeProductAdd,
                subHrefEdit: routes.product.compositeComponentsEdit || routes.product.compositeComponentsAdd
            },
            // {
            //     label: AppStrings.prices_and_costs,
            //     icon: faMoneyBill1Wave,
            //     type: 'unExpanded',
            //     href: routes.product.pricesAndCosts
            // }
        ]
    },
    {
        label: AppStrings.purchases_and_warehouses,
        icon: faWarehouse,
        subActions: [
            {
                label: AppStrings.suppliers,
                icon: faVcard,
                type: 'unExpanded',
                href: routes.supplier.list,
                subHref: routes.supplier.add,
                subHrefEdit: routes.supplier.edit
            },
            // {
            //     label: AppStrings.purchase_order,
            //     icon: faTruck,
            //     type: 'unExpanded',
            //     href: routes.purchase_order.list,
            //     subHref: routes.purchase_order.add,
            // },
            {
                label: AppStrings.purchase_invoices,
                icon: faFileInvoice,
                type: 'unExpanded',
                href: routes.invoice.list,
                subHref: routes.invoice.add,
                subHrefEdit: routes.invoice.edit
            },
            {
                label: AppStrings.input_vouchers,
                icon: faTruck,
                type: 'unExpanded',
                href: routes.input_voucher.list,
                subHref: routes.input_voucher.add,
                subHrefEdit: routes.input_voucher.edit
            },
            {
                label: AppStrings.output_vouchers,
                icon: faTruck,
                type: 'unExpanded',
                href: routes.output_voucher.list,
                subHref: routes.output_voucher.add,
                subHrefEdit: routes.output_voucher.edit
            },
            {
                label: AppStrings.transfer_vouchers,
                icon: faTruck,
                type: 'unExpanded',
                href: routes.transfer_voucher.list,
                subHref: routes.transfer_voucher.add,
                subHrefEdit: routes.transfer_voucher.edit,
            },

            // {
            //     label: AppStrings.provide_voucher,
            //     icon: faTruck,
            //     type: 'unExpanded',
            //     href: routes.provide_voucher.list,
            //     subHref: routes.provide_voucher.add,
            // },
            // {
            //     label: AppStrings.recieving_voucher,
            //     icon: faTruck,
            //     type: 'unExpanded',
            //     href: routes.recieving_voucher.list,
            //     subHref: routes.recieving_voucher.add,
            // },
        ]
    },
    // {
    //     label: AppStrings.delivery_companies,
    //     icon: faCar,
    //     subActions: [
    //         {
    //             label: AppStrings.define_companies,
    //             icon: faCar,
    //             type: 'unExpanded',
    //             href: routes.delivery_company.list,
    //             subHref: routes.delivery_company.add,
    //             // subActions: [{ label: AppStrings.list, href: routes.delivery_company.list },
    //             // { label: AppStrings.add, href: routes.delivery_company.add },
    //             // ]
    //         },
    //         {
    //             label: AppStrings.delivery_discounts,
    //             icon: faCar,
    //             type: 'unExpanded',
    //             href: routes.delivery_discount.list,
    //             subHref: routes.delivery_discount.add,
    //             // subActions: [
    //             //     { label: AppStrings.list, href: routes.delivery_discount.list },
    //             //     { label: AppStrings.add, href: routes.delivery_discount.add },
    //             // ]
    //         }
    //     ]
    // },
    {
        label: AppStrings.user_management,
        icon: faUser,
        subActions: [
            {
                label: AppStrings.user_groups,
                icon: faAddressBook,
                type: 'unExpanded',
                href: routes.user_group.list,
                subHref: routes.user_group.add,
                subHrefEdit: routes.user_group.edit,
                // subActions: [
                //     { label: AppStrings.list, href: routes.user_group.list },
                //     { label: AppStrings.add, href: routes.user_group.add },
                // ]
            },
            {
                label: AppStrings.users,
                icon: faUser,
                type: 'unExpanded',
                href: routes.user.list,
                subHref: routes.user.add,
                subHrefEdit: routes.user.edit,
                // subActions: [
                //     { label: AppStrings.list, href: routes.user.list },
                //     { label: AppStrings.add, href: routes.user.add },
                // ]
            },
            {
                label: AppStrings.user_permissions,
                icon: faUserLock,
                type: 'unExpanded',
                href: routes.permission.list,
                subHrefEdit: routes.permission.edit,
            },
               {
                label: AppStrings.dashboard_permissions,
                icon: faDashboard,
                type: 'unExpanded',
                href: routes.permission.dashboard,
            }
        ]
    },
    {
        label: AppStrings.reports,
        icon: faBarChart,
        subActions: [
            {
                label: AppStrings.invoices_by_date,
                icon: faReceipt,
                href: routes.reports.invoicesByDate,
                type: 'unExpanded',
            },
            {
                label: AppStrings.sales_category,
                icon: faChartPie,
                href: routes.reports.salesCategory,
                type: 'unExpanded',
            },
            {
                label: AppStrings.sales_items,
                icon: faList,
                href: routes.reports.salesItems,
                type: 'unExpanded',
            },
            {
                label: AppStrings.full_sales,
                icon: faChartLine,
                href: routes.reports.fullSales,
                type: 'unExpanded',
            },
            {
                label: AppStrings.full_sales_with_details,
                icon: faList,
                href: routes.reports.fullSalesWithDetails,
                type: 'unExpanded',
            },
            {
                label: AppStrings.return_invoices,
                icon: faReceipt,
                href: routes.reports.returnInvoices,
                type: 'unExpanded',
            },
            {
                label: AppStrings.return_items,
                icon: faReceipt,
                href: routes.reports.returnItems,
                type: 'unExpanded',
            },
            {
                label: AppStrings.item_transaction,
                icon: faList,
                href: routes.reports.itemTransaction,
                type: 'unExpanded',
            },
            {
                label: AppStrings.inventory_statement,
                icon: faWarehouse,
                href: routes.reports.inventoryStatement,
                type: 'unExpanded',
            },
            {
                label: AppStrings.daily_profit,
                icon: faChartLine,
                href: routes.reports.dailyProfit,
                type: 'unExpanded',
            },
            {
                label: AppStrings.items_profits,
                icon: faChartPie,
                href: routes.reports.itemsProfits,
                type: 'unExpanded',
            },
        ]
    },
];


export const defaultProductValues = {
    Discountable: true,
    IsService: false,
    IsActive: true,
    Saleable: true,
    Taxable: true,
    TaxPercentage: 0,
    MinQty: 0,
    Icon: 'لا يوجد صورة',
}

export const defaultVoucherTypes = {
    invoice: 11,
    inputVoucher: 1,
    outputVoucher: 2,
    transferVoucher: -1,
    purchaseOrder: 14
}

export const defaultInvoiceItem = {
    discount: 0,
    discountPer: 0,
    tax: 0,
    TaxPercentage: 0,
    PriceIncludeTax: false,
    Note: ""
}


export const useDefaultPriceCategory = () => {
    const { t } = useTranslation()
    return (
        [
            {
                label: t(AppStrings.price1),
                value: 1
            },
            {
                label: t(AppStrings.price2),
                value: 2
            },
            {
                label: t(AppStrings.price3),
                value: 3
            },
            {
                label: t(AppStrings.price4),
                value: 4
            }
        ]
    )
}

export const useDefaultOutputType = () => {
    const { t } = useTranslation()
    return (
        [
            {
                label: t(AppStrings.normal_output),
                value: "-1"
            },
            {
                label: t(AppStrings.damaged),
                value: "1"
            },
        ]
    )
}


export const permissionsDefaultValues = {
    "0101": false,
    "0102": false,
    "0103": false,
    "0104": false,
    "0105": false,
    "0106": false,
    "0107": false,
    "0108": false,
    "0109": false,
    "0110": false,
    "0111": false,
    "0112": false,
    "0113": false,
    "0114": false,
    "0115": false,
    "0116": false,
    "0117": false,
    "0118": false,
    "0119": false,
    "0120": false,
    "0121": false,
    "0122": false,
    "0123": false,
}
















