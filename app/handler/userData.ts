import { currentUser } from "@clerk/nextjs/server";

export async function dataRaw(){
    const user = await currentUser(); 
    return user;
}
