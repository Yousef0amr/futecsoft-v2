import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useNotification from "./useNotification";

const useEntityOperations = ({ addEntity = () => { }, updateEntity = () => { }, deleteEntity = () => { } }) => {
    const { success, error } = useNotification();
    const { t } = useTranslation();

    const handleEntityOperation = useCallback(async ({
        operation,
        data,
        cacheUpdater,
        cacheData,
        successMessage,
        errorMessage,
        enableApiMessage = false,
        finalCallback = () => { }
    }) => {
        try {
            let result;
            switch (operation) {
                case "add":
                    result = await addEntity(data).unwrap();
                    break;
                case "update":
                    result = await updateEntity(data).unwrap();
                    break;
                case "delete":
                    result = await deleteEntity(data).unwrap();
                    break;
                default:
                    throw new Error("Invalid operation type");
            }
            if (result?.Success) {
                cacheUpdater && cacheUpdater(cacheData);
                success(t(successMessage));
                return result;
            } else {
                throw new Error(result);
            }
        } catch (e) {
            error(t(enableApiMessage ? e.data.ErrorMessage  : errorMessage));
            return e;
        } finally {
            finalCallback && finalCallback();
        }
    }, [addEntity, updateEntity, deleteEntity, success, error, t]);

    return { handleEntityOperation };
};

export default useEntityOperations;
