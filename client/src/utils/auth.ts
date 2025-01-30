import api from "./axios";

export const refreshToken = async () => {
  try {
    await api.post("/refresh"); 
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

export const verifyAuth = async () => {
    await api.get("/me");
}

export const signOut = () => {
    console.log("redirecting to login...")
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/auth/login";
}

export const setAuthStatus = () => {
    localStorage.setItem("isLoggedIn", "true");
}

export const getAuthStatus = () => {
    return localStorage.getItem("isLoggedIn") === "true";
}
