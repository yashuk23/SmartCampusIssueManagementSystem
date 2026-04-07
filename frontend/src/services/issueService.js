import api from "./api";

export const createIssue = async (payload) => {
  const { data } = await api.post("/issues", payload);
  return data;
};

export const getMyIssues = async (params) => {
  const { data } = await api.get("/issues/my", { params });
  return data;
};

export const getAllIssues = async (params) => {
  const { data } = await api.get("/issues", { params });
  return data;
};

export const getAssignedIssues = async (params) => {
  const { data } = await api.get("/issues/assigned", { params });
  return data;
};

export const assignIssue = async (issueId, payload) => {
  const { data } = await api.put(`/issues/${issueId}/assign`, payload);
  return data;
};

export const updateIssueStatus = async (issueId, payload) => {
  const { data } = await api.put(`/issues/${issueId}/status`, payload);
  return data;
};
