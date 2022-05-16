const axios = require('axios');

module.exports.GetProductDetailsEvent = async (payload) => {
    try {
        const respond = await axios.post('http://localhost:4004/app-events', {
            payload: payload
        });
        return respond;
    } catch (error) {
        throw error;
    }

}