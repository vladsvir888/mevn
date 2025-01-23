import jwt from "jsonwebtoken";
import TokenModel from "../models/token-model";

class TokenService {
  public getTokens(payload: object) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? "", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET ?? "",
      { expiresIn: "24h" }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveToken(userEmail: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ userEmail }).lean();

    if (!tokenData) {
      await TokenModel.create({ userEmail, refreshToken });
    } else {
      await TokenModel.updateOne({ userEmail }, { userEmail, refreshToken });
    }
  }
}

const tokenService = new TokenService();

export default tokenService;
