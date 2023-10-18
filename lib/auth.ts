import { getServerSession } from "next-auth"

export const session = async ({session, token}: any ) =>{
    // console.log('Server Session', { session, token})
    session.user.id = token.id
    session.user.tenant = token.tenant
    return session
} 


export const getUserSession = async () => {
    const authUserSession = await getServerSession({
        callbacks: {
            session
        }
    })
    if(!authUserSession) throw new Error('unauthorized')
    return authUserSession.user
} 