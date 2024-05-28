import { FC, useEffect, useState } from 'react';
import { Member } from './utils/memberTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { fetchAllMembers } from './store/allThunk';
import DeleteUserConfirmationDialog from './DeleteUserConfirmationDialog';
import EditUserDialog from './EditUserDialog';
import { toggleMember, selectAllMembers } from './store/memberSlice';
import { BASE_URL } from './utils/constant';

interface UserDataTableProps {
    members: Member[];
}

const UserDataTable: FC<UserDataTableProps> = ({ members: initialMembers }) => {
    // useState
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isHeaderChecked, setIsHeaderChecked] = useState(false);

    // useAppDispatch
    const dispatch = useAppDispatch();

    // useAppSelector
    const selectedMembers = useAppSelector(state => state.member.selectedMembers);

    // functions
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}/members/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await dispatch(fetchAllMembers());
                setMembers(members.filter(member => member.id !== id));
                setSelectedMemberId(null);
            } else {
                console.error('Failed to delete member');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = async (updatedMember: Member) => {
        try {
            const response = await fetch(`${BASE_URL}/members/${updatedMember.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMember)
            });
            if (response.ok) {
                setMembers(members.map(member => member.id === updatedMember.id ? updatedMember : member));
                setSelectedMember(null);
            } else {
                console.error('Failed to update member');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleHeaderCheckboxChange = () => {
        const newIsHeaderChecked = !isHeaderChecked;
        setIsHeaderChecked(newIsHeaderChecked);
        if (newIsHeaderChecked) {
            dispatch(selectAllMembers(members));
        } else {
            dispatch(selectAllMembers([]));
        }
    };


    // useEffect
    useEffect(() => {
        setMembers(initialMembers)
        setIsHeaderChecked(selectedMembers.length === initialMembers.length);
    }, [initialMembers, selectedMembers]);

    return (
        <>
            <table className="min-w-full bg-white">
                <thead style={{ backgroundColor: "#F9FAFB" }} className="whitespace-nowrap rounded">
                    <tr>
                        <th className="px-0 py-1 w-8">
                            <input
                                id="checkbox"
                                type="checkbox"
                                checked={isHeaderChecked}
                                onChange={handleHeaderCheckboxChange}
                            />
                        </th>
                        <th className="px-4 py-1 text-left text-sm">
                            Name
                        </th>
                        <th className="px-4 py-1 text-left text-sm">
                            Status
                        </th>
                        <th className="px-4 py-1 text-left text-sm">
                            Role
                        </th>
                        <th className="px-4 py-1 text-left text-sm">
                            Email Address
                        </th>
                        <th className="px-4 py-1 text-left text-sm">
                            Teams
                        </th>
                        <th className="px-4 py-1 text-left text-sm">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                    {
                        members.map(member =>
                            <tr className="hover:bg-gray-50" key={member?.id}>
                                <td className="p-4 w-8">
                                    <input
                                        id="checkbox1"
                                        type="checkbox"
                                        checked={selectedMembers.some(m => m.id === member.id)}
                                        onChange={() => dispatch(toggleMember(member))}
                                    />
                                </td>
                                <td className="text-sm text-black">
                                    <div className="flex items-center cursor-pointer w-max">
                                        <img src={member?.avatar} alt='avatar' className="w-9 h-9 rounded-full shrink-0" />
                                        <div className="ml-4">
                                            <p className="text-sm text-black">{member?.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{member?.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-black">
                                    {
                                        member?.isActive ?
                                            <span id="badge-dismiss-green" className="inline-flex items-center px-2 py-1 text-sm text-green-700 bg-green-200 rounded-2xl">
                                                Active
                                            </span>
                                            :
                                            <span id="badge-dismiss-green" className="inline-flex items-center px-2 py-1 text-sm text-red-700 bg-red-200 rounded-2xl">
                                                InActive
                                            </span>
                                    }
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {member?.role}
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {member?.email}
                                </td>
                                <td className="p-4 text-sm text-black">
                                    {member?.teams[0] &&
                                        <span style={{ backgroundColor: "#F9F5FF", color: "#6941C6" }} className="ml-1 inline-flex items-center px-2 py-1 text-sm rounded-2xl">
                                            {member?.teams[0]}
                                        </span>
                                    }
                                    {member?.teams[1] &&
                                        <span style={{ backgroundColor: "#EFF8FF", color: "#175CD3" }} className="ml-1 inline-flex items-center px-2 py-1 text-sm rounded-2xl">
                                            {member?.teams[1]}
                                        </span>
                                    }
                                    {member?.teams[2] &&
                                        <span style={{ backgroundColor: "#EEF4FF", color: "#3538CD" }} className="ml-1 inline-flex items-center px-2 py-1 text-sm rounded-2xl">
                                            {member?.teams[2]}
                                        </span>
                                    }
                                    {member?.teams.length > 3 &&
                                        <span style={{ backgroundColor: "#F2F4F7" }} className="ml-1 inline-flex items-center px-2 py-1 text-sm rounded-full">
                                            +{member?.teams.length - 3}
                                        </span>
                                    }
                                </td>
                                <td className="p-4">
                                    <button className="mr-4" title="Delete" onClick={() => setSelectedMemberId(member?.id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                    <button className="mr-4" title="Edit" onClick={() => setSelectedMember(member)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {(selectedMemberId || (selectedMemberId === 0)) &&
                <DeleteUserConfirmationDialog
                    onConfirm={() => handleDelete(selectedMemberId)}
                    onCancel={() => setSelectedMemberId(null)}
                    message='Are you sure you want to delete this user?'
                />
            }
            {selectedMember && (
                <EditUserDialog
                    member={selectedMember}
                    onConfirm={handleUpdate}
                    onCancel={() => setSelectedMember(null)}
                />
            )}
        </>
    )
}


export default UserDataTable;