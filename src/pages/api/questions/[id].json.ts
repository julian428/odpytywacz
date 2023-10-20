import PocketBase from 'pocketbase'
const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export const prerender = false
interface RequestType {
    params:{
        id: string
    },
    request: Request
}

export async function GET({params, request}:RequestType) {
    let field = new URL(request.url).searchParams.get("field")
    const question = await pb.collection("question").getOne(params.id, {
        fields: field || undefined
    })
    return new Response(JSON.stringify(question[field || ""]))
}