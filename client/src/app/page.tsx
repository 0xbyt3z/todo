"use client";

import { Button } from "src/components/ui/button";
import { GraphQLStateHandler, cn } from "src/lib/utils";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Input } from "src/components/ui/input";
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TodoSchema } from "@/lib/schema";
import ToDoContainer from "../components/custom/todo";
import toast from "react-hot-toast";
import Loading from "./loading";
import { z } from "zod";

export default function Home() {
  const { data: session, status } = useSession();
  const [currentPageNo, setCurrentPageNo] = useState<number>(0);
  const [currentFetchSize, setCurrentFetchSize] = useState<number>(5);
  const [time, setTime] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [colorSelect, setColorSelect] = useState<string>();
  // const [listdate, setListDate] = React.useState<Date | undefined>(new Date());
  const [showListModal, setShowListModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const { loading, data, refetch } = useQuery(queries.GetListsWithPagiantion, {
    fetchPolicy: "network-only",
    variables: { args: { email: "", first: 0, skip: 0 } },
    onError: GraphQLStateHandler.customOnError,
    onCompleted: GraphQLStateHandler.customOnCompleted,
  });
  const [addCategory] = useMutation(mutations.CategoryQuery, {
    onError: GraphQLStateHandler.customOnError,
    onCompleted: (data) => {
      GraphQLStateHandler.customOnCompleted(data), location.reload();
    },
  });
  const [addTodoList] = useMutation(mutations.AddTodoList, {
    onError: GraphQLStateHandler.customOnError,
    onCompleted: (data) => {
      GraphQLStateHandler.customOnCompleted(data), handleRefetchFromChild();
    },
  });

  const handleRefetchFromChild = () => {
    //this function will be called from children
    refetch({ args: { email: session?.user.email, first: currentFetchSize, skip: currentPageNo * currentFetchSize } });
  };
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let t = toast.loading("Please Wait");
    let name: string = (e.currentTarget[0] as HTMLInputElement).value;

    const categoryschema = z.object({ color: z.string().min(3), name: z.string().min(3) });

    //validate
    const validated = categoryschema.safeParse({ color: colorSelect, name });
    if (!validated.success) {
      toast.error("Please enter valid data", { id: t });
      return;
    }

    addCategory({ variables: { data: { color: colorSelect, email: session?.user.email, name } } }).catch((err) => {
      toast.error("Someting went wrong !", { id: t });
      return;
    });

    toast.success("Done !", { id: t });

    setShowCategoriesModal(false);
  };

  const handleAddTodoList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let t = toast.loading("Please Wait");
    let title: string = (e.currentTarget[0] as HTMLInputElement).value;

    if (title === "") {
      toast.error("Please Enter valid data !", { id: t });
      //escape the funtion if true
      return;
    }

    addTodoList({
      variables: {
        todoListData: { title: title, email: session?.user.email },
      },
    })
      .then((res) => {
        if (res.data) {
          setShowListModal(false);
        }
      })
      .catch((err) => toast.error("Something went wrong !", { id: t }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toDateString().split(" "));
      setTime(new Date().toTimeString().split(" G"));
    }, 1000);
  }, []);

  useEffect(() => {
    if (status == "authenticated") {
      refetch({ args: { email: session.user.email, first: currentFetchSize, skip: currentPageNo * currentFetchSize } });
    }
  }, [status, currentPageNo]);

  return (
    <>
      <div className="w-full h-full">
        {/* <div>
      <span className='text-5xl font-extrabold'>{time[0]}</span>
    </div> */}
        <div className="w-full flex justify-end space-x-2">
          <Button disabled={session == undefined} onClick={() => setShowCategoriesModal(true)} variant={"outline"} className="flex ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
              <path
                fillRule="evenodd"
                d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            New Category
          </Button>
          <Button disabled={session == undefined} onClick={() => setShowListModal(true)} variant={"default"} className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
              <path d="M4.75 3A1.75 1.75 0 003 4.75v2.752l.104-.002h13.792c.035 0 .07 0 .104.002V6.75A1.75 1.75 0 0015.25 5h-3.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H4.75zM3.104 9a1.75 1.75 0 00-1.673 2.265l1.385 4.5A1.75 1.75 0 004.488 17h11.023a1.75 1.75 0 001.673-1.235l1.384-4.5A1.75 1.75 0 0016.896 9H3.104z" />
            </svg>
            New List
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Task Lists</h1>
        {/* list */}
        <div className="space-y-4 mt-10">
          {loading ? (
            <Loading />
          ) : data?.getTodoListsWithPagiantion.length ? (
            data?.getTodoListsWithPagiantion.map((i: any) => <ToDoContainer invokeFetch={handleRefetchFromChild} key={i.id} d={i} />)
          ) : (
            <p className="animate-pulse">No tasks yet</p>
          )}
        </div>
        {/* pagination button group */}
        <div className="flex mt-10 space-x-1">
          <Button
            onClick={() => {
              if (currentPageNo > 0) setCurrentPageNo((state) => state - 1);
            }}
            disabled={session == undefined}
            variant={"outline"}
            size={"icon"}
            className="w-8 h-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button disabled={session == undefined} variant={"outline"} size={"icon"} className="w-8 h-8">
            {currentPageNo + 1}
          </Button>
          <Button
            onClick={() => {
              //this prevent incrementing the page number when reach the end of results
              data.getTodoListsWithPagiantion.length == currentFetchSize ? setCurrentPageNo((state) => state + 1) : toast("That's All");
            }}
            disabled={session == undefined}
            variant={"outline"}
            size={"icon"}
            className="w-8 h-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Button>
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

      {/* category modal */}
      <Dialog open={showCategoriesModal}>
        <DialogContent className="remove-radix-close-icon">
          <DialogHeader>
            <DialogTitle>Create a category</DialogTitle>
            <DialogDescription>Add a category.</DialogDescription>
            {/* form */}
            <div className="w-full h-auto">
              <form onSubmit={handleAddCategory} className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="title">Name</label>
                  <Input id="title" name="title" className="focus-visible:ring-0 w-[250px]" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="title">Color</label>
                  <Select onValueChange={setColorSelect}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-red-400 rounded-lg mr-2"></div>
                          <span>Red</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="cyan">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-cyan-400 rounded-lg mr-2"></div>
                          <span>Cyan</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="purple">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-purple-400 rounded-lg mr-2"></div>
                          <span>Purple</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="green">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-400 rounded-lg mr-2"></div>
                          <span>Green</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="orange">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-orange-300 rounded-lg mr-2"></div>
                          <span>Orange</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button className="w-fit">Done</Button>
                  <div
                    onClick={() => setShowCategoriesModal(false)}
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

const queries = {
  QUERY: gql`
    query getAllLists($email: String!) {
      getTodoLists(email: $email) {
        id
        created_at
        title
        Todo {
          id
          title
          remarks
          completed
          category
        }
      }
    }
  `,
  GetListsWithPagiantion: gql`
    query ($args: TodoListPaginationInput!) {
      getTodoListsWithPagiantion(args: $args) {
        id
        created_at
        title
        Todo {
          id
          title
          remarks
          completed
          category
        }
      }
    }
  `,
  GETUSER: gql`
    query ($id: String!) {
      getUser(id: $id) {
        id
      }
    }
  `,
};

const mutations = {
  CategoryQuery: gql`
    mutation ($data: AddCategoryInput!) {
      addCategory(catData: $data) {
        color
        id
        name
      }
    }
  `,
  AddTodoList: gql`
    mutation ($todoListData: TodoListInput!) {
      addTodoList(todoListData: $todoListData) {
        title
        created_at
      }
    }
  `,
};
