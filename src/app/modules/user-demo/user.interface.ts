export interface IUser{
    name: string,
    age: number,
    email: string,
    role: "admin" | "user",
    photo?: string
    userStatus: "active" | "inactive"
}


