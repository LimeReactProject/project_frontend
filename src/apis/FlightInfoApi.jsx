import axios from "axios";

export const apiClient = axios.create({
    baseURL:'http://localhost:8080/api/flight-info',
    headers:{
        'Content-Type': 'application/json',
    }
});


    
