"use client";
import React, { useEffect, useRef } from 'react';

// Easily customizable parameters
const COLORS = ['#162447', '#fbb034', '#fff']; // blue, gold, white
const PARTICLE_COUNT = 70; // density
const SPEED = 0.7; // movement speed multiplier

function randomBetween(a: number, b: number) {
    return a + Math.random() * (b - a);
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particles = useRef<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return; // Add null check for ctx
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        function resize() {
            const currentCanvas = canvasRef.current;
            if (!currentCanvas) return; // Check canvasRef.current directly in resize
            width = window.innerWidth;
            height = window.innerHeight;
            currentCanvas.width = width;
            currentCanvas.height = height;
        }
        window.addEventListener('resize', resize);

        // Particle definition
        function createParticle() {
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            return {
                x: randomBetween(0, width),
                y: randomBetween(0, height),
                vx: randomBetween(-1, 1) * SPEED,
                vy: randomBetween(-1, 1) * SPEED,
                radius: randomBetween(1.5, 4.5),
                color,
            };
        }

        // Initialize particles
        particles.current = Array.from({ length: PARTICLE_COUNT }, createParticle);

        function draw() {
            ctx!.clearRect(0, 0, width, height);
            // Draw lines between close particles
            for (let i = 0; i < particles.current.length; i++) {
                const p1 = particles.current[i];
                for (let j = i + 1; j < particles.current.length; j++) {
                    const p2 = particles.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx!.save();
                        ctx!.strokeStyle = 'rgba(255,255,255,' + (1 - dist / 120) * 0.18 + ')';
                        ctx!.lineWidth = 1.2;
                        ctx!.beginPath();
                        ctx!.moveTo(p1.x, p1.y);
                        ctx!.lineTo(p2.x, p2.y);
                        ctx!.stroke();
                        ctx!.restore();
                    }
                }
            }
            // Draw particles
            for (const p of particles.current) {
                ctx!.save();
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx!.fillStyle = p.color;
                ctx!.shadowColor = p.color;
                ctx!.shadowBlur = 8;
                ctx!.fill();
                ctx!.restore();
            }
        }

        function animate() {
            for (const p of particles.current) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            }
            draw();
            animationRef.current = requestAnimationFrame(animate);
        }
        animate();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationRef.current!);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -100,
                pointerEvents: 'none',
                background: 'transparent',
            }}
            aria-hidden="true"
        />
    );
}
