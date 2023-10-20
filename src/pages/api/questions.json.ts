import PocketBase from 'pocketbase'

const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export async function GET({request}:{request: Request}) {
    let query = new URL(request.url).searchParams.get("query") as string
    query = query.replaceAll('_and_', '&&')
    const list = await pb.collection('question').getFullList({
        filter: query
    })
    const html = list.map((question) => `<li><a href=${question.id+'/question'}>${question.answears}</a></li>`).join().replaceAll(',', '')
    return new Response(html)
}