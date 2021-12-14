import { Request, Response } from "express";
import dbConnection from "../server";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { passwordStrength } from "check-password-strength";
let hashedPassword: string;
// adding a user

const signUp = async (request: Request, response: Response) => {
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
    dbConnection
      .then(async (connection) => {
        let user = new User();
        user.fullName = fullName;
        user.email = email;
        user.password = hashedPassword;
        user.created = new Date();

        await connection.manager.save(user).then((user) => {
          response.status(200).send({ "User added ": user.fullName });
        });
      })
      .catch((error) => {
        //Duplicate email check
        if (error.code == "23505") {
          response
            .status(400)
            .send({ "Error ": "Account with that Email exists" });
        } else {
          response.status(408).send({ "Error ": error });
        }
      });
  } catch (error) {
    response.status(400).send(error);
  }
};

// getting a user
const getLoggedinUser = async (request: Request, response: Response) => {
  const email = parseInt(request.params.email);
};
export default signUp;
