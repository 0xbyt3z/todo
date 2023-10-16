import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jsonwebtoken from 'jsonwebtoken';
import { TypeJWT } from '../auth.service';
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    //use to return the email of the user

    let token = '';
    (context.getArgs()[2].req['rawHeaders'] as []).map((s: string) => {
      if (s.includes('Bearer')) {
        token = s.split(' ')[1];
      }
    });
    const decode: any = jsonwebtoken.decode(token, {
      complete: true,
    });
    if (decode) {
      return decode?.payload.email;
    }
    return '';
  },
);
