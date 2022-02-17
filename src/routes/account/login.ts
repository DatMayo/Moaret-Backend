import { Request, Response, Router } from "express";
import { Account } from "../../logic";
import { IResponse } from "../../interfaces";

const router: Router = Router();
router.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  let response: IResponse;

  if (!username || !password) {
    response = {
      code: 404,
      error: [
        {
          msg: "Missing username or password in request header",
        },
      ],
    };
    res.status(response.code).send(response);
    return;
  }

  const accountHandle = new Account();
  const success = await accountHandle.login(username, password);

  if (!success) {
    response = {
      code: 403,
      error: [
        {
          msg: "The given credentials are not correct",
        },
      ],
    };
  } else {
    response = {
      code: 200,
    };
  }

  res.status(response.code).send(response);
});
export const AccountLogin: Router = router;
