import { getSession } from 'next-auth/react'
import React from 'react'
import Center from '../components/Center'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

function index() {
  return (
    <div>
      <div className='bg-black h-screen overflow-hidden'>
      <main className=' flex'>
      <Sidebar/>
      <Center/>
      </main>

      <div className=' sticky bottom-0 '>
        <Player/>
      </div>


    </div>
    </div>
  )
}
export default index

export async function getServerSideProps(context){
  const session = await getSession(context)
  return { 
    props : {
      session,
    }
  }
}