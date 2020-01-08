import axios from "axios"
import JWT from "jsonwebtoken"

const API = axios.create({
    baseURL: "http://localhost:3001"
})

API.setAuthHeader = function (token) {
    this.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

API.handleTokenExpiry = function (removeToken) {
    API.interceptors.request.use(function (config) {
        const authHeader = config.headers.common.Authorization

        if (authHeader) {
            const token = authHeader.split("Bearer ")[1]
            const { exp } = JWT.decode(token)
            const now = Date.now().valueOf() / 1000

            if (exp <= now) {
                removeToken()
            }
        }

        return config
    })    
}


export default API
