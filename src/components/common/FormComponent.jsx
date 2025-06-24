import React, { useEffect } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppStrings from '../../config/appStrings';
import { Button } from '@mui/material';
import SpinnerLoader from '../common/Spinner';
import { useNavigate } from 'react-router-dom';

const FormComponent = ({
    schema,
    onSubmit = () => {},
    isLoading,
    isSuccess,
    defaultValues = {},
    children,
    enableReset = true,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [enableClose, setEnableClose] = React.useState(false);


    
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
        if (enableReset && isSuccess) {
            reset();
        }
    }, [isSuccess, enableReset, reset]);


    useEffect (() => {
        if (isSuccess && enableClose) {
            navigate(-1);
        }
    }, [isSuccess, navigate, enableClose]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {typeof children === 'function' ? children({ register, errors, setValue, watch, defaultValues }) : children}
            <Stack direction="horizontal" gap={3} className=" flex justify-content-center">
                {
                    <>
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
                            {(isLoading && !enableClose)  ? <SpinnerLoader /> : t(AppStrings.save)}
                        </Button>
                         <Button
                            type="submit"
                            onClick={() => setEnableClose(true)}
                            sx={{
                                fontSize: '16px',
                                width: '50%',
                                marginTop: '30px',
                                color: 'white',
                                padding: '3px',
                                backgroundColor: 'var(--secondary-color)',
                            }}
                        >
                            {(isLoading && enableClose) ? <SpinnerLoader /> : t(AppStrings.saveAndClose)}
                        </Button>
                    </>
                     
                }
            </Stack>
        </Form>
    );
};

export default FormComponent;
