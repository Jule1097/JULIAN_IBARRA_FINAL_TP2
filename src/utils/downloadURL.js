import https from 'node:https';

export const descargarContenido = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {data += chunk;});
            res.on('end', () => {resolve(data);});
        }).on('error', (err) => {reject(err);});      
    });
};