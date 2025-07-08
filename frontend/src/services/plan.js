 import api from './api';

 export const savePlanAPI = (planData) => {
    return api.post('/api/plans', planData);
};

 export const getSavedPlansAPI = () => {
    return api.get('/api/plans');
};

 export const deletePlanAPI = (planId) => {
    return api.delete(`/api/plans/${planId}`);
};