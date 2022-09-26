export const fragmentShader = `
    varying vec3 vColor;
    
    void main(){

        //Light point pattern (diffuse point that fades faster)
        float strength = distance(gl_PointCoord, vec2(.5));
        strength = 1. - strength;

        strength = pow(strength, 6.) -.1;

       

        vec3 col = mix(vec3(.0), vColor, strength);

        // Final
        gl_FragColor = vec4(col, 1.0);
    }


`

