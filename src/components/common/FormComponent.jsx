import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppStrings from '../../config/appStrings';
import { Button } from '@mui/material';
import SpinnerLoader from '../common/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const FormComponent = ({
    schema,
    onSubmit = async () => { },
    isLoading,
    isSuccess,
    defaultValues = {},
    children,
    enableReset = true,
    enableUpdateLocation = true
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [enableClose, setEnableClose] = React.useState(false);
    const location = useLocation()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        values: defaultValues,
        resolver: yupResolver(schema),
    });


    useEffect(() => {
        if (enableReset && isSuccess) {
            reset();
        }
    }, [isSuccess, enableReset, reset]);

    const cleanPath = useCallback((pathname) => pathname.replace(/\/(add|edit)$/, "/list"), []);

    const onHandleSubmit = async (data) => {
        const response = await onSubmit(data);
        if (response?.Success || isSuccess) {
            if (enableClose) {
                return navigate(-1, { replace: true });
            } else if (enableUpdateLocation) {
                return navigate(location.pathname, {
                    replace: true,
                    state: data
                });
            }

        }
    };

    return (
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
            {typeof children === 'function' ? children({ register, errors, setValue, watch, defaultValues }) : children}
            <Stack direction="horizontal" gap={3} className=" flex justify-content-center">
                {
                    <>
                        <Button
                            type="submit"
                            onClick={() => setEnableClose(false)}
                            sx={{
                                fontSize: '16px',
                                width: '50%',
                                marginTop: '30px',
                                color: 'white',
                                padding: '3px',
                                backgroundColor: 'var(--primary-color)',
                            }}
                        >
                            {(isLoading && !enableClose) ? <SpinnerLoader /> : t(AppStrings.save)}
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
