import greenButton from '../../assets/buttons/green_button.png';
import { useState } from 'react';

export default function Mepet() {
    const [showForm, setShowForm] = useState(false);

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
            <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc] h-screen w-screen -z-30 absolute"></div>
            <h1 className="text-3xl">Mepet</h1>
            <img
                src={greenButton}
                className='hover:scale-110 hover:cursor-pointer'
                onClick={() => setShowForm(true)}
            />
            {showForm && (
                <form className="absolute" onSubmit={handleSubmit}>
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
        </div>
    );
};