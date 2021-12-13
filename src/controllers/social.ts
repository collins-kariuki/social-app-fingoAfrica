import { Request, Response, NextFunction } from "express";
import { createConnection, Connection } from "typeorm";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import config from "../config/config";
import bcrypt from "bcrypt";
import { passwordStrength } from "check-password-strength";
let hashedPassword: string;
// adding a user

const createUser = async (request: Request, response: Response) => {
  // get the data from request.body
  const {
    fullName,
    email,
    password,
  }: { fullName: string; email: string; password: string } = request.body;

  try {
    // Check request body for missing fields
    if (!(fullName && email && password)) {
      throw { Error: "Incomplete details" };
    }

    // strong password checking
    const pass_strength = passwordStrength(password);
    if (pass_strength.id == 0 || pass_strength.id == 1) {
      throw { Error: " Password is " + pass_strength.value };
    }

    // encrypt password
    bcrypt
      .hash(password, 10)
      .then((hash) => (hashedPassword = hash))
      .catch((error) => console.log(error));

    // adding a user
    createConnection()
      .then(async (connection) => {
        let user = new User();
        user.fullName = fullName;
        user.email = email;
        user.password = hashedPassword;
        user.timestamp = new Date();
        console.log(user.timestamp);

        await connection.manager.save(user).then((user) => {
          response.status(200).send({ "User added ": user.fullName });
        });
      })
      .catch((error) => {
        //Duplicate email check
        if (error.code == "23505") {
          response
            .status(404)
            .send({ "Error ": "Account with that Email exists" });
        } else {
          response.status(408).send({ "Error ": error });
        }
      });
  } catch (error) {
    response.status(400).send(error);
  }
};
const login = async (request: Request, response: Response) => {
  //Check if username and password are set
  const { password, email }: { password: string; email: string } = request.body;
  if (!(email && password)) {
    response.status(400).send({ Error: "Incomplete details" });
  }
  //Get user from database.
  createConnection()
    .then(async (connection) => {
      let userRepository = connection.getRepository(User);

      let user = await userRepository
        .find({ email: email })
        .then((user) => {
          // Password checking
          bcrypt.compare(password, user[0].password).then((result) => {
            if (result == true) {
              console.log(result);
              const token = jwt.sign(
                { fullName: user[0].fullName, email: user[0].email },
                config.jwtSecret,
                { expiresIn: "1hr" }
              );
              response.send(token);
            } else response.status(400).send({ Error: "Bad credentials" });
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ Error: "Connection error" });
    });

  //Send the jwt in the response
};
// getting a user
const getLoggedinUser = async (request: Request, response: Response) => {
  const email = parseInt(request.params.email);
};
export default { createUser, getLoggedinUser, login };
