import User from "../../domain/models/User";
import UserRepository from "../../domain/repositories/UserRepository";
import PostgresDB from "../database/PostgresDB";

class PostgresUserRepository implements UserRepository {
  private db: PostgresDB;

  constructor(db: PostgresDB) {
    this.db = db;
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await this.db.query(query, [username]);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];
    return {
      id: user.id,
      username: user.username,
      mail: user.mail,
      password: user.password,
    };
  }

  async findByMail(mail: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE mail = $1";
    const result = await this.db.query(query, [mail]);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];
    return {
      id: user.id,
      username: user.username,
      mail: user.mail,
      password: user.password,
    };
  }

  async createUser(user: User): Promise<User> {
    const query =
      "INSERT INTO users (username, mail, password) VALUES ($1, $2, $3) RETURNING id";
    const result = await this.db.query(query, [
      user.username,
      user.mail,
      user.password,
    ]);

    const newUser: User = {
      id: result[0].id,
      username: user.username,
      mail: user.mail,
      password: user.password,
    };

    return newUser;
  }

  async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await this.db.query(query, [id]);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];
    return {
      id: user.id,
      username: user.username,
      mail: user.mail,
      password: user.password,
    };
  }
}

export default PostgresUserRepository;
