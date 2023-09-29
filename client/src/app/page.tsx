"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);

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

        <h1 className="text-3xl">Task Lists</h1>

        {/* list */}
        <div className="space-y-4 mt-10">
          {[1, 2, 3, 4, 5, 6].map(() => (
            <>
              <div className="w-1/2 h-16 drop-shadow-md border rounded-md"></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
