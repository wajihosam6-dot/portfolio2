import { useEffect, useRef } from 'react';

export default function AmbientSound() {
  const activated = useRef(false);

  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let gain: GainNode | null = null;
    let lfo: OscillatorNode | null = null;

    const activate = () => {
      if (activated.current) return;
      activated.current = true;

      try {
        audioCtx = new AudioContext();

        osc = audioCtx.createOscillator();
        gain = audioCtx.createGain();
        lfo = audioCtx.createOscillator();

        osc.type = 'sine';
        osc.frequency.value = 48;

        lfo.type = 'sine';
        lfo.frequency.value = 0.3;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 6;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        gain.gain.value = 0.03;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
      } catch {
        // Audio not supported
      }
    };

    const onScroll = () => {
      if (!gain || !audioCtx || audioCtx.state === 'suspended') return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      gain.gain.linearRampToValueAtTime(0.015 + progress * 0.025, audioCtx.currentTime + 0.5);
    };

    window.addEventListener('click', activate, { once: true });
    window.addEventListener('touchstart', activate, { once: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('click', activate);
      window.removeEventListener('touchstart', activate);
      window.removeEventListener('scroll', onScroll);
      try { lfo?.stop(); } catch {}
      try { osc?.stop(); } catch {}
      audioCtx?.close().catch(() => {});
    };
  }, []);

  return null;
}
