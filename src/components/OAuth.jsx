import google from "../assets/google.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const firestoreDb = getFirestore();

  const onGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        // Save user details in the `users` collection
        const userRef = doc(firestoreDb, "users", user.uid);
        const userData = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          createdAt: new Date(),
        };
        await setDoc(userRef, userData);

        toast.success(`Welcome ${user.displayName}`);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div onClick={onGoogleClick}>
      <p className="cursor-pointer my-5 sm:px-7 py-3 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center">
        <img src={google} alt="Logo" className="w-8 h-8" srcSet="" /> Sign In
        with Google
      </p>
    </div>
  );
}

export default OAuth;
