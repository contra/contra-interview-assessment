import React, { Suspense } from 'react';
import * as three from 'three';
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import GlowingOrbs from './GlowingOrbs';

const CanvasComponent = () => {

    return (
        <div style={ { width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, outline: 'none' } } >
            <Canvas >
                <Suspense fallback={ <Loader /> }>
                    <GlowingOrbs />
                </Suspense>
            </Canvas>
        </div >
    );
};

export default React.memo(CanvasComponent);