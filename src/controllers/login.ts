import { Request, Response } from "express";
import dbConnection from "../server";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import config from "../config/config";
import bcrypt from "bcrypt";

const login = async (request: Request, response: Response) => {
  //Check if username and password are set
  const { password, email }: { password: string; email: string } = request.body;
  if (!(email && password)) {
    response.status(400).send({ Error: "Incomplete details" });
  }
  //Get user from database.
  dbConnection
    .then(async (connection) => {
      let userRepository = connection.getRepository(User);

      await userRepository
        .find({ email: email })
        .then((user) => {
          // Password checking
          bcrypt.compare(password, user[0].password).then((result) => {
            if (result == true) {
              //jwt
              const token = jwt.sign(
                { fullName: user[0].fullName, email: user[0].email },
                config.jwtSecret,
                { expiresIn: "1hr" }
              );
              //token returned both as a header and response body
              response.setHeader("x-access-token", token);
              response.send(token);
            } else response.status(401).send({ Error: "Bad credentials" });
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ Error: "Connection error" });
    });
};

export default login;
