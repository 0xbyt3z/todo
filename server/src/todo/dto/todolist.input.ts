import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TodoListInput {
  @Field()
  email: string;

  @Field()
  title: string;
}

@InputType()
export class TodoListPaginationInput {
  @Field()
  email: string;

  @Field()
  first: number;

  @Field()
  skip: number;
}
