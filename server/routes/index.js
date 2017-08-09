import { HttpError } from '../error';
import route from './api';

export default function(app) {
    app.use('/api', route);
    app.get('/', (req, res) => {
        res.send(new HttpError(400, 'API is available on /api'));
    });
}
