import { Router } from "express";
import { random } from "../../controllers/random/random";

import auth from "../../middleware/checkauth";
import loggerMiddleware from "../../middleware/loggerMiddleware";

const router = Router();

router.use(loggerMiddleware);
router.route("/random").post(auth, random);

export default router;
