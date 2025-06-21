import api from './api';

// This function sends the user's form data to the backend AI generator.
// The api client will automatically attach the auth token.
export const generatePlanAPI = async (planData) => {
    const { data } = await api.post('/api/ai/generate', planData);
    return data;
};