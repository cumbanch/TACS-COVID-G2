import axios from 'axios';
import { getUserAccessToken } from '../components/session-managment/utils';

class AxiosWrapper {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        })
    }

    async get(endpoint) {
        const response = await this.axiosInstance.get(endpoint);
        return response.data;
    }
}

export default AxiosWrapper;