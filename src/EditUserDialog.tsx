import { FC, useState } from 'react';
import { Member } from './utils/memberTypes';

interface EditUserDialogProps {
    member: Member;
    onCancel: () => void;
    onConfirm: (updatedMember: Member) => void;
}

const EditUserDialog: FC<EditUserDialogProps> = ({ member, onCancel, onConfirm }) => {
    const [name, setName] = useState(member.name);
    const [role, setRole] = useState(member.role);
    const [email, setEmail] = useState(member.email);

    const handleSave = () => {
        const updatedMember = { ...member, name, role, email };
        onConfirm(updatedMember);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">User Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Product Designer">Product Designer</option>
                        <option value="Developer">Developer</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="focus:outline-none text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 rounded-lg text-sm px-4 py-2"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserDialog;
