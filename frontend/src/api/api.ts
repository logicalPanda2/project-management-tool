import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5173",
	withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token) config.headers.Authorization = `Bearer ${JSON.parse(token)["accessToken"]}`;
        return config;
    },
    (err) => Promise.reject(err),
);

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const isAuthRoute = err.config?.url?.startsWith("/api/auth");
        if(err.response?.status === 401 && !isAuthRoute) {
            try {
                const token = localStorage.getItem("token");
                if(!token) throw new Error("Null access token");

                const exp = getExpiryTime(token);
                if(Date.now() >= exp) {
                    refreshAccessToken();
                }
                else throw new Error("An unexpected error occured");
            } catch(e) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(err);
    }
);

function getExpiryTime(token: string) {
    const JWT = JSON.parse(token)["accessToken"];
    const payload = JWT.split(".")[1];
    const decoded = atob(payload);
    const claims = JSON.parse(decoded);
    
    return claims["exp"] * 1000;
}

async function refreshAccessToken() {
    try {
        const res = await api.post("/api/auth/refresh");
        const token = res.data;
        localStorage.setItem("token", JSON.stringify(token));
    } catch(e) {
        console.error(e);
    }
}

export default api;
