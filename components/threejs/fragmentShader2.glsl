uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 2.0 * vDisplacement * u_intensity;

  // Change the starting colors here by adjusting the RGB values
  vec3 color = vec3(abs(vUv.x - 0.5) * 2.0 * (1.0 - distort),
                    abs(vUv.x - 0.5) * 2.0 * (1.0 - distort),
                    abs(vUv.x - 0.5) * 2.0 * (1.0 - distort));

  gl_FragColor = vec4(color ,1);
}
