"use client";

import { Button } from "@/components/ui/button";
import { TodoSchema } from "@/lib/schema";
import { cn, GraphQLStateHandler } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

export default function ToDoContainer({ d, invokeFetch }: { d: z.infer<typeof TodoSchema>; invokeFetch: any }) {
  const [isCollaped, setIsCollapsed] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();

  const { data: categories, refetch: refetchCategories } = useQuery(queries.GetUserCategories);
  const [addTodo, { data, error, loading }] = useMutation(mutations.AddTodo, { onError: GraphQLStateHandler.customOnError });

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
        todoData: { completed: false, title: title, lId: d.id, deadline: date?.toISOString(), category: selectedCategory },
      },
    })
      .then((res) => {
        if (res.data) {
          setShowModal(false);
          toast.success("Done !", { id: t });
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
            {/* add todo dialog */}
            <svg onClick={() => setShowModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-3 hover:bg-gray-100 rounded-md">
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
          {d.Todo.map((i, index) => {
            return (
              <>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Checkbox defaultChecked={i.completed} className="w-5 h-5 mr-2" />
                    <span>{i.title}</span>
                  </div>

                  <div></div>
                </div>
              </>
            );
          })}

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
                          <SelectValue defaultValue={"notset"} />
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
};
