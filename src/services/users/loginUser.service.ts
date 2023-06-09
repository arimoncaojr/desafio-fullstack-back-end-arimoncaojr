import { IUserLogin } from "../../interfaces/user.interfaces";
import AppDataSource from "../../data-source";
import { compare } from "bcryptjs";
import "dotenv/config";
import Jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import User from "../../entities/user.entity";

const loginUserService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getTreeRepository(User);

  const foundUser = await userRepository.findOneBy({
    email: email,
  });

  if (!foundUser) {
    throw new AppError("Wrong email or password", 403);
  }

  const passwordMatch = await compare(password, foundUser.password);

  if (!passwordMatch) {
    throw new AppError("Wrong email or password", 403);
  }

  const token = Jwt.sign({}, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: String(foundUser.id),
  });

  return token;
};

export default loginUserService;
