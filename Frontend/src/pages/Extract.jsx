import { useState } from 'react';
import { useAccounts } from '../hooks/useAccounts';
import { useTransactions } from '../hooks/useTransactions';
import TransactionCard from '../components/TransactionCard';
import { formatCurrency, formatDate } from '../utils/formatters';

const TRANSACTION_TYPES = [
  { value: '', label: 'Todos os tipos' },
  { value: 'saque', label: 'Saques' },
  { value: 'deposito', label: 'Depósitos' },
  { value: 'pix', label: 'PIX' },
  { value: 'transferencia', label: 'Transferências' }
];

export default function Extract() {
  const { data: accounts } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [filterType, setFilterType] = useState('');
  
  const { data: transactions, isLoading } = useTransactions(
    selectedAccount ? parseInt(selectedAccount) : undefined,
    filterType || undefined
  );

  const selectedAccountData = accounts?.find(
    acc => acc.id === parseInt(selectedAccount)
  );

  const filteredTransactions = transactions || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-vectra-blue to-vectra-blue-light text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Extrato</h1>
          <p className="text-blue-100">Histórico completo de transações</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Filtro por Conta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conta
              </label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="input"
              >
                <option value="">Todas as contas</option>
                {accounts?.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.tipo_conta.toUpperCase()} - {account.numero_conta}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Transação
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input"
              >
                {TRANSACTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Saldo da Conta Selecionada */}
          {selectedAccountData && (
            <div className="mt-6 p-4 bg-gradient-to-r from-vectra-blue to-vectra-blue-light rounded-lg text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100 text-sm">Saldo Atual</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(selectedAccountData.saldo)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Conta</p>
                  <p className="font-semibold">{selectedAccountData.numero_conta}</p>
                  <p className="text-sm">{selectedAccountData.tipo_conta.toUpperCase()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de Transações */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Transações
              {filteredTransactions.length > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  ({filteredTransactions.length})
                </span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vectra-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando transações...</p>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nenhuma transação encontrada
              </h3>
              <p className="text-gray-600">
                {selectedAccount
                  ? 'Não há transações para os filtros selecionados'
                  : 'Selecione uma conta para ver o extrato'}
              </p>
            </div>
          )}
        </div>

        {/* Resumo */}
        {filteredTransactions.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="card bg-green-50">
              <p className="text-sm text-gray-600 mb-1">Total Entradas</p>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(
                  filteredTransactions
                    .filter(t => t.tipo_transacao === 'deposito')
                    .reduce((sum, t) => sum + parseFloat(t.valor), 0)
                )}
              </p>
            </div>

            <div className="card bg-red-50">
              <p className="text-sm text-gray-600 mb-1">Total Saídas</p>
              <p className="text-xl font-bold text-red-600">
                {formatCurrency(
                  filteredTransactions
                    .filter(t => ['saque', 'pix', 'transferencia'].includes(t.tipo_transacao))
                    .reduce((sum, t) => sum + parseFloat(t.valor), 0)
                )}
              </p>
            </div>

            <div className="card bg-blue-50">
              <p className="text-sm text-gray-600 mb-1">Total Transações</p>
              <p className="text-xl font-bold text-vectra-blue">
                {filteredTransactions.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
