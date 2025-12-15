import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const AccessTokenSchema: SchemaObject = {
    type: 'object',
    properties: {
        access_token: { type: 'string' },
    },
};

