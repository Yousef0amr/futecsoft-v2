import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import { useTranslation } from 'react-i18next';

const ToggleSwitch = ({
    label,
    isChecked,
    onChange,
}) => {
    const { t } = useTranslation();
    return (
        <FormGroup className={`mt-3 w-100`}>
            <div className='d-flex align-items-center justify-content-between'>
                <span>{t(label)}</span>
                <div className="toggler">
                    <input
                        id={label}
                        name={label}
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                        aria-label={label}
                    />
                    <label htmlFor={label}>
                        {isChecked ? (
                            <svg
                                className="toggler-on"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 130.2 130.2"
                                aria-hidden="true"
                                role="img"
                            >
                                <polyline className="path check" points="100.2,40.2 51.5,88.8 29.8,67.5"></polyline>
                            </svg>
                        ) : (
                            <svg
                                className="toggler-off"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 130.2 130.2"
                                aria-hidden="true"
                                role="img"
                            >
                                <line className="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
                                <line className="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
                            </svg>
                        )}
                    </label>
                </div>
            </div>
        </FormGroup>
    );
};

ToggleSwitch.propTypes = {
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    labelOn: PropTypes.string,
    labelOff: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
};

export default ToggleSwitch;
