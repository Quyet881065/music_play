import { useRef, useState, useEffect } from "react"
import { songs } from "@/data/songs";
import { ProgressBar } from "./ProgressBar";
import { AudioControls } from "./AudioControls";
import { PlayList } from "./PlayList";

export const MusicPlayer = () => {
    const audioRef = useRef(null); // Giữ tham chiếu đến thẻ audio DOM để gọi .play(),.pause() mà không cần render lại component
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // Lưu dữ phần trăm của tiến trình 0->100
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(audioRef);

    useEffect(() => { // Hook xử lý side effects(tác dụng phụ)
        if (isPlaying && audioRef.current) {
            audioRef.current.play();// Tự động phát bài mới khi chuyển bài vì currentIndex thay đổi , hoặc ấn nút play
        }
    }, [currentIndex, isPlaying]); // hàm sẽ chạy lại mỗi khi dependencies currentIndex, isPlaying thay đổi

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
    return (
        <div>
            <h2>{songs[currentIndex].title} - {songs[currentIndex].artist}</h2>
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={songs[currentIndex].src} onEnded={handleNext} />
            <ProgressBar progress={progress} onSeek={handleSeek} />
            <AudioControls isPlaying={isPlaying} onPlayPause={togglePlayPause}
                onPrev={handlePrev} onNext={handleNext} />
            <PlayList songs={songs} currentIndex={currentIndex}
                onSelect={handleSelectSong} />
        </div>
    )
}