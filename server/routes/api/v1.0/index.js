import { Router } from 'express';
import { HttpError } from '../../../error';
import route from './users';

const app = Router();

app.use('/users', route);
app.get('/', (req, res) => {
    res.send(new HttpError(400, 'wrong query'));
});

export default app;
