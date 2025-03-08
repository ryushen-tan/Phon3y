import { useState } from 'react';

export const useAudioTranscription = () => {
    const [transcription, setTranscription] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const postAudio = async (audio: Blob | null): Promise<void> => {
        if (audio) {
            try {
                const wavBlob = await convertWebMToWav(audio);
                const formData = new FormData();
                formData.append('audio', wavBlob, 'recording.wav');
                const response = await fetch("https://b522-184-145-158-110.ngrok-free.app/transcribe", {
                    method: "POST",
                    body: formData, 
                    headers: {
                      "Accept": "application/json"
                    },
                    mode: "cors"  // Ensure CORS mode is enabled
                  });

                const data: { transcription: string } = await response.json();
                setTranscription(data.transcription);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError('Error: ' + err.message);
                } else {
                    setError('An unknown error occurred');
                }
                console.error('Error:', err);
            }
        }
    };

    return { transcription, error, postAudio };
};

// Function to convert WebM blob to WAV
const convertWebMToWav = async (webmBlob: Blob): Promise<Blob> => {
    const audioContext = new AudioContext();
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create an offline audio context to export WAV
    const offlineContext = new OfflineAudioContext({
        numberOfChannels: audioBuffer.numberOfChannels,
        length: audioBuffer.length,
        sampleRate: audioBuffer.sampleRate
    });

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const renderedBuffer = await offlineContext.startRendering();
    return audioBufferToWav(renderedBuffer);
};

// Convert audio buffer to WAV Blob
const audioBufferToWav = (audioBuffer: AudioBuffer): Blob => {
    const numOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const numSamples = audioBuffer.length * numOfChannels;
    const bytesPerSample = 2;
    const blockAlign = numOfChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const buffer = new ArrayBuffer(44 + numSamples * bytesPerSample);
    const view = new DataView(buffer);

    // RIFF Chunk
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + numSamples * bytesPerSample, true);
    writeString(view, 8, 'WAVE');

    // Format Chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);

    // Data Chunk
    writeString(view, 36, 'data');
    view.setUint32(40, numSamples * bytesPerSample, true);

    // Write audio data
    let offset = 44;
    for (let ch = 0; ch < numOfChannels; ch++) {
        const channelData = audioBuffer.getChannelData(ch);
        for (let i = 0; i < channelData.length; i++, offset += 2) {
            const sample = Math.max(-1, Math.min(1, channelData[i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        }
    }

    return new Blob([buffer], { type: 'audio/wav' });
};

// Helper function to write strings
const writeString = (view: DataView, offset: number, string: string): void => {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
};

