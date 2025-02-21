export const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  
  export const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone); // Validates Indian 10-digit numbers
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6; // Ensures password is at least 6 characters
  };
  