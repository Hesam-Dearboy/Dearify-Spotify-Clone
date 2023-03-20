import React, { useEffect, useState } from 'react'
import { HomeIcon, MagnifyingGlassIcon, TableCellsIcon, PlusCircleIcon, HeartIcon, RssIcon } from "@heroicons/react/24/outline"
import { useSession } from 'next-auth/react'
import useSpotify from '../Hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playListIdState } from '../atoms/playlistAtoms'


function Sidebar() {

    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [playLists, setPlayLists] = useState([])

    const [playListId, setPlayListId] = useRecoilState(playListIdState)


    console.log(playListId)



    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlayLists(data.body.items)
            })
        }



    }, [session, spotifyApi])

    


    return (
        <div className=' text-gray-500 p-5 text-xs sm:text-sm border-r  border-gray-900 overflow-y-scroll h-screen hidden md:inline-flex scrollbar-hide sm:max-w-[12rem] pb-36 lg:max-w-[15rem] '>
            <div className=' space-y-3'>
                <button className=' flex items-center space-x-2 hover:text-white '  >
                    <HomeIcon className=' w-5 h-5' />
                    <p>Home</p>
                </button>
                <button className=' flex items-center space-x-2 hover:text-white '  >
                    <MagnifyingGlassIcon className=' w-5 h-5' />
                    <p>Search</p>
                </button>
                <button className=' flex items-center space-x-2 hover:text-white '  >
                    <TableCellsIcon className=' w-5 h-5' />
                    <p>your Library</p>
                </button>
                <hr className=' border-t-[1px] border-gray-900' />


                <button className=' flex items-center space-x-2 hover:text-white '  >
                    <PlusCircleIcon className=' w-5 h-5' />
                    <p>Add Playlist</p>
                </button>

                <button className=' flex items-center space-x-2 hover:text-white '  >
                    <HeartIcon className=' w-5 h-5' />
                    <p>Liked Songs</p>
                </button>
                <button className=' flex items-center space-x-2 hover:text-white '  >
                    <RssIcon className=' w-5 h-5' />
                    <p>Your episodes</p>
                </button>
                <hr className=' border-t-[1px] border-gray-900' />

                {/* Playlist... */}


                {playLists.map((playList) => (

                    <div
                    onClick={() => setPlayListId(playList.id)}
                    key={playList.id}>
                        <p
                        className=' cursor-pointer hover:text-white '>
                            {playList.name}
                        </p>
                    </div>

                ))}



            </div>

        </div>
    )
}

export default Sidebar