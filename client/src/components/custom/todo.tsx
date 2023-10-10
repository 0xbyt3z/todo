"use client";

import { Button } from "@/components/ui/button";
import { TodoSchema } from "@/lib/schema";
import { cn, GraphQLStateHandler } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

export default function ToDoContainer({ d, invokeFetch }: { d: z.infer<typeof TodoSchema>; invokeFetch: any }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [currentTodoDelete, setCurrentTodoDelete] = useState("");
  const [isCollaped, setIsCollapsed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showTodoDeleteModal, setShowTodoDeleteModal] = useState(false);
  const [showTodoListDeleteModal, setShowTodoListDeleteModal] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: session, status } = useSession();

  const { data: categories, refetch: refetchCategories } = useQuery(queries.GetUserCategories, {
    onError: GraphQLStateHandler.customOnError,
    onCompleted: GraphQLStateHandler.customOnCompleted,
  });
  const [addTodo] = useMutation(mutations.AddTodo, {
    onError: GraphQLStateHandler.customOnError,
    onCompleted: (data) => {
      GraphQLStateHandler.customOnCompleted(data), invokeFetch();
    },
  });
  const [updateTodo] = useMutation(mutations.UpdateTodo, {
    onError: GraphQLStateHandler.customOnError,
    onCompleted: (data) => {
      GraphQLStateHandler.customOnCompleted(data), invokeFetch();
    },
  });
  const [deleteTodo] = useMutation(mutations.DeleteTodo, {
    onError: GraphQLStateHandler.customOnError,
    onCompleted: (data) => {
      GraphQLStateHandler.customOnCompleted(data), invokeFetch();
    },
  });

  const [deleteTodoList] = useMutation(mutations.DeleteTodList, {
    onError: GraphQLStateHandler.customOnError,
    onCompleted: (data) => {
      GraphQLStateHandler.customOnCompleted(data), invokeFetch();
    },
  });

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let t = toast.loading("Please Wait");
    let title: string = (e.currentTarget[0] as HTMLInputElement).value;
    let remarks: string = (e.currentTarget[1] as HTMLInputElement).value;

    const validate = TodoSchema.pick({ Todo: true }).safeParse({
      Todo: [
        {
          id: "",
          title,
          remarks,
          completed: false,
          date: "",
          category: selectedCategory,
        },
      ],
    });
    if (!validate.success) {
      toast.error("Please Enter valid data !", { id: t });
      return;
    }

    addTodo({
      variables: {
        todoData: { completed: false, title: title, remarks: remarks, lId: d.id, deadline: date?.toISOString(), category: selectedCategory },
      },
    })
      .then((res) => {
        if (res.data) {
          setShowModal(false);
          invokeFetch();
        }
      })
      .catch((err) => toast.error("Something went wrong !", { id: t }));
  };

  useEffect(() => {
    if (status == "authenticated") {
      refetchCategories({
        email: session.user.email,
      });
    }
  }, [status]);

  useEffect(() => {
    setCompletedTaskCount(Object.values(d.Todo).reduce((a, item) => a + (item.completed === true ? 1 : 0), 0));
  }, [d]);

  useEffect(() => {
    console.log(date?.toISOString());
  }, [date]);

  return (
    <>
      <div key={d.id} className={cn("w-full p-2 h-8 border-0 border-b-[0px] flex flex-col justify-center", `${isCollaped ? "h-auto" : ""}`)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium">{d.title}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              {completedTaskCount}/{d.Todo.length} Tasks
            </span>
            {/* delete todo list */}
            <svg onClick={() => setShowTodoListDeleteModal(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-3 text-red-500">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>

            {/* add todo dialog */}
            <svg onClick={() => setShowModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1 hover:bg-gray-100 rounded-md">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <svg
              onClick={() => setIsCollapsed(!isCollaped)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-5 h-5 ml-2 transition-transform ease-in-out duration-500 ${isCollaped ? "rotate-180" : "rotate-0"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        {/* todo list */}
        <div className={`w-full flex flex-col mt-5 ${isCollaped ? "block" : "hidden"}`}>
          {d.Todo.length == 0 ? (
            <p className="text-gray-400 text-sm">Add a task to this '+'</p>
          ) : (
            d.Todo.map((i, index) => {
              return (
                <>
                  <div className="flex justify-between group">
                    <div className="flex items-center">
                      <Checkbox onClick={() => updateTodo({ variables: { id: i.id } })} defaultChecked={i.completed} className="w-5 h-5 mr-2" />
                      {i.remarks && <div className="absolute ml-6 p-2 py-1 text-xs hidden group-hover:block border-[1px] bg-white w-fit mt-10">{i.remarks}</div>}
                      <ContextMenu>
                        <ContextMenuTrigger className="flex items-center">
                          <span>{i.title}</span>
                          {/* <span className="ml-10 text-xs ">{i.category !== "notset" ? i.category : ""}</span> */}
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem
                            onClick={() => {
                              setShowTodoDeleteModal(true), setCurrentTodoDelete(i.id);
                            }}
                            className="text-red-500 font-medium"
                          >
                            Delete
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </div>
                    <div></div>
                  </div>
                </>
              );
            })
          )}

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

                    <div>
                      <label htmlFor="remarks">Category</label>
                      <Select onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[250px] capitalize">
                          <SelectValue defaultValue={"notset"} placeholder="please select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notset">None</SelectItem>
                          {categories &&
                            categories.getUserCategories.map((i: { name: string; color: string }) => (
                              <SelectItem value={i.name} className={`text-${i.color}-500 capitalize`}>
                                {i.name}
                              </SelectItem>
                            ))}{" "}
                        </SelectContent>
                      </Select>
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

          {/* alert confirmation delete todo */}
          <AlertDialog open={showTodoDeleteModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This will delete this task from the database.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowTodoDeleteModal(false)}>Cancel</AlertDialogCancel>
                <Button variant={"destructive"} onClick={() => deleteTodo({ variables: { id: currentTodoDelete } }).finally(() => setShowTodoDeleteModal(false))}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* alert confirmation delete todo */}
          <AlertDialog open={showTodoListDeleteModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This will delete this list from the database.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowTodoListDeleteModal(false)}>Cancel</AlertDialogCancel>
                <Button variant={"destructive"} onClick={() => deleteTodoList({ variables: { id: d.id } }).finally(() => setShowTodoListDeleteModal(false))}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}

const queries = {
  GetUserCategories: gql`
    query GetUser($email: String!) {
      getUserCategories(email: $email) {
        name
        color
      }
    }
  `,
};

const foreColorList = {
  red: "text-red-500",
  green: "text-green-500",
};

const mutations = {
  AddTodo: gql`
    mutation ($todoData: TodoInput!) {
      addTodo(todoData: $todoData) {
        title
        completed
        deadline
      }
    }
  `,
  UpdateTodo: gql`
    mutation ($id: String!) {
      updateTodo(id: $id) {
        completed
        title
      }
    }
  `,
  DeleteTodo: gql`
    mutation ($id: String!) {
      deleteTodo(id: $id) {
        title
      }
    }
  `,
  DeleteTodList: gql`
    mutation ($id: String!) {
      deleteTodoList(id: $id) {
        title
      }
    }
  `,
};
