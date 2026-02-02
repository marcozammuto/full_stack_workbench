import PageHeading from "../shared/PageHeading";
import { useTheme } from "../../context/index";
import type { InputType } from "../../types/interfaces";
import { useReducer, useState } from "react";
import InputField from "../features/form/InputField";

interface FormInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  streetNr: string;
  age: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
  streetNr?: string;
  age?: string;
}

interface FieldConfig {
  field: keyof FormInterface;
  placeholder: string;
  label: string;
  type?: InputType;
  required?: boolean;
  validate?: (value: string) => string | undefined;
}

const init: FormInterface = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  streetNr: "",
  age: "",
};

type ReducerAction = {
  type: string;
  key: keyof FormInterface;
  value: string;
};

const reducer = (state: FormInterface, action: ReducerAction) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "RESET":
      return init;
    default:
      return state;
  }
};

const validators = {
  required: (value: string, fieldName: string) =>
    !value.trim() ? `${fieldName} is required` : undefined,

  email: (value: string) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? "Please enter a valid email address" : undefined;
  },

  phone: (value: string) => {
    if (!value.trim()) return "Phone number is required";
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    return !phoneRegex.test(value) ? "Please enter a valid phone number" : undefined;
  },

  age: (value: string) => {
    if (!value.trim()) return "Age is required";
    const age = parseInt(value, 10);
    if (isNaN(age)) return "Age must be a number";
    if (age < 1 || age > 120) return "Please enter a valid age (1-120)";
    return undefined;
  },

  streetNr: (value: string) => {
    if (!value.trim()) return "Street number is required";
    if (!/^\d+[a-zA-Z]?$/.test(value)) return "Please enter a valid street number";
    return undefined;
  },
};

const Form = () => {
  const { isDarkMode } = useTheme();
  const [state, dispatch] = useReducer(reducer, init);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fields: FieldConfig[] = [
    {
      field: "firstName",
      placeholder: "John",
      label: "first name",
      required: true,
      validate: (v) => validators.required(v, "First name"),
    },
    {
      field: "lastName",
      placeholder: "Doe",
      label: "last name",
      required: true,
      validate: (v) => validators.required(v, "Last name"),
    },
    {
      field: "email",
      placeholder: "yourname@mail.it",
      label: "email address",
      type: "email" as InputType,
      required: true,
      validate: validators.email,
    },
    {
      field: "phone",
      placeholder: "+391112223333",
      label: "phone number",
      type: "tel" as InputType,
      required: true,
      validate: validators.phone,
    },
    {
      field: "city",
      placeholder: "New York",
      label: "city",
      required: true,
      validate: (v) => validators.required(v, "City"),
    },
    {
      field: "address",
      placeholder: "Wall Street",
      label: "address",
      required: true,
      validate: (v) => validators.required(v, "Address"),
    },
    {
      field: "streetNr",
      placeholder: "1",
      label: "street number",
      required: true,
      validate: validators.streetNr,
    },
    {
      field: "age",
      placeholder: "25",
      label: "age",
      required: true,
      validate: validators.age,
    },
  ];

  const validateField = (field: keyof FormInterface, value: string): string | undefined => {
    const fieldConfig = fields.find((f) => f.field === field);
    return fieldConfig?.validate?.(value);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field.field, state[field.field]);
      if (error) {
        newErrors[field.field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: keyof FormInterface, value: string) => {
    dispatch({ type: "UPDATE_INPUT", key: field, value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", state);
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  return (
    <>
      <PageHeading
        title="Form"
        subtitle="Validate and save your data through useReducer and express validation"
      />
      <form
        onSubmit={handleSubmit}
        className={`px-4 py-6 rounded-2xl shadow-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3">
          {fields.map((input) => (
            <InputField
              key={`${input.field}-${input.label}`}
              field={input.field}
              placeholder={input.placeholder}
              label={input.label}
              type={input.type}
              required={input.required}
              error={errors[input.field]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(input.field, e.target.value)
              }
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 px-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white
              transition-all duration-300 transform
              flex items-center justify-center gap-2
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : submitSuccess
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isDarkMode ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"}
              cursor-pointer
            `}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : submitSuccess ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Submitted!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Submit Form
              </>
            )}
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div
            className={`mt-4 mx-2 p-4 rounded-xl flex items-center gap-3 ${
              isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-50 text-green-700"
            }`}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Form submitted successfully!</span>
          </div>
        )}
      </form>
    </>
  );
};

export default Form;
