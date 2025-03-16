import React from 'react'
import Box from '@mui/material/Box';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Col, Row, Button } from 'react-bootstrap';
import AppStrings from '../../config/appStrings';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../../features/authSlice';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import SpinnerLoader from '../common/Spinner';
import useNotification from '../../hooks/useNotification';

const LoginForm = () => {
    const { t } = useTranslation()
    const [login, { isLoading }] = useLoginMutation()
    const { loginLocal } = useAuth()
    const navigate = useNavigate()

    const schema = yup.object({
        UserName: yup.string().required(t(AppStrings.username_required)),
        Password: yup.string().required(t(AppStrings.password_required)),
    }).required();
    const { notify } = useNotification()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {
        try {
            const result = await login(data).unwrap();
            if (result.Success) {
                loginLocal(result.Response.Token)
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 1000);
            }
        } catch (error) {
            notify(error.data.ErrorMessage ? error.data.ErrorMessage : t(AppStrings.something_went_wrong), 'error');
        }
    };

    return (
        <Box className='login-form' sx={{ borderRadius: '8px', backgroundColor: 'white', zIndex: 5, width: 800, maxWidth: '100%', overflow: 'hidden' }} >
            <Row xs={1} sm={1} md={2} lg={2} >
                <Col style={{ padding: '30px' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '30px' }}>{t(AppStrings.login)}</h3>
                    <p >  {t(AppStrings.sign_to_your_account)}  </p>
                    <Form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Control
                            type="text"
                            placeholder={t(AppStrings.username)}
                            {...register("UserName")}
                        />
                        {errors.UserName && <div className='error-message'> {errors.UserName.message}</div>}
                        <Form.Control
                            type="password"
                            placeholder={t(AppStrings.password)}
                            className='mt-3'
                            {...register("Password")}
                        />
                        {errors.Password && <div className='error-message'> {errors.Password.message}</div>}
                        <Button className="mt-3 login-btn" disabled={isLoading} type="submit">{isLoading ? <SpinnerLoader /> : t(AppStrings.login)}</Button>
                    </Form>
                </Col>
                <Col className='login-side' style={{ backgroundColor: 'var(--background-color-dark)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h3 className='text-uppercase' style={{ color: 'white', fontSize: '30px' }}>Futec-soft © 2024</h3>
                </Col>
            </Row>
        </Box>
    )
}

export default LoginForm
