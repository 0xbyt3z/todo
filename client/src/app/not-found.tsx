import React from "react";

function NotFound() {
  return (
    <div className="w-full h-screen mt-44 flex flex-col">
      <span className="text-9xl font-bold text-transparent bg-gradient-to-tr from-black to-gray-100 drop-shadow-lg bg-clip-text">404</span>
      <span className="text-5xl  text-transparent bg-gradient-to-tr from-black to-gray-100 drop-shadow-lg bg-clip-text">Not Found</span>
      <p className="text-gray-600">We're sorry, but the page you are looking for cannot be found.</p>
      <p className="text-gray-600">It's possible that the page has been moved, renamed, or deleted.</p>
    </div>
  );
}

export default NotFound;
