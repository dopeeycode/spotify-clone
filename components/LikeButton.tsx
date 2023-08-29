"use client"

import { useUser } from "@/hooks/useUser"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface LikeButtonProps {
  songId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({
  songId
}) => {
  const ruuter = useRouter()
  const { supabaseClient } = useSessionContext()
  const { user } = useUser()

  const [isLiked, setIsLiked] = useState(false)

  return (
    <div>LikeButton</div>
  )
}

export default LikeButton