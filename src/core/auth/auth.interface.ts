import { UserPayload } from './models/UserPayload';

export interface JwtFields {
  sub: string;
  aud: string;
  nbf: number;
  iss: string;
  type: 'access' | 'refresh';
}

export interface JwtUnsignedFields
  extends UserPayload,
    Pick<JwtFields, 'sub' | 'type'> {}

export interface JwtSignedFields extends JwtFields, UserPayload {}
