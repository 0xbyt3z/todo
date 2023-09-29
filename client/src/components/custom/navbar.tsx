import React from 'react'
import { Button } from '../ui/button'

function NavBar() {
  return (
    <div className='w-full h-16 flex items-center justify-between'>
        <div></div>
        <div><Button variant={'outline'} className='flex'> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="fore w-5 h-5 mr-2">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
</svg>
New Task</Button></div>
    </div>
  )
}

export default NavBar