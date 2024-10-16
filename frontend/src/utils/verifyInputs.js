function verifyName(name) {
  // Check if name is a string
  if (typeof name !== "string") {
    return false;
  }

  // Check if name is at least 4 characters long
  if (name.length < 4) {
    return false;
  }

  // Check if name contains only alphabetic characters
  const alphabeticRegex = /^[A-Za-z]+$/;
  if (!alphabeticRegex.test(name)) {
    return false;
  }

  return true;
}

function verifyEmail(email) {
  // Regular expression pattern for validating an email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return emailPattern.test(email);
}

function verifyPassword(password) {
  // Regular expression patterns for the required criteria
  const lengthPattern = /.{7,}/; // At least 7 characters long
  const uppercasePattern = /[A-Z]/; // At least one uppercase letter
  const lowercasePattern = /[a-z]/; // At least one lowercase letter
  const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
  const digitPattern = /\d/; // At least one digit

  // Check all criteria
  const isValidLength = lengthPattern.test(password);
  const hasUppercase = uppercasePattern.test(password);
  const hasLowercase = lowercasePattern.test(password);
  const hasSpecialCharacter = specialCharacterPattern.test(password);
  const hasDigit = digitPattern.test(password);

  // Return true only if all criteria are met
  return (
    isValidLength &&
    hasUppercase &&
    hasLowercase &&
    hasSpecialCharacter &&
    hasDigit
  );
}

function verifyRePassword(password, re_password) {
  return password === re_password;
}

const objectHasKey = (obj, key) => {
  return Object.keys(obj).length > 0 && obj.hasOwnProperty(key);
};

function verifySixDigitCode(input) {
  // Regular expression to match exactly six digits
  const sixDigitRegex = /^\d{6}$/;

  // Test the input against the regular expression
  if (sixDigitRegex.test(input)) {
    return true; // Valid six-digit code
  } else {
    return false; // Invalid code
  }
}

export default {
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyRePassword,
  objectHasKey,
  verifySixDigitCode,
};
