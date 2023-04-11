import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserstokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UserTokens>
}

export { IUserstokensRepository };
