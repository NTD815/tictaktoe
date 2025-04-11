import { create } from 'zustand';
import api from "@/lib/axios";
import { BaseUser, AuthData } from "@/types/user"

interface AuthState {
    user: BaseUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    initialized: boolean;
    setAuth: (user: BaseUser) => void;
    initialize: () => Promise<BaseUser | null>;
    login: (email: string, password: string) => Promise<BaseUser | null>;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true, 
    error: null,
    initialized: false, 
  
    setAuth: (user: BaseUser) => set({ 
      user, 
      isAuthenticated: !!user, 
      isLoading: false, 
      initialized: true 
    }),
  
    // Actions
    initialize: async () => {
      set({ isLoading: true });
      
      try {
        const res = await api.get('/me');
        get().setAuth(res.data.user);
        return res.data.user;
      } catch (error: any) {
        // Even if it fails, we mark as initialized
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false, 
          error: error.message,
          initialized: true
        });
        return null;
      }
    },
    
    login: async (email, password) => {
      set({ isLoading: true, error: null });
      
      try {
        const res = await api.post('/login', { email, password });
        
        const userRes = await api.get('/me');
        get().setAuth(userRes.data.user);
        
        return userRes.data.user;
      } catch (error: any) {
        set({ 
          isLoading: false, 
          error: error.response?.data?.message || error.message 
        });
        throw error;
      }
    },
    
    logout: async () => {
      set({ isLoading: true });
      
      try {
        await api.post('/logout');

        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });

      } catch (error: any) {
        console.error('Logout error:', error);
        set({ error: error.message });
      }
    },
    
    register: async (userData: AuthData) => {
      set({ isLoading: true, error: null });
      
      try {
        const res = await api.post('/register', userData);
        
        const userRes = await api.get('/me');
        get().setAuth(userRes.data.user);
        
        return userRes.data.user;
      } catch (error: any) {
        set({ 
          isLoading: false, 
          error: error.response?.data?.message || error.message 
        });
        throw error;
      }
    }
  }));

export default useAuthStore;