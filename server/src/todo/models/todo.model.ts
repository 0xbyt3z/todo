import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  refreshToken: string;

  @Field({ nullable: true })
  created_at: Date;

  @Field((type) => [TodoList])
  TodoList: TodoList[];
}

@ObjectType()
export class TodoList {
  @Field((type) => ID)
  id: string;

  @Field()
  uId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  created_at: Date;

  @Field((type) => [Todo])
  Todo: Todo[];
}

@ObjectType()
export class Todo {
  @Field((type) => ID)
  id: string;

  @Field()
  lId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  remarks: string;

  @Field()
  completed: boolean;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  deadline: Date;

  @Field({ nullable: true })
  created_at: Date;
}

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  color: string;
}
