import { FC, useEffect, useState } from 'react'
import { useAppSelector } from './utils/hooks'
import DeleteUserConfirmationDialog from './DeleteUserConfirmationDialog';
import { BASE_URL } from './utils/constant';

const Header: FC = () => {
    // useAppSelector
    const count = useAppSelector(state => state.member.count)
    const selectedMembers = useAppSelector(state => state.member.selectedMembers);

    // useState
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0)

    // functions
    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const deleteMember = async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}/members/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                console.error('Failed to delete member');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleConfirmDelete = async () => {
        const deletePromises = selectedMembers.map(member => deleteMember(member.id));
        await Promise.all(deletePromises);
        window.location.reload();
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    // useEffect
    useEffect(() => {
        setSelectedCount(selectedMembers.length)
    }, [selectedMembers])

    return (
        <div className="flex items-center justify-between h-16">
            <div>
                <span className="text-lg font-bold px-4">
                    Team Members
                </span>
                <span style={{ backgroundColor: "#F9F5FF", color: "#6941C6" }} className="ml-1 mt-1 px-2 py-1 inline-flex items-center text-sm rounded-2xl">
                    {count} Users
                </span>
            </div>
            <button
                type="button"
                className={`focus:outline-none text-white ${selectedCount === 0 ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-700'} rounded-lg text-sm px-2 p-2 ml-2`}
                onClick={handleDelete}
                disabled={selectedCount === 0}
            >
                Delete Selected
            </button>
            {showConfirmation &&
                <DeleteUserConfirmationDialog
                    onConfirm={() => handleConfirmDelete()}
                    onCancel={() => handleCancelDelete()}
                    message='Are you sure you want to delete selected users?'
                />
            }
        </div>
    )
}

export default Header