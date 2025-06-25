import { UrlModel } from "@repo/db";
import { Router ,Request , Response} from "express";

export const router = Router(); 


function UrlGenerator(){
    // I have to Implement it ::::

    return "*****"; 
}

router.get('/:shortUrl',async (req: Request,res: Response)=>{
    const {shortUrl} = req.params; 

    try {
        const found = await UrlModel.findOne({ shortUrl });
    
        if (found && found.longUrl) {
          return res.redirect(found.longUrl);
        } else {
          return res.status(404).json({ message: "Short URL not found" });
        }
      } catch (error) {
        return res.status(500).json({ message: "Server error", error });
      }
}); 

router.post('/create-url',async (req:Request, res: Response)=>{

    const longUrl = req.body.longUrl; 
    if(!longUrl){
        return res.status(400).json({message: "No Long Url Found"}); 
    }

    try{
        const existing = await UrlModel.findOne({longUrl}); 

        if(existing){
            return res.json(existing); 
        }

        const shortUrl = UrlGenerator();  

        const newEntry = new UrlModel({longUrl,shortUrl}); 

        await newEntry.save(); 

        return res.status(201).json(newEntry); 
    }catch(Error){
        return res.status(500).json({message: "Server Error",Error}); 
    }
}); 