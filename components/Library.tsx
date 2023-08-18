"use client"

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

const Library = () => {
  function onClick() {
    // Handle upload later
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
        <button type="button" onClick={onClick}>
          <AiOutlinePlus size={20} className="text-neutral-400 hover:text-white transition" />
        </button>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        Lista de Músicas
      </div>
    </div>
  )
}

export default Library