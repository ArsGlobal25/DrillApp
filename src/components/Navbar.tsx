import { supabase } from '../supabaseClient'
import { LogOut, User } from 'lucide-react'

export default function Navbar({ user }: { user: any }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) alert(error.message)
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc" 
            className="h-8 w-8 rounded-full"
            alt="Логотип"
          />
          <span className="text-xl font-bold">DrillSupport Pro</span>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-5 w-5" />
              <span>{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="h-5 w-5" />
              Выйти
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
