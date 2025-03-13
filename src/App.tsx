import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth'
import NewTicketForm from './components/NewTicketForm'
import TicketList from './components/TicketList'
import Navbar from './components/Navbar'

export default function App() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
    })

    return () => authListener?.subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} />
      
      <main className="container mx-auto px-4 py-8">
        {!user ? (
          <div className="flex flex-col items-center min-h-screen py-20 bg-gradient-to-b from-primary-yellow to-white">
            <div className="max-w-4xl text-center mb-16">
              <h1 className="text-5xl font-bold text-primary-black mb-6">
                Решение для поддержки бурового оборудования
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                AI-решения для технического обслуживания промышленных буровых систем
              </p>
              <Auth />
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 w-full max-w-6xl px-4">
              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary-yellow">
                <h3 className="text-2xl font-bold mb-4">Мониторинг в реальном времени</h3>
                <p className="text-gray-600">Диагностика оборудования 24/7 и уведомления о техническом обслуживании</p>
              </div>
              <div className="bg-primary-black text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Экспертная поддержка</h3>
                <p className="text-gray-300">Прямой доступ к сертифицированным инженерам</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary-yellow">
                <h3 className="text-2xl font-bold mb-4">База знаний</h3>
                <p className="text-gray-600">Полная техническая документация</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <NewTicketForm userId={user.id} />
              <TicketList userId={user.id} />
            </div>
            <div className="md:col-span-1">
              <div className="bg-primary-black text-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Профиль оборудования</h3>
                <div className="space-y-2">
                  <img 
                    src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc" 
                    alt="Буровая машина"
                    className="rounded-lg mb-4"
                  />
                  <p className="text-gray-300">
                    Добро пожаловать в DrillSupport Pro - вашу платформу для
                    технической поддержки и документации тяжелого
                    бурового оборудования.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
