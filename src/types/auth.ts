import { FetchUserAttributesOutput } from "aws-amplify/auth";

export type customAttributes = {};

export type AuthState = {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: FetchUserAttributesOutput & customAttributes;
};

export interface AWSCognitoContextType extends AuthState {
  logout: VoidFunction;
  redirectToLogin: RedirectToLoginFucntion;
}

export type RedirectToLoginFucntion = (param?: { query?: string }) => void;
