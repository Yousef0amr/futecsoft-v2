import React, { useEffect } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppStrings from '../../config/appStrings';
import { Button } from '@mui/material';
import SpinnerLoader from '../common/Spinner';

const FormComponent = ({
    schema,
    resetForm,
    onSubmit,
    isLoading,
    defaultValues = {},
    children,
    customSubmit = false,
    enableReset = true,
}) => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (enableReset) {
            reset(defaultValues);
        }
    }, [defaultValues, enableReset, reset]);

    useEffect(() => {
        if (resetForm) {
            reset();
        }
    }, [resetForm, reset]);


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {typeof children === 'function' ? children({ register, errors, setValue, watch, defaultValues }) : children}
            <Stack direction="horizontal" gap={3} className=" flex justify-content-center">
                {
                    customSubmit ? null :
                        <Button
                            type="submit"
                            sx={{
                                fontSize: '16px',
                                width: '50%',
                                marginTop: '30px',
                                color: 'white',
                                padding: '3px',
                                backgroundColor: 'var(--primary-color)',
                            }}
                        >
                            {isLoading ? <SpinnerLoader /> : t(AppStrings.save)}
                        </Button>
                }
            </Stack>
        </Form>
    );
};

export default FormComponent;
