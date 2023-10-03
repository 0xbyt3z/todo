import { z } from "zod";

export const TodoListSchema = z.object({
  getTodoLists: z.array(
    z.object({
      id: z.string(),
      created_at: z.string().datetime(),
      title: z.string(),
      Todo: z.array(
        z.object({
          title: z.string(),
          completed: z.boolean(),
        })
      ),
    })
  ),
});

export const TodoSchema = z.object({
  id: z.string(),
  created_at: z.string().datetime(),
  title: z.string(),
  Todo: z.array(
    z.object({
      title: z.string().min(5),
      completed: z.boolean(),
    })
  ),
});
