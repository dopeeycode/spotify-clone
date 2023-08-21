"use client"

import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import Input from "./Input"

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState()
  const uploadModal = useUploadModal()
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
    // Upload to supabase
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
      >
        <Input  
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Título da Música"
        />
      </form>
    </Modal>
  )
}

export default UploadModal