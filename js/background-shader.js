// Eventurion Dynamic Interactive WebGL Celestial Background Shader
// Astrological Rings, Fluid Temporal Motion & Constellation Veins
(function() {
  function initShader() {
    const canvas = document.getElementById('shader-canvas-ANIMATION_5');
    if (!canvas) return;

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    function syncSize() {
      const w = window.innerWidth || canvas.clientWidth || 1280;
      const h = window.innerHeight || canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(syncSize).observe(canvas);
    }
    window.addEventListener('resize', syncSize);
    syncSize();

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' }) || 
               canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn("WebGL not supported for background shader.");
      return;
    }

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

// Simplex/Hash helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.52;
    mat2 rot = mat2(cos(0.48), sin(0.48), -sin(0.48), cos(0.48));
    for (int i = 0; i < 5; ++i) {
        total += amp * snoise(p);
        p = rot * p * 2.05 + vec2(12.4, 7.8);
        amp *= 0.5;
    }
    return total;
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    // Smooth responsive mouse coordinates
    vec2 normMouse = u_mouse / u_resolution;
    vec2 mOffset = (normMouse - 0.5) * 0.45;
    p -= mOffset * 0.35;

    float t = u_time * 0.12;

    // Multi-layered domain warp for mystical fluid celestial motion
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + vec2(t * 0.3, t * 0.2)),
                  fbm(p + vec2(5.2, 1.3) - vec2(t * 0.25, t * 0.35)));

    vec2 r = vec2(fbm(p + 3.8 * q + vec2(1.7, 9.2) + 0.18 * t),
                  fbm(p + 3.8 * q + vec2(8.3, 2.8) - 0.14 * t));

    float f = fbm(p + 3.4 * r);

    // Dynamic Astrological / Chronological Ring Rays
    float dist = length(p);
    float angle = atan(p.y, p.x);
    
    // Pulsing astrolabe rings
    float ring1 = sin(dist * 28.0 - t * 2.4);
    ring1 = smoothstep(0.82, 0.99, ring1) * 0.25 * smoothstep(1.3, 0.2, dist);
    
    float ring2 = sin(dist * 14.0 + t * 1.5 + angle * 2.0);
    ring2 = smoothstep(0.85, 0.98, ring2) * 0.18;

    // Harmonic celestial rays radiating from temporal center
    float rays = sin(angle * 12.0 + t * 0.8 + f * 3.0) * 0.5 + 0.5;
    rays = pow(rays, 4.0) * 0.25 * smoothstep(1.2, 0.1, dist);

    // Color Palette: Rich Royal Indigo, Imperial Turquoise/Cyan, Luminous Saffron/Gold, and Regal Amethyst
    vec3 deepVoid    = vec3(0.015, 0.025, 0.065); // Deepest cosmic midnight
    vec3 royalIndigo = vec3(0.04, 0.10, 0.28);
    vec3 mysticCyan  = vec3(0.0, 0.65, 0.95);     // Glowing ancient turquoise
    vec3 imperialGold= vec3(0.98, 0.72, 0.24);    // Sacred sovereign gold
    vec3 mysticViolet= vec3(0.55, 0.15, 0.75);    // Spiritual dynasty amethyst
    vec3 celestialWhite = vec3(0.88, 0.96, 1.0);

    // Color blending driven by turbulence layers
    vec3 col = mix(deepVoid, royalIndigo, clamp(f * 1.4 + 0.3, 0.0, 1.0));
    col = mix(col, mysticCyan, clamp(pow(length(q), 2.2) * 1.5, 0.0, 1.0));
    col = mix(col, mysticViolet * 0.85, clamp(pow(r.y, 2.5) * 1.8, 0.0, 1.0));

    // Vibrant luminous golden veins
    float goldVein = smoothstep(0.35, 0.78, f * r.x);
    col += imperialGold * goldVein * 1.1;

    // Add astrolabe rings and glowing sun rays
    col += (ring1 + ring2) * mix(mysticCyan, imperialGold, 0.65) * 1.4;
    col += rays * imperialGold * 0.7;

    // Ambient center core glow
    float centerGlow = exp(-dist * 2.8) * 0.45;
    col += mix(mysticCyan, imperialGold, 0.5) * centerGlow;

    // Multi-scale twinkling stars & constellations
    float star1 = hash(floor(p * 55.0));
    if (star1 > 0.984) {
        float sparkle1 = sin(u_time * 4.0 + star1 * 80.0) * 0.5 + 0.5;
        col += celestialWhite * sparkle1 * 0.9;
    }
    float star2 = hash(floor(p * 90.0 + vec2(15.0, 32.0)));
    if (star2 > 0.991) {
        float sparkle2 = sin(u_time * 5.5 + star2 * 120.0) * 0.5 + 0.5;
        col += mix(mysticCyan, imperialGold, star2) * sparkle2 * 0.8;
    }

    // Radial atmospheric vignette for edge elegance
    float vignette = 1.0 - smoothstep(0.4, 1.45, dist);
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
}`;

    function cs(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("Shader error:", gl.getShaderInfoLog(s));
      }
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    }, { passive: true });

    function render(t) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShader);
  } else {
    initShader();
  }
})();
