import { computed, readonly, ref } from "vue";
import { formatTime } from "./helplers.ts";

interface Track {
  author: string;
  created_at: string;
  description: string;
  download_url: string;
  duration: number;
  genre: string;
  id: number;
  pack_id: number;
  size: number;
  title: string;
  updated_at: string;
}

const currentTrack = ref<Track | null>(null);
const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const isLoading = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const error = ref<string | null>(null);

//список всех треков и текущий индекс
const playlist = ref<Track[]>([]);
const currentTrackIndex = ref(-1);

export const useAudioPlayer = () => {
  const formattedCurrentTime = computed(() => formatTime(currentTime.value));
  const formattedDuration = computed(() => formatTime(duration.value));
  const progress = computed(() => {
    if (!duration.value) return 0;
    return (currentTime.value / duration.value) * 100;
  });

  //проверка наличия prev/next треков
  const hasPrevTrack = computed(() => currentTrackIndex.value > 0);
  const hasNextTrack = computed(() => {
    return currentTrackIndex.value >= 0 && currentTrackIndex.value < playlist.value.length - 1;
  });

  const cleanup = () => {
    if (audio.value) {
      audio.value.pause();
      audio.value.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.value.removeEventListener("timeupdate", handleTimeUpdate);
      audio.value.removeEventListener("ended", handleEnded);
      audio.value.removeEventListener("error", handleError);
      audio.value = null;
    }
  };

  const handleLoadedMetadata = () => {
    if (audio.value) {
      duration.value = audio.value.duration;
      isLoading.value = false;
      error.value = null;
      console.log("Track loaded successfully, duration:", duration.value);
    }
  };

  const handleTimeUpdate = () => {
    if (audio.value) {
      currentTime.value = audio.value.currentTime;
    }
  };

  const handleEnded = () => {
    isPlaying.value = false;
    currentTime.value = 0;

    // НОВОЕ: Автоматически играем следующий трек
    if (hasNextTrack.value) {
      playNextTrack();
    }
  };

  const handleError = (e: Event) => {
    console.error("Audio error:", e);
    const audioEl = e.target as HTMLAudioElement;
    let errorMsg = "Ошибка загрузки аудио";

    if (audioEl.error) {
      switch (audioEl.error.code) {
        case 1:
          errorMsg = "Загрузка прервана";
          break;
        case 2:
          errorMsg = "Ошибка сети";
          break;
        case 3:
          errorMsg = "Ошибка декодирования";
          break;
        case 4:
          errorMsg = "Формат не поддерживается";
          break;
      }
    }

    error.value = errorMsg;
    isLoading.value = false;
    isPlaying.value = false;
  };

  // установка плейлиста
  const setPlaylist = (tracks: Track[]) => {
    playlist.value = tracks;
  };

  // найти индекс трека в плейлисте
  const findTrackIndex = (trackId: number): number => {
    return playlist.value.findIndex((track) => track.id === trackId);
  };

  // Загрузка аудио (БЕЗ fetch - url напрямую)
  const loadTrack = async (track: Track): Promise<void> => {
    try {
      if (currentTrack.value?.id === track.id && audio.value) {
        return;
      }

      isLoading.value = true;
      error.value = null;
      cleanup();

      currentTrack.value = track;

      currentTrackIndex.value = findTrackIndex(track.id);

      console.log("Loading track:", track.title, track.download_url);

      // audio напрямую с url
      audio.value = new Audio();
      audio.value.crossOrigin = "anonymous"; //это возможно потом убрать, для CORS штука
      audio.value.volume = volume.value;
      audio.value.preload = "metadata";

      audio.value.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.value.addEventListener("timeupdate", handleTimeUpdate);
      audio.value.addEventListener("ended", handleEnded);
      audio.value.addEventListener("error", handleError);

      audio.value.src = track.download_url;

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Timeout loading audio metadata"));
        }, 5000);

        const onLoad = () => {
          clearTimeout(timeout);
          resolve();
        };

        const onError = (e: Event) => {
          clearTimeout(timeout);
          reject(e);
        };

        audio.value!.addEventListener("loadedmetadata", onLoad, { once: true });
        audio.value!.addEventListener("error", onError, { once: true });
        audio.value!.addEventListener("canplay", onLoad, { once: true });
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Неизвестная ошибка";
      console.error("Error loading track:", errorMessage, err);
      error.value = `Не удалось загрузить трек`;
      isLoading.value = false;
      cleanup();
      throw err;
    }
  };

  const play = async (): Promise<void> => {
    if (!audio.value) return;
    try {
      await audio.value.play();
      isPlaying.value = true;
      error.value = null;
    } catch (err) {
      console.error("Error playing audio:", err);
      error.value = "Ошибка воспроизведения";
      isPlaying.value = false;
    }
  };

  const pause = () => {
    if (!audio.value) return;
    audio.value.pause();
    isPlaying.value = false;
  };

  const togglePlay = async (): Promise<void> => {
    if (isPlaying.value) {
      pause();
    } else {
      await play();
    }
  };

  const playTrack = async (track: Track): Promise<void> => {
    try {
      await loadTrack(track);
      await play();
    } catch (err) {
      console.error("Error playing track:", err);
    }
  };

  // предыдущий трек
  const playPrevTrack = async (): Promise<void> => {
    if (!hasPrevTrack.value) return;

    const prevTrack = playlist.value[currentTrackIndex.value - 1];
    if (prevTrack) {
      await playTrack(prevTrack);
    }
  };

  // следующий трек
  const playNextTrack = async (): Promise<void> => {
    if (!hasNextTrack.value) return;

    const nextTrack = playlist.value[currentTrackIndex.value + 1];
    if (nextTrack) {
      await playTrack(nextTrack);
    }
  };

  const seek = (timeInSeconds: number) => {
    if (!audio.value) return;
    audio.value.currentTime = timeInSeconds;
  };

  const seekToPercent = (percent: number) => {
    if (!audio.value || !duration.value) return;
    const time = (percent / 100) * duration.value;
    seek(time);
  };

  const setVolume = (value: number) => {
    volume.value = Math.max(0, Math.min(1, value));
    if (audio.value) {
      audio.value.volume = volume.value;
    }
  };

  const isTrackPlaying = (trackId: number): boolean => {
    return currentTrack.value?.id === trackId && isPlaying.value;
  };

  const isTrackCurrent = (trackId: number): boolean => {
    return currentTrack.value?.id === trackId;
  };

  return {
    //readonly для предотвращения прямой модификации
    currentTrack: readonly(currentTrack),
    isPlaying: readonly(isPlaying),
    isLoading: readonly(isLoading),
    currentTime: readonly(currentTime),
    duration: readonly(duration),
    volume: readonly(volume),
    error: readonly(error),
    hasPrevTrack: readonly(hasPrevTrack),
    hasNextTrack: readonly(hasNextTrack),

    formattedCurrentTime,
    formattedDuration,
    progress,

    setPlaylist,
    loadTrack,
    play,
    pause,
    togglePlay,
    playTrack,
    playPrevTrack,
    playNextTrack,
    seek,
    seekToPercent,
    setVolume,
    isTrackPlaying,
    isTrackCurrent,
    cleanup,
  };
};
