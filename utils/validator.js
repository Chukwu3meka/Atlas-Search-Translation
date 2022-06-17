const validate = ({ type, label, value, attributes = [] }) => {
  const pullAttribValue = (attribute) => {
    // pull value from attribute
    const value = attribute.match(/\((.*)\)/);

    const arrValue = value ? value[1] : null;

    // The g character makes it a "global" match, meaning it repeats the search through the entire string.
    // If you want to match all whitespace, and not just the literal space character, use \s instead:
    return arrValue
      ? arrValue
          // .replaceAll(/\s/g, "") // <= remove whitespace
          .split(",") // <= convert to array
      : // .map(Number) // <= convert all string to numbers
        [8, 30];
  };

  const hasAttribute = (attribute = "") => {
    const attributeSpecified = attributes?.find((x) => x.includes(attribute));

    if (!attributeSpecified) return false;

    return attributeSpecified;
  };

  const validateRange = () => {
    const rangeSpecified = hasAttribute("hasRange");

    if (rangeSpecified) {
      // const [min, max] = pullAttribValue("hasRange");
      const [min, max] = pullAttribValue(rangeSpecified);

      // console.log({ min, max });

      const flags = "i"; // <= flags for RegExp
      const validRange = new RegExp(`^.{${min},${max}}$`, flags).test(value);

      if (!validRange)
        throw {
          message: `${label || type.replace(/^./, type[0].toUpperCase())} must be in the range of  ${min} to ${max} characters`,
        };
    }
  };

  // check if value to be validated is empty
  if (!value) throw { message: `${label || type.replace(/^./, type[0].toUpperCase())} cannot be empty` };

  // validate value is within range
  validateRange();

  // if(!) throw {label}

  switch (type) {
    case "email": {
      value = value.toLowerCase();

      const validMail = new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
      ).test(value);

      if (!validMail) throw { message: "Email is not valid" };
      // && value.split("@")[0].length >= 5 && value.split("@")[0].length <= 30) || null;
      return true;
    }

    case "password": {
      // - Assert a password has at least one number;
      const hasNumber = hasAttribute("hasNumber");
      if (hasNumber) {
        const hasNumberRegex = new RegExp(`(?=.*[0-9])`).test(value);
        if (!hasNumberRegex) throw { message: "Password must have at least one number" };
      }

      // - Assert a password has at least one Special Character;
      const hasSpecialChar = hasAttribute("hasSpecialChar");
      if (hasSpecialChar) {
        const hasSpecialCharRegex = /(?=.*[!@#$%^&*])/.test(value);
        if (!hasSpecialCharRegex) throw { message: "Password must have at least one Special Character" };
      }

      // - Assert a password has at least one letter;
      const hasLetter = hasAttribute("hasLetter");
      if (hasLetter) {
        const hasLetterRegex = new RegExp(/[a-zA-Z]/g).test(value);
        if (!hasLetterRegex) throw { message: "Password must have at least one Alphabeth" };
      }

      return true;
    }
    case "handle": {
      const validChars = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s@!~#^$*']/gim).test(value);
      if (!validChars) throw { message: `Characters in ${label} is not valid` };

      return true;
    }

    case "alphabet": {
      // - Assert only letters are in value;
      const hasNumberRegex = new RegExp(/^[a-zA-Z]+$/).test(value);
      if (!hasNumberRegex) throw { message: `${label} can only accept letters` };
    }

    case "number": {
      // - Assert only numerals are in value;
      const hasNumberRegex = new RegExp(/^\d+$/).test(value);
      if (!hasNumberRegex) throw { message: `${label} can only accept number` };
    }

    case "alphanumeric": {
      // - Assert a password has at least one letter;
      const allowDash = hasAttribute("allowDash");
      if (allowDash) {
        const allowDashRegex = new RegExp(/[a-zA-Z0-9-]/g).test(value);
        if (!allowDashRegex) throw { message: `${label} can only accept alphanumeric` };
      } else {
        // - Assert only alphanumeric are in value;
        const hasNumberRegex = new RegExp(/^[a-zA-Z0-9]+$/i).test(value);
        if (!hasNumberRegex) throw { message: `${label} can only accept alphanumeric` };
      }

      return;
    }

    case "text": {
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{2,39}$/gim;
      let status = reg.test(value);
      if (status === true) return value;
      return false;
    }
    case "string": {
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w\W]{2,999}$/gim;
      let status = reg.test(value) && value.length > 3;
      if (status === true) return value;
      return false;
    }
    default:
      return false;
  }
};

export default validate;
