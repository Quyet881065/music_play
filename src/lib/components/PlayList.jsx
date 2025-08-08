
export const PlayList = ({songs, currentIndex, onSelect}) => {
    return (
        <div>
            <h3>Play List </h3>
            <ul>
                {songs.map((song,index)=> (
                    <li key={index} onClick={() =>onSelect(index)}
                       className={`p-2 rounded cursor-pointer transition
                         ${currentIndex === index ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
                        <p>{song.title}</p>
                        <p>{song.artist}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}