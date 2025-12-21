import { faker } from "@faker-js/faker";
import type { ImageProps } from "./image.types";

const MockImage: React.FC<ImageProps> = ({ imageStyle }) => {
  const generateRandomImage = () => {
    return faker.image.avatar();
  };
  return <img src={generateRandomImage()} className={imageStyle} alt="Mock" />;
};

export default MockImage;
