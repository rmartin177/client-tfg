import axios from "axios"

const axiosCLient = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
    /*baseURL: "http://localhost:4000" */  /* for electron */
})

export default axiosCLient;