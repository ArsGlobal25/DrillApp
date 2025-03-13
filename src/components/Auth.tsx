import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Mail, Key, LogIn } from 'lucide-react'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (type: 'LOGIN' | 'SIGNUP') => {
    try {
      setLoading(true)
      setError(null)
      
      // Проверка соединения
      const { error: pingError } = await supabase
        .from('tickets')
        .select('*')
        .limit(1)
        
      if (pingError) {
        throw new Error('Ошибка соединения с сервером')
      }

      const { error: authError } = type === 'LOGIN' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ 
            email, 
            password,
            options: {
              emailRedirectTo: window.location.origin
            }
          })

      if (authError) throw authError
      
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl border-2 border-primary-yellow">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary-black mb-2">DrillSupport Pro</h2>
        <div className="h-1 bg-primary-yellow w-24 mx-auto mb-4"></div>
        <p className="text-gray-600">Портал управления оборудованием</p>
      </div>
      
      {error && (
        <div className="bg-red-50 p-3 rounded-lg text-red-600 text-sm">
          Ошибка: {error}
        </div>
      )}

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center border-2 border-gray-200 rounded-xl px-3 py-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="ml-2 flex-1 outline-none bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-2 border-gray-200 rounded-xl px-3 py-2">
            <Key className="h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Пароль"
              className="ml-2 flex-1 outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleLogin('LOGIN')}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-primary-yellow text-primary-black px-4 py-3 rounded-xl hover:bg-yellow-400 transition font-bold"
          >
            <LogIn className="h-5 w-5" />
            {loading ? 'Авторизация...' : 'Вход оператора'}
          </button>
          <button
            type="button"
            onClick={() => handleLogin('SIGNUP')}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-primary-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition font-bold"
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  )
}
