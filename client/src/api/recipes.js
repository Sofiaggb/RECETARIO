import axios from "./axios";

export const getPublicMenuRequest = () => axios.get('/menu');

export const getMenuRequest = () => axios.get('/your-menu');
export const getRecipeRequest = id => axios.get('/article/' + id);
export const createRecipeRequest = recipe => axios.post('/save', recipe);
export const updateRecipeRequest = (id, recipe) => axios.put('/article/' + id, recipe);
export const deleteRecipeRequest = id => axios.delete('/article/' + id);
