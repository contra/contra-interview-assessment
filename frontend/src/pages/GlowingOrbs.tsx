import React, { useMemo, useRef, useState } from 'react';
import * as three from 'three';
import { Plane } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import createGlowingOrbsAttributes from './util/createGlowingOrbsAttributes';


import { vertexShader } from './shaders/glowingOrbs/vertexShader';
import { fragmentShader } from './shaders/glowingOrbs/fragmentShader';


const GlowingOrbs = () => {


    const { gl } = useThree();

    // * points Params
    const [particleCount, setParticleCount] = useState<number>(7);
    const [radius, setRadius] = useState<number>(1);
    const [particleSize, setParticleSize] = useState<number>(100);

    // * move orbs on hover
    const material = useRef<three.ShaderMaterial>(null);

    let deltaTime = 0;

    useFrame(({ clock }) => {

        if(material.current === null) return;
        if(material.current.uniforms['uTime'] !== undefined) {

            material.current.uniforms['uTime'].value += (clock.getElapsedTime() - deltaTime);
        }

        deltaTime = clock.getElapsedTime();

    });

    const { colors, positions } = createGlowingOrbsAttributes(particleCount, radius);


    const uniforms = useMemo(
        () => ({
            uSize: {
                value: particleSize * gl.getPixelRatio(),
            },
            uTime: {
                value: 0.0,
            },
        }),
        []
    );

    return (
        <mesh position={ [0, 0, 0] } >

            <points>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        count={ positions.length / 3 }
                        array={ positions }
                        itemSize={ 3 }
                        usage={ three.DynamicDrawUsage }
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={ colors.length / 3 }
                        array={ colors }
                        itemSize={ 3 }
                        usage={ three.DynamicDrawUsage }
                    />
                </bufferGeometry>
                <shaderMaterial
                    ref={ material }
                    fragmentShader={ fragmentShader }
                    vertexShader={ vertexShader }
                    uniforms={ uniforms }
                    depthWrite={ false }
                    vertexColors={ true }
                    blending={ three.AdditiveBlending }
                />
            </points>
        </mesh>
    );
};

export default GlowingOrbs;




