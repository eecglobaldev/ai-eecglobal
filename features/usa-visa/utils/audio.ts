// Base64 decoding function
function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// Raw PCM to WAV conversion for iOS compatibility
function pcmToWav(pcmData: Uint8Array, sampleRate: number, numChannels: number): Blob {
    const dataInt16 = new Int16Array(pcmData.buffer);
    //   const frameCount = dataInt16.length / numChannels;

    // WAV header
    const buffer = new ArrayBuffer(44 + dataInt16.length * 2);
    const view = new DataView(buffer);

    // RIFF header
    const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataInt16.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, 1, true); // audio format (PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true); // byte rate
    view.setUint16(32, numChannels * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    writeString(36, 'data');
    view.setUint32(40, dataInt16.length * 2, true);

    // Convert PCM data
    const offset = 44;
    for (let i = 0; i < dataInt16.length; i++) {
        view.setInt16(offset + i * 2, dataInt16[i], true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
}

// Singleton AudioContext (fallback for non-iOS)
let audioContext: AudioContext | null = null;
const getAudioContext = (): AudioContext | null => {
    try {
        if (!audioContext || audioContext.state === 'closed') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            audioContext = new AudioContext({ sampleRate: 24000 });
        }
        return audioContext;
    } catch (error) {
        return null;
    }
};

// Detect iOS
// Note: navigator.platform is deprecated but useful for older detection. 
// Ideally feature detection is better, but keeping original logic for stability.
const isIOS = typeof navigator !== 'undefined' && (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

// Main playback function - iOS compatible
export const playAudio = async (base64Audio: string): Promise<void> => {
    try {
        // For iOS, use HTML5 Audio with WAV blob
        if (isIOS) {
            const decodedData = decode(base64Audio);
            const wavBlob = pcmToWav(decodedData, 24000, 1);
            const audioUrl = URL.createObjectURL(wavBlob);

            const audio = new Audio(audioUrl);
            audio.preload = 'auto';

            // Clean up URL after playback
            audio.addEventListener('ended', () => {
                URL.revokeObjectURL(audioUrl);
            });

            // Handle errors
            audio.addEventListener('error', (e) => {
                console.error("Audio playback error:", e);
                URL.revokeObjectURL(audioUrl);
            });

            // Play audio
            await audio.play();
            return;
        }

        // For non-iOS, try Web Audio API first, fallback to HTML5 Audio
        const ctx = getAudioContext();
        if (ctx) {
            try {
                if (ctx.state === 'suspended') {
                    await ctx.resume();
                }

                // Convert PCM to AudioBuffer
                const dataInt16 = new Int16Array(decode(base64Audio).buffer);
                const frameCount = dataInt16.length;
                const buffer = ctx.createBuffer(1, frameCount, 24000);
                const channelData = buffer.getChannelData(0);

                for (let i = 0; i < frameCount; i++) {
                    channelData[i] = dataInt16[i] / 32768.0;
                }

                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.start();
                return;
            } catch (webAudioError) {
                // Fallback to HTML5 Audio if Web Audio API fails
                console.warn("Web Audio API failed, falling back to HTML5 Audio:", webAudioError);
            }
        }

        // Fallback: Use HTML5 Audio with WAV blob
        const decodedData = decode(base64Audio);
        const wavBlob = pcmToWav(decodedData, 24000, 1);
        const audioUrl = URL.createObjectURL(wavBlob);

        const audio = new Audio(audioUrl);
        audio.preload = 'auto';

        audio.addEventListener('ended', () => {
            URL.revokeObjectURL(audioUrl);
        });

        audio.addEventListener('error', (e) => {
            console.error("Audio playback error:", e);
            URL.revokeObjectURL(audioUrl);
        });

        await audio.play();
    } catch (error) {
        console.error("Failed to play audio:", error);
    }
};
