import AppStrings from "./../config/appStrings";
import * as yup from "yup";
import { useTranslation } from "react-i18next";



const MainMenuValidators = () => {
      const { t } = useTranslation();


      const branchSchemaValidator = {
            BranchNameAr: yup.string().required(t(AppStrings.branchNameAr_required)),
            BranchNameEn: yup.string().required(t(AppStrings.branchNameEn_required)),
            TaxId: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Phones: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Mobiles: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Website: yup
                  .string()
                  .transform((value) => value ?? "")
                  .nullable()
                  .notRequired()
                  .test(
                        "is-valid-or-empty",
                        "Please enter a valid website URL (e.g., www.example.com)",
                        (value) => {
                              if (!value) return true; // allow empty, null, or undefined
                              return /^(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(value);
                        }
                  ),
            Email: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Address: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            City: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Street: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
      }


      const productSchemaValidator = {
            Id: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            NameAr: yup.string().required(t(AppStrings.productNameAr_required)).nullable(),
            NameEn: yup.string().required(t(AppStrings.productNameEn_required)).nullable(),
            Father: yup.string().required(t(AppStrings.category_required)).nullable(),
            Warehouse: yup.array().min(1, t(AppStrings.branch_required)).required(t(AppStrings.branch_required)).nullable(),
            TaxPercentage: yup.mixed().nullable()
                  .notRequired(),
            Discountable: yup.boolean().nullable()
                  .notRequired(),
            IsService: yup.boolean().nullable()
                  .notRequired(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
            Saleable: yup.boolean().nullable()
                  .notRequired(),
            Taxable: yup.boolean().nullable()
                  .notRequired(),
            HotGroup: yup.boolean().nullable()
                  .notRequired(),
            ReqQty: yup.boolean().nullable()
                  .notRequired(),
            MinQty: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Icon: yup.string().transform((value) => value ?? "").default("").nullable(),
      }

      const componentSchemaValidator = {
            ItemID: yup.string().required().nullable(),
            FoodQty: yup.string().required(t(AppStrings.quantity_required)).nullable(),
            SubItem: yup.string().required(t(AppStrings.product_required)).nullable(),
            Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
            Name: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Father: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
      }



      const pricesAndCostsSchemaValidator = {
            Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
            CateID: yup.string().required(t(AppStrings.category_required)).nullable(),
      }


      const categorySchemaValidator = {
            NameAr: yup.string().required(t(AppStrings.categoryNameAr_required)).nullable(),
            NameEn: yup.string().required(t(AppStrings.categoryNameEn_required)).nullable(),
            Saleable: yup.boolean().nullable()
                  .notRequired(),
            Warehouse: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
      }

      const unitSchemaValidator = {
            Unit_AR: yup.string().required(t(AppStrings.unitNameAr_required)).nullable(),
            Unit_EN: yup.string().required(t(AppStrings.unitNameEn_required)).nullable(),
            Active: yup.boolean().nullable()
                  .notRequired(),
      }


      const flavorSchemaValidator = {
            FlavorNo: yup.string().required(t(AppStrings.flavorId_required)).nullable(),
            FlavorAR: yup.string().required(t(AppStrings.flavorNameAr_required)).nullable(),
            FlavorEN: yup.string().required(t(AppStrings.flavorNameEn_required)).nullable(),
            Price: yup.string().required(t(AppStrings.price_required)).nullable(),
            WareHouse: yup.array().min(1).required(t(AppStrings.branch_required)),
            Category: yup.array().min(1).required(t(AppStrings.category_required)),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
      }

      const offerSchemaValidator = {
            Product: yup.string().required(t(AppStrings.product_required)).nullable(),
            FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
            ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
            Branch: yup.array().min(1).required(t(AppStrings.branch_required)),
            Price: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Qty: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            ExtraProduct: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            isActive: yup.boolean().nullable()
                  .notRequired(),
            PriceOffer: yup.boolean().nullable()
                  .notRequired(),
            QtyOffer: yup.boolean().nullable()
                  .notRequired(),
            ExtraOffer: yup.boolean().nullable()
                  .notRequired(),
      }





      const discountSchemaValidator = {
            DiscountPercentage: yup.number().integer(t(AppStrings.integer_value_required)).required(t(AppStrings.discount_percentage_required)).nullable(),
            DiscountTypeAr: yup.string().required(t(AppStrings.discount_type_ar_required)).nullable(),
            DiscountTypeEn: yup.string().required(t(AppStrings.discount_type_en_required)).nullable(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
      }


      const taxSchemaValidator = {
            TaxPercentage: yup.string().required(t(AppStrings.taxPercentage_required)).nullable(),
            TaxAr: yup.string().required(t(AppStrings.tax_type_ar_required)).nullable(),
            TaxEn: yup.string().required(t(AppStrings.tax_type_en_required)).nullable(),
            TaxIsActive: yup.boolean().nullable()
                  .notRequired(),
            IsDefault: yup.boolean().nullable()
                  .notRequired(),
      }

      const currencySchemaValidator = {
            CurrencyId: yup.string().required(t(AppStrings.currencyId_required)).nullable(),
            IDigits: yup.number().required(t(AppStrings.iDigits_required)).nullable(),
            IsDefault: yup.boolean().nullable()
                  .notRequired(),
      }


      const paymentTypesSchemaValidator = {
            Ptype: yup.string().required(t(AppStrings.paymentTypeId_required)).nullable(),
            PaymentArDesc: yup.string().required(t(AppStrings.paymentTypeAr_required)).nullable(),
            PaymentEnDesc: yup.string().required(t(AppStrings.paymentTypeEn_required)).nullable(),
            // CompanyID: yup.string().transform((value) => value ?? "").default("").nullable(),
            Commissions: yup.number().required(t(AppStrings.commissions_required)).nullable(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
            CashMoney: yup.boolean().nullable()
                  .notRequired(),
            IsCredit: yup.boolean().nullable()
                  .notRequired(),
      }



      const supplierSchemaValidator = {
            SupplierCompany: yup.string().required(t(AppStrings.supplierCompany_required)).nullable(),
            ContactName: yup.string().required(t(AppStrings.contactName)).nullable(),
            Email: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Phones: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Mobiles: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Warehouse: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
      }

      const deliveryCompaniesSchemaValidator = {
            CompanyID: yup.string().required(t(AppStrings.deliveryCompanyId_required)).nullable(),
            CompanyName: yup.string().required(t(AppStrings.deliveryCompanyName_required)).nullable(),
            Email: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Phone: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            percent: yup.number().required(t(AppStrings.deliveryPercentage_required)).nullable(),
            PriceCategory: yup.string().required(t(AppStrings.priceCategory_required)).nullable(),
            Active: yup.boolean().nullable()
                  .notRequired(),
      }

      const deliveryDiscountSchemaValidator = {
            LineID: yup.string().transform((value) => value ?? "").default("").nullable(),
            CompanyID: yup.string().required(t(AppStrings.deliveryCompany_required)).nullable(),
            FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
            ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
            DiscountValue: yup.number().nullable(),
            BranchID: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
      }

      const userGroupSchemaValidator = {
            GroupArName: yup.string().required(t(AppStrings.group_name_ar_required)).nullable(),
            GroupEnName: yup.string().required(t(AppStrings.group_name_en_required)).nullable(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
      }

      const userSchemaValidator = {
            UserName: yup.string().required(t(AppStrings.username_required)).nullable(),
            UserPassword: yup.string().required(t(AppStrings.password_required)).nullable(),
            GroupType: yup.string().required(t(AppStrings.user_group_required)).nullable(),
            Branch: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
            IsActive: yup.boolean().nullable()
                  .notRequired(),
      }

      const userPermissionsSchemaValidator = {
            UserNo: yup.string().required(t(AppStrings.userId_required)).nullable(),
            PermissionId: yup.string().required(t(AppStrings.username_required)).nullable(),
            WarehouseId: yup.array().min(1).required(t(AppStrings.branch_required)).nullable(),
            Allow: yup.boolean().nullable()
                  .notRequired(),
      }


      const permissionSchemaValidator = {
            "0101": yup.boolean().nullable()
                  .notRequired(),
            "0102": yup.boolean().nullable()
                  .notRequired(),
            "0103": yup.boolean().nullable()
                  .notRequired(),
            "0104": yup.boolean().nullable()
                  .notRequired(),
            "0105": yup.boolean().nullable()
                  .notRequired(),
            "0106": yup.boolean().nullable()
                  .notRequired(),
            "0107": yup.boolean().nullable()
                  .notRequired(),
            "0108": yup.boolean().nullable()
                  .notRequired(),
            "0109": yup.boolean().nullable()
                  .notRequired(),
            "0110": yup.boolean().nullable()
                  .notRequired(),
            "0111": yup.boolean().nullable()
                  .notRequired(),
            "0112": yup.boolean().nullable()
                  .notRequired(),
            "0113": yup.boolean().nullable()
                  .notRequired(),
            "0114": yup.boolean().nullable()
                  .notRequired(),
            "0115": yup.boolean().nullable()
                  .notRequired(),
            "0116": yup.boolean().nullable()
                  .notRequired(),
            "0117": yup.boolean().nullable()
                  .notRequired(),
            "0118": yup.boolean().nullable()
                  .notRequired(),
            "0119": yup.boolean().nullable()
                  .notRequired(),
            "0120": yup.boolean().nullable()
                  .notRequired(),
            "0121": yup.boolean().nullable()
                  .notRequired(),
            "0122": yup.boolean().nullable()
                  .notRequired(),
            "0123": yup.boolean().nullable()
                  .notRequired(),
      }

      const invoiceSchemaValidator = {
            InvoiceNo: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Warehouse: yup.string().required(t(AppStrings.branch_required)),
            Supplier: yup.string().required(t(AppStrings.supplierId_required)),
            PayType: yup.string().required(t(AppStrings.paymentTypeId_required)),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            TaxPercentage: yup.number().nullable()
                  .notRequired().default(0),
            Discount: yup.number().nullable()
                  .notRequired().default(0),
            DiscountPercentage: yup.number().nullable()
                  .notRequired().default(0),
            Tax: yup.number().nullable()
                  .notRequired().default(0),
            Vtype: yup.number().required().nullable(),
            PriceIncludeTax: yup.boolean().nullable()
                  .notRequired(),
            GrandTotal: yup.number().nullable()
                  .notRequired().default(0),
            SubTotal: yup.number().nullable()
                  .notRequired().default(0),
            DiscountValue: yup.number().nullable()
                  .notRequired().default(0),
      }

      const invoiceUpdatedSchemaValidator = {
            InvoiceNo: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Warehouse: yup.string().required(t(AppStrings.branch_required)),
            Supplier: yup.string().required(t(AppStrings.supplierId_required)),
            PayType: yup.string().required(t(AppStrings.paymentTypeId_required)),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            TaxPercentage: yup.number().nullable()
                  .notRequired().default(0),
            Discount: yup.number().nullable()
                  .notRequired().default(0),
            DiscountPercentage: yup.number().nullable()
                  .notRequired().default(0),
            Tax: yup.number().nullable()
                  .notRequired().default(0),
            PriceIncludeTax: yup.boolean().nullable()
                  .notRequired(),
            DiscountValue: yup.number().nullable()
                  .notRequired().default(0),
      }


      const voucherInputSchemaValidator = {
            Vtype: yup.number().nullable()
                  .notRequired(),
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
            ItemId: yup.string().required(t(AppStrings.product_required)).nullable(),
            Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
            Qty: yup.number().required(t(AppStrings.quantity_required)),
            UnitPrice: yup.number().required(t(AppStrings.price_required)),
      }

      const voucherInputUpdatedSchemaValidator = {
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
      }

      const voucherOutputSchemaValidator = {
            DocType: yup.number().required().nullable(),
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
            OutputType: yup.string().required().nullable(),
            ItemId: yup.string().required(t(AppStrings.product_required)).nullable(),
            Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
            Qty: yup.number().required(t(AppStrings.quantity_required)),
            Cost: yup.number().required(t(AppStrings.price_required)),
      }

      const voucherOutputUpdatedSchemaValidator = {
            DocType: yup.number().required().nullable(),
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Warehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
            OutputType: yup.string().required().nullable(),
      }


      const voucherTransferSchemaValidator = {
            TransferNo: yup.string().transform((value) => value ?? "").default("").nullable(),
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            FromWarehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
            ToWarehouse: yup.string().required(t(AppStrings.branch_required)).nullable(),
            ItemID: yup.string().required(t(AppStrings.product_required)).nullable(),
            Unit: yup.string().required(t(AppStrings.unit_required)).nullable(),
            Qty: yup.number().required(t(AppStrings.quantity_required)),
            Cost: yup.number().required(t(AppStrings.price_required)),
      }

      const voucherTransferUpdatedSchemaValidator = {
            TransferNo: yup.string().transform((value) => value ?? "").default("").nullable(),
            DocDate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
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
            StationID: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired().nullable(),
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
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
      }


      const voucherProvideSchemaValidator = {
            ReqNo: yup.string().required(t(AppStrings.invoiceId)).nullable(),
            ReqDate: yup.string().required(t(AppStrings.date_required)).nullable(),
            ByUser: yup.string().required(t(AppStrings.createdBy)).nullable(),
            Notes: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Manual: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            FromDate: yup.string().required(t(AppStrings.from_date_required)).nullable(),
            ToDate: yup.string().required(t(AppStrings.to_date_required)).nullable(),
            DayName: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            DiffRate: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            FromWarehouse: yup.string().required(t(AppStrings.from_branch)).nullable(),
            Warehouse: yup.string().required(t(AppStrings.to_branch)).nullable(),
            Posted: yup.boolean().nullable()
                  .notRequired(),
            Approved: yup.boolean().nullable()
                  .notRequired(),
            AllDays: yup.boolean().nullable()
                  .notRequired(),
            Provided: yup.boolean().nullable()
                  .notRequired(),
      }


      const purchaseOrderSchemaValidator = {
            DocID: yup.string().required(t(AppStrings.invoiceId)).nullable(),
            LineDate: yup.string().required(t(AppStrings.date_required)).nullable(),
            Status: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Note: yup.string().transform((value) => value ?? "").default("").nullable()
                  .notRequired(),
            Warehouse: yup.string().required(t(AppStrings.from_branch)).nullable(),
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
            purchaseOrderSchemaValidator,
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
            voucherProvideSchemaValidator,
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


