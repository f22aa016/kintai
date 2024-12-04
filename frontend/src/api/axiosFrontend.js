import axios from "axios";

const BASE_URL = "http://localhost:5050/api/v1";
const getToken = () => localStorage.getItem("token");

const axiosFrontend = axios.create({
    baseURL: BASE_URL,
});

//API前処理
axiosFrontend.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`, //リクエストヘッダーにJWTをつけてサーバーに渡す
        },
    };
});

axiosFrontend.interceptors.response.use(
    (response) => {
        return response.data;
    },

    (err) => {
        throw err.response;
    }
);

export default axiosFrontend;
