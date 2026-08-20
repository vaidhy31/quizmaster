
let canvas = null;
let ctx = null;
let animationId = null;
let timerId = null;
let running = false;
const rockets = [];
const particles = [];

function resize() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function launch() {
  rockets.push({
    x: window.innerWidth * (0.12 + Math.random() * 0.76),
    y: window.innerHeight + 10,
    targetY: window.innerHeight * (0.16 + Math.random() * 0.42),
    speed: 7 + Math.random() * 3,
    hue: Math.floor(Math.random() * 360)
  });
}

function explode(rocket) {
  const count = 45 + Math.floor(Math.random() * 30);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4.5;
    particles.push({
      x: rocket.x,
      y: rocket.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 45 + Math.random() * 35,
      maxLife: 80,
      hue: rocket.hue + (Math.random() * 40 - 20),
      size: 1.5 + Math.random() * 2
    });
  }
}

function draw() {
  if (!running) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i];
    r.y -= r.speed;

    ctx.beginPath();
    ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${r.hue} 95% 65%)`;
    ctx.fill();

    if (r.y <= r.targetY) {
      explode(r);
      rockets.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.045;
    p.vx *= 0.985;
    p.vy *= 0.985;
    p.life--;

    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue} 95% 65% / ${alpha})`;
    ctx.fill();
  }

  animationId = requestAnimationFrame(draw);
}

export function startFireworks(duration = 7000) {
  stopFireworks();

  canvas = document.createElement("canvas");
  canvas.className = "fireworks-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();

  window.addEventListener("resize", resize);
  running = true;
  draw();

  launch();
  timerId = setInterval(() => {
    launch();
    if (Math.random() > 0.35) {
      setTimeout(launch, 250 + Math.random() * 500);
    }
  }, 850);

  setTimeout(() => stopFireworks(), duration);
}

export function stopFireworks() {
  running = false;
  if (timerId) clearInterval(timerId);
  timerId = null;
  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;
  window.removeEventListener("resize", resize);
  rockets.length = 0;
  particles.length = 0;
  if (canvas) canvas.remove();
  canvas = null;
  ctx = null;
}
