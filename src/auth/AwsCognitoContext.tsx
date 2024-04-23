"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import {
  AuthState,
  AWSCognitoContextType,
  RedirectToLoginFucntion,
} from "@/types/auth";
import { useRouter } from "@/navigation";

// ----------------------------------------------------------------------

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: undefined,
};

const AuthContext = createContext<AWSCognitoContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);
  const { push } = useRouter();

  const getSession = useCallback(async () => {
    try {
      // await Auth.getCurrentUser();
      const data = await fetchUserAttributes();
      setState({
        isInitialized: true,
        isAuthenticated: true,
        user: data,
      });
    } catch {
      setState({
        isInitialized: true,
        isAuthenticated: false,
        user: undefined,
      });
    }
  }, []);

  const initial = useCallback(async () => {
    try {
      await getSession();
    } catch {
      setState({
        isInitialized: true,
        isAuthenticated: false,
        user: undefined,
      });
    }
  }, [getSession]);

  useEffect(() => {
    initial();
  }, [initial]);

  // same thing here
  const logout = () => {
    signOut();
    setState({
      isInitialized: true,
      isAuthenticated: false,
      user: undefined,
    });
  };

  const redirectToLogin: RedirectToLoginFucntion = (param) => {
    push(`/login?redirect=${window.location.pathname}${param?.query || ""}`);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: {
          email: state.user?.email,
          ...state.user,
        },
        logout,
        redirectToLogin,
      }}
    >
      {state.isInitialized ? children : <></>}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
