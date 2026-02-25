// ============================================
// FONDOS ANIMADOS - Grok x Claude
// Pega este código en un <script> al final de
// tu cap1.html, ANTES del </body>
// ============================================

const fondos = {

  // 🌌 ESPACIO ESTRELLADO - estrellas que brillan
  'tema-espacio': function(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.style.background = '#0b0014';
    const stars = Array.from({length: 200}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));
    return function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0b0014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });
    };
  },

  // 🌧️ CYBER LLUVIA - lluvia de neón verde/cyan
  'tema-cyber': function(canvas) {
    const ctx = canvas.getContext('2d');
    const cols = Math.floor(canvas.width / 18);
    const drops = Array.from({length: cols}, () => Math.random() * -canvas.height);
    const chars = '01アイウエオカキクケコGROKCLAUDE<>{}[]';
    let frameTick = 0;
    return function animate() {
      frameTick++;
      // Solo actualiza cada 4 frames = caída más lenta
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18;
        ctx.fillStyle = '#0ff';
        ctx.fillText(char, x, y);
        ctx.fillStyle = '#0f0';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - 20);
        if (frameTick % 4 === 0) {
          drops[i] = y > canvas.height + 20 ? -20 : y + 18;
        }
      });
    };
  },

  // 🎮 PIXEL NIGHT - ciudad pixelada con luces brillantes
  'tema-pixelnight': function(canvas) {
    const ctx = canvas.getContext('2d');
    const BW = 12; // ancho de cada bloque de edificio
    const numBuildings = Math.ceil(canvas.width / BW);
    const rows = Math.ceil(canvas.height / BW);
    const buildings = Array.from({length: numBuildings}, (_, i) => ({
      width: Math.floor(Math.random() * 3 + 2) * BW, // edificios de 2-4 bloques de ancho
      height: Math.floor(Math.random() * (rows * 0.55) + rows * 0.15),
      x: 0, // se calcula abajo
      windows: []
    }));
    // Posicionar edificios juntos
    let curX = 0;
    buildings.forEach(b => { b.x = curX; curX += b.width + 1; });
    buildings.forEach(b => {
      for (let r = 0; r < b.height; r++) {
        const row = [];
        for (let c = 0; c < b.width / BW; c++) {
          row.push(Math.random() > 0.45);
        }
        b.windows.push(row);
      }
    });
    let tick = 0;
    return function animate() {
      tick++;
      // Cielo nocturno con degradado
      const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
      sky.addColorStop(0, '#000010');
      sky.addColorStop(0.6, '#000428');
      sky.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Luna con halo
      const moonX = canvas.width * 0.82, moonY = canvas.height * 0.12;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 60);
      moonGlow.addColorStop(0, 'rgba(255,255,200,0.3)');
      moonGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(moonX, moonY, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#fffff0';
      ctx.shadowColor = '#ffffaa';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
      // Edificios
      buildings.forEach(b => {
        const bTop = canvas.height - b.height * BW;
        // Silueta del edificio
        ctx.fillStyle = '#08081e';
        ctx.fillRect(b.x, bTop, b.width, b.height * BW);
        // Borde sutil
        ctx.strokeStyle = '#1a1a3e';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x, bTop, b.width, b.height * BW);
        // Ventanas pequeñas y brillantes
        b.windows.forEach((row, ri) => {
          row.forEach((lit, ci) => {
            const wx = b.x + ci * BW + 2;
            const wy = canvas.height - (ri + 1) * BW + 2;
            const wSize = BW - 4; // ventanas más pequeñas
            if (lit && (tick + b.x + ri + ci) % 180 > 8) {
              const colors = [
                ['#ffe88a', '#ffcc00'],
                ['#a8e6ff', '#4ecdc4'],
                ['#ffb3b3', '#ff6b6b'],
                ['#ffffff', '#ddddff']
              ];
              const c = colors[(b.x + ri + ci) % colors.length];
              // Brillo exterior (glow)
              ctx.shadowColor = c[0];
              ctx.shadowBlur = 6;
              ctx.fillStyle = c[0];
              ctx.fillRect(wx, wy, wSize, wSize);
              // Centro más brillante
              ctx.shadowBlur = 0;
              ctx.fillStyle = c[1];
              ctx.fillRect(wx + 1, wy + 1, wSize - 2, wSize - 2);
            } else if (!lit) {
              // Ventana apagada muy oscura
              ctx.fillStyle = 'rgba(20,20,40,0.8)';
              ctx.fillRect(wx, wy, wSize, wSize);
            }
          });
        });
      });
      // Reflexión en el suelo
      ctx.fillStyle = 'rgba(0,4,40,0.95)';
      ctx.fillRect(0, canvas.height * 0.88, canvas.width, canvas.height * 0.12);
      // Línea de horizonte sutil
      ctx.strokeStyle = 'rgba(100,100,200,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.88);
      ctx.lineTo(canvas.width, canvas.height * 0.88);
      ctx.stroke();
    };
  },

  // 🌅 ATARDECER TEJADO - siluetas de templos japoneses
  'tema-atardecer': function(canvas) {
    const ctx = canvas.getContext('2d');
    let t = 0;

    function dibujarTemploJapones(cx, baseY, escala) {
      ctx.fillStyle = '#0a0000';
      ctx.strokeStyle = '#0a0000';
      ctx.lineWidth = 1;
      const s = escala;

      // Base/plataforma del templo
      ctx.fillRect(cx - 55*s, baseY - 12*s, 110*s, 12*s);

      // Cuerpo principal
      ctx.fillRect(cx - 35*s, baseY - 60*s, 70*s, 48*s);

      // Piso 2
      ctx.fillRect(cx - 25*s, baseY - 95*s, 50*s, 35*s);

      // Piso 3 (más pequeño)
      ctx.fillRect(cx - 15*s, baseY - 120*s, 30*s, 25*s);

      // Tejado nivel 1 - curvo estilo japonés
      ctx.beginPath();
      ctx.moveTo(cx - 65*s, baseY - 60*s);
      ctx.quadraticCurveTo(cx - 50*s, baseY - 75*s, cx - 35*s, baseY - 68*s);
      ctx.lineTo(cx + 35*s, baseY - 68*s);
      ctx.quadraticCurveTo(cx + 50*s, baseY - 75*s, cx + 65*s, baseY - 60*s);
      ctx.lineTo(cx + 55*s, baseY - 60*s);
      ctx.quadraticCurveTo(cx + 40*s, baseY - 70*s, cx + 30*s, baseY - 64*s);
      ctx.lineTo(cx - 30*s, baseY - 64*s);
      ctx.quadraticCurveTo(cx - 40*s, baseY - 70*s, cx - 55*s, baseY - 60*s);
      ctx.closePath();
      ctx.fill();

      // Tejado nivel 2
      ctx.beginPath();
      ctx.moveTo(cx - 45*s, baseY - 95*s);
      ctx.quadraticCurveTo(cx - 35*s, baseY - 108*s, cx - 22*s, baseY - 102*s);
      ctx.lineTo(cx + 22*s, baseY - 102*s);
      ctx.quadraticCurveTo(cx + 35*s, baseY - 108*s, cx + 45*s, baseY - 95*s);
      ctx.lineTo(cx + 38*s, baseY - 95*s);
      ctx.quadraticCurveTo(cx + 28*s, baseY - 104*s, cx + 18*s, baseY - 99*s);
      ctx.lineTo(cx - 18*s, baseY - 99*s);
      ctx.quadraticCurveTo(cx - 28*s, baseY - 104*s, cx - 38*s, baseY - 95*s);
      ctx.closePath();
      ctx.fill();

      // Tejado nivel 3
      ctx.beginPath();
      ctx.moveTo(cx - 28*s, baseY - 120*s);
      ctx.quadraticCurveTo(cx - 18*s, baseY - 132*s, cx - 10*s, baseY - 127*s);
      ctx.lineTo(cx + 10*s, baseY - 127*s);
      ctx.quadraticCurveTo(cx + 18*s, baseY - 132*s, cx + 28*s, baseY - 120*s);
      ctx.lineTo(cx + 22*s, baseY - 120*s);
      ctx.quadraticCurveTo(cx + 14*s, baseY - 128*s, cx + 8*s, baseY - 124*s);
      ctx.lineTo(cx - 8*s, baseY - 124*s);
      ctx.quadraticCurveTo(cx - 14*s, baseY - 128*s, cx - 22*s, baseY - 120*s);
      ctx.closePath();
      ctx.fill();

      // Aguja/spire en la cima
      ctx.beginPath();
      ctx.moveTo(cx - 3*s, baseY - 120*s);
      ctx.lineTo(cx, baseY - 150*s);
      ctx.lineTo(cx + 3*s, baseY - 120*s);
      ctx.fill();

      // Puerta del templo
      ctx.fillStyle = '#1a0505';
      ctx.fillRect(cx - 8*s, baseY - 30*s, 16*s, 30*s);
      ctx.fillStyle = '#0a0000';
    }

    function dibujarPagoda(cx, baseY, escala) {
      ctx.fillStyle = '#0a0000';
      const s = escala;
      // Torre pagoda de 5 pisos
      for (let i = 0; i < 5; i++) {
        const py = baseY - i * 28*s;
        const pw = (5 - i) * 14*s;
        ctx.fillRect(cx - pw/2, py - 28*s, pw, 20*s);
        // Tejadito por piso
        ctx.beginPath();
        ctx.moveTo(cx - pw/2 - 10*s, py - 8*s);
        ctx.quadraticCurveTo(cx - pw/2, py - 18*s, cx - pw/2 + 8*s, py - 12*s);
        ctx.lineTo(cx + pw/2 - 8*s, py - 12*s);
        ctx.quadraticCurveTo(cx + pw/2, py - 18*s, cx + pw/2 + 10*s, py - 8*s);
        ctx.lineTo(cx + pw/2 + 6*s, py - 8*s);
        ctx.quadraticCurveTo(cx + pw/2, py - 16*s, cx + pw/2 - 6*s, py - 10*s);
        ctx.lineTo(cx - pw/2 + 6*s, py - 10*s);
        ctx.quadraticCurveTo(cx - pw/2, py - 16*s, cx - pw/2 - 6*s, py - 8*s);
        ctx.closePath();
        ctx.fill();
      }
      // Aguja
      ctx.beginPath();
      ctx.moveTo(cx - 2*s, baseY - 140*s);
      ctx.lineTo(cx, baseY - 165*s);
      ctx.lineTo(cx + 2*s, baseY - 140*s);
      ctx.fill();
    }

    return function animate() {
      t += 0.002;
      const sunY = canvas.height * 0.38 + Math.sin(t) * 10;

      // Cielo negro→rojo→naranja
      const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
      sky.addColorStop(0, '#000000');
      sky.addColorStop(0.2, '#1a0000');
      sky.addColorStop(0.45, '#cc2200');
      sky.addColorStop(0.72, '#ff4500');
      sky.addColorStop(1, '#ff8c00');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Halo del sol
      const glow = ctx.createRadialGradient(canvas.width/2, sunY, 0, canvas.width/2, sunY, 130);
      glow.addColorStop(0, 'rgba(255,210,60,0.85)');
      glow.addColorStop(0.35, 'rgba(255,120,0,0.45)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sol
      ctx.beginPath();
      ctx.arc(canvas.width/2, sunY, 32, 0, Math.PI*2);
      ctx.fillStyle = '#ffee55';
      ctx.shadowColor = '#ffaa00';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Montañas/colinas en silueta al fondo
      ctx.fillStyle = '#1a0500';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(0, canvas.height * 0.65);
      ctx.quadraticCurveTo(canvas.width*0.15, canvas.height*0.45, canvas.width*0.25, canvas.height*0.6);
      ctx.quadraticCurveTo(canvas.width*0.38, canvas.height*0.38, canvas.width*0.5, canvas.height*0.55);
      ctx.quadraticCurveTo(canvas.width*0.62, canvas.height*0.4, canvas.width*0.72, canvas.height*0.58);
      ctx.quadraticCurveTo(canvas.width*0.85, canvas.height*0.42, canvas.width, canvas.height*0.62);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Suelo base
      ctx.fillStyle = '#0a0000';
      ctx.fillRect(0, canvas.height * 0.82, canvas.width, canvas.height * 0.18);

      // Templos y pagodas
      const baseY = canvas.height * 0.82;
      dibujarPagoda(canvas.width * 0.12, baseY, 0.7);
      dibujarTemploJapones(canvas.width * 0.3, baseY, 0.85);
      dibujarPagoda(canvas.width * 0.52, baseY, 0.55);
      dibujarTemploJapones(canvas.width * 0.7, baseY, 0.95);
      dibujarPagoda(canvas.width * 0.88, baseY, 0.65);

      // Cables finos
      ctx.strokeStyle = 'rgba(0,0,0,0.85)';
      ctx.lineWidth = 1.2;
      [[0.0,0.3,0.45,0.55],[0.3,0.25,0.75,0.5],[0.55,0.2,1.0,0.48]].forEach(([x1,y1,x2,y2]) => {
        ctx.beginPath();
        ctx.moveTo(canvas.width*x1, canvas.height*y1);
        ctx.quadraticCurveTo(canvas.width*((x1+x2)/2), canvas.height*((y1+y2)/2+0.1), canvas.width*x2, canvas.height*y2);
        ctx.stroke();
      });
    };
  },

  // 🌸 ANIME CLÁSICO - fondo rosa con pétalos rosa claro y oscuro
  'tema-anime': function(canvas) {
    const ctx = canvas.getContext('2d');
    // Pétalos grandes - rosa claro
    const petalosGrandes = Array.from({length: 35}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 14 + 8,
      speedX: Math.random() * 0.8 - 0.4,
      speedY: Math.random() * 0.8 + 0.4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      alpha: Math.random() * 0.5 + 0.4
    }));
    // Pétalos pequeños - rosa oscuro (para contrastar con el fondo)
    const petalosOscuros = Array.from({length: 50}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      speedX: Math.random() * 0.6 - 0.3,
      speedY: Math.random() * 1.2 + 0.6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.06,
      alpha: Math.random() * 0.6 + 0.4
    }));
    return function animate() {
      // Fondo rosa suave
      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, '#ffccd5');
      bg.addColorStop(0.4, '#ffb3c6');
      bg.addColorStop(0.7, '#ff85a1');
      bg.addColorStop(1, '#ff6b9d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      function dibujarPetalo(p, color, strokeColor) {
        p.x += p.speedX + Math.sin(p.y * 0.008) * 0.4;
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      // Primero los grandes (rosa muy claro, casi blanco)
      petalosGrandes.forEach(p => dibujarPetalo(p, '#ffe8ee', '#ffccd5'));
      // Encima los pequeños oscuros (rosa fucsia/oscuro)
      petalosOscuros.forEach(p => dibujarPetalo(p, '#c9184a', '#a4133c'));

      ctx.globalAlpha = 1;
    };
  }
};

// ============================================
// MOTOR PRINCIPAL - esto hace que todo funcione
// ============================================
let canvas = document.getElementById('bg-canvas');
if (!canvas) {
  canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.style.cssText = `
    position:fixed; top:0; left:0; width:100%; height:100%;
    z-index:-1; pointer-events:none;
  `;
  document.body.prepend(canvas);
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  activarFondo(temaActual);
});

let animFrame;
let temaActual = document.body.className || 'tema-anime';

function activarFondo(tema) {
  temaActual = tema;
  cancelAnimationFrame(animFrame);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (fondos[tema]) {
    const frame = fondos[tema](canvas);
    function loop() { frame(); animFrame = requestAnimationFrame(loop); }
    loop();
  }
}

// ============================================
// SISTEMA DE MÚSICA CON CROSSFADE
// ============================================

// URLs de música por tema (lofi/ambient de archive.org - gratis y sin copyright)
const musicaTemas = {
  'tema-espacio':    'sigmamusicart-space-ambient-background-music-462074.mp3',
  'tema-cyber':      'hitslab-cyberpunk-futuristic-cyberpunk-industrial-music-474697.mp3',
  'tema-pixelnight': 'inono777-chiptune-but-461573.mp3',
  'tema-atardecer':  'the_mountain-ambient-487008.mp3',
  'tema-anime':      'mondamusic-lofi-chill-487321.mp3',
};

let audioActual = null;
let audioSiguiente = null;
let volumenUsuario = 0.5; // 0 a 1
let crossfadeInterval = null;
let musicaInicializada = false;

function crearAudio(url) {
  const audio = new Audio();
  audio.loop = true;
  audio.volume = 0;
  audio.src = url;
  return audio;
}

function crossfadeTo(urlNueva) {
  if (!urlNueva) return;
  if (crossfadeInterval) clearInterval(crossfadeInterval);

  const audioViejo = audioActual;
  const audioNuevo = crearAudio(urlNueva);
  audioNuevo.play().catch(() => {}); // catch por políticas del navegador
  audioSiguiente = audioNuevo;

  const paso = 0.02;
  const velocidad = 60; // ms entre cada paso

  crossfadeInterval = setInterval(() => {
    // Bajar volumen del viejo
    if (audioViejo) {
      audioViejo.volume = Math.max(0, audioViejo.volume - paso);
    }
    // Subir volumen del nuevo
    if (audioNuevo.volume < volumenUsuario) {
      audioNuevo.volume = Math.min(volumenUsuario, audioNuevo.volume + paso);
    }
    // Cuando termine el crossfade
    if ((!audioViejo || audioViejo.volume <= 0) && audioNuevo.volume >= volumenUsuario) {
      if (audioViejo) { audioViejo.pause(); audioViejo.src = ''; }
      audioActual = audioNuevo;
      audioSiguiente = null;
      clearInterval(crossfadeInterval);
    }
  }, velocidad);
}

function iniciarMusica(tema) {
  const url = musicaTemas[tema];
  if (!url) return;
  if (!audioActual) {
    audioActual = crearAudio(url);
    audioActual.volume = volumenUsuario;
    audioActual.play().catch(() => {});
  } else {
    crossfadeTo(url);
  }
}

// ============================================
// CONTROL DE VOLUMEN EN EL MENÚ
// ============================================
function inyectarControlVolumen() {
  const menu = document.getElementById('menu');
  if (!menu || document.getElementById('vol-control')) return;

  const control = document.createElement('div');
  control.id = 'vol-control';
  control.style.cssText = `
    padding: 15px 20px;
    margin: 8px 0;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  `;
  control.innerHTML = `
    <div style="color:white; margin-bottom:8px; font-size:0.9em;">
      🎵 Volumen: <span id="vol-numero">50</span>%
    </div>
    <input type="range" id="vol-slider" min="0" max="100" value="50"
      style="width:100%; accent-color:#ff6b6b; cursor:pointer;">
    <div style="display:flex; justify-content:space-between; margin-top:8px;">
      <button onclick="toggleMusica()" id="btn-musica"
        style="background:#ff6b6b; color:white; border:none; padding:8px 14px;
               border-radius:8px; cursor:pointer; font-size:0.85em;">
        ▶ Activar música
      </button>
      <span style="color:rgba(255,255,255,0.5); font-size:0.75em; align-self:center;">
        por tema
      </span>
    </div>
  `;

  // Insertar después del hr del menú
  const hr = menu.querySelector('hr');
  if (hr) hr.after(control);
  else menu.appendChild(control);

  // Evento del slider
  document.getElementById('vol-slider').addEventListener('input', function() {
    volumenUsuario = this.value / 100;
    document.getElementById('vol-numero').textContent = this.value;
    if (audioActual) audioActual.volume = volumenUsuario;
    if (audioSiguiente) audioSiguiente.volume = volumenUsuario;
  });
}

window.toggleMusica = function() {
  const btn = document.getElementById('btn-musica');
  if (!musicaInicializada) {
    musicaInicializada = true;
    iniciarMusica(temaActual);
    if (btn) btn.textContent = '⏸ Pausar música';
  } else if (audioActual && !audioActual.paused) {
    audioActual.pause();
    if (btn) btn.textContent = '▶ Reanudar música';
  } else if (audioActual) {
    audioActual.play().catch(() => {});
    if (btn) btn.textContent = '⏸ Pausar música';
  }
};

// Sobrescribe la función cambiarTema original
window.cambiarTema = function(tema) {
  document.body.className = tema;
  activarFondo(tema);
  if (musicaInicializada) iniciarMusica(tema);
  // Cierra el menú si existe
  const menu = document.getElementById('menu');
  const overlay = document.querySelector('.overlay');
  if (menu) menu.classList.remove('show');
  if (overlay) overlay.classList.remove('show');
};

// Arranca con el tema actual
activarFondo(temaActual);

// Inyecta el control de volumen cuando cargue el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inyectarControlVolumen);
} else {
  inyectarControlVolumen();
}