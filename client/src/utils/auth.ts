import api from "./axios";

export const refreshToken = async () => {
  try {
    await api.post("/refresh"); 
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

export const signOut = () => {
    //
}
