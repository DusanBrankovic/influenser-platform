import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const ProfilePictureSchema: SchemaObject = {
  type: "object",
  properties: {
    images: {
      type: "array",
      items: {
        type: "string",
        example: "https://bucket.example.com/user1/image1.jpg",
      },
    },
  },
};
