import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserInput {
  @Field()
  id: string;
}

@InputType()
export class AddUserInput {
  @Field()
  email: string;
}
