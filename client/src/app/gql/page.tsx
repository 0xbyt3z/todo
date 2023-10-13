"use client";

import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";

const query = gql`
  {
    getUser {
      email
    }
  }
`;

function Page() {
  const { loading, data } = useQuery(query);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>{data && data.getUser.email}</div>;
}

export default Page;
