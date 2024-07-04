import { create } from 'zustand';

interface ErrorMessageStore {
  loginErrorMessage: string;
  setLoginErrorMessage: (error: string) => void;
  logoutErrorMessage: string;
  setLogoutErrorMessage: (error: string) => void;
  isLoginError: boolean;
  setIsLoginError: (isError: boolean) => void;
}

export const useErrorMessageStore = create<ErrorMessageStore>((set) => ({
  isLoginError: false,
  setIsLoginError: (isError) => set({ isLoginError: isError }),
  loginErrorMessage: '',
  setLoginErrorMessage: (error) => set({ loginErrorMessage: error }),
  logoutErrorMessage: '',
  setLogoutErrorMessage: (error) => set({ loginErrorMessage: error }),
}));
