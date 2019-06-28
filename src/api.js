import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCompanies = () => {
    return axios(`${API_URL}/api/companies/`)
        .then( response => {
            return response;
        });
}