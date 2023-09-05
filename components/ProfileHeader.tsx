"use client"

import { useUser } from "@/hooks/useUser"
import Image from "next/image"
import { FaUserAlt } from 'react-icons/fa'
import Button from "./Button"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { BsDoorOpenFill } from 'react-icons/bs'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { toast } from "react-hot-toast"

interface ProfileHeaderProps {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
  modalActive: boolean
}


const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  setModalActive,
  modalActive
}) => {
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()
  const avatarUrl = user?.user_metadata.avatar_url
  const name = user?.user_metadata.name
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    
    if(error) {
      toast.error(error.message)
    }
  }


  return (
    <>
      {avatarUrl || name ? (
        <div className="flex items-center relative gap-2">
          <Image 
            src={user?.user_metadata.avatar_url}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <strong className="tracking-[.1rem] text-sm sm:text-base">
            {name}
          </strong>
          <button onClick={() => setModalActive((prevState) => !prevState)}>
            {modalActive ? (
              <IoIosArrowUp
                size={28}
              />
            ): (
              <IoIosArrowDown
                size={28}
              />
            )}
          </button>
          {modalActive && (
            <div className="w-[120px] py-6 px-2 flex flex-col items-center bg-zinc-900 absolute z-20 
            right-0 top-12 rounded-md">
              <button 
                className="flex gap-2 px-4 py-2 hover:opacity-75 transition bg-zinc-950 rounded 
                items-center"
                onClick={handleLogout}
              >
                <span className="font-semibold">Sair</span>
                <BsDoorOpenFill className="text-red-400" size={25} />
              </button>
            </div>
          )}
        </div>
      ): (
        <Button onClick={() => setModalActive((prevState) => !prevState)}>
          <FaUserAlt size={20} />
        </Button>
      )}
    </>
  )
}

export default ProfileHeader