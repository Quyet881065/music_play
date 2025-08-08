import { useRef, useState, useEffect } from "react"
import { songs } from "@/data/songs";
import { ProgressBar } from "./ProgressBar";
import { AudioControls } from "./AudioControls";
import { PlayList } from "./PlayList";
import { cn } from "@/lib/utils";

export const MusicPlayer = () => {
    const audioRef = useRef(null); // Giữ tham chiếu đến thẻ audio DOM để gọi .play(),.pause() mà không cần render lại component
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // Lưu dữ phần trăm của tiến trình 0->100
    const [currentIndex, setCurrentIndex] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    console.log(audioRef);

    useEffect(() => { // Hook xử lý side effects(tác dụng phụ)
        if (isPlaying && audioRef.current) {
            audioRef.current.play();// Tự động phát bài mới khi chuyển bài vì currentIndex thay đổi , hoặc ấn nút play
        }
    }, [currentIndex, isPlaying]); // hàm sẽ chạy lại mỗi khi dependencies currentIndex, isPlaying thay đổi

    // Cập nhật âm lượng khi volume state thay đổi
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);


    // Hàm đổi vị trí phát của audio theo phần trăm , gọi khi kéo thanh trượt 
    const handleSeek = (value) => {
        if (!audioRef.current) return;
        const duration = audioRef.current.duration || 0; // Lấy tổng thời gian của bài hát 
        audioRef.current.currentTime = (value / 100) * duration;
        setProgress(value);
        // Value gtri phần trăm 0->100 được truyền vào từ thanh trượt 
        // value /100 chuyển gtri phần trăm thành số thập phân (ví dụ 25% = 0.25)
        // Nhân với duration để có tgian chính xác 0.25 * 180  = 45s .Sau đó gán 
        // giá trị cho audioRef.current.currentTime khiến bài hát nhảy đến vị trí mới 
    };

    // Chuyển đổi giữa trạng thái play va pause 
    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // Đảo ngược trạng thái 
    };

    // Hàm chuyển sang bai trước đó trong ds. Dùng setCurrentIndex để cập nhật chỉ số bài hát
    // Nếu prev(chỉ số hiện tại) lớn hơn 0, sẽ giảm đi 1 để chuyển về bài hát trước đó 
    // prev = 0 (đang ở bài hát đàu tiên) , nó sẽ quay lại bài hát cuối cùng(song.length-1), tạo ra vòng lặp
    const handlePrev = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : songs.length - 1));
        setIsPlaying(true);
    };
    // Hàm này dùng để chuyển sang baì tiếp theo trong danh sáh 
    // Nếu prev hiện tại nhỏ hơn chỉ số của bài hát cuối cùng (sóng.length-1) nó 
    // sẽ tăng lên một để chuyển sang bài tiếp theo 
    // Nêú prev là chỉ số bài hát cuối , nó sẽ quay trở lại bài hát đầu tiên 
    const handleNext = () => {
        setCurrentIndex(prev => (prev < songs.length - 1 ? prev + 1 : 0));
        setIsPlaying(true);
    };
    // Hàm dùng để phát một bài hát cụ thể khi người dùng chọn từ danh sách 
    const handleSelectSong = (index) => {
        setCurrentIndex(index);
        setIsPlaying(true);
    }
    // Hàm này được dùng để cập nhật thanh tiến trình (progress bar) của bài hát.
    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;// Lấy thời gian hiện tại của bài hát đang phát
        const duration = audioRef.current.duration || 0;// Lấy tổng thời gian của bài hát
        setProgress((current / duration) * 100);
        // Tính toán phần trăm tiến trình bài hát . CT (tgian hien tai / tong tg) * 100. Ví dụ (45s / 180s) *100 = 25 
    };
    // Hàm xử lý thay đổi volume từ input range
    const handleVolumeChange = (value) => {
        setVolume(value);
    };
    const toggleMute = () => {
        if (!audioRef.current) return;
        if (isMuted) { //Kiểm tra xem trạng thái hiện tại là isMuted (đang tắt tiếng) có phải true không.
            // Bật âm lại: trả volume về giá trị trước đó hoặc 0.5
            // Bật lại tiếng: Nếu đang tắt tiếng, đoạn code bên trong sẽ chạy.
            audioRef.current.muted = false;
            setIsMuted(false); // giá trị false cho thuộc tính muted của thẻ <audio>, làm cho âm thanh được bật lại.
            if (volume === 0) setVolume(0.5); // Nếu volume = 0 thì đặt lại 0.5
        } else {
            // Tắt âm
            audioRef.current.muted = true; // giá trị true cho thuộc tính muted của thẻ <audio>, làm cho âm thanh bị tắt tiếng.
            setIsMuted(true);
        }
    };
    return (
        <div className="bg-gray-300 w-120 h-screen flex flex-col justify-center overflow-y-scroll">
            <div className="max-h-[660px]">
                <h2 className="text-2xl font-bold text-center mb-5">
                    {songs[currentIndex].title} - {songs[currentIndex].artist}
                </h2>
                <div className="w-full mb-5 flex justify-center items-center">
                    <img src={songs[currentIndex].image}
                        className={cn("rounded-full shadow-lg w-50 object-cover border", "animate-spin-slow", !isPlaying && "pause")} />
                    {/* isPlaying la flase !isPlaying la true them class pause */}
                </div>
                <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={songs[currentIndex].src} onEnded={handleNext} />
                <ProgressBar progress={progress} onSeek={handleSeek} />
                <AudioControls isPlaying={isPlaying} onPlayPause={togglePlayPause}  isMuted={isMuted} onMuteToggle ={toggleMute}
                    onPrev={handlePrev} onNext={handleNext} volume={volume} onVolumeChange={handleVolumeChange} />
                <PlayList songs={songs} currentIndex={currentIndex}
                    onSelect={handleSelectSong} />
            </div>
        </div>
    )
}