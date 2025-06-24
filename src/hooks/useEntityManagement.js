import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../utils/auth';

/**
 * A helper function to dynamically update query data in RTK Query cache.
 *
 * @param {Object} apiSlice - The RTK Query slice containing `util.updateQueryData`.
 * @param {string} cacheKey - The cache key for the query.
 * @param {Object} queryArgs - The arguments for the query.
 * @param {Function} updater - A callback function to modify the cache data.
 * @param {Function} dispatch - The Redux dispatch function.
 */
const updateCache = ({ apiSlice, cacheKey, queryArgs, updater, dispatch }) => {
    dispatch(
        apiSlice.util.updateQueryData(
            cacheKey,
            queryArgs,
            (draft) => {
                return updater(draft);
            }
        )
    );
};


const useEntityManagement = ({
    apiSlice,
    queryHook,
    addMutationHook,
    updateMutationHook,
    deleteMutationHook,
    cacheKey,
    defaultQueryArgs,
    skip = false,
    queryParams,
    identifier = 'Id',
}) => {
    const { data, isLoading, error, refetch } = queryHook(defaultQueryArgs, { skip,...queryParams });
    const [addEntity, { isLoading: isAdding, isSuccess: isAddedSuccess }] = addMutationHook();
    const [updateEntity, { isLoading: isUpdating, isSuccess: isUpdatedSuccess }] = updateMutationHook();
    const [deleteEntity, { isLoading: isDeleting }] = deleteMutationHook();
    const dispatch = useDispatch();
    const { setShowLoginModal } = useAuth()
    const [isLoaded] = useState(isLoading);

    const deleteEntityFromCache = useCallback(
        ({ id }) => {
            updateCache({
                apiSlice,
                cacheKey,
                queryArgs: defaultQueryArgs,
                updater: (draft) => {
                    if (Array.isArray(draft)) {
                        const filteredData = draft.filter((item) => item[identifier] !== id);
                        return filteredData;
                    }
                    throw new Error('Query data is not an array');
                },
                dispatch,
            });
        },
        [apiSlice, cacheKey, defaultQueryArgs, identifier, dispatch]
    );

    const addEntityToCache = useCallback(
        (newEntity) => {
            updateCache({
                apiSlice,
                cacheKey,
                queryArgs: defaultQueryArgs,
                updater: (draft) => {
                    if (Array.isArray(draft)) {
                        draft.unshift(newEntity);
                    } else {
                        throw new Error('Query data is not an array');
                    }
                },
                dispatch,
            });
        },
        [apiSlice, cacheKey, defaultQueryArgs, dispatch]
    );

    const updateEntityInCache = useCallback(
        (updatedEntity) => {
            updateCache({
                apiSlice,
                cacheKey,
                queryArgs: defaultQueryArgs,
                updater: (draft) => {
                    if (Array.isArray(draft)) {
                        const index = draft.findIndex((item) => item[identifier] === updatedEntity[identifier]);
                        if (index !== -1) {
                            draft[index] = updatedEntity;
                        }
                    } else {
                        throw new Error('Query data is not an array');
                    }
                },
                dispatch,
            });
        },
        [apiSlice, cacheKey, defaultQueryArgs, identifier, dispatch]
    );

    if (isLoaded) {
        if (error) {
            if (error.status === 401) {
                setShowLoginModal(true)
            }
        }
    }

    return {
        data,
        isLoading,
        refetch,
        addEntity,
        isAdding,
        updateEntity,
        isUpdating,
        deleteEntity,
        isDeleting,
        isAddedSuccess,
        isUpdatedSuccess,
        deleteEntityFromCache,
        addEntityToCache,
        updateEntityInCache,
    };
};

export default useEntityManagement;
