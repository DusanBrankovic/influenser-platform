import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const CreateInfluencerSchema: SchemaObject = {
  type: "object",
  properties: {
    userId: {
      type: "number",
      example: 1,
    },
    name: {
      type: "string",
      example: "John Doe",
    },
    headline: {
      type: "string",
      example: "Travel Blogger and Photographer",
    },
    experience: {
      type: "string",
      example: "5 years of experience in travel blogging",
    },
    isPrivate: {
      type: "boolean",
      example: false,
    },
    email: {
      type: "string",
      example: "john.doe@example.com",
    },
    role: {
      type: "enum",
      enum: ["INFLUENCER"],
      example: "INFLUENCER",
    },
    industries: {
      type: "array",
      items: {
        type: "enum",
        enum: [
          "Fitness",
          "Fashion",
          "Beauty",
          "Lifestyle",
          "Travel",
          "FoodAndCooking",
          "ParentingAndFamily",
          "Gaming",
          "Tech",
          "BusinessAndFinance",
        ],
        example: "Fitness",
      },
    },
    values: {
      type: "array",
      items: {
        type: "enum",
        enum: [
          "Authenticity",
          "Transparency",
          "Creativity",
          "Inclusivity",
          "BodyPositivity",
          "MentalHealthAwareness",
        ],
        example: "Creativity",
      },
    },
  },
};

export const GetInfluencerSchema: SchemaObject = {
  type: "object",
  properties: {
    userId: {
      type: "number",
      example: 1,
    },
    name: {
      type: "string",
      example: "John Doe",
    },
    headline: {
      type: "string",
      example: "Travel Blogger and Photographer",
    },
    experience: {
      type: "string",
      example: "5 years of experience in travel blogging",
    },
    industries: {
      type: "array",
      items: {
        type: "enum",
        enum: [
          "Fitness",
          "Fashion",
          "Beauty",
          "Lifestyle",
          "Travel",
          "FoodAndCooking",
          "ParentingAndFamily",
          "Gaming",
          "Tech",
          "BusinessAndFinance",
        ],
        example: "Fitness",
      },
    },
    values: {
      type: "array",
      items: {
        type: "enum",
        enum: [
          "Authenticity",
          "Transparency",
          "Creativity",
          "Inclusivity",
          "BodyPositivity",
          "MentalHealthAwareness",
        ],
        example: "Creativity",
      },
    },
  },
};
