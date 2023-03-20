import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import React , {useState , useEffect} from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playListAtomState, playListIdState } from '../atoms/playlistAtoms'
import useSpotify from '../Hooks/useSpotify'
import Songs from './Songs'


const colors = [
    'from-red-500',
    'from-orange-500',
    'from-blue-500',
    'from-purple-500',
    'from-green-500',
    'from-indigo-500',
    'from-yellow-500',
    'from-pink-500',
    
]

function Center() {
    const { data : session} = useSession()
    const [color, setColor] = useState(null)

    const spotifyApi = useSpotify()


    const playListId = useRecoilValue(playListIdState)

    const [playList, setPlayList] = useRecoilState(playListAtomState)



    useEffect(() => {
      setColor(shuffle(colors).pop())
    }, [playListId])
    

    useEffect(()=> {
        
        spotifyApi.getPlaylist(playListId).then((data) => {
            setPlayList(data.body)
        }).catch(e => console.log("sth went wrong" , e))
        


    } , [spotifyApi , playListId])



    return (
        <div className=' text-white  h-screen overflow-y-scroll scrollbar-hide  flex-grow'>
            <header className=' absolute top-5 right-8'>
                <div onClick={signOut} className=' flex items-center space-x-3 bg-black opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img className=' rounded-full w-10 h-10 ' src={session?.user.image} alt="user image" />
                    <h2>
                        {session?.user.name}
                    </h2>
                    <ArrowDownIcon className=' h-5'/>
                </div>
            </header>

            <section className={` flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>

                <img className=' h-44 w-44 shadow-2xl ' src={playList?.images?.[0]?.url}/>


                <div>
                    <p>
                        PLAYLIST
                    </p>
                    <h1 className=' font-bold  text-2xl md:text-3xl lg:text-5xl'>
                        {playList?.name}
                    </h1>
                </div>

            </section>

            <div>

                <Songs />
            
            </div>
        </div>
    )
}

export default Center