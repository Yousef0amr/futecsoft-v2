import React from 'react';
import { Stack } from 'react-bootstrap';
import AppStrings from '../../config/appStrings';
import { useTranslation } from 'react-i18next';

const TablePrintData = ({ searchData, searchFields, rowData, columns, summary }) => {
    const { t } = useTranslation();

    return (
        <Stack gap={2} className="print-only">
            <div className="print-header">
                {searchFields?.map((field, index) => (
                    <div key={index} className="print-field">
                        {t(field.label)}: {searchData[field.name]}
                    </div>
                ))}
            </div>
            <table className="styled-table  ">
                <thead>
                    <tr>
                        {columns?.map((column) => (
                            <th key={column.field}>{column.headerName}</th>
                        ))}
                    </tr>
                </thead>
                {rowData && (
                    <tbody>
                        {rowData?.map((row, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td key={column.field}>{row[column.field]}</td>
                                ))}
                            </tr>
                        ))}
                        {summary &&
                            Object.entries(summary).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{t(AppStrings[key])}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                    </tbody>
                )}
            </table>
        </Stack>
    );
};

export default TablePrintData;
