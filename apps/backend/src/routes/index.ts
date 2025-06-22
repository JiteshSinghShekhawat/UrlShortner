import { Router ,Request , Response} from "express";

export const router = Router(); 


router.get('/:shortUrl',(req: Request,res: Response)=>{
    const shortUrl = req.params; 
    res.send('Works Fineee !!!!'); 
}); 


router.post('/create-url',(req:Request, res: Response)=>{
    const longUrl = req.body.longUrl; 

    
}); 