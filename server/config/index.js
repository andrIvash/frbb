// экспортируем настройки
import nconf from 'nconf';
import path from 'path';

export default function() {
    return nconf.argv()
        .env()
        .file({file: path.join(__dirname, 'config.json')});
}
