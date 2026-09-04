/**
 * Hero 3D Background — floating, book/scholar-themed geometry rendered with
 * Three.js behind the hero copy. Purely decorative: it sits under the
 * existing gradient glows, never intercepts pointer events, and always
 * degrades gracefully (reduced motion, small screens, low-power devices,
 * WebGL unavailable) back to the plain CSS hero that already exists.
 *
 * Loaded lazily (dynamic `import('three')`) so the ~150KB library never
 * blocks first paint or the critical rendering path.
 */

const GOLD = 0xc5a059;
const GOLD_LIGHT = 0xd8b775;
const SAPPHIRE = 0x244b7e;
const SAPPHIRE_LIGHT = 0x6c9bd6;

let renderer, scene, camera, animationId;
let mounted = false;

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
}

export async function initHero3D() {
    const container = document.getElementById('hero-3d');
    if (!container) return;

    // Respect user & device constraints — skip entirely rather than force it.
    if (prefersReducedMotion()) return;
    if (window.innerWidth < 640) return; // keep phones light & battery-friendly
    if (!window.WebGLRenderingContext) return;

    let THREE;
    try {
        THREE = await import('three');
    } catch (err) {
        console.warn('[The Next Corridor] 3D hero skipped — could not load three.js', err);
        return;
    }

    // Bail if the section has scrolled out of the DOM while we were loading
    if (!document.body.contains(container)) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 13);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ---- Lighting -----------------------------------------------------
    const ambient = new THREE.AmbientLight(0xffffff, isDarkTheme() ? 0.55 : 0.75);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(GOLD_LIGHT, 1.1);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(SAPPHIRE_LIGHT, 0.6);
    fillLight.position.set(-8, -4, 4);
    scene.add(fillLight);

    // ---- Shapes: a small "constellation" of academic-adjacent forms ----
    // Open books (flattened, hinged boxes), a torus knot ("diploma seal"),
    // and icosahedrons ("insight / achievement") — colored in the brand's
    // gold & sapphire accents, softly emissive so they read as premium glass.
    const shapes = [];

    function makeMaterial(color, opacity) {
        return new THREE.MeshStandardMaterial({
            color,
            metalness: 0.35,
            roughness: 0.35,
            transparent: true,
            opacity,
            emissive: color,
            emissiveIntensity: 0.08
        });
    }

    function addShape(geometry, color, opacity, position, scale, spin) {
        const mesh = new THREE.Mesh(geometry, makeMaterial(color, opacity));
        mesh.position.set(...position);
        mesh.scale.setScalar(scale);
        mesh.userData.spin = spin;
        mesh.userData.baseY = position[1];
        mesh.userData.floatOffset = Math.random() * Math.PI * 2;
        scene.add(mesh);
        shapes.push(mesh);
        return mesh;
    }

    // Torus knot — the "seal of achievement" centerpiece
    addShape(
        new THREE.TorusKnotGeometry(1.1, 0.32, 140, 20),
        GOLD,
        0.85,
        [3.4, 1.4, -2],
        1,
        { x: 0.15, y: 0.22, z: 0 }
    );

    // Icosahedron — faceted "insight" gem
    addShape(
        new THREE.IcosahedronGeometry(1, 0),
        SAPPHIRE,
        0.8,
        [-4.2, -1.6, -1],
        1.05,
        { x: 0.1, y: -0.18, z: 0.05 }
    );

    // Octahedron — smaller accent
    addShape(
        new THREE.OctahedronGeometry(0.75, 0),
        GOLD_LIGHT,
        0.75,
        [-2.8, 2.6, -3],
        0.9,
        { x: -0.12, y: 0.14, z: 0.08 }
    );

    // Open-book form: two hinged flat boxes
    const bookGroup = new THREE.Group();
    const pageGeo = new THREE.BoxGeometry(1.5, 0.05, 1.05);
    const pageMat = makeMaterial(SAPPHIRE_LIGHT, 0.7);
    const leftPage = new THREE.Mesh(pageGeo, pageMat);
    leftPage.position.x = -0.75;
    leftPage.rotation.z = 0.12;
    const rightPage = new THREE.Mesh(pageGeo, pageMat.clone());
    rightPage.position.x = 0.75;
    rightPage.rotation.z = -0.12;
    bookGroup.add(leftPage, rightPage);
    bookGroup.position.set(4, -2.4, -2.5);
    bookGroup.rotation.x = 0.4;
    bookGroup.userData.spin = { x: 0, y: 0.16, z: 0 };
    bookGroup.userData.baseY = bookGroup.position.y;
    bookGroup.userData.floatOffset = Math.random() * Math.PI * 2;
    scene.add(bookGroup);
    shapes.push(bookGroup);

    // Small drifting particles for depth/sparkle
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 45;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
        color: GOLD_LIGHT,
        size: 0.045,
        transparent: true,
        opacity: 0.55
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- Parallax: subtle camera drift toward the pointer --------------
    let targetX = 0;
    let targetY = 0;
    function onPointerMove(e) {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetX = nx * 0.6;
        targetY = ny * 0.35;
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // ---- Resize handling -------------------------------------------------
    function onResize() {
        if (!container.isConnected) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // ---- Pause when off-screen or tab hidden (battery/perf friendliness) --
    let isVisible = true;
    const visObserver = new IntersectionObserver(
        (entries) => {
            isVisible = entries[0].isIntersecting;
        },
        { threshold: 0 }
    );
    visObserver.observe(container);

    function onVisibilityChange() {
        isVisible = isVisible && !document.hidden;
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ---- Animation loop ---------------------------------------------------
    const clock = new THREE.Clock();
    mounted = true;

    function animate() {
        animationId = requestAnimationFrame(animate);
        if (!isVisible || document.hidden) return;

        const t = clock.getElapsedTime();

        shapes.forEach((mesh) => {
            const spin = mesh.userData.spin;
            mesh.rotation.x += spin.x * 0.01;
            mesh.rotation.y += spin.y * 0.01;
            mesh.rotation.z += spin.z * 0.01;
            mesh.position.y = mesh.userData.baseY + Math.sin(t * 0.6 + mesh.userData.floatOffset) * 0.28;
        });

        particles.rotation.y = t * 0.02;

        // Ease camera toward pointer target for a soft parallax feel
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (-targetY - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }
    animate();

    // Keep colors sensible if the user toggles light/dark theme
    const themeObserver = new MutationObserver(() => {
        ambient.intensity = isDarkTheme() ? 0.55 : 0.75;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Expose a teardown handle in case the page ever needs to unmount this
    window.__heroThreeCleanup = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        visObserver.disconnect();
        themeObserver.disconnect();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        mounted = false;
    };
}

export function isHero3DMounted() {
    return mounted;
}
