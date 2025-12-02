import fs from 'node:fs/promises';
import path from 'node:path';
import config from '../config/config.js';

const { DB_PATH_CSV} = config;

export const CSVHandler = {
    async read() {
        try {
            const content = await fs.readFile(DB_PATH_CSV, { encoding: 'utf8'});

            return content;
        } catch (error) {
            console.error("Error leyendo archivo CSV ", error);
            return;
        }
    },
    async write(content) {
        try {
        console.log('Attempting to write CSV to:', DB_PATH_CSV);
        console.log('Content length:', content ? content.length : 'empty');
        await fs.mkdir(path.dirname(DB_PATH_CSV), { recursive: true });
        await fs.writeFile(DB_PATH_CSV, content, { encoding: 'utf8' });
        console.log('CSV written successfully to:', DB_PATH_CSV);
        return DB_PATH_CSV;
        } catch (error) {
            console.error("Error escribiendo archivo CSV ", error);
            return;
        }
    }
}