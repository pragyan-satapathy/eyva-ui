export interface Member {
    id: number;
    name: string;
    userName: string;
    avatar: string;
    isActive: boolean;
    role: string;
    email: string;
    teams: string[];
    createdAt: string;
    updatedAt: string;
}

export interface MembersState {
    members: Member[];
    paginatedMembers: Member[];
    count: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined | null;
    selectedMembers: Member[];
  }

