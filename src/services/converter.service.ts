import axios from 'axios';

interface SchemaResponse {
    message: string;
    data: Schemas;
    error?: string;
}

interface Schemas {
    jsonSchema: string;
    zodSchema: string;
}

export async function generateSchemas(jsonData: any): Promise<Schemas | undefined> {
    try {
        const res = await axios.post<SchemaResponse>('/api/converter/generate-schema', jsonData);
        const response: Schemas = res.data.data;
        if (res.status === 201) {
            return response;
        }
        return undefined;
    } catch (error) {
        console.error('Error al generar el esquema:', error);
        return undefined;
    }
}
