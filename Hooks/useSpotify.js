import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import spotifyApi from '../lib/spotifyApi'



function useSpotify() {

    const {data : session , status} = useSession()

    useEffect(() => {
      if (session) {


        if (session.error === "refreshAccessTokenError"){
            signIn()
        }

        spotifyApi.setAccessToken(session.user.accessToken)
      }


    }, [session])
    

  return spotifyApi 
}

export default useSpotify