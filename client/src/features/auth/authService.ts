import axios from 'axios';

const register = async (userData: any) => {
    const response = await axios.post('/users/login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const authService = { register };
export default authService;
