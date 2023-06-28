import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class PostgresDB {
  private pool: Pool;

  constructor() {
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    const dbDatabase = process.env.DB_DATABASE;

    if (!dbHost || !dbPort || !dbUser || !dbPassword || !dbDatabase) {
      throw new Error("Missing required environment variables");
    }

    this.pool = new Pool({
      user: dbUser,
      host: dbHost,
      database: dbDatabase,
      password: dbPassword,
      port: parseInt(dbPort),
    });
  }

  async query(text: string, values: any[] = []): Promise<any> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(text, values);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default PostgresDB;
