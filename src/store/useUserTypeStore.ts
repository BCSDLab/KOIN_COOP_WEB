import { UserType } from 'models/auth';

import { create } from 'zustand';

interface UserTypeStore {
  userType: UserType;
  setUserType: (userType: UserType) => void;
}

const useUserTypeStore = create<UserTypeStore>((set) => ({
  userType: null,
  setUserType: (userType) => { set(() => ({ userType })); },
}));

export default useUserTypeStore;
