import { Link } from 'react-router-dom';
import { useAccounts } from '../hooks/useAccounts';
import { formatCurrency } from '../utils/formatters';
import AccountCard from '../components/AccountCard';

export default function Dashboard() {
  const { data: accounts, isLoading } = useAccounts();

  const totalBalance = accounts?.reduce((sum, acc) => sum + parseFloat(acc.saldo), 0) || 0;

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
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-blue-100">Bem-vindo ao Banco Vectra</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Total Balance Card */}
        <div className="card mb-8 bg-gradient-to-br from-vectra-blue to-vectra-blue-dark text-white">
          <div className="text-center">
            <p className="text-blue-100 mb-2">Saldo Total</p>
            <h2 className="text-4xl font-bold">{formatCurrency(totalBalance)}</h2>
            <p className="text-sm text-blue-100 mt-4">
              {accounts?.length || 0} {accounts?.length === 1 ? 'conta' : 'contas'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/transactions" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-3xl mb-2">💸</div>
            <h3 className="font-semibold text-gray-800">Transações</h3>
            <p className="text-sm text-gray-600">Saque, depósito, PIX</p>
          </Link>

          <Link to="/extract" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-800">Extrato</h3>
            <p className="text-sm text-gray-600">Histórico completo</p>
          </Link>

          <Link to="/accounts" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-3xl mb-2">🏦</div>
            <h3 className="font-semibold text-gray-800">Contas</h3>
            <p className="text-sm text-gray-600">Gerenciar contas</p>
          </Link>

          <div className="card hover:shadow-lg transition-shadow text-center cursor-pointer">
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-semibold text-gray-800">Cartões</h3>
            <p className="text-sm text-gray-600">Em breve</p>
          </div>
        </div>

        {/* Accounts List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Minhas Contas</h2>
          
          {accounts && accounts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nenhuma conta encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Crie sua primeira conta para começar
              </p>
              <Link to="/accounts" className="btn-primary inline-block">
                Criar Conta
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
