import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';
import { formatCPF } from '../utils/formatters';
import { isValidCPF, isValidEmail } from '../utils/validators';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData({ ...formData, cpf: formatted });
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    setFormData({ ...formData, telefone: value });
  };

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      value = value.replace(/^(\d{2})(\d)/, '$1/$2');
      value = value.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }
    setFormData({ ...formData, data_nascimento: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nome.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    if (!isValidCPF(formData.cpf)) {
      toast.error('CPF inválido');
      return;
    }

    if (!formData.data_nascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      toast.error('Data de nascimento inválida (DD/MM/AAAA)');
      return;
    }

    // Validar idade mínima (13 anos)
    const [day, month, year] = formData.data_nascimento.split('/');
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const isOldEnough = age > 13 || (age === 13 && monthDiff >= 0);

    if (!isOldEnough) {
      toast.error('Você deve ter no mínimo 13 anos para criar uma conta');
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error('E-mail inválido');
      return;
    }

    if (!formData.telefone || formData.telefone.replace(/\D/g, '').length < 10) {
      toast.error('Telefone inválido');
      return;
    }

    if (!formData.endereco.trim()) {
      toast.error('Endereço é obrigatório');
      return;
    }

    if (formData.senha.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      // Remove formatação antes de enviar
      const dataToSend = {
        nome: formData.nome,
        cpf: formData.cpf.replace(/\D/g, ''),
        data_nascimento: formData.data_nascimento,
        email: formData.email,
        telefone: formData.telefone.replace(/\D/g, ''),
        endereco: formData.endereco,
        senha: formData.senha
      };

      await register(dataToSend);
      toast.success('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vectra-blue-dark via-vectra-blue to-vectra-blue-light flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-vectra-blue mb-2">
            Banco Vectra
          </h1>
          <p className="text-gray-600">Criar nova conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="input"
                placeholder="João da Silva"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF *
              </label>
              <input
                type="text"
                value={formData.cpf}
                onChange={handleCPFChange}
                className="input"
                placeholder="000.000.000-00"
                maxLength="14"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento *
              </label>
              <input
                type="text"
                value={formData.data_nascimento}
                onChange={handleDateChange}
                className="input"
                placeholder="DD/MM/AAAA"
                maxLength="10"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Idade mínima: 13 anos</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                placeholder="seuemail@exemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone *
              </label>
              <input
                type="text"
                value={formData.telefone}
                onChange={handleTelefoneChange}
                className="input"
                placeholder="(11) 98765-4321"
                maxLength="15"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço *
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                className="input"
                placeholder="Rua, número, bairro, cidade"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                className="input"
                placeholder="Mínimo 6 caracteres"
                minLength="6"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha *
              </label>
              <input
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                className="input"
                placeholder="Repita a senha"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-vectra-blue hover:text-vectra-blue-dark font-medium">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
