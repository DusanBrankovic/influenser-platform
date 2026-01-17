import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const PostSchema: SchemaObject = {
  type: "object",
  properties: {
    id: {
      type: "number",
      example: 1,
    },
    userId: {
      type: "number",
      example: 1,
    },
    text: {
      type: "string",
      example: "This is a sample post text.",
    },
    images: {
      type: "array",
      items: {
        type: "string",
        example: "https://bucket.example.com/user1/image1.jpg",
      },
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2024-01-01T12:00:00Z",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2024-01-02T12:00:00Z",
    },
  },
};
