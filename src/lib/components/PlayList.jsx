
export const PlayList = ({ songs, currentIndex, onSelect }) => {
    return (
        <div className="w-110 ml-5">
            <div className="max-h-[300px] overflow-y-auto">
                <ul className="space-y-3 text-center ">
                    {songs.map((song, index) => (
                        <li key={index} onClick={() => onSelect(index)}
                            className={`p-2 rounded-lg cursor-pointer transition 
                         ${currentIndex === index ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-red-200 hover:shadow-xl"}`}>
                            <div className="flex ml-5 items-center space-x-10">
                                <img src={song.image} className="w-15 object-cover rounded-full" />
                                <div className="flex flex-col justify-start items-start">
                                    <p className="text-xl">{song.title}</p>
                                    <p className="text-sm">{song.artist}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}