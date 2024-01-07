uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity;

    // Define the scarlet and gray colors without any blue component in the scarlet
    vec3 scarlet = vec3(0.5, 0, 0); // Adjusted scarlet color with less blue
    vec3 gray = vec3(0, 0, 0); // Gray color

    // Calculate a blend factor based on the UV coordinate and distortion
    float blendFactor = abs(vUv.x - 0.5) * 2.0 * (1.0 - distort);

    // Mix the scarlet and gray colors based on the blend factor
    vec3 color = mix(scarlet, gray, blendFactor);

    gl_FragColor = vec4(color, 1.0);
}
