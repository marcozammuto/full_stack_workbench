import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser, useTheme } from "../../context/index";
import PageHeading from "../shared/PageHeading";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useUser();
  const { isDarkMode } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data.email, data.password);
  };

  const inputClasses = `shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
  }`;

  const inputErrorClasses = `${inputClasses} border-red-500`;

  const labelClasses = `block text-sm font-bold mb-2 ${
    isDarkMode ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <>
      <PageHeading title="Login" subtitle="Sign in to your account to start" />
      <div className="w-full max-w-xs mx-auto justify-center align-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="mb-4">
            <label className={labelClasses} htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className={errors.email ? inputErrorClasses : inputClasses}
              id="email"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className={labelClasses} htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className={errors.password ? inputErrorClasses : inputClasses}
              id="password"
              type="password"
              placeholder="******************"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center align-center gap-2 mb-4">
            <input
              {...register("remember")}
              className="bg-blue-500 hover:bg-blue-700"
              type="checkbox"
              id="remember"
            />
            <label className={`${labelClasses} mb-0`} htmlFor="remember">
              Remember me
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              <div className="relative w-fit">
                <p className="peer ...">Forgot Password?</p>

                <span
                  className="bottom-full left-1/2 -translate-x-1/2 absolute
    text-stone-50 text-xs bg-stone-800 opacity-0 px-2 py-1 rounded-md w-max
    -translate-y-0.5 peer-hover:-translate-y-1 peer-hover:opacity-100 transition-all"
                >
                  Coming soon!
                </span>
              </div>
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
