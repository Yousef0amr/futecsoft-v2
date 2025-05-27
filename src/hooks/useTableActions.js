
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const useTableActions = ({ path, tab, editContent = null }) => {
    const navigate = useNavigate();
    const [active, setActive] = useState({ isOpen: false, editable: false, data: null });

    const handleCancel = () => {
        setActive({ isOpen: false, editable: false, data: null });
    }

    const defaultActions = useMemo(
        () => ({
            handleOnEditClick: (data) => {
                if (path) {
                    navigate(path, { state: { ...data, tab } });
                } else {
                    setActive({ isOpen: false, editable: true, data });
                }
            },
            handleDeleteClick: (data) => {
                setActive({ isOpen: true, editable: false, data });
            },
            editContent,
        }),
        [navigate, path, tab, editContent]
    );

    return {
        active,
        handleCancel,
        defaultActions
    }

}

export default useTableActions
