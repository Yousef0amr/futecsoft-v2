import React, { useEffect, useState } from 'react';
import gallery from '../../assets/images/gallery.png';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import { Button, Col, Row } from 'react-bootstrap';
import convertBase64ToBlob from '../../utils/ConvertBase64ToBlob';

const BrowserImage = ({ errors, setValue, field, watch }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const { t } = useTranslation();


    useEffect(() => {
        if (watch(field.name)) {
            const file = new File([convertBase64ToBlob(watch(field.name))], 'image.png', { type: 'image/png' });
            setUploadedFile(file)
        }
    }, [watch, field.name]);


    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const handleFileChange = (file) => {
        setUploadedFile(file);
        getBase64Image(file);
    };

    const getBase64Image = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setValue(field.name, reader.result);
        };
        reader.onerror = (error) => {
            console.error("Error converting file to Base64:", error);
        };
    };

    return (
        <Row xs={1} className="p-0 gap-2"  >
            <Col xs={12} md={6} className={`file-upload-form ${isDragging ? 'dragging' : 'file-preview'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop} style={{ flex: 1 }} >
                {
                    watch(field.name) === 'لا يوجد صورة' && (
                        <label htmlFor="file" className="file-upload-label">
                            <div className="file-upload-design">
                                <svg viewBox="0 0 640 512" height="1em">
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                                </svg>
                                <p className="p-0 m-0">{t(AppStrings.drag_and_drop)}</p>
                                <p className="p-0 m-0">{t(AppStrings.or)}</p>
                                <span className="browse-button">{t(AppStrings.browse_file)}</span>
                            </div>
                            <input
                                id="file"
                                type="file"
                                onChange={(e) => handleFileChange(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </label>
                    )
                }
                {watch(field.name) !== 'لا يوجد صورة' && uploadedFile && watch(field.name) && (
                    <div className="d-flex flex-column gap-2 ">
                        <div className="uploaded-file-preview">
                            {uploadedFile.type.startsWith("image/") ? (
                                <img
                                    src={watch(field.name) || URL.createObjectURL(uploadedFile)}
                                    alt="Uploaded"
                                    className="uploaded-image-preview"
                                />
                            ) : (
                                <p>{uploadedFile.name}</p>
                            )}
                        </div>
                        <Button variant="danger" onClick={() => setValue(field.name, 'لا يوجد صورة')}>{t(AppStrings.delete)}</Button>

                    </div>
                )}
            </Col>
            <Col>
                <div className='error-message'>
                    {errors[field.name] && errors[field.name]?.message}
                </div>
            </Col>
        </Row>
    );
};

export default BrowserImage;
