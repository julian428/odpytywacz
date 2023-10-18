import PocketBase from 'pocketbase'

const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export async function GET(req: Request){
    const list = await pb.collection('item').getFullList()
    return new Response(JSON.stringify(list))
}

export async function POST({request}: {request: Request}){
    const body = await request.json()
    return new Response(JSON.stringify(body))
}