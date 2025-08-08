import "./css/ProgressBar.css"
export const ProgressBar = ({progress, onSeek}) => {
    return (
      <div className="text-center">
        <input type="range" value={progress} 
           onChange={(e) => onSeek(Number(e.target.value))}
            className="custom-range cursor-pointer" />
      </div>
    )
}