import { useEffect } from "react"
import { fetchAllMembers } from "./store/allThunk"
import { useAppDispatch, useAppSelector } from './utils/hooks';
import UserDataTable from "./UserDataTable";
import { Pagination } from "./Pagination";
import SearchBar from "./SearchBar";
import Header from "./Header";

export default function LandingPage() {
  // dispatch
  const dispatch = useAppDispatch();

  // useAppSelector
  const members = useAppSelector(state => state.member.paginatedMembers)

  // useEffect
  useEffect(() => {
    dispatch(fetchAllMembers());
  }, []);

  return (
    <div className="overflow-x-auto">
      <Header />
      <SearchBar />
      <UserDataTable members={members} />
      <Pagination />
    </div>
  )
}