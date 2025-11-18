import { formatCurrency } from "../utils/formatters";

export default function AccountCard({ account, onClick }) {
  const getAccountColorClass = (tipo) => {
    const colors = {
      corrente: "from-account-corrente to-vectra-light-blue",
      poupanca: "from-account-poupanca to-green-400",
      salario: "from-account-salario to-purple-400",
      universitaria: "from-account-universitaria to-yellow-400",
      empresarial: "from-account-empresarial to-red-400",
      black: "from-premium-black via-premium-graphite to-premium-gray",
    };
    return colors[tipo] || "from-neutral-medium to-neutral-dark";
  };

  const getAccountIcon = (tipo) => {
    const icons = {
      corrente: "💳",
      poupanca: "🏦",
      salario: "💰",
      universitaria: "🎓",
      empresarial: "🏢",
      black: "⭐",
    };
    return icons[tipo] || "💳";
  };

  const isPremium = account.tipo_conta === "black";

  return (
    <div 
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-2xl ${!account.ativa && 'opacity-60'}`}
      onClick={onClick}
    >
      <div className={`bg-gradient-to-br ${getAccountColorClass(account.tipo_conta)} p-6 text-white`}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-4xl">{getAccountIcon(account.tipo_conta)}</span>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isPremium ? 'bg-premium-gold text-premium-black' : 'bg-white/20'}`}>
              {account.tipo_conta}
            </span>
            {!account.ativa && (
              <span className="block mt-2 px-2 py-1 bg-error rounded text-xs">
                Inativa
              </span>
            )}
          </div>
        </div>
        
        {/* Dados da conta */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm opacity-90">
            <span>Agência</span>
            <span className="font-mono font-bold">{account.agencia}</span>
          </div>
          <div className="flex justify-between text-sm opacity-90">
            <span>Conta</span>
            <span className="font-mono font-bold">{account.numero_conta}</span>
          </div>
        </div>

        {/* Saldo */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-xs opacity-75 mb-1">Saldo disponível</p>
          <p className={`text-3xl font-bold ${isPremium && 'text-gradient-premium'}`}>
            {formatCurrency(account.saldo)}
          </p>
        </div>

        {/* Decoração */}
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="150" cy="50" r="80" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
