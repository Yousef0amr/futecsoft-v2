import React, { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings';
import { Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import notFoundImg from './../../assets/images/notFound.png'

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{
            height: '100vh',
            width: '100%',
            background: 'linear-gradient(to right, #CFDEF3, #E0EAFC)'
        }}>
            <img src={notFoundImg} alt="404" style={{ width: '400px', maxWidth: '100%', maxHeight: '400px' }} />
            <Button variant="danger"> <Link to="/">
                {t(AppStrings.go_back_home)}  </Link>
            </Button>
        </div>
    )
}

export default NotFound
