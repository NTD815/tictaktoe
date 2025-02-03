import api from "./axios";

export const refreshToken = async () => {
  try {
    await api.post("/refresh"); 
    setAuthStatus();
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
    window.location.href = "/login";
}

export const setAuthStatus = () => {
    if (typeof window === "undefined") {
        return false; 
    }
    localStorage.setItem("isLoggedIn", "true");
}

export const getAuthStatus = () => {
    if (typeof window === "undefined") {
        return false; // Prevent access on the server
    }
    return localStorage.getItem("isLoggedIn") === "true";
}
