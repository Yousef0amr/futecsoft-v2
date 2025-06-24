import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import FormCard from './FormCard'
import NavButton from './NavButton'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useLocation, useNavigate } from 'react-router-dom'


const EditComponent = ({ icon, title,optionalTab,  successMessage,onSubmit ,tableRef , errorMessage, isRefetch, editData, path, Form, fetchHook, defaultQuery = {}, optionComponent }) => {
    const { updateEntity, isUpdating, updateEntityInCache, refetch,isUpdatedSuccess } = fetchHook(defaultQuery)
    const { handleEntityOperation } = useEntityOperations({ updateEntity })
    const [updatedData, setUpdatedData] = React.useState(editData)
const navigate = useNavigate();
const location = useLocation();
    const onSubmitDefault = async (data) => {
       const response = await handleEntityOperation({
            operation: 'update',
            data,
            cacheUpdater: isRefetch ? refetch : updateEntityInCache,
            cacheData: data,
            successMessage,
            errorMessage
        })
        if(response?.Success)  {
            setUpdatedData(data)
              navigate(location.pathname, {
            replace: true, 
            state: data  
        });
        }
     }



    return (
        <FormCard open={false} icon={icon} title={title} optionComponent={optionComponent} navButton={<NavButton icon={faArrowRight} title={AppStrings.back} path={path} />}>
            <div className='w-100'>
            <Form activeTab={optionalTab} tableRef={tableRef}  isLoading={isUpdating} isSuccess={isUpdatedSuccess} enableReset={false} defaultValuesEdit={updatedData} onSubmit={onSubmit ? onSubmit : onSubmitDefault} />

            </div>
        </FormCard>
    )
}

export default EditComponent
