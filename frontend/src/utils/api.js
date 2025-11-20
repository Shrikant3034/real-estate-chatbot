import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/chatbot";

export async function uploadExcel(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload/`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return res.data;
}

export async function queryBackend(query, metric) {
  const res = await axios.post(`${API_BASE}/query/`, {
    query,
    metric,
  });

  return res.data;
}
