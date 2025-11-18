import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { formatCPF, cleanCPF } from '../utils/formatters'
import { isValidCPF } from '../utils/validators'

export default function Login() {
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Se já estiver autenticado, redireciona
  if (isAuthenticated) {
    navigate('/dashboard')
    return null
  }

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value)
    setCpf(formatted)
    setError('') // Limpa erro ao digitar
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const cpfLimpo = cleanCPF(cpf)
    
    // Validações
    if (!cpfLimpo) {
      setError('Digite seu CPF')
      return
    }

    if (!isValidCPF(cpfLimpo)) {
      setError('CPF inválido')
      return
    }

    if (!senha) {
      setError('Digite sua senha')
      return
    }

    if (senha.length < 4) {
      setError('Senha muito curta')
      return
    }

    setLoading(true)
    
    try {
      console.log('📝 Iniciando login com CPF:', cpfLimpo)
      await login(cpfLimpo, senha)
      console.log('✅ Login concluído, redirecionando...')
      
      // Pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 100)
      
    } catch (err) {
      console.error('❌ Erro no formulário de login:', err)
      
      // Extrai mensagem de erro do FastAPI
      let errorMessage = 'Erro ao fazer login'
      
      if (err.response?.data) {
        const errorData = err.response.data
        
        // Se for um array de erros de validação do Pydantic
        if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(e => e.msg).join(', ')
        } 
        // Se for uma string simples
        else if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail
        }
        // Se for um objeto com message
        else if (errorData.message) {
          errorMessage = errorData.message
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vectra-dark-blue to-vectra-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Banco Vectra</h1>
          <p className="text-white/80">Faça login na sua conta</p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CPF */}
            <div>
              <label className="block text-sm font-semibold text-neutral-dark mb-2">
                CPF
              </label>
              <input
                type="text"
                className="input"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCPFChange}
                maxLength={14}
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-neutral-dark mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input pr-12"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value)
                    setError('') // Limpa erro ao digitar
                  }}
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-error/10 border border-error text-error px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>

            {/* Cadastro */}
            <p className="text-center text-neutral-medium">
              Não tem conta?{' '}
              <Link to="/register" className="text-vectra-blue hover:underline font-semibold">
                Cadastre-se grátis
              </Link>
            </p>

            {/* Dica de teste */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                💡 <strong>Dica:</strong> Para testar, crie uma conta primeiro ou use CPF de teste
              </p>
            </div>
          </form>
        </div>

        {/* Voltar */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white hover:underline">
            ← Voltar para home
          </Link>
        </div>
      </div>
    </div>
  )
}
