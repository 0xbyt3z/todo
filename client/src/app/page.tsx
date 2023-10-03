"use client";

import { Button, buttonVariants } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Input } from "src/components/ui/input";
import { Calendar } from "src/components/ui/calendar";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { TodoListSchema, TodoSchema } from "@/lib/schema";
import ToDoContainer from "../components/custom/todo";
import toast from "react-hot-toast";

const queries = {
  QUERY: gql`
    query getAllLists($uId: String!) {
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
  const [listdate, setListDate] = React.useState<Date | undefined>(new Date());
  const [showListModal, setShowListModal] = useState(false);
  const { data }: { data: z.infer<typeof TodoListSchema> } = useSuspenseQuery(queries.QUERY, { variables: { uId: "cln4h6lwj0000h5yk5598l4q5" }, fetchPolicy: "network-only" });

  const handleAddTodoList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let t = toast.loading("Please Wait");
    let title: string = (e.currentTarget[0] as HTMLInputElement).value;
    let remarks: string = (e.currentTarget[1] as HTMLInputElement).value;

    const validate = TodoSchema.pick({ Todo: true }).safeParse({
      Todo: [
        {
          title,
          completed: false,
        },
      ],
    });
    if (!validate.success) {
      toast.error("Please Enter valid data !", { id: t });

      return;
    }

    const res = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        query: `mutation($todoListData: TodoListInput!) {
          addTodoList(todoListData: $todoListData) {
            title
            created_at
          }
        }`,
        variables: {
          todoListData: { title: title, uId: "cln4h6lwj0000h5yk5598l4q5" },
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => toast.error("Something went wrong !", { id: t }));

    console.log(res);

    if (res) {
      toast.success("Done !", { id: t });
      setShowListModal(false);
    }
  };

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
        <div className="w-full flex justify-end">
          <Button onClick={() => setShowListModal(true)} variant={"outline"} className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="fore w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
            </svg>
            New List
          </Button>
        </div>

        <h1 className="text-3xl font-bold">Task Lists</h1>

        {/* list */}
        <div className="space-y-4 mt-10">
          {data?.getTodoLists.map((i) => (
            <ToDoContainer key={i.id} d={i} />
          ))}
        </div>
      </div>

      {/* list modal */}
      <Dialog open={showListModal}>
        <DialogContent className="remove-radix-close-icon">
          <DialogHeader>
            <DialogTitle>Create Task List</DialogTitle>
            <DialogDescription>Add a task to this list.</DialogDescription>
            {/* form */}
            <div className="w-full h-auto">
              <form onSubmit={handleAddTodoList} className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="title">Title</label>
                  <Input id="title" name="title" className="focus-visible:ring-0 w-[250px]" />
                </div>

                <div className="flex space-x-2">
                  <Button className="w-fit">Done</Button>
                  <div
                    onClick={() => setShowListModal(false)}
                    className=" inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  >
                    Close
                  </div>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
