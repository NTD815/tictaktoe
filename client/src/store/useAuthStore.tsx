import { create } from 'zustand';
import api from "@/lib/axios";
import { BaseUser, AuthData } from "@/types/user"
import useConnectionStore from './useConnectionStore';



interface AuthState {
    user: BaseUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    loginError: string | null;
    signupError: string | null;
    initialized: boolean;
    setAuth: (user: BaseUser) => void;
    initialize: () => Promise<BaseUser | null>;
    login: ({username, password}: AuthData) => Promise<BaseUser | null>;
    register: ({username, password}: AuthData) => Promise<BaseUser | null>;
    logout: () => void;
    resetError: (key: string, resetAll?: boolean) => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true, 
    error: null,
    loginError: null,
    signupError: null,
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
        get().setAuth(res.data);
        useConnectionStore.getState().upgradeToPresenceChannel(get().user?.id);
        return res.data;
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
    
    login: async ({username, password}) => {
      set({ isLoading: true, loginError: null });
      
      try {
        const res = await api.post('/login', { username, password });
        
        const userRes = await api.get('/me');
        get().setAuth(userRes.data);
        useConnectionStore.getState().upgradeToPresenceChannel(get().user?.id);
        return userRes.data;
      } catch (error: any) {
        set({ 
          isLoading: false, 
          loginError: error.response?.data?.error || error.message 
        });
        throw error;
      }
    },
    
    logout: async () => {
      set({ isLoading: true });
      
      try {
        await api.post('/logout');

        useConnectionStore.getState().leavePresenceChannel(get().user?.id);

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
    
    register: async (userData) => {
      set({ isLoading: true, signupError: null });
      
      try {
        await api.post('/register', userData);

        const userRes = await api.get('/me');
        
        get().setAuth(userRes.data);
        
        return userRes.data;
      } catch (error: any) {
        set({ 
          isLoading: false, 
          signupError: error.response?.data?.message || error.message 
        });
        throw error;
      }
    },

    resetError: (key, resetAll = false) => {
      if (resetAll) {
        set({ error: null, loginError: null });
      } else {
        set({ [key]: null });
      }
    }
  }));

export default useAuthStore;