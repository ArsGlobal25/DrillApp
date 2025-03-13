import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Wrench, Clock, CheckCircle2 } from 'lucide-react'

interface Ticket {
  id: string
  created_at: string
  description: string
  machine_model: string
  status: 'open' | 'in_progress' | 'resolved'
}

export default function TicketList({ userId }: { userId: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) return alert(error.message)
      setTickets(data || [])
    }

    fetchTickets()
  }, [userId])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Wrench className="h-5 w-5 text-yellow-600" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'resolved': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Ваши заявки</h3>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getStatusIcon(ticket.status)}
              <span className="font-medium">{ticket.machine_model}</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(ticket.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600">{ticket.description}</p>
        </div>
      ))}
    </div>
  )
}
