import PocketBase from 'pocketbase'

const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export async function GET({request}:{request: Request}) {
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

export async function PUT({request}:{request: Request}) {
    const data = await request.json()

    console.log(data)
    await pb.collection('item').update(data.id, {content: data.content})
    return new Response("saved")
}