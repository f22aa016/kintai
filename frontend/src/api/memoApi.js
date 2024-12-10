import axiosFrontend from "./axiosFrontend";

const clockApi = {
    clockIn: () => axiosFrontend.post("/kintai/clock-in"),
    clockOut: () => axiosFrontend.patch("/kintai/clock-out"),

    getAll: () => axiosFrontend.get("memo"),
    getOne: (id) => axiosFrontend.get(`memo/${id}`),
    update: (id, params) => axiosFrontend.put(`memo/${id}`, params),
    delete: (id) => axiosFrontend.delete(`memo/${id}`),
};

export default clockApi;
