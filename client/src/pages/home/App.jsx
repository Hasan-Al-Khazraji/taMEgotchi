import LoginButton from "../../components/loginButton";
import LogoutButton from "../../components/logoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../assets/Logo.png";
import SendIcon from '@mui/icons-material/Send';
import './App.css';

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
    <div className="bg-slate-900 h-screen text-white flex flex-col justify-center items-center font-bold" id="background">
      {isAuthenticated ?
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-thin">Welcome back 👋</h2>
          <a className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold text-4xl">{user.name}</a>
          <img src={user.picture} alt="PFP" className="rounded-full my-3" />
          <h3 className="text-xl font-thin">Ready to see your</h3>
          <a className="hover:bg-gradient-to-r bg-white from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] inline-block text-transparent bg-clip-text font-bold text-4xl hover:cursor-default mb-4">Mepet?</a>
          <button
            className="rounded-lg bg-emerald-500 px-3 py-2 my-2 hover:bg-emerald-600 hover:scale-110 transform transition duration-100 flex justify-center items-center group-active:scale-110"
            onClick={() => mepetExists()}
          >
            <h1 className="text-lg mr-2">Take me</h1>
            <span className="group-active:scale-110">
              <SendIcon></SendIcon>
            </span>
          </button>
          <span className="absolute -bottom-10 -right-9">
            <LogoutButton></LogoutButton>
          </span>
        </div>
        :
        isLoading ? <h1>Loading...</h1> :
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} alt="Logo" className="w-1/2 animate-pulse" />
            <span className="bg-emerald-500 rounded-3xl p-2 hover:bg-emerald-600 hover:scale-110 transform transition duration-100">
              <LoginButton></LoginButton>
            </span>
          </div>
      }
    </div>
  );
}

export default App;
