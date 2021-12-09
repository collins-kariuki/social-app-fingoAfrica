import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import pool from "../dbconfig/dbconnector";
import bcrypt from "bcrypt";
import { passwordStrength } from "check-password-strength";
let timestamp: number;
let hashedPassword: string;
// adding a user

const createUser = async (request: Request, response: Response) => {
  // get the data from request.body
  const {
    fullName,
    email,
    password,
  }: { fullName: string; email: string; password: string } = request.body;
  console.log(fullName);
  console.log(passwordStrength(password).id);

  timestamp = +new Date();
  console.log(timestamp);

  // Encryption of the string password
  bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(password, Salt, function (err, hash) {
      if (err) {
        return console.log("Cannot encrypt");
      }
      hashedPassword = hash;
    });
  });

  try {
    // Check request body for missing fields
    if (!fullName || !email || !password) {
      throw { Error: "Incomplete details" };
    }

    pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
      (error: any, results: { rows: Array<JSON> }) => {
        if (error) {
          throw error;
        }
        const user = results.rows[0];
        if (user) {
          console.log(user);
          throw "";
          response.status(400).send("User with that email exists");
        }
      }
    );

    // strong password checking
    const pass_strength = passwordStrength(password);
    if (pass_strength.id == 0 || pass_strength.id == 1) {
      throw { Error: " Password is " + pass_strength.value };
    }

    //Unique Email checking
    const client = await pool.connect();

    // adding a user
    await client.query(
      "INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3)",
      [fullName, email, hashedPassword],
      (error: any, results: any) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User : ${fullName} added `);
      }
    );

    client.release();
  } catch (error) {
    response.status(400).send(error);
  }
};
const login = async (request: Request, response: Response) => {
  //Check if username and password are set
  let { password, email } = request.body;
  if (!(email && password)) {
    response.status(400).send();
  }
  //Get user from database
  let user: any;
  try {
    const client = await pool.connect();

    client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (
        error: any,
        results: {
          rows: any;
        }
      ) => {
        if (error) {
          throw error;
        }
        user = results.rows[0];
        console.log(user);
        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
          { userId: user.id, fullName: user.fullName },
          config.jwtSecret,
          { expiresIn: "1h" }
        );
        response.send(token);
      }
    );

    client.release();
  } catch (error) {
    response.status(401).send();
  }

  //Check if encrypted password match

  //Send the jwt in the response
};
// getting a user
const getLoggedinUser = async (request: Request, response: Response) => {
  const email = parseInt(request.params.email);

  try {
    const client = await pool.connect();

    client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (
        error: any,
        results: {
          rows: any;
        }
      ) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );

    client.release();
  } catch (error) {
    response.status(400).send(error);
  }
};
export default { createUser, getLoggedinUser, login };
