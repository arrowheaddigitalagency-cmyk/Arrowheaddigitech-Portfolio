import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function AmbientBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollInfo, setScrollInfo] = useState({ ratio: 0, currentSection: "hero" });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.006);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 35;

    // We set alpha to true to let our CSS gradient look outstanding behind the WebGL content
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0); // Transparent canvas background to overlay over Layer 1 linear gradients
    container.appendChild(renderer.domElement);

    // 2. Lights Configuration
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Warm orange light burst
    const pointLight1 = new THREE.PointLight(0xff5a1f, 2.0, 90);
    pointLight1.position.set(20, 15, 10);
    scene.add(pointLight1);

    // Serene blue light burst
    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.8, 80);
    pointLight2.position.set(-25, -15, 5);
    scene.add(pointLight2);

    // Tactile Mouse Light tracker follow-up
    const mouseLight = new THREE.PointLight(0xff8c00, 0, 30);
    scene.add(mouseLight);

    // Directional sunlight shimmer
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(0, 15, 10);
    scene.add(dirLight);

    // 3. LAYER 2: Advanced Dynamic Network Constellations nodes
    const nodeCount = 40;
    const nodes: {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      basePosition: THREE.Vector3;
      phase: number;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 65,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 25
      );
      nodes.push({
        position: pos.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.03
        ),
        basePosition: pos.clone(),
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Nodes Visual mesh
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = nodes[i].position.x;
      nodePositions[i * 3 + 1] = nodes[i].position.y;
      nodePositions[i * 3 + 2] = nodes[i].position.z;
    }
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    // Custom Canvas Texture to produce glowing dots
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = 32;
    dotCanvas.height = 32;
    const dotCtx = dotCanvas.getContext("2d");
    if (dotCtx) {
      const gradient = dotCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 150, 50, 0.8)");
      gradient.addColorStop(0.5, "rgba(0, 210, 255, 0.3)");
      gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
      dotCtx.fillStyle = gradient;
      dotCtx.fillRect(0, 0, 32, 32);
    }
    const dotTexture = new THREE.CanvasTexture(dotCanvas);

    const nodeMaterial = new THREE.PointsMaterial({
      size: 1.4,
      map: dotTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const networkPoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(networkPoints);

    // Network lines segment buffers (dynamic updating inside loop)
    const maxConnections = 140;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      linewidth: 1,
    });

    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(networkLines);

    // 4. LAYER 3: Interactive Floating Glass Complex
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    const glassItemsCount = 10;
    const glassMeshes: THREE.Mesh[] = [];

    // Realistic transparent glass properties
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.92,
      ior: 1.52,
      thickness: 1.8,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Elegant orange/blue glass edge borders
    const glassEdgeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5a1f,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });

    for (let i = 0; i < glassItemsCount; i++) {
      let geom: THREE.BufferGeometry;
      const r = i % 3;
      if (r === 0) {
        // Glass Spheres
        geom = new THREE.SphereGeometry(2.2, 32, 32);
      } else if (r === 1) {
        // Thin glass panels
        geom = new THREE.BoxGeometry(4.2, 4.2, 0.25);
      } else {
        // Glass rings
        geom = new THREE.TorusGeometry(2.4, 0.45, 12, 32);
      }

      const outerGroup = new THREE.Group();
      const glassMesh = new THREE.Mesh(geom, glassMaterial);
      const edgeMesh = new THREE.Mesh(geom, glassEdgeMaterial);
      
      outerGroup.add(glassMesh);
      outerGroup.add(edgeMesh);

      // Distribute them at distinct depths for Parallax layered feel
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 40;
      // Close/Medium/Far
      const zScale = i % 3; 
      let z = -15;
      if (zScale === 0) z = 12; // Far-front close
      else if (zScale === 1) z = -2; // Mid depth
      else z = -26; // Deep backdrop

      outerGroup.position.set(x, y, z);
      outerGroup.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      outerGroup.userData = {
        baseY: y,
        rotSpeedX: (Math.random() - 0.5) * 0.003,
        rotSpeedY: (Math.random() - 0.5) * 0.003,
        scrollParallax: zScale === 0 ? 12.0 : zScale === 1 ? 7.0 : 3.5, // Parallax multiplier
        driftSpeed: Math.random() * 0.006 + 0.002,
        phase: Math.random() * 100,
      };

      glassGroup.add(outerGroup);
      glassMeshes.push(glassMesh);
    }

    // 5. LAYER 4: Soft Glowing drifting stellar dust
    const dustCount = 140;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const dustColorOrange = new THREE.Color("#FF5A1F");
    const dustColorBlue = new THREE.Color("#3B82F6");
    const dustColorWhite = new THREE.Color("#FFFFFF");

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 85;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 65;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const randomChoice = Math.random();
      let color = dustColorWhite;
      if (randomChoice < 0.35) color = dustColorOrange;
      else if (randomChoice < 0.7) color = dustColorBlue;

      dustColors[i * 3] = color.r;
      dustColors[i * 3 + 1] = color.g;
      dustColors[i * 3 + 2] = color.b;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.65,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const spaceDust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(spaceDust);

    // 6. LAYER 5: Interactive Floating Glass circular ripples
    const rippleCapacity = 3;
    const ripples: {
      mesh: THREE.Mesh;
      active: boolean;
      scale: number;
      opacity: number;
    }[] = [];

    const rippleGeo = new THREE.RingGeometry(0.8, 1.0, 32);
    const rippleMaterials: THREE.MeshBasicMaterial[] = [];

    for (let i = 0; i < rippleCapacity; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff5a1f,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      rippleMaterials.push(mat);

      const mesh = new THREE.Mesh(rippleGeo, mat);
      mesh.visible = false;
      scene.add(mesh);

      ripples.push({
        mesh,
        active: false,
        scale: 0.1,
        opacity: 0,
      });
    }

    // 7. Mouse tracker & Velocity monitoring state
    let rawMouseX = 0;
    let rawMouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseActive = false;
    let lastRippleTime = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseActive = true;
      rawMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      rawMouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Track speed to trigger high-end light ripples
      const speed = Math.hypot(event.clientX - lastMouseX, event.clientY - lastMouseY);
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;

      const now = performance.now();
      if (speed > 25 && now - lastRippleTime > 300) {
        triggerRippleAtMouse();
        lastRippleTime = now;
      }
    };

    const triggerRippleAtMouse = () => {
      // Find dynamic inactive container
      const inactive = ripples.find((r) => !r.active);
      if (inactive) {
        inactive.active = true;
        inactive.mesh.visible = true;
        inactive.scale = 0.2;
        inactive.opacity = 0.6;
        inactive.mesh.position.set(
          targetMouseX * 32,
          targetMouseY * 24,
          8 // near elements depth
        );
        // Toggle colors between Orange and Blue for modern contrast
        const col = Math.random() > 0.5 ? 0xff5a1f : 0x3b82f6;
        (inactive.mesh.material as THREE.MeshBasicMaterial).color.setHex(col);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Dynamic Scroll Positioning state variables
    let scrollRatio = 0;
    const handleScroll = () => {
      const doc = document.documentElement;
      const body = document.body;
      const top = doc.scrollTop || body.scrollTop;
      const heightVal = doc.scrollHeight - window.innerHeight;
      const ratio = heightVal > 0 ? top / heightVal : 0;
      scrollRatio = ratio;

      // Identify current visual section to update story parameter triggers
      let current = "hero";
      if (ratio > 0.15 && ratio <= 0.33) current = "services";
      else if (ratio > 0.33 && ratio <= 0.48) current = "about";
      else if (ratio > 0.48 && ratio <= 0.62) current = "process";
      else if (ratio > 0.62 && ratio <= 0.77) current = "case-studies";
      else if (ratio > 0.77 && ratio <= 0.86) current = "achievements";
      else if (ratio > 0.86 && ratio <= 0.93) current = "team";
      else if (ratio > 0.93 && ratio <= 0.97) current = "testimonials";
      else if (ratio > 0.97) current = "estimate";

      setScrollInfo({ ratio, currentSection: current });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 9. Animation Framerate Control & Vector mathematics
    const clock = new THREE.Clock();
    let animId: number;

    const targetLight1Color = new THREE.Color();
    const targetLight2Color = new THREE.Color();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth mouse lerps
      targetMouseX += (rawMouseX - targetMouseX) * 0.06;
      targetMouseY += (rawMouseY - targetMouseY) * 0.06;

      // Camera mouse tracker with dampening inertia
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetMouseX * 8, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, (targetMouseY * 6) + 4, 0.05);
      camera.lookAt(0, 0, 0);

      // Map 3D cursor position for local lighting particles reactions
      const mouse3D = new THREE.Vector3(targetMouseX * 32, (targetMouseY * 24) + 4, 10);
      
      if (mouseActive) {
        mouseLight.position.copy(mouse3D);
        // Cursor glow breathes
        mouseLight.intensity = THREE.MathUtils.lerp(
          mouseLight.intensity, 
          2.2 + Math.sin(elapsedTime * 4.0) * 0.5, 
          0.1
        );
      }

      // Update dynamic ripple expansions
      ripples.forEach((rip) => {
        if (rip.active) {
          rip.scale += 0.35;
          rip.opacity -= 0.018;

          rip.mesh.scale.set(rip.scale, rip.scale, 1);
          const mat = rip.mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = Math.max(0, rip.opacity);

          if (rip.opacity <= 0 || rip.scale > 18) {
            rip.active = false;
            rip.mesh.visible = false;
          }
        }
      });

      // Storyteller dynamic lighting transition triggers based on current section depth!
      let l1ColorStr = "#FF5A1F"; // default warm orange
      let l2ColorStr = "#3B82F6"; // default serene blue
      let l1Int = 2.0;
      let l2Int = 1.8;
      let glassScaleFactor = 1.0;

      if (scrollInfo.currentSection === "services") {
        // Services: Highlight with high vibrancy orange focus
        l1ColorStr = "#FF4500";
        l2ColorStr = "#FFA500";
        l1Int = 4.2;
        l2Int = 1.0;
      } else if (scrollInfo.currentSection === "about") {
        // About: Soft orange & rose balances
        l1ColorStr = "#FF7A00";
        l2ColorStr = "#FF007F";
        l1Int = 2.8;
        l2Int = 1.8;
      } else if (scrollInfo.currentSection === "case-studies") {
        // Case studies: Saturated deep blues and cyan glass
        l1ColorStr = "#0055FF";
        l2ColorStr = "#00FFFF";
        l1Int = 1.5;
        l2Int = 4.5;
        glassScaleFactor = 1.45; // bring blue glass elements forward
      } else if (scrollInfo.currentSection === "team" || scrollInfo.currentSection === "achievements") {
        // Soft particles: increase particle visibility & use neutral high-end monochrome sparkles
        l1ColorStr = "#FF8C00";
        l2ColorStr = "#E2E8F0";
        l1Int = 2.2;
        l2Int = 3.3;
      } else if (scrollInfo.currentSection === "testimonials") {
        // Testimonials: Soft corporate breathe highlights
        l1ColorStr = "#FF5A1F";
        l2ColorStr = "#3B82F6";
        l1Int = 1.8 + Math.sin(elapsedTime * 1.5) * 0.8;
        l2Int = 1.6 + Math.cos(elapsedTime * 1.5) * 0.8;
      } else if (scrollInfo.currentSection === "estimate") {
        // Final Estimate & contacts: Massive light bursts!
        l1ColorStr = "#FF4500";
        l2ColorStr = "#FFFFFF";
        l1Int = 4.8;
        l2Int = 4.0;
      }

      targetLight1Color.set(l1ColorStr);
      targetLight2Color.set(l2ColorStr);

      pointLight1.color.lerp(targetLight1Color, 0.08);
      pointLight2.color.lerp(targetLight2Color, 0.08);
      pointLight1.intensity = THREE.MathUtils.lerp(pointLight1.intensity, l1Int, 0.08);
      pointLight2.intensity = THREE.MathUtils.lerp(pointLight2.intensity, l2Int, 0.08);

      // Rotate overall space dust & clouds slowly
      spaceDust.rotation.y = elapsedTime * 0.015;
      spaceDust.rotation.x = elapsedTime * 0.006;

      // Drifting space dust updates upwards
      const dustPositionsArray = dustGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        // Upward flow
        dustPositionsArray[i * 3 + 1] += 0.015;
        // Sideway weaving
        dustPositionsArray[i * 3] += Math.sin(elapsedTime * 0.2 + i) * 0.005;

        // Reset wrapping limits
        if (dustPositionsArray[i * 3 + 1] > 35) {
          dustPositionsArray[i * 3 + 1] = -35;
          dustPositionsArray[i * 3] = (Math.random() - 0.5) * 85;
        }
      }
      dustGeometry.attributes.position.needsUpdate = true;

      // Update LAYER 2 node drifting physics and mouse repulsion reactive force
      const nodePosArray = nodeGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        
        // Gentle chaotic sin-phase drift
        node.phase += 0.004;
        const driftX = Math.sin(node.phase + node.basePosition.y) * 0.015;
        const driftY = Math.cos(node.phase + node.basePosition.x) * 0.015;

        node.position.add(node.velocity);
        node.position.x += driftX;
        node.position.y += driftY;

        // Handle Boundary Wrap borders
        if (Math.abs(node.position.x) > 38) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > 28) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > 18) node.velocity.z *= -1;

        // Dynamic mouse tactile repulsion reactive calculations
        const dMouse = node.position.distanceTo(mouse3D);
        if (mouseActive && dMouse < 14) {
          const pushDir = new THREE.Vector3().subVectors(node.position, mouse3D).normalize();
          const intensity = (14 - dMouse) * 0.08;
          node.position.addScaledVector(pushDir, intensity);
        }

        // Sink coordinates back into WebGL buffer arrays
        nodePosArray[i * 3] = node.position.x;
        nodePosArray[i * 3 + 1] = node.position.y;
        nodePosArray[i * 3 + 2] = node.position.z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Re-calculate Dynamic connection segments between nearest neighbor nodes
      let activeConnections = 0;
      const positionsAttr = lineGeometry.attributes.position.array as Float32Array;
      const colorsAttr = lineGeometry.attributes.color.array as Float32Array;

      // Color nodes connectors elegantly
      const orangeColor = new THREE.Color("#FF5A1F");
      const blueColor = new THREE.Color("#3B82F6");

      for (let i = 0; i < nodeCount; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const nodeB = nodes[j];
          const dist = nodeA.position.distanceTo(nodeB.position);
          
          if (dist < 11.5 && activeConnections < maxConnections) {
            const index = activeConnections * 6;

            positionsAttr[index] = nodeA.position.x;
            positionsAttr[index + 1] = nodeA.position.y;
            positionsAttr[index + 2] = nodeA.position.z;

            positionsAttr[index + 3] = nodeB.position.x;
            positionsAttr[index + 4] = nodeB.position.y;
            positionsAttr[index + 5] = nodeB.position.z;

            // Gradient line logic matches close point colors
            const mixColor = orangeColor.clone().lerp(blueColor, (Math.sin(nodeA.phase) + 1) / 2);
            colorsAttr[index] = mixColor.r;
            colorsAttr[index + 1] = mixColor.g;
            colorsAttr[index + 2] = mixColor.b;

            colorsAttr[index + 3] = mixColor.r;
            colorsAttr[index + 4] = mixColor.g;
            colorsAttr[index + 5] = mixColor.b;

            activeConnections++;
          }
        }
      }

      // Draw Connections lines dynamically reaching cursor!
      if (mouseActive && activeConnections < maxConnections) {
        // Locate closest companion nodes
        const companionList = nodes
          .map((n, idx) => ({ idx, dist: n.position.distanceTo(mouse3D) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        companionList.forEach((partner) => {
          if (partner.dist < 18 && activeConnections < maxConnections) {
            const index = activeConnections * 6;
            const nodeN = nodes[partner.idx];

            positionsAttr[index] = mouse3D.x;
            positionsAttr[index + 1] = mouse3D.y;
            positionsAttr[index + 2] = mouse3D.z;

            positionsAttr[index + 3] = nodeN.position.x;
            positionsAttr[index + 4] = nodeN.position.y;
            positionsAttr[index + 5] = nodeN.position.z;

            // Radiant Cursor connecting lines
            colorsAttr[index] = 1.0;
            colorsAttr[index + 1] = 0.54; // Orange glow vertex
            colorsAttr[index + 2] = 0.0;

            colorsAttr[index + 3] = 0.0;
            colorsAttr[index + 4] = 0.88; // Blue node vertex
            colorsAttr[index + 5] = 1.0;

            activeConnections++;
          }
        });
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, activeConnections * 2);

      // Animate Layer 3 Glass Elements, apply vertical 3D depth Parallax scrolling offsets!
      glassGroup.children.forEach((groupObj, index) => {
        // Individual rotations
        groupObj.rotation.x += groupObj.userData.rotSpeedX;
        groupObj.rotation.y += groupObj.userData.rotSpeedY;

        // Soft harmonic drifting
        const t = elapsedTime * groupObj.userData.driftSpeed + groupObj.userData.phase;
        const offsetForceY = Math.sin(t) * 1.5;
        const offsetForceX = Math.cos(t) * 1.0;

        // Apply scroll-parallax formula: baseY + drift + (scrollRatio * parallaxFactor)
        // This coordinates physical depth positioning perfectly
        const targetY = groupObj.userData.baseY + offsetForceY - (scrollRatio * groupObj.userData.scrollParallax);
        groupObj.position.y = THREE.MathUtils.lerp(groupObj.position.y, targetY, 0.08);
        groupObj.position.x = THREE.MathUtils.lerp(groupObj.position.x, groupObj.position.x + offsetForceX * 0.02, 0.08);

        // Smoothly adjust size during specific section visual focuses
        const currentTargetScale = glassScaleFactor;
        groupObj.scale.setScalar(THREE.MathUtils.lerp(groupObj.scale.x, currentTargetScale, 0.05));
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resizer handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 11. Cleanup routine
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);

      // Clean up DOM children safely
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose heavy WebGL variables
      scene.clear();
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      glassMaterial.dispose();
      glassEdgeMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      rippleGeo.dispose();
      rippleMaterials.forEach((m) => m.dispose());
      dotTexture.dispose();
    };
  }, [scrollInfo.currentSection]);

  // Layer 1 CSS dynamic radial light bursts smoothly changing in Tailwind context!
  const getDynamicBackgroundGradients = () => {
    switch (scrollInfo.currentSection) {
      case "services":
        return "radial-gradient(circle at 15% 25%, rgba(255, 90, 31, 0.05) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(255, 180, 0, 0.04) 0%, transparent 60%), #fcfcfd";
      case "about":
        return "radial-gradient(circle at 30% 30%, rgba(255, 90, 31, 0.05) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 60%), #fafbfd";
      case "case-studies":
        return "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 60%), #f9fcff";
      case "team":
      case "achievements":
        return "radial-gradient(circle at 50% 15%, rgba(255, 90, 31, 0.04) 0%, transparent 50%), radial-gradient(circle at 10% 85%, rgba(226, 232, 240, 0.4) 0%, transparent 50%), #fafafc";
      case "testimonials":
        return "radial-gradient(circle at 20% 50%, rgba(255, 90, 31, 0.03) 0%, transparent 45%), radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 45%), #fcfcfd";
      case "estimate":
        return "radial-gradient(circle at 50% 50%, rgba(255, 69, 0, 0.06) 0%, transparent 70%), radial-gradient(circle at 85% 85%, rgba(255, 255, 255, 1) 0%, transparent 60%), #f8fafc";
      default:
        return "radial-gradient(circle at 30% 40%, rgba(255, 90, 31, 0.05) 0%, transparent 45%), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.04) 0%, transparent 50%), #fafbfc";
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-20 transition-all duration-1000 ease-out overflow-hidden pointer-events-none"
      id="3d-ambient-viewport"
      style={{ background: getDynamicBackgroundGradients() }}
    />
  );
}
