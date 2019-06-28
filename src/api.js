import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCompanies = () => {
    return axios(`${API_URL}/api/companies/`)
        .then( response => {
            return response;
        });
}

export const getJobListings = (company_slug) => {
    return axios(`${API_URL}/api/job_listing/${company_slug}`)
        .then( response => {
            return response;
        });
}