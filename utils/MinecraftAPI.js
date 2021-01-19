const axios = require('axios');

module.exports = class _MinecaftAPI {

    /**
     * 
     * @param {String} name 
     * @returns {<String>}
     */

    static async getUuid(name) {
        if (name == null) return null;
        let { data } = await axios.post(`https://api.mojang.com/profiles/minecraft`, [name]);
        return data[0];

    }

    /**
     * @param {String} uuid
     * @returns {<String>}
     */

    static async getName(uuid) {
        if (uuid == null) return null;
        let { data } = await axios.get(`https://api.mojang.com/user/profiles/${uuid}/names`);

        return data

    }

}