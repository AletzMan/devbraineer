import { RegexPattern } from '@prisma/client'; // Importa el tipo RegexPattern de Prisma
import axios from 'axios';

// Define un tipo para la respuesta de la lista de patrones (si tu capa de manejo de errores la envuelve)
// Adapta esto si tu API devuelve directamente el array.
type RegexPatternsListResponse = {
    error: boolean;
    response: RegexPattern[];
    // Añade otros campos si tu respuesta los tiene (ej. paginación)
};
type RegexPatternResponse = {
    error: boolean;
    message: string;
    data: RegexPattern;
};

/**
 * Obtiene la lista completa de patrones de expresiones regulares disponibles.
 * @returns {Promise<RegexPattern[]>} Una promesa que resuelve a un array de objetos RegexPattern
 * @throws {Error} Si hay un error al obtener los patrones
 */
export const getRegexPatterns = async (): Promise<RegexPattern[]> => {
    try {
        const response = await axios.get<RegexPatternsListResponse | RegexPattern[]>('/api/regex-patterns');
        if (response.data && (response.data as RegexPatternsListResponse).error === false) {
            return (response.data as RegexPatternsListResponse).response;
        } else if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('Unexpected response format from /api/regex-patterns:', response.data);
            throw new Error('Failed to parse regex patterns list.');
        }
    } catch (error) {
        console.error('Error fetching regex patterns:', error);
        throw error;
    }
};

// Función para obtener los detalles de un patrón específico por su ID
/*
export const getRegexPatternById = async (
    patternId: string
): Promise<RegexPattern> => {
    try {
        // Realiza la petición GET a /api/regex-patterns/[patternId]
        const response = await axios.get<RegexPatternResponse | RegexPattern>(
            `/api/regex-patterns/${patternId}`
        );

        // Adapta esto a la estructura real de tu respuesta
        if (
            response.data &&
            (response.data as RegexPatternResponse).error === false
        ) {
            return (response.data as RegexPatternResponse).response; // Si tu capa la envuelve
        } else if (response.status === 200) {
            // Si la API devuelve 200 directamente
            return response.data;
        } else {
            console.error(
                `Unexpected response format from GET /api/regex-patterns/${patternId}:`,
                response.data
            );
            throw new Error(
                `Failed to parse regex pattern ${patternId} response.`
            );
        }
    } catch (error) {
        console.error(`Error fetching regex pattern ${patternId}:`, error);
        throw error; // Re-lanza el error
    }
};
*/

/**
 * Crea un nuevo patrón de expresión regular en el sistema.
 * @param {Object} patternData - Datos del nuevo patrón a crear
 * @param {string} patternData.name - Nombre descriptivo del patrón
 * @param {string} patternData.pattern - La expresión regular en formato string
 * @param {string} [patternData.description] - Descripción opcional del patrón
 * @returns {Promise<RegexPattern>} Una promesa que resuelve al objeto RegexPattern creado
 * @throws {Error} Si hay un error al crear el patrón
 */
export const createRegexPattern = async (patternData: {
    name: string;
    pattern: string;
    description?: string;
}): Promise<RegexPattern> => {
    try {
        const response = await axios.post<RegexPatternResponse>('/api/regex-patterns', patternData);
        console.log('Patrón creado:', response.data);
        if (response.status === 201) {
            return response.data.data;
        } else {
            console.error('Unexpected response format from POST /api/regex-patterns:', response.data);
            throw new Error('Failed to parse created regex pattern response.');
        }
    } catch (error) {
        console.error('Error creating regex pattern:', error);
        throw error;
    }
};

export async function deleteRegexPatternById(id: string): Promise<RegexPattern> {
    try {
        const deletedPattern = await axios.delete<RegexPatternResponse>(`/api/regex-patterns/${id}`);
        console.log('Patrón eliminado:', deletedPattern.data);
        if (deletedPattern.status === 200) {
            return deletedPattern.data.data;
        } else {
            console.error('Unexpected response format from DELETE /api/regex-patterns/:', deletedPattern.data);
            throw new Error('Failed to parse deleted regex pattern response.');
        }
    } catch (error) {
        console.error('Error deleting regex pattern:', error);
        throw error;
    }
}
