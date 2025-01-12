import LoginButton from "../../components/loginButton";
import LogoutButton from "../../components/logoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();

  async function mepetExists() {
    try {
      const response = await fetch("http://localhost:5000/api/mepet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await response.json();
      if (data.mepet) {
        window.location.href = "/mepet";
        return data.mepet;
      }
      else {
        window.location.href = "/register";
        return false;
      }
    } catch (error) {
      console.error("Error checking if mepet exists:", error);
      return false;
    }
  }

  return (
    <div className="bg-slate-900 h-screen text-white flex flex-col justify-center items-center font-bold">
      {isAuthenticated ?
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl">Welcome back {user.name} 👋</h2>
          <img src={user.picture} alt="PFP" className="rounded-full my-3" />
          <h3 className="text-xl">Ready to see your Mepet?</h3>
          <button
            className="rounded-lg bg-emerald-500 px-3 py-2 my-2 hover:bg-emerald-600 hover:scale-110 transform transition duration-100"
            onClick={() => mepetExists()}
          >
            Take me!
          </button>
          <span className="absolute bottom-0 right-0 m-4 bg-red-400 rounded-lg p-2 hover:bg-red-500 hover:scale-110 transform transition duration-100">
            <LogoutButton></LogoutButton>
          </span>
        </div>
        :
        isLoading ? <h1>Loading...</h1> :
          <span className="bg-emerald-500 rounded-lg p-2 hover:bg-emerald-600 hover:scale-110 transform transition duration-100">
            <LoginButton></LoginButton>
          </span>
      }
    </div>
  );
}

export default App;
