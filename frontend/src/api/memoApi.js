import axiosFrontend from "./axiosFrontend";

const clockApi = {
    clockIn: () => axiosFrontend.post("/kintai/clock-in"),
    clockOut: () => axiosFrontend.patch("/kintai/clock-out"),
    breakStart: () => axiosFrontend.patch("/kintai/break-start"),
    breakEnd: () => axiosFrontend.patch("/kintai/break-end"),

    getAllKintai: () => axiosFrontend.get("/kintai/getAllKintai"),
    getOne: (id) => axiosFrontend.get(`memo/${id}`),
    update: (id, params) => axiosFrontend.put(`memo/${id}`, params),
    delete: (id) => axiosFrontend.delete(`memo/${id}`),
};

export default clockApi;
