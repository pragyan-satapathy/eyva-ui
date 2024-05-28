import { FC } from "react";

interface DeleteUserConfirmationDialog {
    onConfirm: () => void,
    onCancel: () => void,
    message: string
}
const DeleteUserConfirmationDialog: FC<DeleteUserConfirmationDialog> = ({ onConfirm, onCancel, message }) => {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>{message}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className={`focus:outline-none border border-gray-500 rounded-lg text-sm px-2 p-2 ml-2`}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={`focus:outline-none text-white bg-purple-700 rounded-lg text-sm px-2 p-2 ml-2`}
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserConfirmationDialog;