"use client"

import useAuthModal from "@/hooks/useAuthModal"
import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"
import { BiPlus } from "react-icons/bi"

const AddSongMobile = () => {
  const uploadModal = useUploadModal()
  const authModal = useAuthModal()
  const { user } = useUser()

  function handleUpload(){
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  return (
    <div className="flex md:hidden bg-green-500 rounded-full p-2 absolute z-10 right-5 bottom-5">
      <button onClick={handleUpload}>
        <BiPlus size={30} />
      </button>
    </div>
  )
}

export default AddSongMobile