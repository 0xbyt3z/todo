import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddCategoryInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  color: string;
}
