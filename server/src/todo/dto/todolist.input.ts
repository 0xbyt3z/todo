import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TodoListInput {
  @Field()
  uId: string;

  @Field()
  title: string;
}
