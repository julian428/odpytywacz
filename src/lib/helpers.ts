export const login = async (email: string, password: string) => {
    const {default: PocketBase} = await import("pocketbase")
    const pb_loc = import.meta.env.PB_LOCATION
    const pb = new PocketBase(pb_loc)

    try {
        const res = await pb.collection('users').authWithPassword(email, password)
        return res
    } catch (error) {
        return false
    }
}