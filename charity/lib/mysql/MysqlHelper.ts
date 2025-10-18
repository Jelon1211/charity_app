import mysql, { Pool, PoolConnection } from "mysql2/promise";
import {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from "../../config/const";

class MySQLHelper {
  private static instance: MySQLHelper;
  private pool: Pool;

  private constructor() {
    if (
      !MYSQL_HOST ||
      !MYSQL_DB ||
      !MYSQL_USER ||
      !MYSQL_PASSWORD ||
      !MYSQL_PORT
    ) {
      throw new Error("Missing MySQL environment variables.");
    }

    this.pool = mysql.createPool({
      host: MYSQL_HOST,
      port: Number(MYSQL_PORT),
      database: MYSQL_DB,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      connectionLimit: 10,
      waitForConnections: true,
    });
  }

  public static getInstance(): MySQLHelper {
    if (!MySQLHelper.instance) {
      MySQLHelper.instance = new MySQLHelper();
    }
    return MySQLHelper.instance;
  }

  async query<T extends mysql.ResultSetHeader = any>(
    sql: string,
    params?: any[]
  ): Promise<T[]> {
    const [rows] = await this.pool.query<T[]>(sql, params);
    return rows;
  }

  async getConnection(): Promise<PoolConnection> {
    return await this.pool.getConnection();
  }

  async transaction<T = any>(
    fn: (conn: PoolConnection) => Promise<T>
  ): Promise<T> {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();
      const result = await fn(conn);
      await conn.commit();
      return result;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async ping(): Promise<boolean> {
    try {
      await this.pool.query("SELECT 1");
      return true;
    } catch (error) {
      console.error("MySQL health check failed:", error);
      return false;
    }
  }

  async disconnect() {
    await this.pool.end();
  }
}

declare global {
  // eslint-disable-next-line no-var
  var mysqlHelperGlobal: MySQLHelper | undefined;
}

export const mysqlHelper =
  global.mysqlHelperGlobal || MySQLHelper.getInstance();

if (process.env.NODE_ENV !== "production") {
  global.mysqlHelperGlobal = mysqlHelper;
}
