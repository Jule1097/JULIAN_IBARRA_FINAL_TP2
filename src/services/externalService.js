import { descargarContenido } from "../utils/downloadURL.js";
import { externalRepository } from "../repository/albumsService.js";

const csv_url = 'https://jsonplaceholder.typicode.com/albums';

export const externalService = {
    descargarYGuardarCSV: async () => {
        const contenido = await descargarContenido(csv_url);
        const albums = JSON.parse(contenido);
        const primeros15 = albums.slice(0, 15);
        
        // Convertir a CSV
        const headers = Object.keys(primeros15[0]).join(',');
        const rows = primeros15.map(album => Object.values(album).map(val => `"${val}"`).join(',')).join('\n');
        const csvContent = `${headers}\n${rows}`;
        
        await externalRepository.guardarCSV(csvContent);
        return csvContent;
    }
}