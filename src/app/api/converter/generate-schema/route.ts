import generateSchema from 'json-schema-generator';
import { z } from 'zod';
import { ServerError } from '../../_services/errors';
import { SuccessCreate } from '../../_services/successfulResponses';

// Función simple para convertir JSON Schema a Zod en un nivel básico
function jsonSchemaToZod(schema: any): string {
    if (schema.type === 'object' && schema.properties) {
        let props = Object.entries(schema.properties)
            .map(([key, val]: any) => {
                let type = 'z.any()';
                switch (val.type) {
                    case 'string':
                        type = 'z.string()';
                        break;
                    case 'number':
                        type = 'z.number()';
                        break;
                    case 'integer':
                        type = 'z.number().int()';
                        break;
                    case 'boolean':
                        type = 'z.boolean()';
                        break;
                    case 'array':
                        type = 'z.array(z.any())';
                        break;
                    case 'object':
                        type = jsonSchemaToZod(val);
                        break;
                }
                return `${key}: ${type}`;
            })
            .join(',\n  ');
        return `z.object({\n  ${props}\n})`;
    }
    return 'z.any()';
}

export async function POST(request: Request) {
    try {
        const { json } = await request.json();
        const jsonSchema = generateSchema(json);
        const zodSchema = jsonSchemaToZod(jsonSchema);

        return SuccessCreate({ jsonSchema, zodSchema });
    } catch (error) {
        console.error('Error al generar el esquema:', error);
        return ServerError();
    }
}
