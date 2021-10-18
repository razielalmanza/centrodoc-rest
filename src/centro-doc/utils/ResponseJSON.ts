export interface ResponseJSON {
  success: boolean;
  message?: string;
  data?: any;
  errorMessage?: string;
  idAffected?: string;
  count?: number;
  token?: string;
}
