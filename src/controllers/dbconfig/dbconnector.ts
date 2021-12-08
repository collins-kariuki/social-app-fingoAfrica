import { Pool } from "pg";

export default new Pool({
  max: 20,
  connectionString:
    "postgres://sgsdlnempiuojx:5592ae706d871e869c0203f4a5ff7243b8387a88dd14c8390154a19d3ad13125@ec2-3-95-130-249.compute-1.amazonaws.com:5432/d255bcnsfvlflf",
  idleTimeoutMillis: 30000,
});
