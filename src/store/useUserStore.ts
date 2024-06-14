import { getCoopMe } from 'api/auth';
import { CoopMeResponse } from 'models/auth';

import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface State {
  isAuthenticated: boolean;
  user: CoopMeResponse | null;
  setUser: (user: CoopMeResponse) => void;
  clearUser: () => void;
  initializeAuth: () => Promise<void>;
}

const sessionStorageWithSerialization: PersistStorage<State> = {
  getItem: (name) => {
    const item = sessionStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
};

const useUserStore = create<State>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ isAuthenticated: true, user }),
      clearUser: () => set({ isAuthenticated: false, user: null }),
      initializeAuth: async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
          try {
            const user = await getCoopMe();
            set({ isAuthenticated: true, user });
          } catch (error) {
            set({ isAuthenticated: false, user: null });
            sessionStorage.removeItem('access_token');
          }
        } else {
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: sessionStorageWithSerialization,
    },
  ),
);

export default useUserStore;
