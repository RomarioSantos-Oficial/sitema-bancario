import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccounts } from '../hooks/useAccounts';
import { useSaque, useDeposito, usePix, useTransferencia } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/formatters';

const TABS = [
  { id: 'saque', label: 'Saque', emoji: '💸' },
  { id: 'deposito', label: 'Depósito', emoji: '💰' },
  { id: 'pix', label: 'PIX', emoji: '⚡' },
  { id: 'transferencia', label: 'Transferência', emoji: '🔄' }
];

export default function Transactions() {
  const [activeTab, setActiveTab] = useState('saque');
  const { data: accounts } = useAccounts();
  
  const [formData, setFormData] = useState({
    account_id: '',
    valor: '',
    descricao: '',
    destino_conta: ''
  });

  const saque = useSaque();
  const deposito = useDeposito();
  const pix = usePix();
  const transferencia = useTransferencia();

  const resetForm = () => {
    setFormData({
      account_id: '',
      valor: '',
      descricao: '',
      destino_conta: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.account_id) {
      toast.error('Selecione uma conta');
      return;
    }

    const valor = parseFloat(formData.valor);
    if (!valor || valor <= 0) {
      toast.error('Valor inválido');
      return;
    }

    const data = {
      account_id: parseInt(formData.account_id),
      valor: valor,
      descricao: formData.descricao
    };

    if (activeTab === 'pix' || activeTab === 'transferencia') {
      if (!formData.destino_conta) {
        toast.error('Informe a conta destino');
        return;
      }
      data.destino_conta = formData.destino_conta;
    }

    try {
      switch (activeTab) {
        case 'saque':
          await saque.mutateAsync(data);
          toast.success('Saque realizado com sucesso!');
          break;
        case 'deposito':
          await deposito.mutateAsync(data);
          toast.success('Depósito realizado com sucesso!');
          break;
        case 'pix':
          await pix.mutateAsync(data);
          toast.success('PIX enviado com sucesso!');
          break;
        case 'transferencia':
          await transferencia.mutateAsync(data);
          toast.success('Transferência realizada com sucesso!');
          break;
      }
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Erro ao realizar transação');
    }
  };

  const selectedAccount = accounts?.find(acc => acc.id === parseInt(formData.account_id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-vectra-blue to-vectra-blue-light text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Transações</h1>
          <p className="text-blue-100">Realize saques, depósitos, PIX e transferências</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="card max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  resetForm();
                }}
                className={`flex-1 py-3 px-4 text-center font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-vectra-blue border-b-2 border-vectra-blue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selecionar Conta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conta de Origem *
              </label>
              <select
                value={formData.account_id}
                onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
                className="input"
                required
              >
                <option value="">Selecione uma conta</option>
                {accounts?.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.tipo_conta.toUpperCase()} - {account.numero_conta} - {formatCurrency(account.saldo)}
                  </option>
                ))}
              </select>
            </div>

            {/* Saldo Disponível */}
            {selectedAccount && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Saldo disponível</p>
                <p className="text-2xl font-bold text-vectra-blue">
                  {formatCurrency(selectedAccount.saldo)}
                </p>
              </div>
            )}

            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  className="input pl-12"
                  placeholder="0,00"
                  required
                />
              </div>
            </div>

            {/* Conta Destino (PIX e Transferência) */}
            {(activeTab === 'pix' || activeTab === 'transferencia') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conta Destino *
                </label>
                <input
                  type="text"
                  value={formData.destino_conta}
                  onChange={(e) => setFormData({ ...formData, destino_conta: e.target.value })}
                  className="input"
                  placeholder="000000-0"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Informe o número da conta destino
                </p>
              </div>
            )}

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (opcional)
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="input"
                rows="3"
                placeholder="Adicione uma descrição para esta transação"
              />
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={
                saque.isPending ||
                deposito.isPending ||
                pix.isPending ||
                transferencia.isPending
              }
              className="btn-primary w-full"
            >
              {saque.isPending || deposito.isPending || pix.isPending || transferencia.isPending
                ? 'Processando...'
                : `Confirmar ${TABS.find(t => t.id === activeTab)?.label}`}
            </button>
          </form>

          {/* Informações */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">ℹ️ Informações</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {activeTab === 'saque' && (
                <>
                  <li>• Saques são debitados imediatamente da sua conta</li>
                  <li>• Verifique se possui saldo suficiente</li>
                </>
              )}
              {activeTab === 'deposito' && (
                <>
                  <li>• Depósitos são creditados imediatamente</li>
                  <li>• Não há limite de valor para depósitos</li>
                </>
              )}
              {activeTab === 'pix' && (
                <>
                  <li>• Transferência instantânea para qualquer banco</li>
                  <li>• Disponível 24h por dia, 7 dias por semana</li>
                </>
              )}
              {activeTab === 'transferencia' && (
                <>
                  <li>• Transferência entre contas do Banco Vectra</li>
                  <li>• Processamento imediato</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
