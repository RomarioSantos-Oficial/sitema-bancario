import { formatCurrency, formatDateTime } from "../utils/formatters";

export default function TransactionCard({ transaction }) {
  const getTransactionConfig = (tipo) => {
    const config = {
      deposito: {
        icon: "↓",
        color: "bg-success/10 text-success",
        bgColor: "bg-success",
        label: "Depósito",
        isPositive: true,
      },
      saque: {
        icon: "↑",
        color: "bg-error/10 text-error",
        bgColor: "bg-error",
        label: "Saque",
        isPositive: false,
      },
      pix: {
        icon: "⚡",
        color: "bg-purple-100 text-purple-600",
        bgColor: "bg-purple-600",
        label: "PIX",
        isPositive: false,
      },
      transferencia: {
        icon: "→",
        color: "bg-vectra-light-blue/10 text-vectra-blue",
        bgColor: "bg-vectra-blue",
        label: "Transferência",
        isPositive: false,
      },
    };
    return config[tipo] || config.deposito;
  };

  const config = getTransactionConfig(transaction.tipo_transacao);

  return (
    <div className="card flex items-center gap-4 hover:shadow-xl transition-shadow">
      {/* Ícone */}
      <div className={`w-14 h-14 rounded-full ${config.color} flex items-center justify-center text-2xl font-bold shrink-0`}>
        {config.icon}
      </div>

      {/* Informações */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-neutral-dark capitalize truncate">
          {config.label}
        </h3>
        <p className="text-sm text-neutral-medium">
          {formatDateTime(transaction.data)}
        </p>
        {transaction.descricao && (
          <p className="text-xs text-neutral-medium mt-1 truncate">
            {transaction.descricao}
          </p>
        )}
        {transaction.destino_conta && (
          <p className="text-xs text-neutral-medium">
            Destino: <span className="font-mono">{transaction.destino_conta}</span>
          </p>
        )}
      </div>

      {/* Valor */}
      <div className="text-right shrink-0">
        <p className={`text-xl font-bold ${config.isPositive ? 'text-success' : 'text-error'}`}>
          {config.isPositive ? '+' : '-'} {formatCurrency(transaction.valor)}
        </p>
      </div>
    </div>
  );
}
