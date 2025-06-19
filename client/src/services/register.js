import axios from "axios"
const baseUrl = "/api/users"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const register = async (userData) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, userData, config)
    return response.data
}

export default { register, setToken };
