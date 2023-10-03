"use client";

import { Button } from "@/components/ui/button";
import { TodoSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

export default function ToDoContainer({ d }: { d: z.infer<typeof TodoSchema> }) {
  const [isCollaped, setIsCollapsed] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showModal, setShowModal] = useState(false);
  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
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
        query: `mutation($todoData: todoInput!) {
            addTodo(todoData: $todoData ) {
              title
              completed
              deadline
            }
          }`,
        variables: {
          todoData: { completed: false, title: title, lId: d.id, deadline: date?.toISOString() },
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => toast.error("Something went wrong !", { id: t }));

    console.log(res);

    if (res) {
      toast.success("Done !", { id: t });
    }
  };

  return (
    <>
      <div key={d.id} className={cn("w-full p-2 h-12 drop-shadow-md border rounded-md flex flex-col justify-center", `${isCollaped ? "h-auto" : ""}`)}>
        <div className="flex items-center justify-between">
          <span className="font-medium">{d.title}</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">{d.Todo.length} Tasks</span>
            <Button size={"icon"} variant={"ghost"} className="ml-2 w-8 h-8">
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
          {d.Todo.map((i, index) => {
            return (
              <>
                <div className="flex justify-between">
                  <div>
                    <span>{index + 1}. </span>
                    <span>{i.title}</span>
                  </div>
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

          <Button onClick={() => setShowModal(true)} size={"sm"} variant={"secondary"} className="w-fit mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </Button>

          <Dialog open={showModal}>
            <DialogContent className="remove-radix-close-icon">
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
                    <div className="flex space-x-2">
                      <Button className="w-fit">Done</Button>
                      <div
                        onClick={() => setShowModal(false)}
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
        </div>
      </div>
    </>
  );
}
