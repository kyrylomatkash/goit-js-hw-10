// Імпорт Axios 
import axios from "axios";
// API ключ
axios.defaults.headers.common['x-api-key'] = 'live_ngEiJ0tlH8jm6b57Ic8kQraB7N4WBqbQgP1RHJPGxrqQBfLtLt51GIfYgU4HYFzf';
axios.defaults.baseURL= "https://api.thecatapi.com/v1";
// Породи
const fetchBreeds = () => {
    return axios.get("/breeds").then((response) => response.data);
};
// Фільтр котів за породою
const fetchCatByBreed = (breedId) => {
    return axios.get(`/images/search?breed_ids=${breedId}`).then((response) => response.data);
};
// Експорт функцій
export { fetchBreeds, fetchCatByBreed };