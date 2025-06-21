import api from './api'; 

 
export const completeTaskAPI = async (taskId) => {
     const { data } = await api.post('/api/users/tasks/complete', { taskId });
     return data;
};