import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackwardStep, faForwardStep, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

const AudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
}) => ( 
    <div style={{display: 'flex', alignItems: 'center'}}>
        <button
            type="button"
            className="neutral"
            onClick={onPrevClick}><FontAwesomeIcon icon={faBackwardStep} />
        </button>
        {isPlaying ? (
            <button
                type="button"
                className="neutral"
                onClick={() => onPlayPauseClick(false)}><FontAwesomeIcon icon={faPause} />
            </button>
        ) : (
            <button
                type="button"
                className="neutral"
                onClick={() => onPlayPauseClick(true)}><FontAwesomeIcon icon={faPlay} />
            </button>
        )}
        <button
            type="button"
            className="neutral"
            onClick={onNextClick}><FontAwesomeIcon icon={faForwardStep} />
        </button>
    </div>
)
  
export default AudioControls;