import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const { login } = useUser();
  const { isDarkMode } = useTheme();
  const [feedback] = useState<string>("");
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );

  return (
    <div className="max-w-6xl flex justify-center mx-auto px-4 py-8">
      <div className="w-full max-w-xs">
        {feedback && <div className="mb-4">{feedback}</div>}

        <form
          className={`bg-${isDarkMode ? "black" : "white"} shadow-md rounded px-8 pt-6 pb-8 mb-4`}
        >
          <div className="mb-4">
            <label
              className={`block text-gray-${isDarkMode ? "70" : "700"} text-sm font-bold mb-2`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setFormData({
                  email: e.target.value,
                  password: formData.password,
                });
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-${isDarkMode ? "white-700" : "gray-70"} leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className={`block text-gray-${isDarkMode ? "70" : "700"} text-sm font-bold mb-2`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-${isDarkMode ? "white-700" : "gray-70"} mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => {
                setFormData({
                  email: formData.email,
                  password: e.target.value,
                });
              }}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => login(formData.email, formData.password)}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;{new Date().getFullYear()} Giuseppe Zammuto - All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
