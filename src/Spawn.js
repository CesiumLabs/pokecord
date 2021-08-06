const fetch = require("node-fetch").default;
const Constants = require("./Constants/Constants");
const randomID = () => Math.floor(Math.random() * (Constants.POKEMON_MAX - 1 + 1) + 1);
const Pokemon = require("./Structures/Pokemon");

/**
 * Spawns random pokemon
 * @param {number|string} id Pokemon id or name to spawn
 * @returns {Promise<Pokemon>}
 */
module.exports = (id) => {
    return new Promise((resolve, reject) => {
        let ID = id && ["string", "number"].includes(typeof id) ? id : randomID();

        fetch(`${Constants.BASE_API_URL}/pokemon/${ID}`)
            .then(res => {
                if (!res.ok) throw new Error(res.status === 404 ? `Pokemon with ID "${ID}" not found!` : `Rejected with status code ${res.status}!`);
                return res.json();
            })
            .then(json => {
                resolve(new Pokemon(json));
            })
            .catch(reject);
    });
};