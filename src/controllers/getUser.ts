import { Request, Response } from "express";
import dbConnection from "../server";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

const getUser = async (request: Request, response: Response) => {
  //Get user email
  const decodedToken = jwt.decode(request.header("x-access-token"), {
    complete: true,
  });

  dbConnection.then(async (connection) => {
    let userRepository = connection.getRepository(User);

    await userRepository
      .find({ email: decodedToken.payload.email })
      .then((user) => {
        const {
          id,
          fullName,
          created,
        }: { id: number; fullName: string; created: Date } = user[0];

        const loggedInUser = { id, fullName, created };
        response.send(loggedInUser);
      });
  });
};
export default getUser;
