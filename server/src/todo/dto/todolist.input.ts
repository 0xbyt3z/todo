import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TodoListInput {
  @Field()
  title: string;
}

@InputType()
export class TodoListPaginationInput {
  @Field()
  first: number;

  @Field()
  skip: number;
}
