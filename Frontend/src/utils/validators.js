// Validar CPF
export const isValidCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, "");
  
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

// Validar email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validar valor monetário
export const isValidAmount = (amount) => {
  if (!amount) return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

// Validar data no formato DD/MM/AAAA
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;
  
  const [, day, month, year] = dateString.match(regex);
  const date = new Date(year, month - 1, day);
  
  return (
    date.getDate() === parseInt(day) &&
    date.getMonth() === parseInt(month) - 1 &&
    date.getFullYear() === parseInt(year)
  );
};

// Validar senha (mínimo 6 caracteres)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Validar telefone
export const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10 || cleaned.length === 11;
};
