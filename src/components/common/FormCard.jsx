import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from './CardTitle'
import DialogModel from './DialogModel'
import DeleteComponent from './DeleteComponent'
const FormCard = ({ icon, title, optionComponent, navButton, open = false, modelComponent, handleDelete, handleCancel, isLoading, children }) => {
    return (
        <>
            <Card style={{
                backgroundColor: 'var(--background-color)',
                borderColor: 'var(--border-color-1)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                width: '100%',
                color: 'var(--text-color)',
            }}>
                <CardTitle icon={icon} title={title} navButton={navButton}  >
                    {optionComponent}
                </CardTitle>
                {children}
            </Card>
            <DialogModel open={open}    >
                {modelComponent ? modelComponent : <DeleteComponent
                    handleDelete={handleDelete}
                    handleCancel={handleCancel}
                    isLoading={isLoading}
                />}
            </DialogModel>
        </>
    )
}

export default FormCard
