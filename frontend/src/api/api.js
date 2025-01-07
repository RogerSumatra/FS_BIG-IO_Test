import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getAllStories = async () => {
    const response = await axios.get(`${API_BASE_URL}/stories`);
    return response.data;
};

export const getStoryById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/stories/${id}`);
    return response.data;
};

export const addStory = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/stories`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const updateStory = async (id, formData) => {
    const response = await axios.put(`${API_BASE_URL}/stories/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const addChapter = async (storyId, chapterData) => {
    const response = await axios.post(`${API_BASE_URL}/stories/${storyId}/chapter`, chapterData);
    return response.data;
};

export const getChaptersByStoryId = async (storyId) => {
    const response = await axios.get(`${API_BASE_URL}/stories/${storyId}/chapter`);
    return response.data;
};

export const getChapterById = async (chapterId) => {
    const response = await axios.get(`${API_BASE_URL}/chapter/${chapterId}`);
    return response.data;
};

export const updateChapter = async (chapterId, chapterData) => {
    const response = await axios.put(`${API_BASE_URL}/chapter/${chapterId}`, chapterData);
    return response.data;
};

export const deleteStoryById = async (storyId) => {
    const response = await axios.delete(`${API_BASE_URL}/stories/${storyId}`);
    return response.data;
};

export const deleteChapterById = async (chapterId) => {
    const response = await axios.delete(`${API_BASE_URL}/chapter/${chapterId}`);
    return response.data;
};