import vlogrrLogo from "../assets/vlogrr.png";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const username = user.displayName || user.email || user.uid;
        toast.success(`${username}, Welcome Back!`);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = errorMessage.match(/auth\/\S+/)[0].split("/")[1];
        const errorName = errorCode.replace(/-/g, " ");
        const capitalizedErrorName =
          errorName.charAt(0).toUpperCase() + errorName.slice(1);
        toast.error(capitalizedErrorName.slice(0, -1));
        setLoading(false);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container py-[5rem] mx-auto">
        <div className="flex justify-center items-center h-full px-6">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="flex justify-center items-center h-[48px] min-w-[123px] rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500">
                <p className="text-white font-bold text-2xl tracking-wider">
                  Vlogrr
                </p>
              </div>

              <div className="sm:px-8 my-4 text-left">
                <h3 className="pt-4 mb-2 text-3xl">Welcome back!</h3>
                <p className="mb-4 text-sm text-gray-700">
                  Please login to your account
                </p>
              </div>
              <form
                className="sm:px-8 sm:pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={onSubmit}
              >
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 placeholder:text-md text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    placeholder="name@gmail.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm placeholder:text-2xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    placeholder="........"
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="bg-blue-500  hover:bg-blue-700 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
                <div className="flex items-center flex-col sm:flex-row justify-around pb-6">
                  <p
                    className="text-sm text-blue-800 align-baseline hover:text-blue-500  cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Create an Account!
                  </p>

                  <p
                    className="text-sm text-blue-800 align-baseline hover:text-blue-500 pt-3 sm:pt-0 cursor-pointer"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password?
                  </p>
                </div>

                <div className="flex items-center my-2 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>
                <OAuth />
              </form>
            </div>

            <img
              className="w-full h-auto object-contain bg-white hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              src={vlogrrLogo}
              alt="vlogrr Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
