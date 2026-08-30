import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type IReqUser = {
  userId: number;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
