const { client } = require("../config/redis");


module.exports = async function deleteCache(key) {
    await client.del(key);
}