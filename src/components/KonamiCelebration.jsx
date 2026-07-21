import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function KonamiCelebration({ onDismiss }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ffffff'];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.95 + Math.random() * 0.03,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.15; // gravity
        particle.vx *= particle.decay;
        particle.vy *= particle.decay;
        particle.alpha -= 0.008;

        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    // Auto-dismiss after 4 seconds
    const timeoutId = setTimeout(() => {
      onDismiss?.();
    }, 4000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div 
          onClick={onDismiss}
          className="text-center cursor-pointer"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎉 You found the secret!
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-md">
            This site was handcrafted with intention.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            (Click to dismiss)
          </p>
        </div>
      </div>
    </div>
  );
}
