import React from "react";

function HowTo() {
  return (
    <div className="w-full h-full flex flex-col space-y-10 overflow-y-auto pr-5 pb-56 hide-scroll">
      <h1 className="text-4xl font-bold">How To</h1>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">Create a user Account</h2>
        <p className="text-sm text-gray-500">In order to fully access and explore all the features and content available on the website, we kindly request that you take a moment to create an account.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Click on the "Signin" button on the top section of the application.</span>
          <img src="/images/signinbutton.png" alt="" className="object-scale-down" />
          <span>2. Click on the register button at the bottom.</span>
          <span>3. Fill all the fields in the form.</span>
          <span>4. Then click on register button.</span>
          <span>5. Done ! you have created the user account successfully.</span>
          <span className="text-gray-600 italic mt-2">ps: Please remember the username and the password.</span>
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">User Account using Gmail</h2>
        <p className="text-sm text-gray-500">In order to fully access and explore all the features and content available on the website, we kindly request that you take a moment to create an account.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Click on the "Signin" button on the top section of the application.</span>
          <span>2. Then click on the button with the text "Google" on it.</span>
          <span>3. Select the gmail account you want to create the account with.</span>
          <span>4. That's it. Your account is created.</span>
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">Log out from your account</h2>
        <p className="text-sm text-gray-500">
          Your tasks are private to each individual user. Only authenticated users can access their own lists of tasks. Therefore, you can logout from the app once you are done and prevent others from accessing your
          data.
        </p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Simply click on the "Logout" button on the top section of the application.</span>
          <img src="/images/logout.png" alt="" className="object-scale-down" />
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">Create a list of tasks</h2>
        <p className="text-sm text-gray-500">You should first create a list to contain all respective tasks.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Simply click on the "New List" button on the top section of the application.</span>
          <img src="/images/newlist.png" alt="" className="object-scale-down" />
          <span>2. Type in the title in the textbox.</span>
          <img src="/images/createlist.png" alt="" className="object-scale-down" />
          <span>3. Then click on the "Done" button to create a list or "Cancel" button to cancel the operation.</span>
          <span>4. Created list will be shown as follows.</span>
          <img src="/images/createdlist.png" alt="" className="object-scale-down" />
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">Add a task to a list.</h2>
        <p className="text-sm text-gray-500">Add as many as tasks to a list.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Click on the "+" icon next to the list name.</span>
          <img src="/images/addbutton.png" alt="" className="object-scale-down" />
          <span>2. Fill in the information of the task as shown in the figure below.</span>
          <img src="/images/addtaskmodal.png" alt="" className="object-scale-down" />
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">Add a category.</h2>
        <p className="text-sm text-gray-500">Create categories to sort your tasks.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Click on the "New Category" button.</span>
          <img src="/images/newlist.png" alt="" className="object-scale-down" />
          <span>2. Type a name for the category.</span>
          <img src="/images/catmodal.png" alt="" className="object-scale-down" />
          <span>3. Then select a colour from the drop down.</span>
          <span>4. Click on "Done" button to create the new category.</span>
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">View tasks of a list.</h2>
        <p className="text-sm text-gray-500">View tasks listed under a task list.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Click on the drop down button to collapse the list of tasks.</span>
          <img src="/images/addbutton.png" alt="" className="object-scale-down" />
          <span>2. You can check uncheck tasks at your will.A tick icon will be shown if the task is checked.</span>
          <img src="/images/collapsed.png" alt="" className="object-scale-down" />
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">Delete a task list</h2>
        <p className="text-sm text-gray-500">You can delete individual tasks list by following these steps.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Click on the red round icon when you are required to delete a specific task list.</span>
          <img src="/images/addbutton.png" alt="" className="object-scale-down" />
          <span>2. Once you click on the button a dialog will requesting confirmation to proceed.</span>
          <img src="/images/listdelete.png" alt="" className="object-scale-down" />
          <span>3. Click on the "Delete" button to proceed deleting the tasks list or "Cancel" button to cancel the operation.</span>
        </div>
      </div>

      {/* instruction set */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold sticky top-0 bg-white pb-5">Delete a task</h2>
        <p className="text-sm text-gray-500">Sometimes you may want to delete certain tasks. Follow these steps to do so.</p>
        {/* instruction list */}
        <div className="mt-5 spacey-4 flex flex-col">
          <span>1. Right click on the task you want to delete.</span>
          <img src="/images/deletecontext.png" alt="" className="object-scale-down" />
          <span>2. Then click on the "delete" button to delete the task.</span>
          <span>3. Once you click on the button a dialog will requesting confirmation to proceed.</span>
          <img src="/images/deletetask.png" alt="" className="object-scale-down" />
          <span>4. Click on the "Delete" button to proceed deleting the tasks list or "Cancel" button to cancel the operation.</span>
        </div>
      </div>

      {/* end */}
    </div>
  );
}

export default HowTo;
