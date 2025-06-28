import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import FormCard from './FormCard'
import NavButton from './NavButton'
import useEntityOperations from '../../hooks/useEntityOperations'

const EditComponent = ({ icon, title, optionalTab, successMessage, onSubmit, tableRef, errorMessage, isExternalUpdate, editData, path, Form, fetchHook, defaultQuery = {}, optionComponent }) => {
    const { updateEntity, isUpdating, isUpdatedSuccess } = fetchHook(defaultQuery)
    const { handleEntityOperation } = useEntityOperations({ updateEntity })
    const [updatedData, setUpdatedData] = React.useState(editData)

    const onSubmitDefault = async (data) => {
        console.log(data)
        const response = await handleEntityOperation({
            operation: 'update',
            data,
            successMessage,
            errorMessage
        })
        if (response?.Success) {
            setUpdatedData(data)

        }
        return response
    }

    return (
        <FormCard open={false} icon={icon} title={title} optionComponent={optionComponent} navButton={<NavButton icon={faArrowRight} title={AppStrings.back} path={path} />}>
            <div className='w-100'>
                <Form activeTab={optionalTab} tableRef={tableRef} isLoading={isUpdating || isExternalUpdate} isSuccess={isUpdatedSuccess} enableReset={false} defaultValuesEdit={updatedData} onSubmit={onSubmit ? onSubmit : onSubmitDefault} />

            </div>
        </FormCard>
    )
}

export default EditComponent
