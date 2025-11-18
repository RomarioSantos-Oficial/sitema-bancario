import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccounts, useCreateAccount } from '../hooks/useAccounts';
import AccountCard from '../components/AccountCard';

const ACCOUNT_TYPES = [
  {
    value: 'corrente',
    label: 'Conta Corrente',
    description: 'Para todos os clientes',
    minAge: 13,
    emoji: '💼'
  },
  {
    value: 'poupanca',
    label: 'Conta Poupança',
    description: 'A partir de 13 anos',
    minAge: 13,
    emoji: '🐷'
  },
  {
    value: 'salario',
    label: 'Conta Salário',
    description: 'A partir de 16 anos',
    minAge: 16,
    emoji: '💰'
  },
  {
    value: 'universitaria',
    label: 'Conta Universitária',
    description: 'A partir de 16 anos',
    minAge: 16,
    emoji: '🎓'
  },
  {
    value: 'empresarial',
    label: 'Conta Empresarial',
    description: 'A partir de 21 anos',
    minAge: 21,
    emoji: '🏢'
  },
  {
    value: 'black',
    label: 'Conta Black',
    description: '18+ anos e saldo ≥ R$ 50.000',
    minAge: 18,
    minBalance: 50000,
    emoji: '💎'
  }
];

export default function Accounts() {
  const { data: accounts, isLoading } = useAccounts();
  const createAccount = useCreateAccount();
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleCreateAccount = async () => {
    if (!selectedType) {
      toast.error('Selecione um tipo de conta');
      return;
    }

    try {
      await createAccount.mutateAsync({ tipo_conta: selectedType });
      toast.success('Conta criada com sucesso!');
      setShowModal(false);
      setSelectedType('');
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Erro ao criar conta';
      toast.error(errorMsg);
    }
  };

  const getAvailableAccountTypes = () => {
    // Em uma implementação real, você pegaria a idade do usuário da API
    // Por ora, vamos mostrar todos os tipos
    return ACCOUNT_TYPES;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vectra-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-vectra-blue to-vectra-blue-light text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Minhas Contas</h1>
              <p className="text-blue-100">Gerencie suas contas bancárias</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-vectra-blue px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              + Nova Conta
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {accounts && accounts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} showDetails />
            ))}
          </div>
        ) : (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">🏦</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Nenhuma conta encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Crie sua primeira conta para começar a usar o Banco Vectra
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Criar Primeira Conta
            </button>
          </div>
        )}
      </div>

      {/* Modal de Criação de Conta */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Nova Conta</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedType('');
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Selecione o tipo de conta que deseja criar:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {getAvailableAccountTypes().map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedType === type.value
                      ? 'border-vectra-blue bg-blue-50'
                      : 'border-gray-200 hover:border-vectra-blue-light'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.emoji}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {type.label}
                  </h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedType('');
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateAccount}
                disabled={!selectedType || createAccount.isPending}
                className="flex-1 btn-primary"
              >
                {createAccount.isPending ? 'Criando...' : 'Criar Conta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
