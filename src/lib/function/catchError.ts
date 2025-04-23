import { HttpException, HttpStatus } from "@nestjs/common"

export const throwInternalServerError = (err: any) => {
  throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
}