import greenButton from '../../assets/buttons/green_button.png';
import { useState } from 'react';
import Navbar from './navbar/navbar';
import LogoutButton from "../../components/logoutButton";
import Logo from "../../assets/Logo.png";
import './mepet.css';

export default function Mepet() {
    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            activity: e.target.elements[0].value,
            timeSpent: e.target.elements[1].value
        };
        console.log(formData);

        await fetch('http://localhost:5000/api/activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                setShowForm(false);
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="h-screen text-white flex flex-col justify-center items-center font-bold">
            <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#bea1f7] via-[#a186f2] to-[#867ce4] h-screen w-screen -z-30 absolute"></div>
            <h1 className="text-3xl">Mepet</h1>
            <img
                src={greenButton}
                className='hover:scale-110 hover:cursor-pointer'
                onClick={() => setShowForm(true)}
            />
            {showForm && (
                <form className="absolute z-10" onSubmit={handleSubmit}>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg text-black">
                            <h2 className="text-xl mb-4">Activity</h2>
                            <input type="text" placeholder="What you did" className="block mb-2 p-2 border rounded" />
                            <input type="text" placeholder="Time spent on activity" className="block mb-2 p-2 border rounded" />
                            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded mr-2">Submit</button>
                        </div>
                    </div>
                </form>
            )}
            <div className='w-full -z-10 drop-shadow-md bottom-0 absolute'>
                <Navbar></Navbar>
            </div>
            <LogoutButton></LogoutButton>
            <img src={Logo} alt="taMEgotchi" className='absolute w-1/4 -bottom-11 hover:scale-105 transition duration-100' />
            <button
                className="rounded-full bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer hover:scale-105 text-black font-bold p-6 px-12 absolute bottom-6 left-12 transition duration-100"
                onClick={() => { setShowInfo(!showInfo) }}
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
                        <hr className='bg-white my-3' />
                        <p className='text-white font-thin'>Lorem ipsum odor amet, consectetuer adipiscing elit. Accumsan rutrum torquent aptent diam, erat malesuada. Ipsum imperdiet dolor interdum viverra pulvinar. Nec ad sapien enim laoreet praesent, mauris felis primis. Dapibus penatibus neque, dui pulvinar maximus habitant quis montes eros. Nascetur hac neque gravida feugiat litora?

                            Risus pretium morbi; eleifend tristique ex gravida. Mauris quisque libero posuere, habitasse pretium mi. Malesuada sociosqu enim quisque lorem sapien congue tellus per. Phasellus aliquet tristique curabitur nunc cras rutrum ultrices. Maecenas sit molestie consectetur eros natoque. Morbi dictumst eleifend penatibus senectus, ultrices posuere sollicitudin. Morbi ornare etiam aptent laoreet fermentum nisi commodo egestas duis. Ipsum sodales himenaeos odio lacus felis mollis ut.

                            Neque blandit erat eget congue turpis leo pulvinar nostra. Porttitor elementum sem aliquam molestie imperdiet cubilia posuere conubia. Potenti nibh porta, tempus mauris consectetur hendrerit. Primis sapien gravida tellus placerat, augue interdum scelerisque ut. Vestibulum diam nullam efficitur iaculis orci. Netus lacinia torquent in potenti tincidunt tempus vulputate molestie. Fermentum adipiscing massa turpis inceptos mi justo nulla metus. Vehicula inceptos faucibus lacinia fringilla semper. Nam interdum sem lacus vitae nam rutrum dictum. Facilisis cras donec orci nulla rutrum ad natoque ex.

                            Urna a augue enim et ligula est quis. Erat malesuada nisi taciti duis quis. Nullam elementum morbi taciti elementum mattis efficitur! Cursus nascetur dictumst faucibus natoque facilisi congue. Ornare nam curabitur sit gravida nullam viverra quam. Neque fusce lectus nisl dolor nascetur. Luctus hendrerit pretium nisi porta fringilla eu faucibus donec. Tincidunt neque auctor dictumst hendrerit sollicitudin mollis.

                            Sociosqu fringilla sagittis lectus ullamcorper sem curae vel. Quis himenaeos arcu ipsum mi inceptos ultricies blandit viverra. Vitae faucibus egestas ad magna pellentesque feugiat pharetra curabitur. Maximus lectus integer mattis dui posuere dis ante. Dolor dictumst cubilia donec natoque massa tincidunt? Finibus auctor aliquam torquent placerat aptent felis potenti? Mus adipiscing nam luctus; ipsum tortor metus. Phasellus est taciti convallis rhoncus dapibus vehicula semper fames.</p>
                    </div>
                </div>
            )}
        </div>
    );
};