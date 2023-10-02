import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class todoInput {
  @Field()
  lId: string;

  @Field()
  deadline: string;

  @Field()
  completed: boolean;

  @Field()
  title: string;
}
