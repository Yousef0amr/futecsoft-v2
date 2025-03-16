import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
const SpinnerLoader = ({ size = 'sm' }) => {
    return (

        <Spinner
            as="span"
            animation="border"
            size={size}
            role="status"
            aria-hidden="true"
        />

    )
}

export default SpinnerLoader
