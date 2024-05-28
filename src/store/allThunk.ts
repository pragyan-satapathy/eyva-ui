import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/api";
import { Member } from "../utils/memberTypes";
import { BASE_URL } from "../utils/constant";

export const fetchAllMembers = createAsyncThunk(
  'member/fetchAllMembers',
  async () => {
    const response = await fetch(`${api.getAllMembers}`, { method: "GET" });
    const data: { members: Member[], count: number } = await response.json();
    return data
  }
);

export const fetchPaginatedMembers = createAsyncThunk(
  'member/fetchPaginatedMembers',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetch(`${api.getAllMembers}?page=${page}&limit=${limit}`, { method: "GET" });
    const data: { members: Member[]; count: number } = await response.json();
    return data;
  }
);

export const searchMembers = createAsyncThunk(
  'member/searchMembers',
  async (query: string) => {
    const response = await fetch(`${BASE_URL}/members?search=${query}`);
    const data = await response.json();
    return data.members;
  }
);
