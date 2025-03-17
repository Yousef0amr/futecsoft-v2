import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import FormCard from './FormCard'
import NavButton from './NavButton'
import useEntityOperations from '../../hooks/useEntityOperations'

const EditComponent = ({ composite = false, icon, title, successMessage, errorMessage, isRefetch, editData, path, Form, fetchHook, defaultQuery = {}, optionComponent }) => {
    const { updateEntity, isUpdating, updateEntityInCache, refetch } = fetchHook(defaultQuery)
    const { handleEntityOperation } = useEntityOperations({ updateEntity })

    const onSubmit = async (data) => {
        console.log(data)
        handleEntityOperation({
            operation: 'update',
            data,
            cacheUpdater: isRefetch ? refetch : updateEntityInCache,
            cacheData: data,
            successMessage,
            errorMessage
        })
    }



    return (
        <FormCard open={false} icon={icon} title={title} optionComponent={optionComponent} navButton={<NavButton icon={faArrowRight} title={AppStrings.back} path={path} />}>
            <Form composite={composite} isLoading={isUpdating} resetForm={false} enableReset={false} defaultValuesEdit={editData} onSubmit={onSubmit} />
        </FormCard>
    )
}

export default EditComponent
