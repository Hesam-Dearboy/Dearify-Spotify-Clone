import React, { useState , useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'
import useSpotify from './useSpotify'

function useSongInfo() {

    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

    const spotifyApi = useSpotify()

    console.log(currentTrackId)
    console.log(spotifyApi.getAccessToken())

    const [songInfo, setSongInfo] = useState(null)

     
    useEffect(() => {

        

        const fetchSongInfo = async () => {
            
            if(currentTrackId){

                

                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers : {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then( res => res.json())


                console.log(trackInfo)


                
                setSongInfo(trackInfo)

            }
        }

        fetchSongInfo()
    }, [currentTrackId , spotifyApi])
    



    console.log(songInfo)
  return songInfo
}

export default useSongInfo