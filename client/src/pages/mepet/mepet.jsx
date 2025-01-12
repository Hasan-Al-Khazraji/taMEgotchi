import activityButton from "../../assets/buttons/activityButton.png";
import foodButton from "../../assets/buttons/foodButton.png";
import tiredButton from "../../assets/buttons/tiredButton.png";
import { useState } from "react";
import Navbar from "./navbar/navbar";
import LogoutButton from "../../components/logoutButton";
import Logo from "../../assets/Logo.png";
import "./mepet.css";
import { useAuth0 } from "@auth0/auth0-react";
import happy1 from "../../assets/emotions/happy/happy 1.png";
import happy2 from "../../assets/emotions/happy/happy 2.png";
import tired1 from "../../assets/emotions/tired/tired 1.png";
import tired2 from "../../assets/emotions/tired/tired 2.png";
import lazy1 from "../../assets/emotions/lazy/lazy 1.png";
import lazy2 from "../../assets/emotions/lazy/lazy 2.png";
import hungry1 from "../../assets/emotions/hungry/hungry 1.png";
import hungry2 from "../../assets/emotions/hungry/hungry 2.png";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import Message from "./component/message";

const animation1 = [happy1, happy2];
const animation2 = [tired1, tired2];
const animation3 = [lazy1, lazy2];
const animation4 = [hungry1, hungry2];

export default function Mepet() {
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [showSleepForm, setShowSleepForm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth0();

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [currentImageIndex1, setCurrentImageIndex1] = React.useState(0);
  const [imageEmotion, setImageEmotion] = useState(animation1);
  const [textMessage, setTextMessage] = useState("What did we do today!");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex1((prevIndex) => (prevIndex + 1) % animation1.length);
    }, 300); // Change image every second
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageChange = (emotion) => {
    if (emotion === "happy") {
      setImageEmotion(animation1)
      setTextMessage("Had lots of fun today!");
    } else if (emotion === "tired") {
      setImageEmotion(animation2)
      setTextMessage("...");
    }
    else if (emotion === "lazy") {
      setImageEmotion(animation3)
      setTextMessage("I don't feel like doing anything today...");
    }
    else if (emotion === "hungry") {
      setImageEmotion(animation4)
      setTextMessage("What's for dinner? I am hungry!");
    }
  };


  // Form fields need changing
  async function handleActivitySubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      activity: e.target.elements[0].value,
      timeSpent: e.target.elements[1].value,
      email: user.email,
    };

    try {
      const response = await fetch("http://localhost:5000/update-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      handleImageChange("happy");
      setShowActivityForm(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Form fields need changing
  async function handleFoodSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      activity: e.target.elements[0].value,
      quantity: e.target.elements[1].value,
      email: user.email,
    };

    try {
      const response = await fetch("http://localhost:5000/update-nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      handleImageChange("hungry");
      setShowFoodForm(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSleepSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      activity: e.target.elements[0].value,
      hours: e.target.elements[1].value,
      email: user.email,
    };

    try {
      const response = await fetch("http://localhost:5000/update-sleep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      handleImageChange("tired");
      setShowSleepForm(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen text-white flex flex-col justify-center items-center font-bold">
      <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#bea1f7] via-[#a186f2] to-[#867ce4] h-screen w-screen -z-30 absolute"></div>
      <div
        id="mepet-pen"
        className="flex justify-center items-center space-x-8"
      >
        <div>
          <Message text={textMessage}></Message>
          <img
            src={imageEmotion[currentImageIndex1]}
            alt={`p${currentImageIndex1 + 1}`}
            style={{ borderRadius: "8px" }}
            className="mx-auto"
          />
        </div>
      </div>
      <div
        id="dashboard"
        className="flex justify-center items-center space-x-8 mt-4"
      >
        <img
          src={activityButton}
          className="hover:scale-110 active:translate-y-1 hover:cursor-pointer transition duration-100"
          onClick={() => setShowActivityForm(true)}
        />
        <img
          src={foodButton}
          className="hover:scale-110 active:translate-y-1 hover:cursor-pointer transition duration-100"
          onClick={() => setShowFoodForm(true)}
        />
        <img
          src={tiredButton}
          className="hover:scale-110 active:translate-y-1 hover:cursor-pointer transition duration-100"
          onClick={() => setShowSleepForm(true)}
        />
      </div>
      {showActivityForm && (
        <form className="absolute z-10" onSubmit={handleActivitySubmit}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-black">
              <h2 className="text-xl mb-4">Activity</h2>
              <input
                type="text"
                placeholder="What you did"
                className="block mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Time spent on activity"
                className="block mb-2 p-2 border rounded"
              />
              {isLoading ? (
                <button
                  type="submit"
                  disabled
                  className="bg-purple-800 text-white px-4 py-2 rounded mr-2"
                >
                  Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                >
                  Submit
                </button>
              )}
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                onClick={() => setShowActivityForm(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </form>
      )}
      {showFoodForm && (
        <form className="absolute z-10" onSubmit={handleFoodSubmit}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-black">
              <h2 className="text-xl mb-4">Nutrition</h2>
              <input
                type="text"
                placeholder="What you ate"
                className="block mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Amount you ate"
                className="block mb-2 p-2 border rounded"
              />
              {isLoading ? (
                <button
                  type="submit"
                  disabled
                  className="bg-purple-800 text-white px-4 py-2 rounded mr-2"
                >
                  Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                >
                  Submit
                </button>
              )}
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                onClick={() => setShowFoodForm(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </form>
      )}
      {showSleepForm && (
        <form className="absolute z-10" onSubmit={handleSleepSubmit}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-black">
              <h2 className="text-xl mb-4">Sleep</h2>
              <input
                type="hidden"
                value="Slept"
                className="block mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Time spent sleeping"
                className="block mb-2 p-2 border rounded"
              />
              {isLoading ? (
                <button
                  type="submit"
                  disabled
                  className="bg-purple-800 text-white px-4 py-2 rounded mr-2"
                >
                  Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                >
                  Submit
                </button>
              )}
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                onClick={() => setShowSleepForm(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="w-full -z-10 drop-shadow-md bottom-0 absolute">
        <Navbar></Navbar>
      </div>
      <LogoutButton></LogoutButton>
      <img
        src={Logo}
        alt="taMEgotchi"
        className="absolute w-1/4 -bottom-11 hover:scale-105 transition duration-100"
      />
      <button
        className="rounded-full bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer hover:scale-105 text-black font-bold p-6 px-12 absolute bottom-6 left-12 transition duration-100"
        onClick={() => {
          setShowInfo(!showInfo);
        }}
      >
        <h1 className="text-8xl">?</h1>
      </button>
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 w-screen h-screen">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            onClick={() => setShowInfo(false)}
          >
            ✕
          </button>
          <div className="rounded-lg text-black w-3/5">
            <h2 className="text-3xl mb-4 text-white">Information:</h2>
            <hr className="bg-white my-3" />
            <a href="https://www.psychologytoday.com/us/blog/between-cultures/201805/in-helping-others-you-help-yourself" target="_blank" className="text-xl text-white underline">In Helping Others, You Help Yourself</a>
            <h2 className="text-lg text-white">Marianna Pogosyan Ph.D.</h2>
            <p className="text-white font-thin">
              Helping others can boost our own well-being by reinforcing our sense of relatedness and meeting psychological needs. Research shows that acts of generosity, such as volunteering or donating, enhance happiness and reduce depression. Additionally, helping others regulate their emotions can improve our own emotional regulation and well-being. A study found that providing emotional support online led to better emotional and cognitive outcomes for the helpers, reducing their depression and increasing happiness. Using other-focused language in support messages was particularly effective. Thus, helping others not only benefits them but also enhances our own emotional health.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}