"use client";

//prevent next js caching the page.
export const dynamic = "force-dynamic";

import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import { gql, useMutation, useQuery } from "@apollo/client";
// import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Input } from "src/components/ui/input";
import { Calendar } from "src/components/ui/calendar";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const queries = {
  QUERY: gql`
    query getAllLists($uId: String = "cln4h6lwj0000h5yk5598l4q5") {
      getTodoLists(uId: $uId) {
        id
        created_at
        title
        Todo {
          title
          completed
        }
      }
    }
  `,
};

export default function Home() {
  const [time, setTime] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const { data }: { data: z.infer<typeof TodoListSchema> } = useSuspenseQuery(queries.QUERY);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toDateString().split(" "));
      setTime(new Date().toTimeString().split(" G"));
    }, 1000);
  }, []);

  return (
    <>
      <div className="w-full h-full">
        {/* <div>
      <span className='text-5xl font-extrabold'>{time[0]}</span>
    </div> */}

        <h1 className="text-3xl font-bold">Task Lists</h1>

        {/* list */}
        <div className="space-y-4 mt-10">
          {data?.getTodoLists.map((i) => (
            <ToDoContainer key={i.id} d={i} />
          ))}
        </div>
      </div>
    </>
  );
}

const ToDoContainer = ({ d }: { d: z.infer<typeof TodoSchema> }) => {
  const [isCollaped, setIsCollapsed] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let title: string = (e.currentTarget[0] as HTMLInputElement).value;
    let remarks: string = (e.currentTarget[1] as HTMLInputElement).value;
    const res = await fetch("http://localhost:3001/graphql", {
      mode: "no-cors",
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        query: `mutation($todoData: todoInput!= {completed: false,deadline: ${date},lId: ${d.id},title: ${title}}) {
          addTodo(todoData: $todoData ) {
            title
            completed
            deadline
          }
        }`,
      }),
    });
  };
  return (
    <>
      <div key={d.id} className={cn("w-1/2 p-2 h-12 drop-shadow-md border rounded-md flex flex-col justify-center", `${isCollaped ? "h-auto" : ""}`)}>
        <div className="flex items-center justify-between">
          {d.title}
          <div className="flex items-center">
            <span className="text-sm text-gray-600">{d.Todo.length} Tasks</span>
            <Button size={"icon"} variant={"outline"} className="ml-2 w-8 h-8">
              <svg
                onClick={() => setIsCollapsed(!isCollaped)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 transition-transform ease-in-out duration-500 ${isCollaped ? "rotate-180" : "rotate-0"}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Button>
          </div>
        </div>
        {/* todo list */}
        <div className={`w-full flex flex-col mt-5 ${isCollaped ? "block" : "hidden"}`}>
          {d.Todo.map((i) => {
            return (
              <>
                <div className="flex justify-between">
                  <span>{i.title}</span>
                  <span className={`${i.completed ? "text-purple-500" : "text-orange-500"}`}>
                    {i.completed ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                </div>
              </>
            );
          })}

          {/* add todo dialog */}
          <Dialog>
            <DialogTrigger className="w-full flex justify-start">
              <Button size={"sm"} variant={"secondary"} className="w-fit mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a task</DialogTitle>
                <DialogDescription>Add a task to this list.</DialogDescription>
                {/* form */}
                <div className="w-full h-auto">
                  <form onSubmit={handleAddTodo} className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                      <label htmlFor="title">Title</label>
                      <Input id="title" name="title" className="focus-visible:ring-0 w-[250px]" />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="remarks">Remarks</label>
                      <textarea
                        id="remarks"
                        className="flex h-24 w-[250px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      ></textarea>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="date">Date</label>
                      <Calendar mode="single" id="date" selected={date} onSelect={setDate} className="rounded-md border w-fit" />
                    </div>

                    <Button className="w-fit">Done</Button>
                  </form>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

const TodoListSchema = z.object({
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

const TodoSchema = z.object({
  id: z.string(),
  created_at: z.string().datetime(),
  title: z.string(),
  Todo: z.array(
    z.object({
      title: z.string(),
      completed: z.boolean(),
    })
  ),
});
