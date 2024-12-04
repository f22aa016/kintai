import axiosFrontend from "./axiosFrontend";

const authApi = {
    register: (params) => axiosFrontend.post("auth/register", params),
    login: (params) => axiosFrontend.post("auth/login", params),
    verifyToken: () => axiosFrontend.post("auth/verify-token"),
};

export default authApi;
