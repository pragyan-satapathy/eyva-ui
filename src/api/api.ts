import { BASE_URL } from "../utils/constant"

export const getAllMembers = `${BASE_URL}/members`
export const searchMember = (query: string) => `${BASE_URL}/members?search=${query}`