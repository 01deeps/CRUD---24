import { Router } from 'express';
import EventController from '../controllers/EventController';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

// Apply the middleware to the routes
router.post('/events', authenticateJWT, authorizeRoles('user', 'admin'), EventController.createEvent);
router.get('/events', authenticateJWT, authorizeRoles('user', 'admin'), EventController.getEvents);
router.put('/events/:id', authenticateJWT, authorizeRoles('user', 'admin'), EventController.updateEvent);
router.delete('/events/:id', authenticateJWT, authorizeRoles('admin'), EventController.deleteEvent);

export default router;
