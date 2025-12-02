import { externalService } from "../services/externalService.js";

export const externalController = {
    getExternalCSV: async (req, res) => {
        try {
            const csvContent = await externalService.descargarYGuardarCSV();

            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvContent);
        } catch (error) {
            res.status(500).json({
                message: 'Error al descargar y guardar el CSV',
                error: error.message,
                ok:false
            });
        }
    }
}