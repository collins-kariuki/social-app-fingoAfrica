import { Request, Response, NextFunction } from "express";
import pool from "../dbconfig/dbconnector";
import bcrypt from "bcrypt";
let timestamp: string;
let hashedPassword: string;
// adding a user

const createUser = async (request: Request, response: Response) => {
  // get the data from req.body
  const {
    fullName,
    email,
    password,
  }: { fullName: string; email: string; password: string } = request.body;
  console.log(fullName);

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
    const client = await pool.connect();

    await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (error: any, results: { rows: any }) => {
        if (error) {
          throw error;
        }
        if (email == results.rows) {
          response.status(400).json({ Error: "User with that email exists" });
        }
      }
    );

    await client.query(
      "INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3)",
      [fullName, email, hashedPassword],
      (error: any, results: any) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added : ${results.insertId}`);
      }
    );

    client.release();
  } catch (error) {
    response.status(400).send(error);
  }
};
// getting a user
const getLoggedinUser = async (request: Request, response: Response) => {
  const email = parseInt(request.params.email);

  try {
    const client = await pool.connect();

    await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (error: any, results: { rows: any }) => {
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
export default { createUser, getLoggedinUser };
