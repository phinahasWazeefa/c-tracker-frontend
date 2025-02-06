import axios from 'axios'
import {API_URL,DEV_API_URL} from './config/constants'

const instance = axios.create({
    baseURL:DEV_API_URL,
});

export default instance