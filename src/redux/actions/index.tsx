import {
  SET_WALLET_BALANCE,
  SetWalletBalance,
  SetUser,
  SetErrors,
  SET_USER_INFO,
  SET_FORM_ERROR,
  SetPLanBalance,
  SET_PLAN_BALANCE,
} from '../types';

export function updateUserInfo(isAuthenticated: boolean, email: string) {
  const action: SetUser = {
    type: SET_USER_INFO,
    payload: {isAuthenticated, email},
  };
  return (dispatch: any) => dispatch(action);
}

export function setValidationError(message: string, hasError: boolean) {
  const action: SetErrors = {
    type: SET_FORM_ERROR,
    payload: {message, hasError},
  };
  return (dispatch: any) => dispatch(action);
}

export function updateWalletBalance(newBalance: string) {
  const action: SetWalletBalance = {
    type: SET_WALLET_BALANCE,
    payload: newBalance,
  };
  return (dispatch: any) => dispatch(action);
}

export function updatePlanBalance(newBalance: string, id: string) {
  const action: SetPLanBalance = {
    type: SET_PLAN_BALANCE,
    payload: {itemId: id, amount: newBalance},
  };
  return (dispatch: any) => dispatch(action);
}
