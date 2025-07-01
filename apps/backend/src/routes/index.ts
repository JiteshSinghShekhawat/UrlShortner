import { UrlModel } from "@repo/db";
import { Router, Request, Response } from "express";

export const router = Router();

const lastUri = 62**7-1; 
const list = "adefOPQlmnopqYZ0rs69tuvwxyzA78BCDIJKLMEFG1HbcNRSTghijkUVWX2345";
const myMap: { [key: string]: number } = {};
for(let i = 0 ; i < list.length ; i ++){
  myMap[list[i]] = i; 
}
// const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function generateString(n: number){
  let temp = ""; 
  while(n > 0){
    temp = list[n%62]+temp; 
    n = Math.floor(n/62); 
  }
  while(temp.length < 7){
    temp = list[0]+temp;  
  }
  return temp; 
}

function createShortUrl(n: number){
  
  if(n%2){
    n = Math.floor(n/2);
    return generateString(n); 
  }else{
    n = Math.floor(n/2);
    n = lastUri - n; 
    return generateString(n); 
  } 
}

function urlToNumber(uri : string){
  let no = 0; 
  for(let i  = 0 ;i < uri.length ; i++){
    no *= 62; 
    no += myMap[uri[i]]; 
  }
  return no; 
}


router.get("/:shortUrl", async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

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

router.post("/create-url", async (req: Request, res: Response) => {
  const longUrl = req.body.longUrl;
  if (!longUrl) {
    return res.status(400).json({ message: "No Long Url Found" });
  }

  try {
    const newEntry = new UrlModel({ longUrl });

    await newEntry.save();


    let resp = newEntry.toObject() as any; 

    if(newEntry.shortId)resp.shortUrl = generateString(newEntry.shortId); 

    return res.status(201).json(resp);
  } catch (Error) {
    return res.status(500).json({ message: "Server Error", Error });
  }
});
