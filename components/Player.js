import { useSession } from 'next-auth/react'
import React , {useState , useEffect , useCallback} from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../Hooks/useSongInfo'
import useSpotify from '../Hooks/useSpotify'
import {ArrowsRightLeftIcon , SpeakerWaveIcon as SpeakerWaveIconOutline} from '@heroicons/react/24/outline'
import {ArrowUturnLeftIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import { debounce, range } from 'lodash'


function Player() {

    const spotifyApi = useSpotify()

    const { data : session , status} = useSession()



    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const [volume, setVolume] = useState(50)


    const songInfo = useSongInfo()


    console.log(songInfo)



    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log( 'now playing : ' , data.body?.item?.id)
                setCurrentTrackId(data.body?.item?.id)


                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing)
                })

            })
        }
    }








    useEffect(() => {

        if( spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong()
            setVolume(50)
        }
      
    }, [currentTrackIdState , spotifyApi , session ])


    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if( data.body?.is_playing){
                spotifyApi.pause()
                setIsPlaying(false)
            }else{
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }

    

    useEffect(() => {

        if( volume > 0 && volume < 100 ){
            debouncedAdjustVolume(volume)
        }
      
    }, [ volume ])


    const debouncedAdjustVolume = useCallback(
        debounce(( volume ) => {
          spotifyApi.setVolume(volume).catch((err) => { console.log( err &&  err) })
        } , 500 ) , 
        []
    )


    
    
    




  return (
    <div className=' grid-cols-3 grid text-xs  md:text-base px-2 md:px-8 h-24 bg-gradient-to-b from-black to-gray-900 text-white'>

        {/* Left Side */}
        <div className='  flex items-center space-x-4 '>

            <img className=' hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0].url} alt=''/>

            <div>
                <h3>
                {songInfo?.name}
                </h3>
                <p>
                {songInfo?.artists?.[0]?.name}
                </p>
            </div>
        </div>
        


        {/* Center  */}


        <div className=' flex items-center  justify-evenly'>

            <ArrowsRightLeftIcon className=' h-5 w-5 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out '/>
            <BackwardIcon onClick={handlePlayPause} className=' h-5 w-5 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out '/>
            {isPlaying ? (
            <PauseCircleIcon onClick={handlePlayPause} className=' h-10 w-10 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out '/>

        ) : (

            <PlayCircleIcon className=' h-10 w-10 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out '/>

        )}

        <ForwardIcon className=' h-5 w-5 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out '/>
        <ArrowUturnLeftIcon className=' h-5 w-5 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out '/>

        </div>




        {/* Right Side  */}
        <div className=' flex items-center space-x-3 md:space-x-4 justify-end pr-5'>

            <SpeakerWaveIconOutline onClick={ () => volume > 0  &&  setVolume(volume - 10 )} className=' h-5 w-5 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out '/>

            <input className=' w-14 md:w-28' value={volume} onChange={ e => setVolume(Number(e.target.value))} type='range' min={0} max={100}/>

            <SpeakerWaveIcon onClick={ () => volume < 100  &&  setVolume(volume + 10 )} className='h-5 w-5 cursor-pointer hover:scale-125 transition transform  duration-100 ease-out'/>


        </div>

        


    </div>
  )
}

export default Player