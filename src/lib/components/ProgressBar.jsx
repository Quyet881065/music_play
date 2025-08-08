
export const ProgressBar = ({progress, onSeek}) => {
    return (
        <input type="range" value={progress} 
           onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full bg-blue-500" />
    )
}