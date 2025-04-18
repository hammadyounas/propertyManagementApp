import { getRequest } from "../utils/request_handler";

export const fetchAllClients = async () => await getRequest("clients");
