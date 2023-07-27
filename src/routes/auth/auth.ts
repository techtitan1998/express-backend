import { Router, Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { register, login, profile } from "../../controllers/auth/auth";
import auth from "../../middleware/checkauth";
import loggerMiddleware from "../../middleware/loggerMiddleware";

const router = Router();

router.use(loggerMiddleware);

router
  .route("/register")
  .post(
    check("email", "Please enter email").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty(),
    register
  );
router
  .route("/login")
  .post(
    check("email", "Please enter email").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty(),
    login
  );

router.route("/profile").get(auth, (req: Request, res: Response) => {
  profile(req, res);
});

export default router;
