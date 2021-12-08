import { Request, Response, NextFunction } from "express";
import pool from "../dbconfig/dbconnector";

// adding a user
const createUser = (request: Request, response: Response) => {
  // get the data from req.body
  const {
    fullName,
    email,
    password,
  }: { fullName: String; email: String; password: String } = request.body;

  // add the user
  pool.query(
    "INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3)",
    [fullName, email, password],
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added : ${results.insertId}`);
    }
  );
};

// getting a user
const getLoggedinUser = (request: Request, response: Response) => {
  const email = parseInt(request.params.email);

  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error: any, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export default { createUser, getLoggedinUser };
