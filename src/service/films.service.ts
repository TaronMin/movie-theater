import { apiClient } from "../axios-config";

export const getMovieData = async () => {
    return await apiClient.get('/src/mockdata/data.json')
};
