import { FC, useState } from 'react';
import { searchMembers } from './store/allThunk';
import { useAppDispatch } from './utils/hooks';

const SearchBar: FC = () => {
    // useAppDispatch
    const dispatch = useAppDispatch();

    // useState
    const [query, setQuery] = useState('');

    // functions
    const handleSearch = () => {
        dispatch(searchMembers(query));
    };

    return (
        <div className="my-2 flex items-center px-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members..."
                className="w-full h-10 px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:border-gray-700"
            />
            <button
                onClick={handleSearch}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 rounded-lg text-sm p-2 ml-2"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;