import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface User {
  fullName: String;
  email: String;
  password: String;
  timestamp: String;
}

// adding a user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let fullName: string = req.body.fullName;
  let email: string = req.body.email;
  let pasword: string = req.body.password;

  // add the user

  // return response
  return res.status(200).json({
    sucess: "resp",
  });
};
