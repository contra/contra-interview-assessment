export const vertexShader = `

    varying vec3 vColor;
    uniform float uSize;
    uniform float uTime;


    void main(){

        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        float angle = atan(modelPosition.x, modelPosition.y);

        modelPosition.x = sin(angle + uTime*.7);
        modelPosition.y = cos(angle + uTime *.7);
        

        // Final
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        // size
        gl_PointSize = uSize;
        
        // Props
        vColor = color;
    }
`;