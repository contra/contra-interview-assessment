
interface Attributes {
    colors: Float32Array;
    positions: Float32Array;
}


// * fill attribute arrays
const createGlowingOrbsAttributes = (particleCount: number, radius: number): Attributes => {

    // * attributes
    const colors = new Float32Array(particleCount * 3);
    const positions = new Float32Array(particleCount * 3);

    // * colors
    for(let i = 0;i < particleCount * 3;i++) {
        colors[i] = Math.random();
    }

    for(let i = 0;i < particleCount;i++) {
        const i3 = i * 3;

        // * positions
        const angle = (i % particleCount) / particleCount * Math.PI * 2;

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius;
        positions[i3 + 2] = 0;
    }

    return { colors: colors, positions: positions };
};

export default createGlowingOrbsAttributes;