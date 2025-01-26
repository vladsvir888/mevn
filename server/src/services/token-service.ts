import jwt from "jsonwebtoken";
import TokenModel from "../models/token-model";

class TokenService {
  public async getTokens(payload: object) {
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

  public async decodeAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET ?? "");
    } catch {
      return null;
    }
  }

  public async decodeRefreshToken(refreshToken: string) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET ?? "");
    } catch {
      return null;
    }
  }

  public async removeToken(refreshToken: string) {
    await TokenModel.deleteOne({ refreshToken });
  }
}

const tokenService = new TokenService();

export default tokenService;
