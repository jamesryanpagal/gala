export const pattern = {
  STR: /^[a-zA-Z]+$/,
  STRWITHSPACES: /^[a-zA-Z\s]+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  BIRTHDATE: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
  ADDRESS: /^[a-zA-Z0-9.\s]+$/,
  CONTACT: /^[0-9]{3}\s[0-9]{3}\s[0-9]{4}$/,
  USERNAME: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-\s]+$/,
  SMALLCHAR: /\w*[a-z]\w*/,
  CAPITALCHAR: /\w*[A-Z]\w*/,
  NUMBER: /\d/,
  SPECIALCHAR: /[!@#$%^&*()\-_"=+{}; :,<.>]/,
};
