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

export async function PUT({request}: {request: Request}){
    const data = await request.formData()

    const id = data.get("id") as string | null
    const type = data.get("type")
    const answears = data.get("answears")
    const decoys = data.get("decoys")
    const separated = Boolean(data.get("show")) && Boolean(data.get("correct"))
    const show = data.get("show") + (separated ? ":" : "") + data.get("correct")

    const updatedData = {type, answears, decoys, show}
    if(!id){
        return new Response(JSON.stringify(404))
    }


    try {
        await pb.collection("question").update(id, updatedData)
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error))
    }

    return new Response("saved")
}

export async function POST({request}: {request: Request}){
    const data = await request.formData()

    const  type = data.get("type") as string | null
    const question = data.get("question") as string | null
    const answears = data.get("answears") as string | null
    const item = data.get("item") as string | null
    const owner = data.get("owner") as string | null

    if(!type || !question || !answears || !item || !owner){
        return new Response("Insufficient data")
    }

    try {
        await pb.collection("question").create({type, question, answears, item, owner})
    } catch (error) {
        return new Response("Something went wrong")
    }

    return new Response("created")
}