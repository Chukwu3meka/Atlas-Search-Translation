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

const hasAttribute = (attributes, attribute = "") => {
  const attributeSpecified = attributes?.find((x) => x.includes(attribute));

  if (!attributeSpecified) return false;

  return attributeSpecified;
};

const validate = ({ type, label, value, attributes = [] }) => {
  try {
    label = label || type.charAt(0).toUpperCase() + type.slice(1);
    value = value?.trim();
    const validateRange = () => {
      const rangeSpecified = hasAttribute(attributes, "hasRange");

      if (rangeSpecified) {
        // const [min, max] = pullAttribValue("hasRange");
        const [min, max] = pullAttribValue(rangeSpecified);

        // console.log({ min, max });

        const flags = "i"; // <= flags for RegExp
        const validRange = new RegExp(`^.{${min},${max}}$`, flags).test(value);

        if (!validRange)
          throw {
            label: `${label || type.replace(/^./, type[0].toUpperCase())} must be in the range of  ${min} to ${max} characters`,
          };
      }
    };

    // check if value to be validated is empty
    if (!value) throw { label: `${label || type.replace(/^./, type[0].toUpperCase())} cannot be empty` };

    // validate value is within range
    validateRange();

    switch (type) {
      case "email": {
        value = value.toLowerCase();

        const validMail = new RegExp(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
        ).test(value);

        if (!validMail) throw { label: "Email is not valid" };
        break;
      }
      case "password": {
        // - Assert a password has at least one number;
        const hasNumber = hasAttribute(attributes, "hasNumber");
        if (hasNumber) {
          const hasNumberRegex = new RegExp(`(?=.*[0-9])`).test(value);
          if (!hasNumberRegex) throw { label: "Password must have at least one number" };
        }

        // - Assert a password has at least one Special Character;
        const hasSpecialChar = hasAttribute(attributes, "hasSpecialChar");
        if (hasSpecialChar) {
          const hasSpecialCharRegex = /(?=.*[!@#$%^&*])/.test(value);
          if (!hasSpecialCharRegex) throw { label: "Password must have at least one Special Character" };
        }

        // - Assert a password has at least one letter;
        const hasLetter = hasAttribute(attributes, "hasLetter");
        if (hasLetter) {
          const hasLetterRegex = new RegExp(/[a-zA-Z]/g).test(value);
          if (!hasLetterRegex) throw { label: "Password must have at least one Alphabeth" };
        }
        break;
        // return true;
      }
      case "handle": {
        const validChars = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s@!~#^$*']/gim).test(value);
        if (!validChars) throw { label: `Characters in ${label} is not valid` };
        break;
        // return true;
      }
      case "text": {
        // - Assert only letters are in value;
        const textRegex = new RegExp(/^[a-zA-Z]+$/).test(value);
        if (!textRegex) throw { label: `${label} can only accept letters` };
        break;
      }
      case "number": {
        // - Assert only numerals are in value;
        const hasNumberRegex = new RegExp(/^\d+$/).test(value);
        if (!hasNumberRegex) throw { label: `${label} can only accept number` };
        break;
      }
      case "address": {
        const addrRegex = value.match(/^[-\s,a-zA-Z0-9]+$/);
        if (!addrRegex) throw { label: `${label} can only accept text, numbers, whitespace and hyphen` };
      }
      case "string": {
        const textOnly = hasAttribute(attributes, "textOnly");
        const numberOnly = hasAttribute(attributes, "numberOnly");
        const alphanumeric = hasAttribute(attributes, "alphanumeric");

        if (numberOnly) {
          const numberOnlyRegex = value.match(/^[-\s0-9]+$/);
          // const numberOnlyRegex = new RegExp(/[0-9- ]/g).test(value);
          if (!numberOnlyRegex) throw { label: `${label} can only accept numbers, whitespace and hyphen` };
        } else if (textOnly) {
          const textOnlyRegex = value.match(/^[-\sa-zA-Z]+$/);
          if (!textOnlyRegex) throw { label: `${label} can only accept text, whitespace and hyphen` };
        } else if (alphanumeric) {
          const hasNumberRegex = new RegExp(/^[a-zA-Z0-9]+$/i).test(value);
          if (!hasNumberRegex) throw { label: `${label} can only accept alphanumeric` };
        } else {
          const allRegex = value.match(/^[-'\sa-zA-Z0-9]+$/);
          if (!allRegex) throw { label: `${label} can only accept text, numbers, whitespace and hyphen` };
        }

        break;
      }
      case "tel": {
        if (isNaN(value)) throw { label: `${label} can only have numbers` };
        if (value.length > 11 || value.length < 11) throw { label: `${label} must have only 11 numbers` };
        if (!value.startsWith("0")) throw { label: `${label} must start with 0` };
        break;
      }

      default:
        throw { label: "A validation error occured" };
    }
  } catch (err) {
    console.assert(process.env.NODE_ENV === "production", `INPUT VALIDATION ERROR: ${err}`);
    throw { label: err.label || "Error cannot be determined" };
  }
};

export default validate;
