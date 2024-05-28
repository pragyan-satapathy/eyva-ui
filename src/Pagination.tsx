import React, { useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { fetchPaginatedMembers } from "./store/allThunk";

export function Pagination() {
    // useAppDispatch
    const dispatch = useAppDispatch()

    // useState
    const [active, setActive] = React.useState(1);

    // useAppSelector
    const count = useAppSelector(state => state.member.count)

    // functions
    const fetchPaginated = (page: number, limit: number) => {
        dispatch(fetchPaginatedMembers({ page, limit }));
    };

    const getItemProps = (index: number) => ({
        className: `w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer 
                ${active === index ? "bg-indigo-100 text-gray-800" : "bg-white text-gray-800"}`,
        onClick: () => setActive(index),
    });

    const next = () => {
        if (active === Math.ceil(count / 10)) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    // useEffect
    useEffect(() => {
        fetchPaginated(active, 10)
    }, [active])

    return (
        <div className="flex items-center justify-between px-4">
            <button
                className={`border border-gray-500 rounded-lg flex items-center gap-2 px-2 py-1 m-1 text-gray-800 ${active === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </button>
            <div className="flex items-center gap-2">
                {[...Array(Math.ceil(count / 10))].map((val, index) =>
                    <div {...getItemProps(index+1)} key={index}>{index+1}</div>
                )}
            </div>
            <button
                className={`border border-gray-500 rounded-lg flex items-center gap-2 px-2 py-1 m-1 text-gray-800 ${active === Math.ceil(count / 10) ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={next}
                disabled={active === Math.ceil(count / 10)}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </button>
        </div>
    );
}
