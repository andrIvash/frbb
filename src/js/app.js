import '../styles/app.scss';
import get from './getData';

console.log('start app');

// Use it! - пример отправки запроса

const url = '/server/api/v1.0/users';

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    get(url).then(res => {
        console.log('Success!', res);
    },
    error => {
        console.error('Failed!', error);
    });
});


