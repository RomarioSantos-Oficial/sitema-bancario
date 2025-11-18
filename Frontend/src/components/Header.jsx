import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-vectra-blue">🏦 Banco Vectra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-vectra-blue font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/accounts" 
              className="text-gray-700 hover:text-vectra-blue font-medium transition-colors"
            >
              Contas
            </Link>
            <Link 
              to="/transactions" 
              className="text-gray-700 hover:text-vectra-blue font-medium transition-colors"
            >
              Transações
            </Link>
            <Link 
              to="/extract" 
              className="text-gray-700 hover:text-vectra-blue font-medium transition-colors"
            >
              Extrato
            </Link>
          </nav>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-vectra-blue rounded-full flex items-center justify-center text-white font-semibold">
                {user?.nome?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.nome?.split(' ')[0] || 'Usuário'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${showMenu ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{user?.nome}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    📊 Dashboard
                  </Link>
                  
                  <Link
                    to="/accounts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    🏦 Minhas Contas
                  </Link>
                  
                  <Link
                    to="/transactions"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    💸 Transações
                  </Link>
                  
                  <Link
                    to="/extract"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    📋 Extrato
                  </Link>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    🚪 Sair
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
