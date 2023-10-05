"use client";

import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Input } from "src/components/ui/input";
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TodoListSchema, TodoSchema } from "@/lib/schema";
import ToDoContainer from "../components/custom/todo";
import toast from "react-hot-toast";

export default function Home() {
  const [time, setTime] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [colorSelect, setColorSelect] = useState<string>();
  const [listdate, setListDate] = React.useState<Date | undefined>(new Date());
  const [showListModal, setShowListModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const { data: session, status } = useSession();
  const { loading, error, data, refetch } = useQuery(queries.QUERY, { fetchPolicy: "network-only" });

  const [addCategory, { data: categoryData, error: categoryError }] = useMutation(mutations.CategoryQuery);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let t = toast.loading("Please Wait");
    let name: string = (e.currentTarget[0] as HTMLInputElement).value;

    addCategory({ variables: { data: { color: colorSelect, email: session?.user.email, name: name } } }).catch((err) => {
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
          todoListData: { title: title, email: session?.user.email },
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong !", { id: t });
      });

    console.log(res);

    if (res) {
      toast.success("Done !", { id: t });
      setShowListModal(false);
      location.reload();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toDateString().split(" "));
      setTime(new Date().toTimeString().split(" G"));
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (status == "authenticated") {
      refetch({ email: session.user.email });
    }
  }, [status]);

  return (
    <>
      <div className="w-full h-full">
        {/* <div>
      <span className='text-5xl font-extrabold'>{time[0]}</span>
    </div> */}
        <div className="w-full flex justify-end space-x-2">
          <Button onClick={() => setShowCategoriesModal(true)} variant={"outline"} className="flex text-pink-600  hover:text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
              <path
                fillRule="evenodd"
                d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            New Category
          </Button>
          <Button onClick={() => setShowListModal(true)} variant={"outline"} className="flex bg-green-500 hover:bg-green-600 hover:text-white text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
              <path d="M4.75 3A1.75 1.75 0 003 4.75v2.752l.104-.002h13.792c.035 0 .07 0 .104.002V6.75A1.75 1.75 0 0015.25 5h-3.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H4.75zM3.104 9a1.75 1.75 0 00-1.673 2.265l1.385 4.5A1.75 1.75 0 004.488 17h11.023a1.75 1.75 0 001.673-1.235l1.384-4.5A1.75 1.75 0 0016.896 9H3.104z" />
            </svg>
            New List
          </Button>
        </div>

        <h1 className="text-3xl font-bold">Task Lists</h1>

        {/* list */}
        <div className="space-y-4 mt-10">{data && data.getTodoLists.map((i: any) => <ToDoContainer key={i.id} d={i} />)}</div>
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
                  <label htmlFor="title">Title</label>
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
          title
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
};
