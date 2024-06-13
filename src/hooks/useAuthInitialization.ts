import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getCoopMe } from 'api/auth';
import useUserStore from 'store/useUserStore';

import { isKoinError } from '@bcsdlab/koin';
import { useQueryClient } from '@tanstack/react-query';

const useAuthInitialization = () => {
  const { setUser, clearUser } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = sessionStorage.getItem('access_token');
      if (token) {
        try {
          const user = await getCoopMe();
          setUser(user);
        } catch (error) {
          if (isKoinError(error)) {
            console.error(error);
            clearUser();
            navigate('/login');
          }
        }
      } else {
        clearUser();
        navigate('/login');
      }
    };

    initializeAuth();
  }, [setUser, clearUser, queryClient, navigate]);
};

export default useAuthInitialization;
