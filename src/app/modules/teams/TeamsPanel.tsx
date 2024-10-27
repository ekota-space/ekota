import { Button } from 'flowbite-react'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

export default function TeamsPanel() {
  return (
    <aside className='p-2'>
      <Button size="sm" fullSized>
        <FaPlus className='mr-2 h-5 w-5'/>
        New Team
      </Button>
    </aside>
  )
}
