"use client"

import React from 'react'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { useRouter } from 'next/navigation'
import MediaItem from '@/components/MediaItem'
import LikeButton from '@/components/LikeButton'

interface LikedContentProps {
  songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
  songs
}) => {
  const router = useRouter()
  const { isLoading, user } = useUser()

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gapy-2 w-full px-6 text-neutral-400">
        Não há músicas curtidas no momento.
      </div>
    )
  }

  console.log(songs)

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      { songs.map((song) => (
        <div 
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <main className="flex-1">
            <MediaItem data={song} />
          </main>
          <LikeButton songId={song.id} />
        </div>
      )) }
    </div>
  )
}

export default LikedContent