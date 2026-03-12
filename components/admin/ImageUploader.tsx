"use client"

import { useState, useCallback } from "react"
import { Upload, X, GripVertical } from "lucide-react"

type Props = {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [urlInput, setUrlInput] = useState("")

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  const uploadToCloudinary = useCallback(async (files: File[]) => {
    if (!cloudName || !uploadPreset) {
      alert("Cloudinary não configurado. Use URLs diretas por enquanto.")
      return
    }

    setUploading(true)
    const newUrls: string[] = []

    for (const file of files) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (data.secure_url) {
          newUrls.push(data.secure_url)
        }
      } catch {
        console.error("Erro no upload")
      }
    }

    onChange([...images, ...newUrls])
    setUploading(false)
  }, [cloudName, uploadPreset, images, onChange])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      uploadToCloudinary(Array.from(e.target.files))
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) {
      uploadToCloudinary(Array.from(e.dataTransfer.files))
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }

  function moveImage(from: number, to: number) {
    if (to < 0 || to >= images.length) return
    const newImages = [...images]
    const [moved] = newImages.splice(from, 1)
    newImages.splice(to, 0, moved)
    onChange(newImages)
  }

  function addUrl() {
    const url = urlInput.trim()
    if (!url) return
    if (!url.startsWith("http")) {
      alert("URL inválida")
      return
    }
    onChange([...images, url])
    setUrlInput("")
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Imagens ({images.length})
      </label>

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragOver ? "border-[#c9a96e] bg-[#c9a96e]/5" : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <Upload size={24} className="mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 mb-3">
          {uploading ? "Enviando..." : "Arraste imagens aqui ou clique para selecionar"}
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors"
        >
          Selecionar arquivos
        </label>
      </div>

      {/* URL input */}
      <div className="flex gap-2 mt-3">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Ou cole uma URL de imagem..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#c9a96e]"
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
        />
        <button
          type="button"
          onClick={addUrl}
          className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-xl transition-colors"
        >
          Adicionar
        </button>
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {images.map((url, i) => (
            <div key={`${url}-${i}`} className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              <img
                src={url}
                alt={`Imagem ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute top-2 left-2 bg-[#c9a96e] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  CAPA
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="p-1.5 bg-white/90 rounded-lg text-gray-600 hover:bg-white"
                    title="Mover para esquerda"
                  >
                    <GripVertical size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600"
                  title="Remover"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
