import { Response } from 'src/common/response';

export function buildResponse<T>(
  data: T,
  statusCode: number,
  message: string,
): Response<T> {
  return {
    data,
    statusCode,
    message,
  };
}
