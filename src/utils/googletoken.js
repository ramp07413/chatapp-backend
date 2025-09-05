import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config()

export const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

export const googleresponse = async(code)=>{
    const {tokens} = await client.getToken(code)

        const access = await client.verifyIdToken({
            idToken : tokens.id_token,
            
        })   
        console.log(access)
        const payload = access.getPayload()
        return payload
}