import axiosFrontend from "./axiosFrontend";

const memoApi = {
    create: () => axiosFrontend.post("memo"),
    getAll: () => axiosFrontend.get("memo"),
    getOne: (id) => axiosFrontend.get(`memo/${id}`),
    update: (id, params) => axiosFrontend.put(`memo/${id}`, params),
    delete: (id) => axiosFrontend.delete(`memo/${id}`),
};

export default memoApi;
