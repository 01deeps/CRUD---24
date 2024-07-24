import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded;
      next();
    } catch (error) {
      logger.warn('Invalid Token');
      res.status(403).json({ error: 'Forbidden' });
    }
  } else {
    logger.warn('No Token Provided');
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      logger.warn(`User role ${req.user.role} not authorized`);
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
