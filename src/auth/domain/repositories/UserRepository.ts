import User from "../models/User";

interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  findByMail(mail: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
}

export default UserRepository;
