import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const InfluencerSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    name: {
      type: 'string',
      example: 'John Doe',
    },
    email: {
      type: 'string',
      example: 'john.doe@example.com',
    },
    role: {
      type: 'enum',
      enum: ['INFLUENCER'],
      example: 'INFLUENCER',
    }
  },
};
