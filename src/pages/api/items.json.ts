import PocketBase from 'pocketbase'

const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export async function GET({request}: {request: Request}){
    let query = new URL(request.url).searchParams.get("query")
    if(typeof query != "string"){
        query = ""
    }
    query = query.replaceAll('_and_', '&&')
    const list = await pb.collection('item').getFullList({
        filter: query
    })
    return new Response(JSON.stringify(list))
}

export async function POST({request}: {request: Request}){
    const body = await request.json()
    return new Response(JSON.stringify(body))
}