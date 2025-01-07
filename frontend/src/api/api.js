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
  try {
    const response = await axios.post(`${API_BASE_URL}/stories`, story, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to add story");
  }
};

// Edit story
export const updateStory = async (id, storyData) => {
  const response = await axios.put(`${API_BASE_URL}/stories/${id}`, storyData);
  return response.data;
};

// Add chapter
export const addChapter = async (storyId, chapterData) => {
  const response = await axios.post(`${API_BASE_URL}/stories/${storyId}/chapter`, chapterData);
  return response.data;
};

// Get all chapters in a story
export const getChaptersByStoryId = async (storyId) => {
  const response = await axios.get(`${API_BASE_URL}/stories/${storyId}/chapter`);
  return response.data;
};

// Get chapter by ID
export const getChapterById = async (chapterId) => {
  const response = await axios.get(`${API_BASE_URL}/chapter/${chapterId}`);
  return response.data;
};

// Update chapter
export const updateChapter = async (chapterId, chapterData) => {
  const response = await axios.put(`${API_BASE_URL}/chapter/${chapterId}`, chapterData);
  return response.data;
};

// Delete story and related chapters
export const deleteStoryById = async (storyId) => {
  const response = await axios.delete(`${API_BASE_URL}/stories/${storyId}`);
  return response.data;
};