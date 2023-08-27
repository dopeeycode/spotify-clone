import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()

  const { user, subscription } = useUser()

  function handleUpload() {
    if (!user) {
      return authModal.onOpen()
    }

    // TODO: Check for subscription

    return uploadModal.onOpen()
  }
  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-between px-5 pt-4"
      >
        <div
          className="inline-flex items-center gap-x-2"
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className="text-neutral-400 font-medium text-md"
          >
            Sua Biblioteca
          </p>
        </div>
        <button type="button" onClick={handleUpload}>
          <AiOutlinePlus size={20} className="text-neutral-400 hover:text-white transition" />
        </button>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            onClick={() => {}}
            key={song.id}
            data={song}
          />
        ))}
      </div>
    </div>
  )
}

export default Library