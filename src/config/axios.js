import axios from "axios"

const axiosCLient = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
})

export default axiosCLient;