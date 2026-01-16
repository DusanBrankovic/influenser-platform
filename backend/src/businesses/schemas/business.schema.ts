import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const BusinessSchema: SchemaObject = {
  type: 'object',
  properties: {
    userId: {
      type: 'number',
      example: 1,
    },
    name: {
      type: 'string',
      example: 'Orion',
    },
    email: {
      type: 'string',
      example: 'orion@example.com',
    },
    role: {
      type: 'enum',
      enum: ['BUSINESS'],
      example: 'BUSINESS',
    }
  },
};
