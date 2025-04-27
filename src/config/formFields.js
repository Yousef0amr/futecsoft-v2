import AppStrings from "./appStrings";


export const productCheckFormFields = [
    { name: 'Discountable', label: AppStrings.discountable, required: false, type: 'check' },
    { name: 'IsService', label: AppStrings.isService, required: false, type: 'check' },
    { name: 'IsActive', label: AppStrings.isActive, required: false, type: 'check' },
    { name: 'Saleable', label: AppStrings.saleable, required: false, type: 'check' },
    { name: 'Taxable', label: AppStrings.taxable, required: false, type: 'check' },
];

export const productPriceFormFields = [
    { name: 'Price', label: AppStrings.price, required: true, type: 'number' },
    { name: 'Price2', label: AppStrings.price2, required: false, type: 'number' },
    { name: 'Price3', label: AppStrings.price3, required: false, type: 'number' },
    { name: 'Price4', label: AppStrings.price4, required: false, type: 'number' },
];
export const productImageField = {
    name: 'Icon',
    required: false,
};

export const productFormFields = [
    { name: 'Id', label: AppStrings.productId, required: false, type: 'number', disabled: true },
    { name: 'NameAr', label: AppStrings.productNameAr, required: true, type: 'text' },
    { name: 'NameEn', label: AppStrings.productNameEn, required: true, type: 'text' },
];

export const productSelectFormFields = [
    { name: 'Warehouse', label: AppStrings.branch, required: true, multiple: true, options: [], type: 'select' },
    { name: 'Father', label: AppStrings.category, required: true, options: [], type: 'select' },
    { name: 'TaxPercentage', label: AppStrings.taxPercentage, required: false, options: [], type: 'select' },
];

export const productUnitsFormFields = [
    { name: 'ItemID', label: AppStrings.productId, required: true, disabled: true, type: 'number' },
    { name: 'UnitID ', label: AppStrings.unit, required: true, options: [], type: 'select' },
    { name: 'Barcode', label: AppStrings.barcode, required: false, type: 'text' },
    {
        name: 'Factor ', label: AppStrings.factor, required: true, type: 'number', disabled: true
    },
    {
        name: 'IsSmall', label: AppStrings.isSmallUnit, required: true, type: 'check', disabled: true
    },
];

export const productComponentsFormFields1 = [
    { name: 'Father', label: AppStrings.category, required: true, options: [], type: 'select' },
    { name: 'SubItem', label: AppStrings.materials, required: true, options: [], type: 'select' },
    { name: 'Unit', label: AppStrings.unit, required: true, options: [], type: 'select' },
];


export const productTypeFormFields = [
    { name: 'Raw', label: AppStrings.raw_materials, type: 'check' },
    { name: 'Standard', label: AppStrings.finished_materials, type: 'check' },
    { name: 'Composite', label: AppStrings.assembled_materials, type: 'check' },
]


export const branchFormFields = [
    { name: 'BranchId', label: AppStrings.branchId, required: true, type: 'number', disabled: true },
    { name: 'TaxId', label: AppStrings.taxId, required: false, type: 'number' },
    { name: 'BranchNameAr', label: AppStrings.branchNameAr, required: true, type: 'text' },
    { name: 'BranchNameEn', label: AppStrings.branchNameEn, required: true, type: 'text' },
    { name: 'Phones', label: AppStrings.phones, required: false, type: 'number' },
    { name: 'Mobiles', label: AppStrings.mobiles, required: false, type: 'number' },
    { name: 'Website', label: AppStrings.website, required: false, type: 'text' },
    { name: 'Email', label: AppStrings.email, required: false, type: 'email' },
    { name: 'Address', label: AppStrings.address, required: false, type: 'text' },
    { name: 'City', label: AppStrings.city, required: false, type: 'text' },
    { name: 'Street', label: AppStrings.street, required: false, type: 'text' },
];

export const pricesAndCostsFormFields = [
    { name: 'Warehouse', label: AppStrings.branch, required: true, options: [], type: 'select' },
    { name: 'CateID', label: AppStrings.category, required: true, options: [], type: 'select' },
];

export const categoryFormFields = [
    { name: 'Id', label: AppStrings.categoryId, required: true, type: 'number', disabled: true },
    { name: 'Warehouse', label: AppStrings.branch, required: true, multiple: true, options: [], type: 'select' },
    { name: 'NameAr', label: AppStrings.categoryNameAr, required: true, type: 'text' },
    { name: 'NameEn', label: AppStrings.categoryNameEn, required: true, type: 'text' },

    { name: 'Saleable', label: AppStrings.saleable, required: false, type: 'check' },
    { name: 'IsActive', label: AppStrings.isActive, required: false, type: 'check' },
]

export const unitsFormFields = [
    { name: 'UnitID', label: AppStrings.unitId, required: true, type: 'number', disabled: true },
    { name: 'Unit_AR', label: AppStrings.unitNameAr, required: true, type: 'text' },
    { name: 'Unit_EN', label: AppStrings.unitNameEn, required: true, type: 'text' },
    { name: 'Active', label: AppStrings.isActive, type: 'check' },
]


export const flavorsFormFields = [
    { name: 'FlavorNo', label: AppStrings.flavorId, required: true, type: 'number', disabled: true },
    { name: 'Price', label: AppStrings.price, required: true, type: 'text' },
    { name: 'FlavorAR', label: AppStrings.flavorNameAr, required: true, type: 'text' },
    { name: 'FlavorEN', label: AppStrings.flavorNameEn, required: true, type: 'text' },


    { name: 'WareHouse', label: AppStrings.branch, required: true, multiple: true, options: [], type: 'select' },
    { name: 'Category', label: AppStrings.category, required: true, multiple: true, options: [], type: 'select' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]




export const offersFormFields = [
    { name: 'OfferId', label: AppStrings.offerId, required: true, type: 'number', disabled: true },
    { name: 'Branch', label: AppStrings.branch, required: true, multiple: true, options: [], type: 'select' },
    { name: 'FromDate', label: AppStrings.from_date, required: true, type: 'date' },
    { name: 'ToDate', label: AppStrings.to_date, required: true, type: 'date' },

    { name: 'Product', label: AppStrings.product, required: true, options: [], type: 'select' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]

export const priceOfferFormFields = [
    { name: 'Price', label: AppStrings.price, required: false, type: 'number' },
]

export const qtyOfferFormFields = [
    ...priceOfferFormFields,
    { name: 'Qty', label: AppStrings.quantity, required: false, type: 'number' },
]

export const extraOfferFormFields = [
    { name: 'Qty', label: AppStrings.quantity, required: false, type: 'number' },
    { name: 'ExtraProduct', label: AppStrings.free_product, required: false, options: [], type: 'select' },
]

export const offerTypeFormFields = [
    { name: 'PriceOffer', label: AppStrings.price_offer, type: 'check' },
    { name: 'QtyOffer', label: AppStrings.quantity, type: 'check' },
    { name: 'ExtraOffer', label: AppStrings.free_product, type: 'check' },
]



export const discountsFormFields = [
    { name: 'Serial', label: AppStrings.discountId, required: true, type: 'number', disabled: true },
    { name: 'DiscountPercentage', label: AppStrings.discount_percentage, required: true, type: 'number' },
    { name: 'DiscountTypeAR', label: AppStrings.discount_type_ar, required: true, type: 'text' },
    { name: 'DiscountTypeEN', label: AppStrings.discount_type_en, required: true, type: 'text' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]

export const taxsFormFields = [
    { name: 'TaxId', label: AppStrings.tax_type_id, required: true, type: 'number', disabled: true },
    { name: 'TaxPercentage', label: AppStrings.taxPercentage, required: true, type: 'number' },
    { name: 'TaxAr', label: AppStrings.tax_type_ar, required: true, type: 'text' },
    { name: 'TaxEn', label: AppStrings.tax_type_en, required: true, type: 'text' },
    { name: 'TaxIsActive', label: AppStrings.isActive, type: 'check' },
    { name: 'IsDefault', label: AppStrings.isDefault, type: 'check' },
]



export const currenciesFormFields = [
    { name: 'CurrencyId', label: AppStrings.currencyId, required: true, type: 'text' },
    { name: 'IDigits', label: AppStrings.iDigits, required: true, type: 'number' },
    { name: 'IsDefault', label: AppStrings.isDefault, type: 'check' },
]



export const paymentTypesFormFields = [
    { name: 'Ptype', label: AppStrings.paymentTypeId, required: true, type: 'number', disabled: true },
    { name: 'Commissions', label: AppStrings.commissions, required: false, type: 'number' },
    { name: 'PaymentArDesc', label: AppStrings.paymentTypeAr, required: true, type: 'text' },
    { name: 'PaymentEnDesc', label: AppStrings.paymentTypeEn, required: true, type: 'text' },

    { name: 'CompanyID', label: AppStrings.deliveryCompany, options: [], required: false, type: 'select' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]


export const paymentTypeFormFields = [
    { name: 'CashMoney', label: AppStrings.cashMoney, type: 'check' },
    { name: 'IsCredit', label: AppStrings.isCredit, type: 'check' },
]




export const suppliersFormFields = [
    { name: 'SupplierId', label: AppStrings.supplierId, required: true, type: 'number', disabled: true },
    { name: 'SupplierCompany', label: AppStrings.supplierCompany, required: true, type: 'text' },
    { name: 'ContactName', label: AppStrings.contactName, required: true, type: 'text' },
    { name: 'Email', label: AppStrings.email, required: false, type: 'email' },
    { name: 'Phones', label: AppStrings.phones, required: false, type: 'text' },
    { name: 'Mobiles', label: AppStrings.mobiles, required: false, type: 'text' },
    { name: 'Warehouse', label: AppStrings.branch, options: [], multiple: true, required: true, type: 'select' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]


export const deliveryCompaniesFormFields = [
    { name: 'CompanyID', label: AppStrings.deliveryCompanyId, required: true, type: 'number', disabled: true },
    { name: 'CompanyName', label: AppStrings.deliveryCompanyName, required: true, type: 'text' },
    { name: 'Email', label: AppStrings.email, required: false, type: 'email' },
    { name: 'Phone', label: AppStrings.phones, required: false, type: 'text' },
    { name: 'percent', label: AppStrings.deliveryPercentage, required: true, type: 'number' },
    { name: 'PriceCategory', label: AppStrings.priceCategory, options: [], required: true, type: 'select' },
    { name: 'Active', label: AppStrings.isActive, type: 'check' },
]

export const deliveryDiscountFormFields = [
    { name: 'LineID', label: AppStrings.discountId, required: true, type: 'number', disabled: true },
    { name: 'CompanyID', label: AppStrings.deliveryCompany, options: [], required: true, type: 'select' },
    { name: 'FromDate', label: AppStrings.from_date, required: true, type: 'date' },
    { name: 'ToDate', label: AppStrings.to_date, required: true, type: 'date' },
    { name: 'DiscountValue', label: AppStrings.discount_percentage, required: false, type: 'number' },
    { name: 'BranchID', label: AppStrings.branch, required: true, multiple: true, options: [], type: 'select' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]



export const userGroupsFormFields = [
    { name: 'GroupId', label: AppStrings.groupId, required: true, type: 'number', disabled: true },
    { name: 'GroupArName', label: AppStrings.group_name_ar, required: true, type: 'text' },
    { name: 'GroupEnName', label: AppStrings.group_name_en, required: true, type: 'text' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]

export const usersFormFields = [
    { name: 'UserNo', label: AppStrings.userId, required: true, type: 'number', disabled: true },
    { name: 'UserName', label: AppStrings.username, required: true, type: 'text' },
    { name: 'UserPassword', label: AppStrings.password, required: true, type: 'password' },
    { name: 'GroupType', label: AppStrings.user_group, required: true, options: [], type: 'select' },
    { name: 'Branch', label: AppStrings.branch, required: true, multiple: true, options: [], type: 'select' },
    { name: 'IsActive', label: AppStrings.isActive, type: 'check' },
]


export const permissionsFormFields = [
    { name: '0101', label: AppStrings.permission0101, type: 'check' },
    { name: '0102', label: AppStrings.permission0102, type: 'check' },
    { name: '0103', label: AppStrings.permission0103, type: 'check' },
    { name: '0104', label: AppStrings.permission0104, type: 'check' },
    { name: '0105', label: AppStrings.permission0105, type: 'check' },
    { name: '0106', label: AppStrings.permission0106, type: 'check' },
    { name: '0107', label: AppStrings.permission0107, type: 'check' },
    { name: '0108', label: AppStrings.permission0108, type: 'check' },
    { name: '0109', label: AppStrings.permission0109, type: 'check' },
    { name: '0110', label: AppStrings.permission0110, type: 'check' },
    { name: '0111', label: AppStrings.permission0111, type: 'check' },
    { name: '0112', label: AppStrings.permission0112, type: 'check' },
    { name: '0113', label: AppStrings.permission0113, type: 'check' },
    { name: '0114', label: AppStrings.permission0114, type: 'check' },
    { name: '0115', label: AppStrings.permission0115, type: 'check' },
    { name: '0116', label: AppStrings.permission0116, type: 'check' },
    { name: '0117', label: AppStrings.permission0117, type: 'check' },
    { name: '0118', label: AppStrings.permission0118, type: 'check' },
    { name: '0119', label: AppStrings.permission0119, type: 'check' },
    { name: '0120', label: AppStrings.permission0120, type: 'check' },
    { name: '0121', label: AppStrings.permission0121, type: 'check' },
    { name: '0122', label: AppStrings.permission0122, type: 'check' },
    { name: '0123', label: AppStrings.permission0123, type: 'check' },
];


export const invoiceInfFormFields = [
    { name: 'DocID', label: AppStrings.invoiceId, required: true, type: 'number', disabled: true },
    { name: 'InvoiceNo', label: AppStrings.invoiceNo, required: false, type: 'text' },
    { name: 'DocDate', label: AppStrings.date, required: false, type: 'date' },
    { name: 'Warehouse', label: AppStrings.branch, required: false, options: [], type: 'select' },
    { name: 'Supplier', label: AppStrings.suppliers, required: false, options: [], type: 'select' },
    { name: 'PayType', label: AppStrings.paymentType, required: false, options: [], type: 'select' },
    { name: 'Note', label: AppStrings.note, required: false, type: 'text' },
]

export const invoiceItemsFormFields = [
    { name: 'ItemId', label: AppStrings.product, required: true, options: [], type: 'select' },
    { name: 'Unit', label: AppStrings.unit, required: true, options: [], type: 'select' },
    { name: 'Qty', label: AppStrings.quantity, required: true, type: 'number' },
    { name: 'UnitPrice', label: AppStrings.price, required: true, type: 'number' },
    { name: 'ItemDiscountPercentage', label: AppStrings.discount_percentage, required: false, type: 'number' },
    { name: 'ItemDiscount', label: AppStrings.taxValue, required: false, type: 'number' },
]


export const voucherInputFormFields = [
    { name: 'DocID', label: AppStrings.voucherId, required: true, type: 'number', disabled: true },
    { name: 'DocDate', label: AppStrings.date, required: false, type: 'date' },
    { name: 'Note', label: AppStrings.note, required: false, type: 'text' },
    { name: 'Warehouse', label: AppStrings.branch, required: false, options: [], type: 'select' },
]

export const voucherInputItemsFormFields = [
    { name: 'ItemId', label: AppStrings.product, required: true, options: [], type: 'select' },
    { name: 'Unit', label: AppStrings.unit, required: true, options: [], type: 'select' },
    { name: 'Qty', label: AppStrings.quantity, required: true, type: 'number' },
    { name: 'UnitPrice', label: AppStrings.price, required: true, type: 'number' },
]



export const voucherOutputFormFields = [
    { name: 'DocNo', label: AppStrings.voucherId, required: true, type: 'number', disabled: true },
    { name: 'DocDate', label: AppStrings.date, required: false, type: 'date' },
    { name: 'Note', label: AppStrings.note, required: false, type: 'text' },
    { name: 'Warehouse', label: AppStrings.branch, required: false, options: [], type: 'select' },
    { name: 'OutputType', label: AppStrings.output_type, required: false, options: [], type: 'select' },
]


export const voucherOutputItemsFormFields = [
    { name: 'ItemId', label: AppStrings.product, required: true, options: [], type: 'select' },
    { name: 'Unit', label: AppStrings.unit, required: true, options: [], type: 'select' },
    { name: 'Qty', label: AppStrings.quantity, required: true, type: 'number' },
    { name: 'Cost', label: AppStrings.price, required: true, type: 'number' },
]



export const voucherTransferFormFields = [
    { name: 'DocNo', label: AppStrings.invoiceId, required: true, type: 'number', disabled: true },
    { name: 'TransferNo', label: AppStrings.voucherId, required: false, type: 'text' },
    { name: 'DocDate', label: AppStrings.date, required: false, type: 'date' },
    { name: 'Note', label: AppStrings.note, required: false, type: 'text' },
    { name: 'FromWarehouse', label: AppStrings.from_branch, required: false, options: [], type: 'select' },
    { name: 'ToWarehouse', label: AppStrings.to_branch, required: false, options: [], type: 'select' },
]


export const voucherTransferItemsFormFields = [
    { name: 'ItemID', label: AppStrings.product, required: true, options: [], type: 'select' },
    { name: 'Unit', label: AppStrings.unit, required: true, options: [], type: 'select' },
    { name: 'Qty', label: AppStrings.quantity, required: true, type: 'number' },
    { name: 'Cost', label: AppStrings.price, required: true, type: 'number' },
]


export const purchaseOrderFormFields = [
    { name: 'DocID', label: AppStrings.invoiceId, required: true, type: 'number', disabled: true },
    { name: 'LineDate', label: AppStrings.date, required: false, type: 'date' },
    { name: 'Status', label: AppStrings.status, required: false, type: 'text' },
    { name: 'Note', label: AppStrings.note, required: false, type: 'text' },
    { name: 'Warehouse', label: AppStrings.from_branch, required: false, options: [], type: 'select' },
]


export const voucherRecievingFormFields = [
    { name: 'DocID', label: AppStrings.voucherId, required: true, type: 'number', disabled: true },
    { name: 'SourceID', label: AppStrings.source_id, required: false, type: 'text' },
    { name: 'DocDate', label: AppStrings.date, required: false, type: 'date' },
    { name: 'Sender', label: AppStrings.sender, required: false, type: 'text' },
    { name: 'Reciever', label: AppStrings.reciever, required: false, type: 'text' },
    { name: 'FromWarehouse', label: AppStrings.from_branch, required: false, options: [], type: 'select' },
    { name: 'Warehouse', label: AppStrings.to_branch, required: false, options: [], type: 'select' },
    { name: 'Note', label: AppStrings.note, required: false, type: 'text' },
]


export const voucherProvideFormFields = [
    { name: 'ReqNo', label: AppStrings.invoiceId, required: true, type: 'number', disabled: true },
    { name: 'ByUser', label: AppStrings.createdBy, required: false, type: 'text' },
    { name: 'ReqDate', label: AppStrings.date, required: false, type: 'date' },
    { name: 'Notes', label: AppStrings.note, required: false, type: 'text' },

    { name: 'FromDate', label: AppStrings.from_date, required: false, type: 'date' },
    { name: 'ToDate', label: AppStrings.to_date, required: false, type: 'date' },
    { name: 'DayName', label: AppStrings.day_name, type: 'text' },
    { name: 'DiffRate', label: AppStrings.diff_rate, type: 'text' },


    { name: 'FromWarehouse', label: AppStrings.from_branch, required: false, options: [], type: 'select' },
    { name: 'Warehouse', label: AppStrings.from_branch, required: false, options: [], type: 'select' },

    { name: 'Posted', label: AppStrings.posted, type: 'check' },
    { name: 'Approved', label: AppStrings.approved, type: 'check' },
    { name: 'AllDays', label: AppStrings.all_days, type: 'check' },
    { name: 'Provided', label: AppStrings.provided, type: 'check' },
    { name: 'Manual', label: AppStrings.manual, required: false, type: 'check' },

]


export const reportFormFields = [
    { name: 'FromDate', label: AppStrings.from_date, required: true, type: 'date' },
    { name: 'ToDate', label: AppStrings.to_date, required: true, type: 'date' },
    { name: 'Warehouse', label: AppStrings.branch, required: true, options: [], type: 'select' },
]

export const getFullSalesReportFormFields = [
    ...reportFormFields,
    { name: 'StationID', label: AppStrings.point_of_sale, required: true, options: [], type: 'select' },
]

export const getSalesByCategoryOrItemReportFormFields = [
    ...getFullSalesReportFormFields,
    { name: 'FatherID', label: AppStrings.category, required: true, options: [], type: 'select' },
]

export const getItemProfitReportFormFields = [
    ...reportFormFields,
    { name: 'FatherID', label: AppStrings.category, required: true, options: [], type: 'select' },
]

export const getSalesByCashierReportFormFields = [
    ...getFullSalesReportFormFields,
    { name: 'CashierNo', label: AppStrings.cashier, required: false, options: [], type: 'select' },
    { name: 'PayType', label: AppStrings.cashier, required: true, options: [], type: 'select' },
]

export const getReturnByInvoiceReportFormFields = [
    ...getFullSalesReportFormFields,
    { name: 'PayType', label: AppStrings.paymentType, required: true, options: [], type: 'select' },
]


export const getItemTranscationReportFormFields = [
    ...reportFormFields,
    { name: 'ItemID', label: AppStrings.product, required: true, options: [], type: 'select' },
]

export const getInventoryReportFormFields = [
    { name: 'ToDate', label: AppStrings.to_date, required: true, type: 'date' },
    { name: 'CateID', label: AppStrings.category, required: true, options: [], type: 'select' },
    { name: 'Warehouse', label: AppStrings.branch, required: true, options: [], type: 'select' },
]

export const getDailyProfitReportFormFields = [
    { name: 'SalesDate', label: AppStrings.date, required: true, type: 'date' },
    { name: 'Warehouse', label: AppStrings.branch, required: true, options: [], type: 'select' },
]


























