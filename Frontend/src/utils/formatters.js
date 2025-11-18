// Formatar CPF: 12345678901 -> 123.456.789-01
export const formatCPF = (cpf) => {
  if (!cpf) return "";
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

// Formatar moeda: 1000.50 -> R$ 1.000,50
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Formatar data: DD/MM/AAAA
export const formatDate = (dateString) => {
  if (!dateString) return "";
  // Se já estiver no formato DD/MM/AAAA, retorna
  if (dateString.includes("/")) return dateString;
  
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

// Formatar data e hora: DD/MM/AAAA HH:MM:SS
export const formatDateTime = (dateString) => {
  if (!dateString) return "";
  // Se já estiver formatado, retorna
  if (dateString.includes("/") && dateString.includes(":")) return dateString;
  
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR");
};

// Formatar número de conta: 12345 -> 00000012345
export const formatAccountNumber = (number) => {
  return String(number).padStart(11, "0");
};

// Limpar CPF: 123.456.789-01 -> 12345678901
export const cleanCPF = (cpf) => {
  return cpf.replace(/\D/g, "");
};

// Formatar telefone: 11999999999 -> (11) 99999-9999
export const formatPhone = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};

// Converter data do formato DD/MM/AAAA para objeto Date
export const parseDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
};
