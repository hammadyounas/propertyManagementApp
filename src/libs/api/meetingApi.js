import {  postRequest, patchRequest, getRequest } from "../utils/request_handler";

// Get meetings filtered by startDate
export const fetchMeetingsByStartDate = async (startDate) => 
  await getRequest(`meetings?startDate=${startDate}`);

// Create a new meeting
export const createMeeting = async (data) => await postRequest("meetings", data);

// Update an existing meeting
export const updateMeeting = async (id, data) => await patchRequest(`meetings/${id}`, data);
