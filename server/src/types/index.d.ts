export type User = {
    id: number;
    name: string;
    password: string;
    email: string;
}
export type AuthData = Omit<User, "password">
export type AuthUserData = AuthData & { token: string } 

export type JWTPayload ={
    sub: id,
    email: string, 
    name: string
}

export interface RequestWithUser extends Request{
    user: AuthUserData
}