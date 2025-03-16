import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const useNotification = () => {

    const success = (message) => {
        toast.success(message, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
        });
    };

    const error = (message) => {
        toast.error(message, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
        });
    };


    const notify = (message, type = 'success') => {
        switch (type) {
            case 'success':
                success(message);
                break;
            case 'error':
                error(message);
                break;
            default:
                break;
        }
    };

    return { success, error, notify };
};

export default useNotification;
