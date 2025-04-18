import { getRequest } from "../utils/request_handler";

export const fetchAllUsers = async () => await getRequest('users');

export const fetchUserById = async (id) => await getRequest(`user/${id}`);