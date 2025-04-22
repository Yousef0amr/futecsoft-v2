import AppStrings from "./../config/appStrings";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Source } from "@mui/icons-material";


const MainMenuValidators = () => {
    const { t } = useTranslation();


    const branchSchemaValidator = {
        BranchId: yup.string().optional(),
        BranchNameAr: yup.string().required(t(AppStrings.branchNameAr_required)),
        BranchNameEn: yup.string().required(t(AppStrings.branchNameEn_required)),
        TaxId: yup.string().optional(),
        Phones: yup.string().optional(),
        Mobiles: yup.string().optional(),
        Website: yup.string().optional(),
        Email: yup.string().optional(),
        Address: yup.string().optional(),
        City: yup.string().optional(),
        Street: yup.string().optional(),
    }


    const productSchemaValidator = {
        Id: yup.string().required(t(AppStrings.branchId_required)).nullable(),
        NameAr: yup.string().required(t(AppStrings.productNameAr_required)).nullable(),
        NameEn: yup.string().required(t(AppStrings.productNameEn_required)).nullable(),
        Father: yup.string().required(t(AppStrings.category_required)).nullable(),
        Warehouse: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
        TaxPercentage: yup.string().optional(),
        Discountable: yup.boolean().optional(),
        IsService: yup.boolean().optional(),
        IsActive: yup.boolean().optional(),
        Saleable: yup.boolean().optional(),
        Taxable: yup.boolean().optional(),
        Icon: yup.string().nullable(),
    }

    const componentSchemaValidator = {
        ItemID: yup.string().required().nullable(),
        FoodQty: yup.string().required(t(AppStrings.quantity_required)).nullable(),
        SubItem: yup.string().required(t(AppStrings.product_required)).nullable(),
        Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
        Name: yup.string().optional(),
        Note: yup.string().optional(),
        Father: yup.string().optional(),
    }



    const pricesAndCostsSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        CateID: yup.string().required(t(AppStrings.category_required)).nullable(),
    }


    const categorySchemaValidator = {
        Id: yup.string().required(t(AppStrings.categoryId_required)).nullable(),
        NameAr: yup.string().required(t(AppStrings.categoryNameAr_required)).nullable(),
        NameEn: yup.string().required(t(AppStrings.categoryNameEn_required)).nullable(),
        Saleable: yup.boolean().optional(),
        Warehouse: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
        IsActive: yup.boolean().optional(),
    }

    const unitSchemaValidator = {
        UnitID: yup.string().required(t(AppStrings.unitId_required)).nullable(),
        Unit_AR: yup.string().required(t(AppStrings.unitNameAr_required)).nullable(),
        Unit_EN: yup.string().required(t(AppStrings.unitNameEn_required)).nullable(),
        Active: yup.boolean().optional(),
    }


    const flavorSchemaValidator = {
        FlavorNo: yup.string().required(t(AppStrings.flavorId_required)).nullable(),
        FlavorAR: yup.string().required(t(AppStrings.flavorNameAr_required)).nullable(),
        FlavorEN: yup.string().required(t(AppStrings.flavorNameEn_required)).nullable(),
        Price: yup.string().required(t(AppStrings.price_required)).nullable(),
        WareHouse: yup.array().min(1).required(t(AppStrings.branch_required)),
        Category: yup.array().min(1).required(t(AppStrings.category_required)),
        IsActive: yup.boolean().optional(),
    }

    const offerSchemaValidator = {
        OfferId: yup.string().required(t(AppStrings.offerId_required)).nullable(),
        Product: yup.string().required(t(AppStrings.product_required)).nullable(),
        FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
        Branch: yup.array().min(1).required(t(AppStrings.branch_required)),
        Price: yup.string().optional(),
        Qty: yup.string().optional(),
        ExtraProduct: yup.string().optional(),
        isActive: yup.boolean().optional(),
        PriceOffer: yup.boolean().optional(),
        QtyOffer: yup.boolean().optional(),
        ExtraOffer: yup.boolean().optional(),
    }





    const discountSchemaValidator = {
        Serial: yup.string().optional(),
        DiscountPercentage: yup.number().required(t(AppStrings.discount_percentage_required)).nullable(),
        DiscountTypeAR: yup.string().required(t(AppStrings.discount_type_ar_required)).nullable(),
        DiscountTypeEN: yup.string().required(t(AppStrings.discount_type_en_required)).nullable(),
        IsActive: yup.boolean().optional(),
    }


    const taxSchemaValidator = {
        TaxId: yup.string().required(t(AppStrings.taxId_required)).nullable(),
        TaxPercentage: yup.string().required(t(AppStrings.taxPercentage_required)).nullable(),
        TaxAr: yup.string().required(t(AppStrings.tax_type_ar_required)).nullable(),
        TaxEn: yup.string().required(t(AppStrings.tax_type_en_required)).nullable(),
        TaxIsActive: yup.boolean().optional(),
        IsDefault: yup.boolean().optional(),
    }

    const currencySchemaValidator = {
        CurrencyId: yup.string().required(t(AppStrings.currencyId_required)).nullable(),
        IDigits: yup.number().required(t(AppStrings.iDigits_required)).nullable(),
        IsDefault: yup.boolean().optional(),
    }


    const paymentTypesSchemaValidator = {
        Ptype: yup.string().required(t(AppStrings.paymentTypeId_required)).nullable(),
        PaymentArDesc: yup.string().required(t(AppStrings.paymentTypeAr_required)).nullable(),
        PaymentEnDesc: yup.string().required(t(AppStrings.paymentTypeEn_required)).nullable(),
        CompanyID: yup.string().nullable(),
        Commissions: yup.number().required(t(AppStrings.commissions_required)).nullable(),
        IsActive: yup.boolean().optional(),
        CashMoney: yup.boolean().optional(),
        IsCredit: yup.boolean().optional(),
    }



    const supplierSchemaValidator = {
        SupplierId: yup.number().required(t(AppStrings.supplierId_required)).nullable(),
        SupplierCompany: yup.string().required(t(AppStrings.supplierCompany_required)).nullable(),
        ContactName: yup.string().nullable(),
        Email: yup.string().optional(),
        Phones: yup.string().optional(),
        Mobiles: yup.string().optional(),
        Warehouse: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
        IsActive: yup.boolean().optional(),
    }

    const deliveryCompaniesSchemaValidator = {
        CompanyID: yup.string().required(t(AppStrings.deliveryCompanyId_required)).nullable(),
        CompanyName: yup.string().required(t(AppStrings.deliveryCompanyName_required)).nullable(),
        Email: yup.string().optional().nullable(),
        Phone: yup.string().optional().nullable(),
        percent: yup.number().required(t(AppStrings.deliveryPercentage_required)).nullable(),
        PriceCategory: yup.string().required(t(AppStrings.priceCategory_required)).nullable(),
        Active: yup.boolean().optional(),
    }

    const deliveryDiscountSchemaValidator = {
        LineID: yup.string().nullable(),
        CompanyID: yup.string().required(t(AppStrings.deliveryCompany_required)).nullable(),
        FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
        DiscountValue: yup.number().nullable(),
        BranchID: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
        IsActive: yup.boolean().optional(),
    }

    const userGroupSchemaValidator = {
        GroupId: yup.string().required(t(AppStrings.groupId_required)).nullable(),
        GroupArName: yup.string().required(t(AppStrings.group_name_ar_required)).nullable(),
        GroupEnName: yup.string().required(t(AppStrings.group_name_en_required)).nullable(),
        IsActive: yup.boolean().optional(),
    }

    const userSchemaValidator = {
        UserNo: yup.string().required(t(AppStrings.userId_required)).nullable(),
        UserName: yup.string().required(t(AppStrings.username_required)).nullable(),
        UserPassword: yup.string().required(t(AppStrings.password_required)).nullable(),
        GroupType: yup.string().required(t(AppStrings.user_group_required)).nullable(),
        Branch: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
        IsActive: yup.boolean().optional(),
    }

    const userPermissionsSchemaValidator = {
        UserNo: yup.string().required(t(AppStrings.userId_required)).nullable(),
        PermissionId: yup.string().required(t(AppStrings.username_required)).nullable(),
        WarehouseId: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
        Allow: yup.boolean().optional(),
    }


    const permissionSchemaValidator = {
        "0101": yup.boolean().optional(),
        "0102": yup.boolean().optional(),
        "0103": yup.boolean().optional(),
        "0104": yup.boolean().optional(),
        "0105": yup.boolean().optional(),
        "0106": yup.boolean().optional(),
        "0107": yup.boolean().optional(),
        "0108": yup.boolean().optional(),
        "0109": yup.boolean().optional(),
        "0110": yup.boolean().optional(),
        "0111": yup.boolean().optional(),
        "0112": yup.boolean().optional(),
        "0113": yup.boolean().optional(),
        "0114": yup.boolean().optional(),
        "0115": yup.boolean().optional(),
        "0116": yup.boolean().optional(),
        "0117": yup.boolean().optional(),
        "0118": yup.boolean().optional(),
        "0119": yup.boolean().optional(),
        "0120": yup.boolean().optional(),
        "0121": yup.boolean().optional(),
        "0122": yup.boolean().optional(),
        "0123": yup.boolean().optional(),
    }

    const invoiceSchemaValidator = {
        DocID: yup.string().required().nullable(),
        InvoiceNo: yup.string().optional(),
        DocDate: yup.string().optional(),
        Warehouse: yup.string().required(t(AppStrings.branch_required)),
        Supplier: yup.string().required(t(AppStrings.supplierId_required)),
        PayType: yup.string().required(t(AppStrings.paymentTypeId_required)),
        Note: yup.string().optional().nullable(),
        ItemId: yup.string().required(t(AppStrings.product_required)).nullable(),
        Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
        Qty: yup.number().required(t(AppStrings.quantity_required)),
        UnitPrice: yup.number().required(t(AppStrings.price_required)),
        ItemDiscountPercentage: yup.number().optional(),
        ItemDiscount: yup.number().optional(),
        TaxPercentage: yup.number().optional(),
        TaxExc: yup.boolean().optional(),
        Vtype: yup.number().required().nullable(),
        PriceIncludeTax: yup.boolean().optional(),
    }

    const invoiceUpdatedSchemaValidator = {
        DocID: yup.string().required().nullable(),
        InvoiceNo: yup.string().optional(),
        DocDate: yup.string().optional(),
        Warehouse: yup.string().required(t(AppStrings.branch_required)),
        Supplier: yup.string().required(t(AppStrings.supplierId_required)),
        PayType: yup.string().required(t(AppStrings.paymentTypeId_required)),
        Note: yup.string().optional().nullable(),
        TaxExc: yup.boolean().optional(),
        PriceIncludeTax: yup.boolean().optional(),
    }


    const voucherInputSchemaValidator = {
        DocID: yup.string().required().nullable(),
        Vtype: yup.number().required().nullable(),
        DocDate: yup.string().optional().nullable(),
        Note: yup.string().optional().nullable(),
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        ItemId: yup.string().required(t(AppStrings.product_required)).nullable(),
        Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
        Qty: yup.number().required(t(AppStrings.quantity_required)),
        UnitPrice: yup.number().required(t(AppStrings.price_required)),
    }

    const voucherInputUpdatedSchemaValidator = {
        DocID: yup.string().required().nullable(),
        Vtype: yup.number().required().nullable(),
        DocDate: yup.string().optional().nullable(),
        Note: yup.string().optional().nullable(),
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
    }

    const voucherOutputSchemaValidator = {
        DocNo: yup.string().required().nullable(),
        DocType: yup.number().required().nullable(),
        DocDate: yup.string().optional().nullable(),
        Note: yup.string().optional().nullable(),
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        OutputType: yup.string().required().nullable(),
        ItemId: yup.string().required(t(AppStrings.product_required)).nullable(),
        Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
        Qty: yup.number().required(t(AppStrings.quantity_required)),
        Cost: yup.number().required(t(AppStrings.price_required)),
    }

    const voucherOutputUpdatedSchemaValidator = {
        DocNo: yup.string().required().nullable(),
        DocType: yup.number().required().nullable(),
        DocDate: yup.string().optional().nullable(),
        Note: yup.string().optional().nullable(),
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        OutputType: yup.string().required().nullable(),
    }


    const voucherTransferSchemaValidator = {
        DocNo: yup.string().required().nullable(),
        TransferNo: yup.string().nullable(),
        DocDate: yup.string().optional().nullable(),
        Note: yup.string().optional().nullable(),
        FromWarehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        ToWarehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        ItemID: yup.string().required(t(AppStrings.product_required)).nullable(),
        Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
        Qty: yup.number().required(t(AppStrings.quantity_required)),
        Cost: yup.number().required(t(AppStrings.price_required)),
    }

    const voucherTransferUpdatedSchemaValidator = {
        DocNo: yup.string().required().nullable(),
        TransferNo: yup.string().nullable(),
        DocDate: yup.string().optional().nullable(),
        Note: yup.string().optional().nullable(),
        FromWarehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        ToWarehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
    }



    const invoiceByDateSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
    }


    const salesItemSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
        StationID: yup.string().optional().nullable(),
    }

    const returnByInvoiceSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
        StationID: yup.string().required(t(AppStrings.station_required)).nullable(),
        PayType: yup.string().required(t(AppStrings.paymentTypeId_required)).nullable(),
    }

    const ItemTransactionSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
        ItemID: yup.string().required(t(AppStrings.product_required)).nullable(),
    }

    const inventoryStatementSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        CateID: yup.string().required(t(AppStrings.categoryId_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
    }

    const dailyProfitSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        SalesDate: yup.string().required(t(AppStrings.date_required)).nullable(),
    }

    const itemsProfitsSchemaValidator = {
        Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
        FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
        ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
        FatherID: yup.string().required(t(AppStrings.categoryId_required)).nullable(),
    }

    const voucherReceivingSchemaValidator = {
        DocID: yup.string().required(t(AppStrings.voucherId)).nullable(),
        DocDate: yup.string().required(t(AppStrings.date_required)).nullable(),
        SourceID: yup.string().required(t(AppStrings.sourceId_required)).nullable(),
        Sender: yup.string().required(t(AppStrings.sender_required)).nullable(),
        Reciever: yup.string().required(t(AppStrings.reciever_required)).nullable(),
        FromWarehouse: yup.string().required(t(AppStrings.from_branch)).nullable(),
        Warehouse: yup.string().required(t(AppStrings.to_branch)).nullable(),
        Note: yup.string().optional(),
    }



    return {
        branchSchemaValidator,
        ItemTransactionSchemaValidator,
        productSchemaValidator,
        componentSchemaValidator,
        pricesAndCostsSchemaValidator,
        categorySchemaValidator,
        itemsProfitsSchemaValidator,
        unitSchemaValidator,
        flavorSchemaValidator,
        offerSchemaValidator,
        discountSchemaValidator,
        taxSchemaValidator,
        currencySchemaValidator,
        paymentTypesSchemaValidator,
        deliveryCompaniesSchemaValidator,
        supplierSchemaValidator,
        deliveryDiscountSchemaValidator,
        userGroupSchemaValidator,
        userSchemaValidator,
        userPermissionsSchemaValidator,
        inventoryStatementSchemaValidator,
        permissionSchemaValidator,
        invoiceSchemaValidator,
        invoiceUpdatedSchemaValidator,
        voucherInputSchemaValidator,
        voucherReceivingSchemaValidator,
        voucherInputUpdatedSchemaValidator,
        voucherOutputSchemaValidator,
        voucherOutputUpdatedSchemaValidator,
        voucherTransferSchemaValidator,
        voucherTransferUpdatedSchemaValidator,
        invoiceByDateSchemaValidator,
        salesItemSchemaValidator,
        returnByInvoiceSchemaValidator,
        dailyProfitSchemaValidator
    }
}


export default MainMenuValidators;


