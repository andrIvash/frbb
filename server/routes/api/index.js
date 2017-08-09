import { Router } from 'express';
import { HttpError } from '../../error';
import route from './v1.0';

const app = Router();

app.use('/v1.0', route);

app.get('/', (req, res) => {
   res.send(new HttpError(400, 'api ok, please choose version /v1.0'));
});

export default app;
