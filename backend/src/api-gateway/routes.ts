import { Router } from 'express';
import { authRouter } from '../auth-service/routes';
import { boatRouter } from '../boat-service/routes';
import { bookingRouter } from '../booking-service/routes';

export const apiGatewayRouter = Router();

// Route to different services
apiGatewayRouter.use('/auth', authRouter);
apiGatewayRouter.use('/boats', boatRouter);
apiGatewayRouter.use('/bookings', bookingRouter);


