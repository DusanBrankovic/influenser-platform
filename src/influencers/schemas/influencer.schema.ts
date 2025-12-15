import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const InfluencerSchema: SchemaObject = {
  type: 'object',
  properties: {
    userId: {
      type: 'number',
      example: 1,
    },
    name: {
      type: 'string',
      example: 'John Doe',
    },
    headline: {
      type: 'string',
      example: 'Travel Blogger and Photographer',
    },
    experience: {
      type: 'string',
      example: '5 years of experience in travel blogging',
    },
    isPrivate: {
      type: 'boolean',
      example: false,
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
