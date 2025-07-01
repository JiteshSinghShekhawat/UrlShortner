import { Request, Response } from "express";
import { findLongUrl, insertLongUrl } from "../models";
import { generateString, urlToNumber } from "./generation";

export const shortUrl = async (req: Request, res: Response) => {
  const { sUrl } = req.params;
  console.log(sUrl); 
  try {
    const shortId = urlToNumber(sUrl); 
    console.log(shortId); 
    const found = await findLongUrl(shortId);


    console.log(found); 
    if (found && found.longUrl) {
      return res.redirect(found.longUrl);
    } else {
      return res.status(404).json({ message: "Short URL not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

export const createUrl = async (req: Request, res: Response) => {
  const longUrl = req.body.longUrl;
  if (!longUrl) {
    return res.status(400).json({ message: "No Long Url Found" });
  }

  try {
    const newEntry = await insertLongUrl(longUrl);

    let resp = newEntry.toObject() as any;

    if (newEntry.shortId) resp.shortUrl = generateString(newEntry.shortId);
    else{
      return res.status(500).json({ message: "Some Internal Server Error" });
    }
    return res.status(201).json(resp);
  } catch (Error) {
    return res.status(500).json({ message: "Server Error", Error });
  }
}
