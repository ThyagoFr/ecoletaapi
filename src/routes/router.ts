import {Router} from "express";
import PointsController from "../controllers/points_controller";
import ItemController from "../controllers/items_controller";

const router = Router();
const pointsController = new PointsController();
const itemController = new ItemController();


router.get("/items", itemController.index);

router.get("/points", pointsController.index);
router.get("/points/:id", pointsController.show);
router.post("/points", pointsController.create);

export default router;