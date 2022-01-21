const axios = require('axios');
const usersURL = 'http://jsonplaceholder.typicode.com/users'

// a function that return all the users from the API
const getAllUsersFromAPI = async () => {
    return (await axios.get(usersURL));
}

module.exports = { getAllUsersFromAPI }