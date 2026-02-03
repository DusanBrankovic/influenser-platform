export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export type RegisterResponse = {
  id: string;
  email: string;
  username: string;
};
