import { create } from 'zustand';

interface ErrorMessageStore {
  isLoginError: boolean;
  setIsLoginError: (isError: boolean) => void;
  loginErrorMessage: string;
  setLoginErrorMessage: (error: string) => void;
  loginErrorStatus: number;
  setLoginErrorStatus: (status: number) => void;
  logoutErrorMessage: string;
  setLogoutErrorMessage: (error: string) => void;
}

export const useErrorMessageStore = create<ErrorMessageStore>((set) => ({
  isLoginError: false,
  setIsLoginError: (isError) => set({ isLoginError: isError }),
  loginErrorMessage: '',
  setLoginErrorMessage: (error) => set({ loginErrorMessage: error }),
  loginErrorStatus: 0,
  setLoginErrorStatus: (status) => set({ loginErrorStatus: status }),
  logoutErrorMessage: '',
  setLogoutErrorMessage: (error) => set({ loginErrorMessage: error }),
}));
