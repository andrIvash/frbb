function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.setRequestHeader('content-type', 'application/json');
        req.onload = function() {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function() {
            reject(Error('Network Error'));
        };
        req.send();
    });
}

export default get;


