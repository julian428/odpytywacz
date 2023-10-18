import PocketBase from 'pocketbase'
const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export const prerender = false
interface RequestType {
    params:{
        id: string
    }
}

export async function GET({params}:RequestType) {
    const item = await pb.collection('item').getOne(params.id)
    const questions = await pb.collection("question").getFullList({
        filter: `item = "${params.id}"`
    })
    return new Response(JSON.stringify({...item, questions: [...questions]}))
}