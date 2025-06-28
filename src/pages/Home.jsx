import React, { useState } from 'react'
import PieChart from '../components/common/PieChart'
import { useGetBestSellerCategoryQuery, useGetBestSellerItemsQuery, useGetSalesByDaysQuery, useGetSalesByHoursQuery } from '../features/reportsControllerSlice'
import BarChart from '../components/common/BarChart';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AppStrings from '../config/appStrings';
import FormCard from '../components/common/FormCard';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const FilterStatisForm = React.lazy(() => import('../components/home/FilterStatisForm'));


const Home = () => {
    const [filter, setFilter] = useState(null);
    const { data: itemsData } = useGetBestSellerItemsQuery(
        { from_date: "2023-01-01", to_date: new Date().toLocaleDateString('en-CA'), warehouse: filter },
        {
            skip: !filter
        }

    );
    const { data: categoryData } = useGetBestSellerCategoryQuery({ from_date: "2023-01-01", to_date: new Date().toLocaleDateString('en-CA'), warehouse: filter },
        {
            skip: !filter
        });
    const { data: salesDayData } = useGetSalesByDaysQuery({ from_date: "2023-01-01", to_date: new Date().toLocaleDateString('en-CA'), warehouse: filter },
        {
            skip: !filter
        });
    const { data: salesHourData } = useGetSalesByHoursQuery({ from_date: "2023-01-01", to_date: new Date().toLocaleDateString('en-CA'), warehouse: filter },
        {
            skip: !filter
        });
    const { t } = useTranslation();

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <FormCard title={t(AppStrings.home)} icon={faHome} navButton={<FilterStatisForm onSubmit={handleFilterChange} filter={filter} />} >
            <Row>

                <Col xs={12} md={6}>
                    <PieChart data={itemsData} name={t(AppStrings.best_seller_items)} />
                </Col>
                <Col xs={12} md={6}>
                    <BarChart data={salesDayData} name={t(AppStrings.sales_by_days)} />
                </Col>
                <Col xs={12} md={6}>
                    <PieChart data={categoryData} name={t(AppStrings.best_seller_category)} />
                </Col>
                <Col xs={12} md={6}>
                    <BarChart data={salesHourData} name={t(AppStrings.sales_by_hours)} />
                </Col>
            </Row>
        </FormCard>
    )
}

export default Home
