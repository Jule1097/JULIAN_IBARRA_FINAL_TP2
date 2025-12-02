import { CSVHandler } from '../utils/CSVHandler.js';

export const externalRepository = {
    guardarCSV: async (contenidoCSV) => {
        const filePath = await CSVHandler.write(contenidoCSV);

        if(!filePath) return null;

        return filePath;
    }
}