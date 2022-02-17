import { Request, Response, Router } from "express";
import { Account } from "../../logic";
import { IResponse } from "../../interfaces";

const router: Router = Router();
router.get("/list", async (req: Request, res: Response) => {
  const accountHandle = new Account();
  const userList = await accountHandle.getAll();

  const response: IResponse = {
    code: 200,
    userList: userList,
  };
  res.status(response.code).send(response);
});
export const AccountList: Router = router;
