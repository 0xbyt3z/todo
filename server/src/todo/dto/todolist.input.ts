import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TodoListInput {
  @Field()
  email: string;

  @Field()
  title: string;
}
