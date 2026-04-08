/* ─── PARTICLE CANVAS ─── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

const COLORS = [[124, 58, 237], [6, 182, 212], [236, 72, 153], [79, 70, 229], [167, 139, 250]];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => { resize(); initParticles(); });
resize();

class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : H + 20;
        this.r = 0.8 + Math.random() * 2.8;
        this.speed = 0.12 + Math.random() * 0.35;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.life = 0;
        this.maxL = 200 + Math.random() * 500;
        this.c = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.phase = Math.random() * Math.PI * 2;
    }
    update() {
        this.y -= this.speed;
        this.x += this.vx;
        this.life++;
        this.phase += 0.025;
        const p = this.life / this.maxL;
        let o = p < 0.2 ? p / 0.2 : p > 0.8 ? (1 - p) / 0.2 : 1;
        this.opacity = o * 0.55 * (0.6 + 0.4 * Math.sin(this.phase));
        if (this.life >= this.maxL || this.y < -20) this.reset();
    }
    draw() {
        const [r, g, b] = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity.toFixed(2)})`;
        ctx.fill();
    }
}

function initParticles() {
    const n = Math.min(Math.floor(W * H / 8000), 140);
    particles = Array.from({ length: n }, () => new Particle());
}

function drawConnections() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.hypot(dx, dy);
            if (d < maxDist) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(167,139,250,${((1 - d / maxDist) * 0.055).toFixed(3)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

initParticles();
animate();

/* ─── TWITCH EFFECT ─── */
const headline = document.getElementById('headline');
setInterval(() => {
    headline.classList.add('twitch');
    setTimeout(() => {
        headline.classList.remove('twitch');
    }, 300);
}, 5000);

/* ─── TYPEWRITER EFFECT ─── */
const tagline = document.getElementById('tagline-typewriter');
const phrases = ["GenZ for Mentor", "Mentor for GenZ"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        tagline.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        tagline.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

window.addEventListener('DOMContentLoaded', type);

/* ─── PREMIMUM BREWING PARTICLES ─── */
const premiumContainer = document.querySelector('.premium-container');
function createBrewParticle() {
    const particle = document.createElement('div');
    particle.className = 'brew-particle';
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 120 + 40}px`;
    particle.style.bottom = '80px';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    const duration = Math.random() * 2 + 2;
    particle.style.animationDuration = `${duration}s`;
    
    // Gradient color
    const colors = ['#67e8f9', '#a78bfa', '#f9a8d4'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    premiumContainer.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
}

setInterval(createBrewParticle, 200);

/* ─── MOUSE PARALLAX ─── */
document.addEventListener('mousemove', e => {
    const mx = (e.clientX / W - 0.5) * 25;
    const my = (e.clientY / H - 0.5) * 25;
    document.querySelectorAll('.orb').forEach((orb, i) => {
        const f = (i + 1) * 0.3;
        orb.style.transform = `translate(${mx * f}px, ${my * f}px)`;
    });
});

/* ─── FORM HANDLER ─── */
window.handleNotify = function(e) {
    e.preventDefault();
    const btn = document.getElementById('notifyBtn');
    const msg = document.getElementById('successMsg');
    const input = document.getElementById('emailInput');
    
    btn.textContent = '✓ Welcome!';
    btn.style.background = 'linear-gradient(135deg, #059669, #0d9488)';
    btn.disabled = true;
    input.disabled = true;
    msg.style.display = 'block';
    
    // Optional: send to your backend here
};
