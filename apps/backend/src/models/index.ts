import { UrlModel } from "@repo/db";

export const findLongUrl = async (shortId: number)=>{
    return await UrlModel.findOne({ shortId}); 
}

export const insertLongUrl = async(longUrl: string) =>{
    const response =  new UrlModel({ longUrl });
    await response.save(); 
    return response; 
}