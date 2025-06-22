import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import ReportsLayout from '../layout/ReportsLayout';
import { ProtectedRoute, LoginRoute } from './../components/common/ProtectedRoute';
import Loader from '../components/common/Loader';
import { routes } from '../config/constants';
import NotFound from '../components/common/NotFound';
import CompositeProducts from '../pages/product/CompositeProducts';
import AddCompositeComponent from '../pages/product/AddCompositeComponent';


// Lazy imports
const Login = React.lazy(() => import('../pages/Login'));
const AddBranch = React.lazy(() => import('../pages/branch/AddBranch'));
const Home = React.lazy(() => import('../pages/Home'));
const ListProduct = React.lazy(() => import('../pages/product/ListProduct'));
const AddProduct = React.lazy(() => import('../pages/product/AddProduct'));
const PricesAndCosts = React.lazy(() => import('../pages/product/PricesAndCosts'));
const EditProduct = React.lazy(() => import('../pages/product/EditProduct'));
const EditBranch = React.lazy(() => import('../pages/branch/EditBranch'));
const ListBranch = React.lazy(() => import('../pages/branch/ListBranch'));
const ListCategory = React.lazy(() => import('../pages/category/ListCategory'));
const AddCategory = React.lazy(() => import('../pages/category/AddCategory'));
const EditCategory = React.lazy(() => import('../pages/category/EditCategory'));
const ListUnit = React.lazy(() => import('../pages/unit/ListUnit'));
const AddUnit = React.lazy(() => import('../pages/unit/AddUnit'));
const EditUnit = React.lazy(() => import('../pages/unit/EditUnit'));
const ListOffer = React.lazy(() => import('../pages/offer/ListOffer'));
const AddOffer = React.lazy(() => import('../pages/offer/AddOffer'));
const EditOffer = React.lazy(() => import('../pages/offer/EditOffer'));
const AddDiscount = React.lazy(() => import('../pages/discount/AddDiscount'));
const ListDiscount = React.lazy(() => import('../pages/discount/ListDiscount'));
const EditDiscount = React.lazy(() => import('../pages/discount/EditDiscount'));
const ListTax = React.lazy(() => import('../pages/tax/ListTax'));
const AddTax = React.lazy(() => import('../pages/tax/AddTax'));
const EditTax = React.lazy(() => import('../pages/tax/EditTax'));
const ListCurreny = React.lazy(() => import('../pages/Currency/ListCurreny'));
const EditCurrency = React.lazy(() => import('../pages/Currency/EditCurrency'));
const AddCurrency = React.lazy(() => import('../pages/Currency/AddCurrency'));
const ListPaymentType = React.lazy(() => import('../pages/payment_type/ListPaymentType'));
const AddPaymentType = React.lazy(() => import('../pages/payment_type/AddPaymentType'));
const EditPaymentType = React.lazy(() => import('../pages/payment_type/EditPaymentType'));
const ListSupplier = React.lazy(() => import('../pages/supplier/ListSupplier'));
const AddSupplier = React.lazy(() => import('../pages/supplier/AddSupplier'));
const EditSupplier = React.lazy(() => import('../pages/supplier/EditSupplier'));
const ListDeliveryCompany = React.lazy(() => import('../pages/delivery_company/ListDeliveryCompany'));
const AddDeliveryCompany = React.lazy(() => import('../pages/delivery_company/AddDeliveryCompany'));
const EditDeliveryCompany = React.lazy(() => import('../pages/delivery_company/EditDeliveryCompany'));
const ListDeliveryDiscount = React.lazy(() => import('../pages/delivery_discount/ListDeliveryDiscount'));
const AddDeliveryDiscount = React.lazy(() => import('../pages/delivery_discount/AddDeliveryDiscount'));
const EditDeliveryDiscount = React.lazy(() => import('../pages/delivery_discount/EditDeliveryDiscount'));
const ListUserGroup = React.lazy(() => import('../pages/user_group/ListUserGroup'));
const AddUserGroup = React.lazy(() => import('../pages/user_group/AddUserGroup'));
const EditUserGroup = React.lazy(() => import('../pages/user_group/EditUserGroup'));
const ListUser = React.lazy(() => import('../pages/user/ListUser'));
const AddUser = React.lazy(() => import('../pages/user/AddUser'));
const EditUser = React.lazy(() => import('../pages/user/EditUser'));
const EditUserPermission = React.lazy(() => import('../pages/user_permission/EditUserPermission'));
const ListUserPermission = React.lazy(() => import('../pages/user_permission/ListUserPermission'));
const ListInvoice = React.lazy(() => import('../pages/invoice/ListInvoice'));
const AddInvoice = React.lazy(() => import('../pages/invoice/AddInvoice'));
const EditInvoice = React.lazy(() => import('../pages/invoice/EditInvoice'));
const ListInputVoucher = React.lazy(() => import('../pages/input_voucher/ListInputVoucher'));
const AddInputVoucher = React.lazy(() => import('../pages/input_voucher/AddInputVoucher'));
const EditInputVoucher = React.lazy(() => import('../pages/input_voucher/EditInputVoucher'));
const ListOutputVoucher = React.lazy(() => import('../pages/output_voucher/ListOutputVoucher'));
const AddOutputVoucher = React.lazy(() => import('../pages/output_voucher/AddOutputVoucher'));
const EditOutputVoucher = React.lazy(() => import('../pages/output_voucher/EditOutputVoucher'));
const ListTransferVoucher = React.lazy(() => import('../pages/transfer_voucher/ListTransferVoucher'));
const AddTransferVoucher = React.lazy(() => import('../pages/transfer_voucher/AddTransferVoucher'));
const EditTransferVoucher = React.lazy(() => import('../pages/transfer_voucher/EditTransferVoucher'));
const InvoicesByDate = React.lazy(() => import('../pages/report/InvoicesByDate'));
const CategoriesSales = React.lazy(() => import('../pages/report/CategoriesSales'));
const ProductsSales = React.lazy(() => import('../pages/report/ProductsSales'));
const FullSales = React.lazy(() => import('../pages/report/FullSales'));
const FullSalesDetails = React.lazy(() => import('../pages/report/FullSalesDetails'));
const ReturnByInvoices = React.lazy(() => import('../pages/report/ReturnByInvoices'));
const ReturnByItems = React.lazy(() => import('../pages/report/ReturnByItems'));
const ItemTransactions = React.lazy(() => import('../pages/report/ItemTransactions'));
const InventoryStatement = React.lazy(() => import('../pages/report/InventoryStatement'));
const ItemsProfit = React.lazy(() => import('../pages/report/ItemsProfit'));
const DailyProfits = React.lazy(() => import('../pages/report/DailyProfits'));
const ListPurchaseOrder = React.lazy(() => import('../pages/purchase_order/ListPurchaseOrder'));
const AddPurchaseOrder = React.lazy(() => import('../pages/purchase_order/AddPurchaseOrder'));
const EditPurchaseOrder = React.lazy(() => import('../pages/purchase_order/EditPurchaseOrder'));

const ListVoucherProvide = React.lazy(() => import('../pages/voucher_provide/ListVoucherProvide'));
const AddVoucherProvide = React.lazy(() => import('../pages/voucher_provide/AddVoucherProvide'));
const EditVoucherProvide = React.lazy(() => import('../pages/voucher_provide/EditVoucherProvide'));

const ListVoucherRecieving = React.lazy(() => import('../pages/voucher_recieving/ListVoucherRecieving'));
const AddVoucherRecieving = React.lazy(() => import('../pages/voucher_recieving/AddVoucherRecieving'));
const EditVoucherRecieving = React.lazy(() => import('../pages/voucher_recieving/EditVoucherRecieving'));
const ListDashboardPermission = React.lazy(() => import('../pages/user_permission/ListDashboardPermission'));



const pagesList = [
    { path: "/", component: <Home /> },
    // Branches
    { path: routes.branch.list, component: <ListBranch /> },
    { path: routes.branch.add, component: <AddBranch /> },
    { path: routes.branch.edit, component: <EditBranch /> },
    // Products
    { path: routes.product.list, component: <ListProduct /> },
    { path: routes.product.add, component: <AddProduct /> },
    { path: routes.product.edit, component: <EditProduct /> },
    { path: routes.product.pricesAndCosts, component: <PricesAndCosts /> },
    // Categories
    { path: routes.category.list, component: <ListCategory /> },
    { path: routes.category.add, component: <AddCategory /> },
    { path: routes.category.edit, component: <EditCategory /> },
    // Units
    { path: routes.unit.list, component: <ListUnit /> },
    { path: routes.unit.add, component: <AddUnit /> },
    { path: routes.unit.edit, component: <EditUnit /> },
    // Offers
    { path: routes.offer.list, component: <ListOffer /> },
    { path: routes.offer.add, component: <AddOffer /> },
    { path: routes.offer.edit, component: <EditOffer /> },
    // Discounts
    { path: routes.discountType.list, component: <ListDiscount /> },
    { path: routes.discountType.add, component: <AddDiscount /> },
    { path: routes.discountType.edit, component: <EditDiscount /> },
    // Taxes
    { path: routes.tax.list, component: <ListTax /> },
    { path: routes.tax.add, component: <AddTax /> },
    { path: routes.tax.edit, component: <EditTax /> },
    // Currencies
    { path: routes.currency.list, component: <ListCurreny /> },
    { path: routes.currency.add, component: <AddCurrency /> },
    { path: routes.currency.edit, component: <EditCurrency /> },
    // Payment Methods
    { path: routes.paymentMethod.list, component: <ListPaymentType /> },
    { path: routes.paymentMethod.add, component: <AddPaymentType /> },
    { path: routes.paymentMethod.edit, component: <EditPaymentType /> },
    // Suppliers
    { path: routes.supplier.list, component: <ListSupplier /> },
    { path: routes.supplier.add, component: <AddSupplier /> },
    { path: routes.supplier.edit, component: <EditSupplier /> },
    // Delivery Companies
    { path: routes.delivery_company.list, component: <ListDeliveryCompany /> },
    { path: routes.delivery_company.add, component: <AddDeliveryCompany /> },
    { path: routes.delivery_company.edit, component: <EditDeliveryCompany /> },
    // Delivery Discounts
    { path: routes.delivery_discount.list, component: <ListDeliveryDiscount /> },
    { path: routes.delivery_discount.add, component: <AddDeliveryDiscount /> },
    { path: routes.delivery_discount.edit, component: <EditDeliveryDiscount /> },
    //User Groups
    { path: routes.user_group.list, component: <ListUserGroup /> },
    { path: routes.user_group.add, component: <AddUserGroup /> },
    { path: routes.user_group.edit, component: <EditUserGroup /> },
    //Users
    { path: routes.user.list, component: <ListUser /> },
    { path: routes.user.add, component: <AddUser /> },
    { path: routes.user.edit, component: <EditUser /> },
    //User Permissions
    { path: routes.permission.edit, component: <EditUserPermission /> },
    { path: routes.permission.list, component: <ListUserPermission /> },
    { path: routes.permission.dashboard, component: <ListDashboardPermission /> },
    //Invoices
    { path: routes.invoice.list, component: <ListInvoice /> },
    { path: routes.invoice.add, component: <AddInvoice /> },
    { path: routes.invoice.edit, component: <EditInvoice /> },
    //Input Vouchers
    { path: routes.input_voucher.list, component: <ListInputVoucher /> },
    { path: routes.input_voucher.add, component: <AddInputVoucher /> },
    { path: routes.input_voucher.edit, component: <EditInputVoucher /> },
    //Output Vouchers
    { path: routes.output_voucher.list, component: <ListOutputVoucher /> },
    { path: routes.output_voucher.add, component: <AddOutputVoucher /> },
    { path: routes.output_voucher.edit, component: <EditOutputVoucher /> },

    //Transfer Vouchers
    { path: routes.transfer_voucher.list, component: <ListTransferVoucher /> },
    { path: routes.transfer_voucher.add, component: <AddTransferVoucher /> },
    { path: routes.transfer_voucher.edit, component: <EditTransferVoucher /> },

    //Purchase Order
    { path: routes.purchase_order.list, component: <ListPurchaseOrder /> },
    { path: routes.purchase_order.add, component: <AddPurchaseOrder /> },
    { path: routes.purchase_order.edit, component: <EditPurchaseOrder /> },

    //Provide Voucher
    { path: routes.provide_voucher.list, component: <    ListVoucherProvide /> },
    { path: routes.provide_voucher.add, component: <AddVoucherProvide /> },
    { path: routes.provide_voucher.edit, component: <EditVoucherProvide /> },

    //Recieving Voucher
    { path: routes.recieving_voucher.list, component: <ListVoucherRecieving /> },
    { path: routes.recieving_voucher.add, component: <AddVoucherRecieving /> },
    { path: routes.recieving_voucher.edit, component: <EditVoucherRecieving /> },

    {path : routes.product.compositeComponents, component : <CompositeProducts />},
    {path : routes.product.compositeComponentsAdd, component : <AddCompositeComponent />},

    {path : routes.product.compositeProductAdd, component : <AddProduct />},
    {path : routes.product.compositeComponentsEdit, component : <EditProduct />},
];

const reportsPages = [
    { path: routes.reports.fullSales, component: <FullSales /> },
    { path: routes.reports.salesCategory, component: <CategoriesSales /> },
    { path: routes.reports.salesItems, component: <ProductsSales /> },
    { path: routes.reports.returnInvoices, component: <ReturnByInvoices /> },
    { path: routes.reports.returnItems, component: <ReturnByItems /> },
    { path: routes.reports.invoicesByDate, component: <InvoicesByDate /> },
    { path: routes.reports.itemTransaction, component: <ItemTransactions /> },
    { path: routes.reports.inventoryStatement, component: <InventoryStatement /> },
    { path: routes.reports.dailyProfit, component: <DailyProfits /> },
    { path: routes.reports.itemsProfits, component: <ItemsProfit /> },
    { path: routes.reports.fullSalesWithDetails, component: <FullSalesDetails /> },
]



const AppRoutes = ({ darkMode, toggleDarkMode }) => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes >
                <Route element={<ProtectedRoute />} >
                    <Route path="/" element={<DefaultLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} >
                        {
                            pagesList.map((page, index) => {
                                return (
                                    <Route key={index} path={page.path} element={page.component} />
                                )
                            })
                        }
                        <Route path="/reports" element={<ReportsLayout />} >
                            {
                                reportsPages.map((page, index) => {
                                    return (
                                        <Route key={index} path={page.path} element={page.component} />
                                    )
                                })
                            }
                        </Route>
                    </Route>
                </Route>
                <Route element={<LoginRoute />} >
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes
