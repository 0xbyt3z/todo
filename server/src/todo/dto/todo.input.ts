import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TodoInput {
  @Field()
  lId: string;

  @Field()
  deadline: string;

  @Field()
  completed: boolean;

  @Field()
  title: string;

  @Field()
  category: string;
}
