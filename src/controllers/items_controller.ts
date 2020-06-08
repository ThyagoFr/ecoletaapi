import connectionDB from "../db/connection";
import {Request, Response} from "express";

class ItemsController {
  
  async index (request : Request, response : Response ) {
    try {
      const items = await connectionDB('items').select('*');
      const serializedItems = items.map(item => {
        return {
          id : item.id,
          title : item.title,
          image_url : `http://localhost:8000/uploads/${item.image}`,
        };
      });
      return response.json(serializedItems);
    } catch (err) {
      return response.json({ message : err })
    }
  }


}

export default ItemsController;