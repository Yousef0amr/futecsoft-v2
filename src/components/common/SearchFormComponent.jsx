import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import AppStrings from '../../config/appStrings';
import SpinnerLoader from '../common/Spinner';
import Stack from 'react-bootstrap/Stack';
import Button from '@mui/material/Button';
import { Search } from '@mui/icons-material';



const SearchFormComponent = ({
    schema,
    onSubmit,
    isLoading,
    children,
}) => {


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {typeof children === 'function' ? children({ register, errors, setValue, watch }) : children}
            <Stack direction="horizontal" gap={3} className="mt-4">
                <Button
                    type="submit"
                    sx={{
                        fontSize: '16px',
                        color: 'var(--text-color)',
                        padding: '3px 20px',
                        border: '1px solid var(--border-color-1)',
                        '&:hover': {
                            backgroundColor: 'var(--border-color-1)',
                            color: 'white',
                        },
                    }}
                >
                    {isLoading ? <SpinnerLoader /> : <div className='d-flex align-items-center gap-2'><Search /> {t(AppStrings.search)} </div>}
                </Button>
            </Stack>
        </Form>
    );
};

export default SearchFormComponent;
