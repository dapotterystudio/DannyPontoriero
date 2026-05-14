const artStage = document.querySelector(".art-stage");
const hotspots = Array.from(document.querySelectorAll(".hotspot"));

if (artStage && hotspots.length > 0) {
  let frameId = 0;
  let rotation = 0;

  const positionHotspots = () => {
    const stageWidth = artStage.clientWidth;
    const stageHeight = artStage.clientHeight;
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2 + stageHeight * 0.02;

    hotspots.forEach((hotspot, index) => {
      const baseAngle = Number(hotspot.dataset.angle || 0);
      const radiusX = stageWidth * Number(hotspot.dataset.radiusX || 0.4);
      const radiusY = stageHeight * Number(hotspot.dataset.radiusY || 0.18);
      const orbitAngle = baseAngle + rotation;
      const drift = Math.sin(rotation * 1.7 + index * 0.9) * stageHeight * 0.012;
      const x = centerX + Math.cos(orbitAngle) * radiusX;
      const y = centerY + Math.sin(orbitAngle) * radiusY + drift;

      hotspot.style.left = `${x}px`;
      hotspot.style.top = `${y}px`;
      hotspot.style.zIndex = `${Math.round(100 + Math.sin(orbitAngle) * 20)}`;
      hotspot.style.opacity = hotspot.matches(":hover, :focus-visible") ? "1" : `${0.72 + Math.max(0, Math.sin(orbitAngle)) * 0.18}`;
    });
  };

  const animate = () => {
    rotation += 0.0032;
    positionHotspots();
    frameId = window.requestAnimationFrame(animate);
  };

  const onResize = () => {
    positionHotspots();
  };

  window.addEventListener("resize", onResize);
  positionHotspots();
  animate();

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("resize", onResize);
  });
}
