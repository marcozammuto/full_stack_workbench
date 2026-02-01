import PageHeading from "../shared/PageHeading";
import { useTheme } from "../../context/index";
import type {
  FieldInterface,
  InputType,
  ReducerAction,
} from "../../types/interfaces";
import { useReducer } from "react";
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

interface InputFieldProps extends FieldInterface {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const reducer = (state: FormInterface, action: ReducerAction) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

const Form = () => {
  const { isDarkMode } = useTheme();
  const [state, dispatch] = useReducer(reducer, init);

  const handleSubmit = () => {
    console.log(state);
  };

  return (
    <>
      <PageHeading
        title="Form"
        subtitle="Validate and save your data through useReducer and express validation"
      />
      <div
        className={`px-2 py-3 rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
          {[
            {
              field: "firstName",
              placeholder: "John",
              label: "first name",
            },
            {
              field: "lastName",
              placeholder: "Doe",
              label: "last name",
            },
            {
              field: "email",
              placeholder: "yourname@mail.it",
              label: "email address",
              type: "email" as InputType,
            },
            {
              field: "phone",
              placeholder: "+391112223333",
              label: "phone number",
              type: "tel" as InputType,
            },
            {
              field: "city",
              placeholder: "New York",
              label: "city",
            },
            {
              field: "address",
              placeholder: "Wall Street",
              label: "address",
            },
            {
              field: "streetNr",
              placeholder: "1",
              label: "street number",
            },
            {
              field: "age",
              placeholder: "25",
              label: "age",
            },
          ].map((input: FieldInterface) => (
            <InputField
              key={`${input.field}-${input.label}`}
              field={input.field}
              placeholder={input.placeholder}
              label={input.label}
              type={input.type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: "UPDATE_INPUT",
                  key: input.field,
                  value: e.target.value,
                })
              }
            />
          ))}
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Form;
