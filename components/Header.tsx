"use client"

import { useUser } from '@/hooks/useUser'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { SignUp } from '@supabase/auth-ui-react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { FaUserAlt } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {
  const authModal = useAuthModal()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()
  const { session } = useSessionContext()

  
  async function handleLogout(){
    const { error } = await supabaseClient.auth.signOut()
    // TODO: Reset any playing songs
    router.refresh()

    if (error) {
      toast.error(error.message)
    }
  }

  console.log(session?.user)


  return (
    <div 
      className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}
    >
      <div className="w-full mb-4f flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {session?.user ? (
            <>
              <div className="flex gap-4 items-center">
              <Button 
                className="bg-white text-black px-6 py-2"
                onClick={handleLogout}
              >
                Sair
              </Button>
              <Button 
                onClick={() => router.push('/account')}
                className="bg-green-500 text-black"
              >
                <FaUserAlt />
              </Button>
            </div>
            </>
          ): (
            <>
            <div>
              <Button 
                className="bg-transparent text-neutral-300 font-medium"
                onClick={authModal.onOpen}
              >
                Registrar
              </Button>
            </div>
            <div>
              <Button 
                className="bg-white px-6 py-2 text-black"
                onClick={authModal.onOpen}
              >
                Login
              </Button>
            </div>
          </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header