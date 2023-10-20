import PocketBase from 'pocketbase'

const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export async function GET({request}:{request: Request}) {
    const url = new URL(request.url).searchParams
    const query = url.get("query")?.replaceAll('_and_', '&&')
    const list = await pb.collection('question').getFullList({
        filter: query
    })

    const template = url.get("template") || ""
    if(template.length < 1){
        return new Response(JSON.stringify(list))
    }
    
    let response = ""
    list.forEach((item) => {
        let currentString = template
        Object.keys(item).forEach((key)=>{
                currentString = currentString.replaceAll("$" + key + "$", item[key])
        })
        response += currentString
    })

    return new Response(response)
}