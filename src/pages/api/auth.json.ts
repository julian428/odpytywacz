import PocketBase from 'pocketbase'
const dbAddress = import.meta.env.PB_LOCATION;
const pb = new PocketBase(dbAddress)

export async function POST(req:any) {
    
}