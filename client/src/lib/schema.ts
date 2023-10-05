import { z } from "zod";

export const TodoListSchema = z.object({
  getTodoLists: z.array(
    z.object({
      id: z.string(),
      created_at: z.string().datetime(),
      title: z.string(),
      Todo: z.array(
        z.object({
          id: z.string(),
          title: z.string().min(4),
          completed: z.boolean(),
          remarks: z.string().min(4),
          category: z.string().min(3),
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
      id: z.string(),
      title: z.string().min(4),
      completed: z.boolean(),
      remarks: z.string().min(4),
      category: z.string().min(3),
    })
  ),
});
