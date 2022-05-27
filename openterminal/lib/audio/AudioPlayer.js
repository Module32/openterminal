// https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks

import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';

const AudioPlayer = ({ tracks }) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
    }, [isPlaying]);
    useEffect(() => {
        return () => {
          audioRef.current.pause();
          clearInterval(intervalRef.current);
        }
      }, []);

      useEffect(() => {
        audioRef.current.pause();
      
        audioRef.current = new Audio(audioSrc);
          setTrackProgress(audioRef.current.currentTime);
      
        if (isReady.current) {
          audioRef.current.play();
          setIsPlaying(true);
          startTimer();
        } else {
          // Set the isReady ref as true for the next pass
          isReady.current = true;
        }
      }, [trackIndex]);

    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { title, artist, color, image, audioSrc } = tracks[trackIndex];
    const { duration } = audioRef.current;

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }
    
    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Image
              src={image}
              width={40}
              height={40}
			      />
            <span><strong>{title}</strong> {artist}</span>
            <AudioControls
                isPlaying={isPlaying}
                onPrevClick={toPrevTrack}
                onNextClick={toNextTrack}
                onPlayPauseClick={setIsPlaying}
            />
        </div>
    );
}

export default AudioPlayer;