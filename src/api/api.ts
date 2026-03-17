import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5173",
	withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

let isRefreshing = false;
let failedRequests: {
    resolve: (value: unknown) => void,
    reject: (reason?: any) => void,
}[] = [];

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
    async (err) => {
        const isAuthRoute = err.config?.url?.startsWith("/api/auth");
        if(err.response?.status === 401 && !isAuthRoute) {
            if(isRefreshing) {
                // store completion triggers inside the queue,
                // define the retry request inside .then()
                return new Promise((resolve, reject) => {
                    failedRequests.push({ resolve, reject });  
                }).then(newToken => {
                    return axios(err.config?.url, {
                        method: err.config?.method,
                        data: err.config?.data ? err.config?.data : null,
                        headers: {
                            Authorization: `Bearer ${newToken}`,   
                        }
                    });
                })
            }

            isRefreshing = true;

            try {
                const token = localStorage.getItem("token");
                if(!token) throw new Error("Null access token");

                const exp = getExpiryTime(token);
                if(Date.now() >= exp) {
                    await refreshAccessToken();
                    const token = JSON.parse(localStorage.getItem("token")!)["accessToken"];
                    processQueue(null, token);
                    return axios(err.config?.url, {
                        method: err.config?.method,
                        data: err.config?.data ? JSON.parse(err.config?.data) : null,
                        headers: {
                            Authorization: `Bearer ${token}`,   
                        }
                    });
                }
                else throw new Error("An unexpected error occured");
            } catch(e) {
                processQueue(e);
                localStorage.removeItem("token");
                window.location.href = "/login";
            } finally {
                isRefreshing = false;
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

function processQueue(error: unknown, token: null | string = null) {
    failedRequests.forEach(({ resolve, reject }) => {
        if(error) reject(error);
        else resolve(token);
    })
}

export default api;
