export default function Message(props) {
    // Create a messasge component to display messages above the mepet character and can have messages passed in as props
    return (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg">
            <div className="text-center relative">
                {props.text || "What did we do today!"}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 
                    border-l-[10px] border-l-transparent
                    border-t-[10px] border-t-white
                    border-r-[10px] border-r-transparent">
                </div>
            </div>
        </div>
    );
}