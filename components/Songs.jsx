import React from 'react'
import { useRecoilValue } from 'recoil'
import {playListAtomState} from '../atoms/playlistAtoms'
import Song from './Song'
function Songs() {

  const playList = useRecoilValue(playListAtomState)
  return (
    <div className=' px-8 flex flex-col space-y-1 pb-28 text-white'>
      {
        playList?.tracks.items.map((track , i) => (
          <Song key={track.track.id} track={track} order={i }/>
        ))
      }
    </div>
  )
}

export default Songs