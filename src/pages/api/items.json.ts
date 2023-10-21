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

    await pb.collection('item').update(data.id, {content: data.content})
    return new Response("updated")
}

export async function POST({request}:{request: Request}) {
    const data = await request.formData()

    const owner = data.get("owner") as string | null
    const title = data.get("title") as string | null
    const playlist = data.get("playlist") as string | null

    if(!owner || !title || !playlist){
        return new Response("Insufficient data")
    }

    try {
        await pb.collection("item").create({owner, title, playlist})
    } catch (error) {
        return new Response("Something went wrong: 500")
    }

    return new Response("created")
}