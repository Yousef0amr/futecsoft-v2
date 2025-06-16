import { faDashboard, faEdit, faUserLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import FormCard from '../../components/common/FormCard';
import AgGridTable from '../../components/common/AgGridTable';
import NavButton from '../../components/common/NavButton';
import { routes } from '../../config/constants';
import { useDashboardPermissionColDefs } from '../../config/agGridColConfig';
import FilterSearch from '../../components/common/FilterSearch';

const permissions = [
  {
    page: "صفحة الفروع",
    view: false,
    edit: false,
    create: false,
    delete: false,
  },
  {
    page: "صفحة المواد",
    view: false,
    edit: false,
    create: false,
    delete: false,
  },
  {
    page: "صفحة فواتير المشتريات",
    view: false,
    edit: false,
    create: false,
    delete: false,
  },
  {
    page: "صفحة سندات الإدخال",
    view: false,
    edit: false,
    create: false,
    delete: false,
  },
  {
    page: "صفحة سندات الإخراج",
    view: false,
    edit: false,
    create: false,
    delete: false,
  },
  {
    page: "صفحة التصنيفات",
    view: false,
    edit: false,
    create: false,
    delete: false,
  },
  {
    page: "صفحة الصلاحيات",
    view: false,
    edit: false,
    create: false,
    delete: false,
  },
];


const ListDashboardPermission = () => {
    const [quickFilterText, setQuickFilterText] = useState();
    const { t } = useTranslation();
    const userPermissionsColDefs = useDashboardPermissionColDefs({handleActiveChange: () => {}});

    return (
        <FormCard
            icon={faDashboard}
            title={t(AppStrings.list_permissions)}
            optionComponent={
                <>
                    <FilterSearch onFilterTextBoxChanged={setQuickFilterText} />
                </>
            }
        >
            <AgGridTable
                actionsCellRenderer={NavButton}
                
                enableActions={false}
                actions={{ icon: faEdit, path: routes.permission.edit, title: AppStrings.edit_permissions }}
                dynamicColumns={userPermissionsColDefs}
                rowData={permissions}
                isLoading={false}
                quickFilterText={quickFilterText}
            />
        </FormCard>
    )
}

export default ListDashboardPermission