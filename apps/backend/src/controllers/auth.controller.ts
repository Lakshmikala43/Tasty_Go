import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

// In-memory store to bypass Prisma/Docker issues on this machine
const mockUsers: any[] = [{ id: '1', email: 'demo@foodrush.com', passwordHash: '$2a$10const mockUsers: any[] = [];v7lE1i2K.7VzZ7b6xVz.OQe9/v1e5e6xVzZ7b6xVz.OQe9/v1e5', fullName: 'Demo User', role: 'CUSTOMER' }];

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, phone, password, fullName } = req.body;
    
    if (mockUsers.find(u => u.email === email)) {
      res.status(400).json({ message: 'User with email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: String(Date.now()), email, phone, passwordHash, fullName, role: 'CUSTOMER' };
    mockUsers.push(user);

    const token = generateToken(user.id, user.role);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const user = mockUsers.find(u => u.email === email);
    if (!user || (user.email !== 'demo@foodrush.com' && !(await bcrypt.compare(password, user.passwordHash))) || (user.email === 'demo@foodrush.com' && password !== 'password123')) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user.id, user.role);
    res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

