import { ApolloError } from "@apollo/client";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GraphQLStateHandler = {
  customOnError(error: ApolloError, clientOptions: any = null) {
    console.log(error.message);
    toast.remove();
    toast.error(error.message);
  },
  customOnCompleted(data: any = null, clientOptions: any = null) {
    toast.remove();
    toast.success("Done !");
  },
};
