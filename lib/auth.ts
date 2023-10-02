import { DefaultSession, getServerSession } from "next-auth"

export type AuthUser = {
    name: string
    email: string
    image: string
}

export const getUserSesison = async (): Promise<AuthUser> => {
    const session = await getServerSession()
    if(!session) throw new Error('unauthorized')
    return session.user as AuthUser
} 

