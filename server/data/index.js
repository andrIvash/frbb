import nconf from 'nconf';
import path from 'path';

export default function() {
    nconf.stores.env.readOnly = false;
    return nconf.argv()
        .env()
        .file({file: path.join(__dirname, 'users.json')});
}
