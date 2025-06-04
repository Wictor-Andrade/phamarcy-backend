export interface UserPayload {
  userId: string;
  email: string;
  filialId: string;
  funcionarioId: string;
  roleId: string;
  name: string;
  iat?: number;
  exp?: number;
}
