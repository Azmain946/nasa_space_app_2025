import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

interface PodcastPlayerProps {
  title: string;
  src: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ title, src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      duration
    );
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  const handlePlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const updateProgress = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="publication-card p-4">
      <div className="font-bold mb-2">{title}</div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-3">
        <button onClick={() => handleSkip(-10)} className="p-2 bg-white/5 rounded-full">
          <SkipBack />
        </button>
        <button
          onClick={handlePlayPause}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-b from-sky-400/20 to-sky-500/10 shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-[#00233a]" />
          ) : (
            <Play className="w-6 h-6 text-[#00233a] ml-1" />
          )}
        </button>
        <button onClick={() => handleSkip(30)} className="p-2 bg-white/5 rounded-full">
          <SkipForward />
        </button>
      </div>

      {/* Progress Bar */}
      <div>
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="w-full accent-sky-400"
        />
        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback Speed */}
      <div className="flex justify-center gap-2 mt-3">
        {[0.5, 1, 1.5, 2].map((rate) => (
          <button
            key={rate}
            onClick={() => handlePlaybackRate(rate)}
            className={`px-3 py-1 text-xs rounded ${
              playbackRate === rate ? "bg-[#2fb2ff] text-[#0b1444]" : "bg-white/5 text-white/70"
            }`}
          >
            {rate}x
          </button>
        ))}
      </div>

      <audio ref={audioRef} preload="metadata">
        <source src={src} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default PodcastPlayer;
