import connectionDB from "../db/connection";
import  {Request, Response } from "express";

class PointsController {

  async create (request: Request , response: Response) {
    try {
      const {name,email,whatsapp,latitude,longitude,city,uf,items} = request.body
      const point = {
        image : "image-fake",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      }
      const transaction = await connectionDB.transaction();
      const ids = await transaction("points").insert(point)
      const pointItems = items.map( (id_item : number) => {
        return {
          id_item,
          id_point : ids[0]
        }
      })
  
      await transaction("point_item").insert(pointItems);
      await transaction.commit();
      return response.json({
        id : ids[0],
        ...point,
      });
  
    }catch (err) {
      return response.json({
        message : err
      })
    }
  }

  async show (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const point = await connectionDB("points").where("id", id).first(); 
      if (!point) {
        return response.json({
          message : "Point not found"
        }).status(404);
      }
      const items = await connectionDB("items")
            .join("point_item","items.id", "=","point_item.id_item")
            .where("point_item.id_point",id)
      return response.json({
        point,
        items
      })
    }catch (err) {
      return response.json({
        message : err
      })
    }
    
    
  }

  async index(request: Request, response: Response) {
    try {
      const {city, uf , items } = request.query;
      const parsedItems = String(items)
            .split(",")
            .map(item =>  Number(item.trim()) )
  
      const points = await connectionDB("points")
            .join("point_item","points.id","=","point_item.id_point")
            .whereIn("point_item.id_item", parsedItems)
            .where("city", String(city))
            .where("uf", String(uf))
            .distinct()
            .select("points.*")

      if(points.length == 0){
        return response.json({
          message : "Point not found"
        }).status(404)
      }
      return response.json(points)
    
    }catch (err) {
      return response.json({
        message : err
      })
    }
    }
  
}

export default PointsController;