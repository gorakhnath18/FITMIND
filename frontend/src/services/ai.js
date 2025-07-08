import api from './api';

export const generatePlanAPI = async (planData) => {
    const { data } = await api.post('/api/ai/generate', planData);
    return data;
};