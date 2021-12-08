import { Pool } from "pg";

const pool = new Pool({
  user: "sgsdlnempiuojx",
  password: "5592ae706d871e869c0203f4a5ff7243b8387a88dd14c8390154a19d3ad13125",
  database: "d255bcnsfvlflf",
  port: 5432,
  host: "ec2-3-95-130-249.compute-1.amazonaws.com",
  ssl: true,
});

export default pool;
