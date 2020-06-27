export interface TokenRequestModel {
  id: string;
  key: string;
  expiresIn?: string | number;
}

export interface TokenVerifyRequestModel {
  token: string;
  key: string;
}

export interface TokenPayloadModel {
  id: string;
  iat: number;
  exp: number;
}