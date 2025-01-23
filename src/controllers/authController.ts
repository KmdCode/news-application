import { Request, Response, RequestHandler } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
   
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Account created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the account' });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};
