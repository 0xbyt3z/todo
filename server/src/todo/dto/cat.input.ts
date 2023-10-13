import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddCategoryInput {
  @Field()
  name: string;

  @Field()
  color: string;
}
