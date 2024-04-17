const API_KEY = "f3a014539bf35c8269ae934395660186"
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}