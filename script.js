// Navbar Transition Logic
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        nav.classList.remove('vertical-nav');
        nav.classList.add('horizontal-nav');
    } else {
        nav.classList.add('vertical-nav');
        nav.classList.remove('horizontal-nav');
    }
});

// GSAP Scroll Spy Logic
gsap.registerPlugin(ScrollTrigger);

const spyItems = document.querySelectorAll('.spy-item');
const panels = document.querySelectorAll('.glass-panel');

spyItems.forEach((item, index) => {
    ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onEnter: () => activatePanel(index),
        onEnterBack: () => activatePanel(index),
    });
    
    // Click interaction
    item.addEventListener('click', () => {
        activatePanel(index);
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

function activatePanel(index) {
    spyItems.forEach(i => i.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    
    if(spyItems[index]) spyItems[index].classList.add('active');
    if(panels[index]) panels[index].classList.add('active');
}

// Services Split Scroll Logic
const splitTextBlocks = document.querySelectorAll('.split-text-block');
const splitImages = document.querySelectorAll('.split-img');

if (splitTextBlocks.length > 0 && splitImages.length > 0) {
    splitTextBlocks.forEach((block, index) => {
        ScrollTrigger.create({
            trigger: block,
            start: "top center",
            end: "bottom center",
            onEnter: () => activateSplitImage(index),
            onEnterBack: () => activateSplitImage(index),
        });
    });
}

function activateSplitImage(index) {
    splitImages.forEach(img => img.classList.remove('active'));
    if(splitImages[index]) splitImages[index].classList.add('active');
}

// Three.js Particle Wave Animation
function initThreeJs() {
    const canvasContainer = document.getElementById('particle-canvas');
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    
    // Adjust camera to look nicely at the wave
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 8;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    for(let i = 0; i < count; i++) {
        // Spread particles out in X and Z
        const x = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 40;
        
        positions[i*3] = x;
        positions[i*3+1] = 0; // Y will be animated
        positions[i*3+2] = z;
        
        // Add subtle orange color variation matching the new #e46201 theme
        const mixRatio = Math.random();
        color.setHSL(0.06 + mixRatio * 0.04, 0.9, 0.5 + mixRatio * 0.2);
        colors[i*3] = color.r;
        colors[i*3+1] = color.g;
        colors[i*3+2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const baseColors = colors.slice();

    // Circle formation: a pool of particles that gather into a ring shape
    // when the cursor hovers near the right side of the field. The ring is
    // sampled as a center-line, then thickened into a cloud of particles
    // scattered perpendicular to it (denser toward the middle) instead of a
    // single thin row of dots.
    function buildDevSymbolPoints() {
        const pts = [];
        const THICKNESS = 1.6;
        const DOTS_PER_STEP = 6;

        function addThickPoint(x, z, tx, tz) {
            const nx = -tz, nz = tx; // perpendicular to the ring direction
            for (let d = 0; d < DOTS_PER_STEP; d++) {
                // sum of randoms biases the spread toward the centerline (soft cloud edge)
                const r = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
                const offset = r * THICKNESS;
                pts.push({ x: x + nx * offset, z: z + nz * offset });
            }
        }

        const R = 9;      // circle radius
        const steps = 140;
        for (let s = 0; s < steps; s++) {
            const theta = (s / steps) * Math.PI * 2;
            const x = Math.cos(theta) * R;
            const z = Math.sin(theta) * R;
            addThickPoint(x, z, -Math.sin(theta), Math.cos(theta));
        }
        return pts;
    }

    const symbolCenter = { x: 11, z: 0 };
    const symbolRadius = 14;
    const symbolPoints = buildDevSymbolPoints();
    const glyphCount = symbolPoints.length;
    const glyphHomeX = new Float32Array(glyphCount);
    const glyphHomeZ = new Float32Array(glyphCount);
    const glyphTargetX = new Float32Array(glyphCount);
    const glyphTargetZ = new Float32Array(glyphCount);

    for (let g = 0; g < glyphCount; g++) {
        glyphHomeX[g] = positions[g * 3];
        glyphHomeZ[g] = positions[g * 3 + 2];
        glyphTargetX[g] = symbolCenter.x + symbolPoints[g].x;
        glyphTargetZ[g] = symbolCenter.z + symbolPoints[g].z;
    }
    let morphAmount = 0;

    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction: pointer raises/brightens nearby particles, clicks send out a ripple
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const pointerWorld = new THREE.Vector3();
    let pointerActive = false;
    const ripples = [];
    const interactionZone = canvasContainer.closest('.particle-section') || canvasContainer;

    function updatePointer(event) {
        const rect = interactionZone.getBoundingClientRect();
        pointerNDC.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNDC, camera);
        pointerActive = raycaster.ray.intersectPlane(groundPlane, pointerWorld) !== null;
    }

    interactionZone.addEventListener('pointermove', updatePointer);
    interactionZone.addEventListener('pointerleave', () => { pointerActive = false; });
    interactionZone.addEventListener('pointerdown', (event) => {
        updatePointer(event);
        if (pointerActive) {
            ripples.push({ x: pointerWorld.x, z: pointerWorld.z, start: time });
        }
    });

    // Animation Loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.015;

        const positions = particles.geometry.attributes.position.array;
        const colorAttr = particles.geometry.attributes.color.array;

        // Gather (or release) the dev-symbol particle pool based on cursor proximity
        const nearSymbol = pointerActive && Math.hypot(pointerWorld.x - symbolCenter.x, pointerWorld.z - symbolCenter.z) < symbolRadius;
        morphAmount += ((nearSymbol ? 1 : 0) - morphAmount) * 0.08;
        // Snap fully once settled so it locks in place instead of drifting asymptotically
        if (nearSymbol && morphAmount > 0.995) morphAmount = 1;
        if (!nearSymbol && morphAmount < 0.005) morphAmount = 0;

        if (morphAmount > 0.001) {
            for (let g = 0; g < glyphCount; g++) {
                positions[g * 3] = glyphHomeX[g] + (glyphTargetX[g] - glyphHomeX[g]) * morphAmount;
                positions[g * 3 + 2] = glyphHomeZ[g] + (glyphTargetZ[g] - glyphHomeZ[g]) * morphAmount;
            }
        }

        for(let i = 0; i < count; i++) {
            const x = positions[i*3];
            const z = positions[i*3+2];

            // Calculate wave math
            // Mix of sine waves on x and z axis for a more organic flowing feel
            let y = Math.sin(x * 0.3 + time) * 1.5 + Math.cos(z * 0.2 + time) * 1.5;
            let glow = 0;

            // Settle the gathered symbol particles so the shape sits still and reads clearly
            const isGlyph = i < glyphCount;
            if (isGlyph && morphAmount > 0.001) {
                y *= 1 - morphAmount; // fully flattens the wave once formed - no bobbing
                y += morphAmount * 1.4;
                glow += morphAmount * 0.9;
            }
            // A gathering/formed glyph particle ignores ambient hover/ripple entirely so it anchors in place
            const disturbance = isGlyph && nearSymbol ? 0 : 1;

            // Cursor lifts and brightens particles within its radius
            if (pointerActive && disturbance > 0) {
                const dx = x - pointerWorld.x;
                const dz = z - pointerWorld.z;
                const influence = Math.exp(-(dx * dx + dz * dz) / 16) * disturbance;
                y += influence * 2.5;
                glow += influence;
            }

            // Click ripples expand outward and fade over time
            if (disturbance > 0) {
                for (let r = ripples.length - 1; r >= 0; r--) {
                    const ripple = ripples[r];
                    const age = time - ripple.start;
                    if (age > 2.5) {
                        ripples.splice(r, 1);
                        continue;
                    }
                    const dx = x - ripple.x;
                    const dz = z - ripple.z;
                    const dist = Math.sqrt(dx * dx + dz * dz);
                    const ringRadius = age * 6;
                    const ring = Math.exp(-Math.pow(dist - ringRadius, 2) / 4.5) * disturbance;
                    const fade = 1 - age / 2.5;
                    y += ring * fade * 3;
                    glow += ring * fade;
                }
            }

            positions[i*3+1] = y;

            if (glow > 0) {
                glow = Math.min(glow, 1);
                colorAttr[i*3] = baseColors[i*3] + (1 - baseColors[i*3]) * glow;
                colorAttr[i*3+1] = baseColors[i*3+1] + (1 - baseColors[i*3+1]) * glow;
                colorAttr[i*3+2] = baseColors[i*3+2] + (1 - baseColors[i*3+2]) * glow;
            } else {
                colorAttr[i*3] = baseColors[i*3];
                colorAttr[i*3+1] = baseColors[i*3+1];
                colorAttr[i*3+2] = baseColors[i*3+2];
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.color.needsUpdate = true;

        // Slowly rotate entire particle field
        particles.rotation.y = time * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Newsletter Form Submission (Netlify Forms via AJAX)
function encodeFormData(form) {
    return Array.from(new FormData(form))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Subscribing...';

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeFormData(form),
        })
            .then(() => {
                button.textContent = 'Subscribed!';
                form.reset();
            })
            .catch(() => {
                button.textContent = 'Something went wrong';
            })
            .finally(() => {
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThreeJs();
});
