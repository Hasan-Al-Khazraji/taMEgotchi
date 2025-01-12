export default function Navbar() {
    return (
        <div className="bg-white h-24 flex justify-between items-center drop-shadow-xl absolute w-screen bottom-0">
            <div className="bg-white h-64 rounded-tl-full w-full relative left-3/4 bottom-6"></div>
            <div className="bg-white h-64 rounded-tr-full w-full relative right-3/4 bottom-6"></div>
        </div>
    );
}