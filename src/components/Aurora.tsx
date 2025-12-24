// import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
// import { useEffect, useRef } from "react";

// const VERT = `#version 300 es
// in vec2 position;
// void main() {
//   gl_Position = vec4(position, 0.0, 1.0);
// }
// `;

// const FRAG = `#version 300 es
// precision highp float;

// uniform float uTime;
// uniform float uAmplitude;
// uniform vec3 uColorStops[3];
// uniform vec2 uResolution;
// uniform float uBlend;
// uniform vec2 uMouse;

// out vec4 fragColor;

// /* ---------- Simplex Noise ---------- */
// vec3 permute(vec3 x) {
//   return mod(((x * 34.0) + 1.0) * x, 289.0);
// }

// float snoise(vec2 v){
//   const vec4 C = vec4(
//     0.211324865405187, 0.366025403784439,
//    -0.577350269189626, 0.024390243902439
//   );
//   vec2 i  = floor(v + dot(v, C.yy));
//   vec2 x0 = v - i + dot(i, C.xx);
//   vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
//   vec4 x12 = x0.xyxy + C.xxzz;
//   x12.xy -= i1;
//   i = mod(i, 289.0);

//   vec3 p = permute(
//     permute(i.y + vec3(0.0, i1.y, 1.0))
//     + i.x + vec3(0.0, i1.x, 1.0)
//   );

//   vec3 m = max(
//     0.5 - vec3(
//       dot(x0, x0),
//       dot(x12.xy, x12.xy),
//       dot(x12.zw, x12.zw)
//     ),
//     0.0
//   );
//   m = m * m;
//   m = m * m;

//   vec3 x = 2.0 * fract(p * C.www) - 1.0;
//   vec3 h = abs(x) - 0.5;
//   vec3 ox = floor(x + 0.5);
//   vec3 a0 = x - ox;

//   m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

//   vec3 g;
//   g.x  = a0.x  * x0.x  + h.x  * x0.y;
//   g.yz = a0.yz * x12.xz + h.yz * x12.yw;
//   return 130.0 * dot(m, g);
// }

// /* ---------- Color Ramp ---------- */
// struct ColorStop {
//   vec3 color;
//   float position;
// };

// #define COLOR_RAMP(colors, factor, finalColor) {              \
//   int index = 0;                                             \
//   for (int i = 0; i < 2; i++) {                               \
//     ColorStop current = colors[i];                           \
//     index = int(mix(float(index), float(i),                  \
//       float(current.position <= factor)));                  \
//   }                                                          \
//   ColorStop a = colors[index];                               \
//   ColorStop b = colors[index + 1];                           \
//   float t = (factor - a.position) / (b.position - a.position); \
//   finalColor = mix(a.color, b.color, t);                     \
// }

// void main() {
//   vec2 uv = gl_FragCoord.xy / uResolution;

//   /* Mouse parallax */
//   vec2 mouse = uMouse * 2.0 - 1.0;
//   uv.x += mouse.x * 0.08;
//   uv.y += mouse.y * 0.04;

//   ColorStop colors[3];
//   colors[0] = ColorStop(uColorStops[0], 0.0);
//   colors[1] = ColorStop(uColorStops[1], 0.5);
//   colors[2] = ColorStop(uColorStops[2], 1.0);

//   vec3 rampColor;
//   COLOR_RAMP(colors, uv.x, rampColor);

//   float n = snoise(vec2(
//     uv.x * 2.2 + uTime * 0.12,
//     uTime * 0.25
//   ));

//   float height = exp(n * 0.6 * uAmplitude);
//   height = (uv.y * 2.0 - height + 0.25);

//   float intensity = 0.65 * height;
//   float mid = 0.22;

//   float alpha = smoothstep(
//     mid - uBlend * 0.5,
//     mid + uBlend * 0.5,
//     intensity
//   );

//   vec3 color = intensity * rampColor;

//   fragColor = vec4(color * alpha, alpha);
// }
// `;

// export default function Aurora({
//   mode = "dark",
//   amplitude = 1.0,
//   blend = 0.5,
//   speed = 1.0,
// }) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const mouse = useRef([0.5, 0.5]);

//   useEffect(() => {
//     const container = ref.current!;
//     const renderer = new Renderer({ alpha: true, antialias: true });
//     const gl = renderer.gl;

//     gl.clearColor(0, 0, 0, 0);
//     gl.enable(gl.BLEND);
//     gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

//     const geometry = new Triangle(gl);

//     const dark = ["#5227FF", "#7CFF67", "#38E8FF"];
//     const light = ["#9CCBFF", "#C8FFD4", "#E6F9FF"];
//     const palette = (mode === "dark" ? dark : light).map(c => {
//       const col = new Color(c);
//       return [col.r, col.g, col.b];
//     });

//     const program = new Program(gl, {
//       vertex: VERT,
//       fragment: FRAG,
//       uniforms: {
//         uTime: { value: 0 },
//         uAmplitude: { value: amplitude },
//         uBlend: { value: blend },
//         uResolution: { value: [1, 1] },
//         uColorStops: { value: palette },
//         uMouse: { value: mouse.current },
//       },
//     });

//     const mesh = new Mesh(gl, { geometry, program });
//     container.appendChild(gl.canvas);

//     function resize() {
//       const dpr = Math.min(2, window.devicePixelRatio || 1);
//       const w = container.offsetWidth;
//       const h = container.offsetHeight;
//       renderer.setSize(w, h, dpr);
//       program.uniforms.uResolution.value = [w * dpr, h * dpr];
//     }

//     window.addEventListener("resize", resize);
//     resize();

//     window.addEventListener("mousemove", e => {
//       mouse.current = [
//         e.clientX / window.innerWidth,
//         1 - e.clientY / window.innerHeight,
//       ];
//       program.uniforms.uMouse.value = mouse.current;
//     });

//     let start = performance.now();
//     const loop = t => {
//       program.uniforms.uTime.value = (t - start) * 0.001 * speed;
//       renderer.render({ scene: mesh });
//       requestAnimationFrame(loop);
//     };
//     requestAnimationFrame(loop);

//     return () => {
//       window.removeEventListener("resize", resize);
//       container.removeChild(gl.canvas);
//       gl.getExtension("WEBGL_lose_context")?.loseContext();
//     };
//   }, [mode, amplitude, blend, speed]);

//   return <div ref={ref} className="absolute inset-0 -z-10" />;
// }
