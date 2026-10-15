import { Request, Response } from 'express';

const mockRestaurants: any[] = [];

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  res.status(201).json({ message: 'Mock created' });
};

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ restaurants: mockRestaurants });
};
