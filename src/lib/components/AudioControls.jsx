import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

export const AudioControls = ({isPlaying, onPlayPause, onPrev, onNext, volume, onVolumeChange, isMuted, onMuteToggle}) =>{
   
    return (
        <div className="flex justify-around items-center py-5 relative">
            <button onClick={onMuteToggle}>
                {isMuted ? <VolumeX className="cursor-pointer"/> :  <Volume2 className="cursor-pointer"/>}
            </button>
                {!isMuted &&  (
                 <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolumeChange(Number(e.target.value))} 
                   className="absolute top-[-36px] left-13 -translate-x-1/2 rotate-vertical cursor-pointer"/>
                )}
            <button onClick={onPrev} className="">
                <SkipBack className="cursor-pointer fill-black"/>
            </button>
            <button onClick={onPlayPause} className="border p-3.5 bg-red-500 rounded-full">
                {isPlaying ? <Pause className="cursor-pointer" fill="black"/> : <Play className="cursor-pointer " fill="black"/>}
            </button>
            <button onClick={onNext}>
                <SkipForward className="cursor-pointer" fill=""/>
            </button>
        </div>
    )
}