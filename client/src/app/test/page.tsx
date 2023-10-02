"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect } from "react";

const query = gql`
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
`;

export default function PollPage() {
  const { data }: { data: any } = useSuspenseQuery(query);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div></div>;
}
