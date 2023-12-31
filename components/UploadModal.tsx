"use client"

import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import Input from "./Input"
import Button from "./Button"
import { useRouter } from "next/navigation"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import uniqid from 'uniqid'
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }


  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields')
        return
      }

      const uniqueID = uniqid()

      //Upload song

      const { 
        data: songData,
        error: songError
      } = await supabaseClient
      .storage
      .from('songs')
      .upload(`song-${values.title}-${uniqueID}`, songFile, {
        cacheControl: '3600',
        upsert: false
      })

      if (songError) {
        setIsLoading(false)
        return toast.error('Falha ao enviar a música.')
      }

      // Upload image

      const { 
        data: imageData,
        error: imageError
      } = await supabaseClient
      .storage
      .from('images')
      .upload(`image-${values.title}-${uniqueID}`, imageFile, {
        cacheControl: '3600',
        upsert: false
      })

      if (isLoading) {
        return toast.loading('Carregando...')
      }

      if (imageError) {
        setIsLoading(false)
        return toast.error('Falha ao enviar a imagem.')
      }

      const {
        error: supabaseError
      } = await supabaseClient
      .from('songs')
      .insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path
      })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }
    
      router.refresh()
      setIsLoading(false)
      toast.success('Música enviada!')
      reset()
      uploadModal.onClose()

    } catch (error){
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Adicionar uma Música"
      description="Adicione apenas arquivos MP3."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input  
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Título da Música"
        />
        <Input  
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Autor da Música"
        />
        <div>
          <div className="pb-1">
             Selecione um arquivo de Música(MP3)
          </div>
          <Input  
            id="song" 
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
             Selecione uma imagem
          </div>
          <Input  
            id="image" 
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Criar
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal