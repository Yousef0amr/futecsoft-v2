import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import FormCard from './FormCard'
import NavButton from './NavButton'
import useEntityOperations from '../../hooks/useEntityOperations'


const EditComponent = ({ icon, title, successMessage, errorMessage, isRefetch, editData, path, Form, fetchHook, defaultQuery = {}, optionComponent }) => {
    const { updateEntity, isUpdating, updateEntityInCache, refetch } = fetchHook(defaultQuery)
    const { handleEntityOperation } = useEntityOperations({ updateEntity })
    const [updatedData, setUpdatedData] = React.useState(editData)
    const onSubmit = async (data) => {

       const response = await handleEntityOperation({
            operation: 'update',
            data,
            cacheUpdater: isRefetch ? refetch : updateEntityInCache,
            cacheData: data,
            successMessage,
            errorMessage
        })
        if(response.Success)  {
            setUpdatedData(data)
        }
     }



    return (
        <FormCard open={false} icon={icon} title={title} optionComponent={optionComponent} navButton={<NavButton icon={faArrowRight} title={AppStrings.back} path={path} />}>
            <Form  isLoading={isUpdating} resetForm={false} enableReset={false} defaultValuesEdit={updatedData} onSubmit={onSubmit} />
        </FormCard>
    )
}

export default EditComponent
