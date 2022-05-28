// https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks

import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';
import Image from 'next/image'

const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { title, artist, color, image, audioSrc } = tracks[trackIndex];
    const { duration } = audioRef.current;

    useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
          startTimer();
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

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
    
        intervalRef.current = setInterval(() => {
          if (audioRef.current.ended) {
            toNextTrack();
          } else {
            setTrackProgress(audioRef.current.currentTime);
          }
      }, [1000]);
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Image
              src={image}
              width={40}
              height={40}
			      />
            <span style={{paddingLeft: '7px'}}><strong>{title}</strong> {artist}</span>
            <AudioControls
                isPlaying={isPlaying}
                onPrevClick={toPrevTrack}
                onNextClick={toNextTrack}
                onPlayPauseClick={setIsPlaying}
            />
            <span style={{paddingLeft: '5px', paddingRight: '5px'}}><span className="grey">|</span> {duration}</span>
        </div>
    );
}

export default AudioPlayer;