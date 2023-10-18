import PocketBase from 'pocketbase'

const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export async function GET({request}:{request: Request}) {
    let query = new URL(request.url).searchParams.get("query") as string
    query = query.replaceAll('_and_', '&&')
    console.log('trigerred')
    const list = await pb.collection('question').getFullList({
        filter: query
    })
    return new Response(JSON.stringify(list))
}