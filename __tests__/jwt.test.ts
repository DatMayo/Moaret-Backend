import { Token } from "../src/logic";
import { IAccountData, IAccountDataExtended } from "../src/interfaces";

describe("JWT sign and verify", () => {
  const userData: IAccountData = { id: 1, username: "DatMayo" };
  let jwtData: string;
  let jwtDataExpired =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJEYXRNYXlvIiwiaWF0IjoxNjQzNTMwODIxLCJleHAiOjE2NDM1MjA4MjB9.Ku08nxG9I1XWrcVz-y_fEghN6BSv_SCXly3yHAdrAl0";

  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET =
      "b17aba7e1c9e6d8a68e5e9f0911416f3cd0f7056803c92855bdae5f6870a09e804ec8d26677391c332440c2de1d25232c243abbf07b725d269811388a36c2d87";
    process.env.REFRESH_TOKEN_SECRET =
      "925c5f7217a8cc514133b0f1e8bc129e5199a1018fa402966ad36345e3ec27ed486dfd3d665bb61f47defb755d30aec62be04a287564884efedce3a4a455396f";
  });

  test("Successfully creation of a JWT Key", () => {
    const tokenHandle = new Token();
    const result = tokenHandle.create(userData);
    jwtData = result;
    expect(result).toBe(jwtData);
  });

  test("Convert JWT back to object", () => {
    const tokenHandle = new Token();
    const result = tokenHandle.verify(jwtData) as IAccountDataExtended;
    expect(result.username).toBe("DatMayo");
  });

  test("Check for expired JWT", () => {
    const tokenHandle = new Token();
    const result = tokenHandle.verify(jwtDataExpired);
    expect(tokenHandle.lastError).toBe("TokenExpiredError");
  });
});
