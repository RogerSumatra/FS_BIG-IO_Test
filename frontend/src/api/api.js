// frontend/src/api/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Get all stories
export const getAllStories = async () => {
  const response = await axios.get(`${API_BASE_URL}/stories`);
  return response.data;
};

// Get story by ID
export const getStoryById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/stories/${id}`);
  return response.data;
};

// Add new story
export const addStory = async (story) => {
  const response = await axios.post(`${API_BASE_URL}/stories`, story);
  return response.data;
};

// Get all chapters in a story
export const getChaptersByStoryId = async (storyId) => {
  const response = await axios.get(`${API_BASE_URL}/stories/${storyId}/chapter`);
  return response.data;
};