import { defineMiddleware } from "astro/middleware";
import jwt from "jsonwebtoken";

const JWT_key = import.meta.env.JWT_KEY

export const onRequest = defineMiddleware(async (context, next) => {

    const token = context.cookies.get("__token__")?.value || ""
    
    if(!token){
        return next()
    }

    const userData = jwt.decode(token, JWT_key)
    context.locals.user = userData
    if(!userData){
        context.locals.loggedIn = false
        return next()
    }
    context.locals.loggedIn = true

    return next()
});