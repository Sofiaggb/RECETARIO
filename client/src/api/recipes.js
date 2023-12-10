import axios from "./axios";

export const getPublicMenuRequest = () => axios.get('/menu');
export const getSearchRequest = search => axios.get('/search/' + search);

export const getMenuRequest = () => axios.get('/your-menu');
export const getRecipeRequest = id => axios.get('/article/' + id);
export const getPrivSearchRequest = search => axios.get('/priv-search/' + search)
export const createRecipeRequest = recipe => axios.post('/save', recipe);
export const updateRecipeRequest = (id, recipe) => axios.put('/article/' + id, recipe);
export const deleteRecipeRequest = id => axios.delete('/article/' + id);
