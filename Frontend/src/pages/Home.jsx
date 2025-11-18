import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-vectra-dark-blue via-vectra-blue to-vectra-light-blue">
      {/* Hero Section */}
      <div className="container-vectra py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Banco Vectra
          </h1>
          <p className="text-2xl mb-4 opacity-90">
            Seu banco digital completo
          </p>
          <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
            Conta digital gratuita, PIX instantâneo, cartões sem anuidade e muito mais.
            Tudo na palma da sua mão.
          </p>

          <div className="flex gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                Acessar Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="bg-white text-vectra-blue hover:bg-neutral-light font-bold py-4 px-8 rounded-lg transition-all text-lg">
                  Abrir Conta Grátis
                </Link>
                <Link to="/login" className="btn-outline border-white text-white hover:bg-white hover:text-vectra-blue text-lg px-8 py-4">
                  Fazer Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tipos de Conta */}
      <div className="bg-white py-20">
        <div className="container-vectra">
          <h2 className="text-4xl font-bold text-center mb-12 text-vectra-dark-blue">
            Tipos de Conta
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { tipo: 'Corrente', icon: '💳', desc: 'Conta completa com todas as operações', color: 'vectra-blue' },
              { tipo: 'Poupança', icon: '🏦', desc: 'Rendimento automático todo mês', color: 'success' },
              { tipo: 'Salário', icon: '💰', desc: 'Para recebimento de salário', color: 'purple-600' },
              { tipo: 'Universitária', icon: '🎓', desc: 'Sem taxas para estudantes (16-24 anos)', color: 'warning' },
              { tipo: 'Empresarial', icon: '🏢', desc: 'Soluções para sua empresa', color: 'error' },
              { tipo: 'Black', icon: '⭐', desc: 'Conta premium com benefícios exclusivos', color: 'premium-black' },
            ].map((conta) => (
              <div key={conta.tipo} className="card text-center hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">{conta.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-neutral-dark">{conta.tipo}</h3>
                <p className="text-neutral-medium">{conta.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-vectra-dark-blue py-16">
        <div className="container-vectra text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Abra sua conta em minutos, sem burocracia
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Criar Conta Grátis
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
