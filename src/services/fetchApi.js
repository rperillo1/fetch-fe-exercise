import axios from 'axios';

const BASE_URL = 'https://frontend-take-home.fetchrewards.com/form';

export const fetchOccupationsAndStates = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch(err) {
        console.log('Get Error: ' + err)
    };
};

export const postFormData = async (userData) => {
    try {
        const response = await axios.post(BASE_URL, userData);
        return response.status;
    } catch (err) {
        console.log('Post Error: ' + err)
    };
};