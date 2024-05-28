import { createSlice } from "@reduxjs/toolkit";
import { fetchAllMembers, fetchPaginatedMembers, searchMembers } from "./allThunk";
import { MembersState } from "../utils/memberTypes";

const initialState: MembersState = {
    members: [],
    paginatedMembers: [],
    count: 0,
    status: 'idle',
    error: null,
    selectedMembers: []
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        toggleMember: (state, action) => {
            const member = action.payload;
            const existingMember = state.selectedMembers.find(m => m.id === member.id);
            if (existingMember) {
                state.selectedMembers = state.selectedMembers.filter(m => m.id !== member.id);
            } else {
                state.selectedMembers.push(member);
            }
        },
        selectAllMembers: (state, action) => {
            state.selectedMembers = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMembers.fulfilled, (state, action) => {
                state.members = action?.payload?.members;
                state.count = action?.payload?.count;
            })
            .addCase(fetchPaginatedMembers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPaginatedMembers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.paginatedMembers = action.payload.members;
            })
            .addCase(fetchPaginatedMembers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(searchMembers.fulfilled, (state, action) => {
                state.paginatedMembers = action.payload;
            })
    }
})

export const { toggleMember, selectAllMembers } = memberSlice.actions;
export default memberSlice.reducer;