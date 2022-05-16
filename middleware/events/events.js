const axios = require('axios');

module.exports.GetProductDetailsEvent = async (payload) => {
    try {
        const respond = await axios.post('http://localhost:4003/product/app-events', {
            payload
        });
        return respond;
    } catch (error) {
        throw error;
    }

}