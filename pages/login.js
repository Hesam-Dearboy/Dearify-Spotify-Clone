import React from 'react'
import {getProviders , signIn} from 'next-auth/react'

function Login({providers}) {
  return (
    <div className=' bg-black flex flex-col items-center justify-center min-h-screen'>
      
      <img className=' w-60 mb-5' src='assets/spotifyLogo.png'/>

      {Object.values(providers).map(provider =>(
        <div key={provider.name}>
          <button
          onClick={() => signIn(provider.id , {callbackUrl:"/"})}
          className=' p-5 bg-[#18d860] rounded-full'>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login


export async function getServerSideProps() {
  const providers = await getProviders()


  return{
    props : {providers , }
  }
}