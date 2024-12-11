import authApi from "../api/outhApi"

const authUtils = {
    // JWTチェック
    isAuthebticated: async () => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        try {
            const res = await authApi.verifyToken();
            return res.user;
        } catch {
            console.log(token);
            return false;
        }
    },
};

export default authUtils;