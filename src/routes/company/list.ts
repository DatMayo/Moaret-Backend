import { Request, Response, Router } from "express";
import { Account, Company } from "../../logic";
import { IResponse } from "../../interfaces";

const router: Router = Router();
router.get("/list", async (req: Request, res: Response) => {
  const companyHandle = new Company();
  const userList = await companyHandle.getAll();

  const response: IResponse = {
    code: 200,
    userList: userList,
  };
  res.status(response.code).send(response);
});
export const CompanyList: Router = router;
