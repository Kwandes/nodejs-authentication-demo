import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersService } from "../users/users.service.js";

const secret = "I'm lazy so it is hardcoded"; // The API secret used for hashing passwords

export class AuthService {
  usersService = new UsersService();

  async login(email, password) {
    const user = await this.usersService.findOneByEmail(email); // throws error if user doesn't exist
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error(`Unauthorized`);
      error.code = 401;
      throw error;
    }

    const accessToken = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
      },
      secret,
      {
        expiresIn: "666h", // I'm lazy
      }
    );

    return { accessToken: accessToken };
  }

  async signup(email, password) {
    const hashedPassword = await this.encodePassword(password);
    const user = await this.usersService.create(email, hashedPassword); // throws error if email is taken

    const accessToken = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
      },
      secret,
      {
        expiresIn: "666h", // I'm lazy
      }
    );

    return { accessToken: accessToken };
  }

  /**
   * Hashes and salts the plaintext password using bcrypt.
   * @param password plaitext password to hash.
   * @returns encoded password.
   */
  async encodePassword(password) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  /**
   * Compares the plainttest password and a hash to verify that they match.
   * @param password plaintext password.
   * @param hash password hashed with bcrypt.
   * @returns whether the strings match.
   */
  async compareHashes(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}
