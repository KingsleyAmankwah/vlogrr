import vlogrrLogo from "../assets/vlogrr.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  // updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
    const firestoreDb = getFirestore();

    if (password !== password2) {
      toast.error("The two passwords do not match!");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Save user details in "users" collection
        const userDocRef = doc(firestoreDb, "users", user.uid);
        await setDoc(userDocRef, {
          email: user.email,
          displayName: name,
          photoURL: user.photoURL,
        });

        setLoading(false);
        toast.success(`${user.email} registered successfully!`);
        navigate("/");
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
                <h3 className="pt-4 mb-2 sm:text-3xl text-lg">
                  Welcome to Vlogrr
                </h3>
                <p className="mb-4 text-sm text-gray-700">
                  Create an account to discover all kinds of videos around the
                  world...
                </p>
              </div>
              <form
                className="sm:px-8 sm:pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={onSubmit}
              >
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Full Name
                  </label>
                  <input
                    className="w-full px-3 py-2 placeholder:text-md text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    value={name}
                    onChange={onChange}
                    placeholder="Jane Doe"
                  />
                </div>
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
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm placeholder:text-2xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="password2"
                    type="password"
                    value={password2}
                    onChange={onChange}
                    placeholder="........"
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="bg-blue-500  hover:bg-blue-700 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="flex items-center flex-col sm:flex-row justify-around pb-6">
                  <p
                    className="text-sm text-blue-800 align-baseline hover:text-blue-500  cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Already have an Account? Login!
                  </p>

                  <p
                    className="text-sm text-blue-800 align-baseline hover:text-blue-500 pt-3 sm:pt-0 cursor-pointer"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password?
                  </p>
                </div>
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

export default Register;
