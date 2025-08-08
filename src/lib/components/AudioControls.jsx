import { Pause, Play, SkipBack, SkipForward } from "lucide-react"

export const AudioControls = ({isPlaying, onPlayPause, onPrev, onNext}) =>{
    return (
        <div>
            <button onClick={onPrev}>
                <SkipBack/>
            </button>
            <button onClick={onPlayPause}>
                {isPlaying ? <Pause/> : <Play/>}
            </button>
            <button onClick={onNext}>
                <SkipForward/>
            </button>
        </div>
    )
}