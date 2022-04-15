import axios from "axios"
import get from "lodash/get"
import { getCookie } from "./"

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
    const gotAuthenHeader = !!get(config, "headers.Authorization", "")
    if (!gotAuthenHeader) {
        const token = getCookie("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

const callApi = async (options) => {
    if (options.url) {
        options.url =
            options.url.indexOf("http") === -1 ? options.url : options.url
    }
    const response = await axiosInstance.request(options)
    return response.data
}

export default callApi

// how to use this

// POST METHOD
// callApi({
//     url: `/user/register`,
//     method: "POST",
//     data
//   }).then((response) => response)

//GET METHOD
// callApi({
//     url: `/todos`,
//     method: "GET"
//   }).then((response) => response)