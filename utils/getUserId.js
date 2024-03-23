const { fetch } = require('./fetch.js');

async function getUserId(username) {
    const response = await fetch(`/perfil/${username}`);
    const url = response.request.res.responseUrl;
    const userId = url.substring('https://www.skoob.com.br/usuario/'.length);
    if (userId === '') return null;
    return userId;

}

module.exports = { getUserId };
