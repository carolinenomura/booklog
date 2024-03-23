const axios = require('axios').default;
const dotenv = require('dotenv');
dotenv.config();

const api = axios.create({
    baseURL: 'https://www.skoob.com.br',
    headers: {
        Cookie: process.env.SKOOB_AUTH,
    },
});

async function fetch(route) {
    const response = await api.get(route);
    return response;
}

module.exports = { fetch };