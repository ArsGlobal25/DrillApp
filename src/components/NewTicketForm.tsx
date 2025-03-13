import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Camera, Video, Paperclip, AlertCircle } from 'lucide-react'

export default function NewTicketForm({ userId }: { userId: string }) {
  const [description, setDescription] = useState('')
  const [model, setModel] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data: ticket, error } = await supabase
      .from('tickets')
      .insert([{
        user_id: userId,
        description,
        machine_model: model,
        status: 'open'
      }])
      .select()

    if (error) return alert(error.message)
    if (files.length > 0) {
      await Promise.all(files.map(async (file) => {
        const { error } = await supabase.storage
          .from('attachments')
          .upload(`${ticket[0].id}/${file.name}`, file)
        
        if (error) alert(`Ошибка загрузки файла: ${error.message}`)
      }))
    }
    alert('Заявка успешно отправлена!')
    setDescription('')
    setModel('')
    setFiles([])
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Новая заявка на обслуживание</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Выберите модель оборудования</option>
          <option value="DR-550X">DR-550X Глубокое бурение</option>
          <option value="LT-3000">LT-3000 Боковое бурение</option>
          <option value="HV-1200">HV-1200 Вертикальное бурение</option>
        </select>
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опишите проблему..."
          className="w-full p-2 border rounded-lg h-32"
          required
        />
        
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files!])}
              className="hidden"
              accept="image/*,video/*"
            />
            <Paperclip className="h-5 w-5" />
            Прикрепить файлы
          </label>
          <span className="text-sm text-gray-500">
            {files.length > 0 && `Выбрано файлов: ${files.length}`}
          </span>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <AlertCircle className="h-5 w-5" />
          Отправить заявку
        </button>
      </form>
    </div>
  )
}
