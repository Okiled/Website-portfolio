import React, { useEffect, useMemo, useRef, useState } from "react";

const LOOP = false;
const TOTAL_LOADING_TIME = 5500;

const T = {
  spreadStep: 60,
  spreadStartDelay: 80,
  hexPulse: 500,
  hexStagger: 30,
  woosh: 600,
  wooshBetween: 120,
  afterAllGlow: 100,
  beforeWooshBlue: 150,
  boom: 800,
  progressTick: 16,
  startDelay: 50,
} as const;

type Params = {
  strokeWidth: number; fontSize: number; centerR: number; mainLen: number;
  off1: number; off2: number; branchLen: number; branchAng: number; hexR: number;
  extLen: number; capR: number; dotR: number; tx: number; ty: number; rot: number; scale: number;
};

const P: Params = {
  strokeWidth: 6,
  fontSize: 24,
  centerR: 20,
  mainLen: 180,
  off1: 70,
  off2: 110,
  branchLen: 35,
  branchAng: 45,
  hexR: 30,
  extLen: 35,
  capR: 18,
  dotR: 6,
  tx: 0, ty: 0, rot: 29, scale: 0.65,
};

const AKAZA_PINK = { stroke: "#FF1493", text: "#FF69B4", fill: "transparent" };
const AKAZA_BLUE = { stroke: "#00E5FF", text: "#7EF9FF", fill: "transparent" };

const EZ_OUT = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const EZ_INOUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EZ_SMOOTH = "cubic-bezier(0.4, 0.0, 0.2, 1)";
const EZ_NATURAL = "cubic-bezier(0.15, 0.85, 0.25, 1)";

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(1337);
const r01 = () => rng();
const rrange = (a: number, b: number) => a + (b - a) * r01();
const jitter = (factor = 0.15) => 1 + (r01() - 0.5) * (factor * 2);
const nDur = (ms: number, factor = 0.15) => Math.max(50, Math.round(ms * jitter(factor)));
const nDelay = (ms: number, factor = 0.2) => Math.max(0, Math.round(ms * jitter(factor)));

const LoadingScreen: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [exited, setExited] = useState(false);
  const [exiting, setExiting] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const layer1Ref = useRef<SVGGElement | null>(null);
  const layer2Ref = useRef<SVGGElement | null>(null);
  const centerDotRef = useRef<SVGCircleElement | null>(null);

  const auraRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const compassRef = useRef<HTMLDivElement | null>(null);
  const energyFieldRef = useRef<HTMLDivElement | null>(null);
  const noiseRef = useRef<HTMLDivElement | null>(null);

  const timersRef = useRef<number[]>([]);
  const animsRef = useRef<Animation[]>([]);
  const intervalsRef = useRef<number[]>([]);

  const stateRef = useRef({
    animationElements: [] as Element[],
    hexElements: [] as Element[],
    capElements: [] as Element[],
    theme: "pink" as "pink" | "blue",
  });

  const speedFactorPink = 0.6;
  const spd = (d: number) =>
    stateRef.current.theme === "pink" ? Math.max(30, Math.round(d * speedFactorPink)) : d;

  const rootVars = useMemo<React.CSSProperties>(() => ({
    ["--stroke-color" as any]: AKAZA_PINK.stroke,
    ["--fill-color" as any]: AKAZA_PINK.fill,
    ["--text-color" as any]: AKAZA_PINK.text,
    ["--glow-pink" as any]: "#FF1493",
    ["--glow-pink-soft" as any]: "rgba(255,20,147,0.12)",
    ["--glow-blue" as any]: "#00EAFF",
    ["--glow-blue-soft" as any]: "rgba(0,234,255,0.15)",
    ["--akaza-pink" as any]: "#FF1493",
    ["--akaza-blue" as any]: "#00E5FF",
  }), []);

  function trackTimer(id: number) { timersRef.current.push(id); }
  function trackAnim(a: Animation | null) { if (a) animsRef.current.push(a); }
  function trackInterval(id: number) { intervalsRef.current.push(id); }
  function clearAllAsync() {
    timersRef.current.forEach((id) => clearTimeout(id));
    intervalsRef.current.forEach((id) => clearInterval(id));
    animsRef.current.forEach((a) => { try { a.cancel(); } catch {} });
    timersRef.current = [];
    intervalsRef.current = [];
    animsRef.current = [];
    if (noiseRef.current && noiseRef.current.parentNode) noiseRef.current.parentNode.removeChild(noiseRef.current);
  }

  function scaledParams(base: Params, s: number): Params {
    return {
      ...base,
      mainLen: base.mainLen * s,
      off1: base.off1 * s,
      off2: base.off2 * s,
      branchLen: base.branchLen * s,
      hexR: base.hexR * s,
      extLen: Math.max(0, base.extLen * s),
      capR: base.capR * s,
      dotR: base.dotR * s,
      strokeWidth: base.strokeWidth * s,
      fontSize: base.fontSize * s,
    };
  }

  function applyCircularMask(el: HTMLElement, inner = 0.60, fade = 0.75) {
    const mask = `radial-gradient(circle at 50% 50%, #000 ${inner * 100}%, rgba(0,0,0,0.999) ${Math.min(99, fade * 100 - 1)}%, transparent ${fade * 100}%)`;
    (el.style as any).webkitMaskImage = mask;
    (el.style as any).maskImage = mask;
    (el.style as any).maskRepeat = "no-repeat";
    (el.style as any).webkitMaskRepeat = "no-repeat";
    (el.style as any).maskPosition = "50% 50%";
    (el.style as any).webkitMaskPosition = "50% 50%";
    (el.style as any).maskSize = "cover";
    (el.style as any).webkitMaskSize = "cover";
    (el.style as any).maskMode = "luminance";
    (el.style as any).willChange = "transform, opacity";
    (el.style as any).backfaceVisibility = "hidden";
    (el.style as any).transform = "translateZ(0)";
  }

  function ensureNoiseOverlay() {
    if (noiseRef.current) return;
    const d = document.createElement("div");
    d.className = "pointer-events-none fixed inset-0 z-[9998] opacity-10 mix-blend-overlay";
    const size = 512; // Increased from 256 for HD
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const ctx = c.getContext("2d")!;
    
    // Enhanced HD noise generation
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v;
      img.data[i + 3] = 8 + ((i / 4) % 5); // Refined dither pattern
    }
    ctx.putImageData(img, 0, 0);
    d.style.backgroundImage = `url(${c.toDataURL()})`;
    d.style.backgroundSize = "768px 768px"; // Larger tiles for better quality
    d.style.backgroundRepeat = "repeat";
    d.style.imageRendering = "crisp-edges";
    rootRef.current?.appendChild(d);
    noiseRef.current = d;
  }

  function makeBranch(angleDeg: number, text: string, p: Params, branchIndex: number) {
    const svgns = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(svgns, "g");
    g.setAttribute("transform", `rotate(${angleDeg})`);

    const pad = 1;
    const r0 = p.centerR + p.strokeWidth / 2 + pad;
    const yStart = -r0;
    const yEnd = yStart - p.mainLen;

    const line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", "0"); line.setAttribute("y1", String(yStart));
    line.setAttribute("x2", "0"); line.setAttribute("y2", String(yEnd + p.hexR + 2));
    line.setAttribute("stroke", "var(--stroke-color)");
    line.setAttribute("fill", "none");
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("stroke-linejoin", "round");
    line.setAttribute("opacity", "0");
    line.setAttribute("stroke-width", String(p.strokeWidth));
    line.setAttribute("vector-effect", "non-scaling-stroke");
    line.setAttribute("stroke-miterlimit", "1");
    line.setAttribute("data-element", "main-line");
    line.setAttribute("data-branch", String(branchIndex));
    (line.style as any).shapeRendering = "geometricPrecision";
    g.appendChild(line);
    stateRef.current.animationElements.push(line);

    const offs = [p.off1, p.off2].filter(v => v > 0 && v < p.mainLen - p.hexR - 8);
    const rad = Math.abs(p.branchAng) * Math.PI / 180;
    offs.forEach((d, offIndex) => {
      const baseY = yStart - d;
      const dx = Math.cos(-rad) * p.branchLen;
      const dy = Math.sin(-rad) * p.branchLen;

      ["left", "right"].forEach((side) => {
        const sign = side === "left" ? -1 : 1;
        const branch = document.createElementNS(svgns, "line");
        branch.setAttribute("x1", "0"); branch.setAttribute("y1", String(baseY));
        branch.setAttribute("x2", String(sign * dx)); branch.setAttribute("y2", String(baseY + dy));
        branch.setAttribute("stroke", "var(--stroke-color)");
        branch.setAttribute("fill", "none");
        branch.setAttribute("stroke-linecap", "round");
        branch.setAttribute("stroke-linejoin", "round");
        branch.setAttribute("opacity", "0");
        branch.setAttribute("stroke-width", String(p.strokeWidth));
        branch.setAttribute("vector-effect", "non-scaling-stroke");
        branch.setAttribute("stroke-miterlimit", "1");
        branch.setAttribute("data-element", "branch");
        branch.setAttribute("data-branch", String(branchIndex));
        branch.setAttribute("data-side", side);
        branch.setAttribute("data-offset", String(offIndex));
        (branch.style as any).shapeRendering = "geometricPrecision";
        g.appendChild(branch);
        stateRef.current.animationElements.push(branch);
      });
    });

    const r = p.hexR;
    let dPath = "";
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 3 * i - Math.PI / 6;
      const x = r * Math.cos(a);
      const y = yEnd + r * Math.sin(a);
      dPath += (i === 0 ? "M" : "L") + x + " " + y + " ";
    }
    dPath += "Z";
    const hex = document.createElementNS(svgns, "path");
    hex.setAttribute("d", dPath);
    hex.setAttribute("stroke", "var(--stroke-color)");
    hex.setAttribute("fill", "var(--fill-color)");
    hex.setAttribute("opacity", "0");
    hex.setAttribute("stroke-width", String(p.strokeWidth));
    hex.setAttribute("vector-effect", "non-scaling-stroke");
    hex.setAttribute("stroke-miterlimit", "1");
    hex.setAttribute("data-element", "hex");
    hex.setAttribute("data-branch", String(branchIndex));
    (hex.style as any).shapeRendering = "geometricPrecision";
    g.appendChild(hex);
    stateRef.current.animationElements.push(hex);
    stateRef.current.hexElements.push(hex);

    const txt = document.createElementNS(svgns, "text");
    txt.setAttribute("x", "0"); txt.setAttribute("y", String(yEnd));
    txt.setAttribute("fill", "var(--text-color)");
    txt.setAttribute("font-weight", "800");
    txt.setAttribute("opacity", "0");
    txt.setAttribute("font-size", String(p.fontSize));
    txt.setAttribute("data-element", "text");
    txt.setAttribute("data-branch", String(branchIndex));
    txt.setAttribute("text-anchor", "middle");
    txt.setAttribute("dominant-baseline", "central");
    txt.setAttribute("font-family", "serif");
    (txt.style as any).textRendering = "geometricPrecision";
    txt.textContent = text;
    g.appendChild(txt);
    stateRef.current.animationElements.push(txt);

    const hexTipY = yEnd - r;
    if (p.extLen > 0) {
      const ext = document.createElementNS(svgns, "line");
      ext.setAttribute("x1", "0"); ext.setAttribute("y1", String(hexTipY));
      ext.setAttribute("x2", "0"); ext.setAttribute("y2", String(hexTipY - p.extLen + p.capR + 2));
      ext.setAttribute("stroke", "var(--stroke-color)");
      ext.setAttribute("fill", "none");
      ext.setAttribute("stroke-linecap", "round");
      ext.setAttribute("stroke-linejoin", "round");
      ext.setAttribute("opacity", "0");
      ext.setAttribute("stroke-width", String(p.strokeWidth));
      ext.setAttribute("vector-effect", "non-scaling-stroke");
      ext.setAttribute("stroke-miterlimit", "1");
      ext.setAttribute("data-element", "extension");
      ext.setAttribute("data-branch", String(branchIndex));
      (ext.style as any).shapeRendering = "geometricPrecision";
      g.appendChild(ext);
      stateRef.current.animationElements.push(ext);
    }

    const capY = hexTipY - p.extLen;
    if (p.capR > 0) {
      const cap = document.createElementNS(svgns, "circle");
      cap.setAttribute("cx", "0"); cap.setAttribute("cy", String(capY));
      cap.setAttribute("r", String(p.capR));
      cap.setAttribute("stroke", "var(--stroke-color)");
      cap.setAttribute("fill", "var(--fill-color)");
      cap.setAttribute("opacity", "0");
      cap.setAttribute("stroke-width", String(p.strokeWidth));
      cap.setAttribute("vector-effect", "non-scaling-stroke");
      cap.setAttribute("data-element", "cap");
      cap.setAttribute("data-role", "cap");
      (cap.style as any).shapeRendering = "geometricPrecision";
      g.appendChild(cap);
      stateRef.current.animationElements.push(cap);
      stateRef.current.capElements.push(cap);

      const capNucleus = document.createElementNS(svgns, "circle");
      capNucleus.setAttribute("cx", "0");
      capNucleus.setAttribute("cy", String(capY));
      capNucleus.setAttribute("r", String(Math.max(1.5, p.capR * 0.22)));
      capNucleus.setAttribute("fill", "var(--stroke-color)");
      capNucleus.setAttribute("opacity", "0");
      capNucleus.setAttribute("data-element", "cap-nucleus");
      capNucleus.setAttribute("data-branch", String(branchIndex));
      (capNucleus.style as any).shapeRendering = "geometricPrecision";
      g.appendChild(capNucleus);
      stateRef.current.animationElements.push(capNucleus);
    }

    return g;
  }

  function drawSet(target: SVGGElement, p: Params, layerName: "layer1" | "layer2") {
    const akazaKanji = ["破","壊","殺","術","式","展"];
    for (let i = 0; i < 6; i++) {
      const branch = makeBranch(i * 60, akazaKanji[i], p, i + (layerName === "layer2" ? 6 : 0));
      target.appendChild(branch);
    }
  }

  function createGradients(svg: SVGSVGElement) {
    const defs = svg.querySelector('defs') || document.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (!svg.querySelector('defs')) svg.appendChild(defs);

    defs.innerHTML = `
      <filter id="akaza-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="1.2" intercept="0"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:var(--stroke-color);stop-opacity:1" />
        <stop offset="50%" style="stop-color:var(--text-color);stop-opacity:0.95" />
        <stop offset="100%" style="stop-color:var(--stroke-color);stop-opacity:0.92" />
      </linearGradient>
      <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%">
        <stop offset="0%" style="stop-color:var(--stroke-color);stop-opacity:1" />
        <stop offset="50%" style="stop-color:var(--text-color);stop-opacity:0.97" />
        <stop offset="100%" style="stop-color:var(--stroke-color);stop-opacity:1" />
      </linearGradient>
    `;
  }

  function setupSnowflake() {
    const layer1 = layer1Ref.current!;
    const layer2 = layer2Ref.current!;
    const centerDot = centerDotRef.current!;
    const svg = svgRef.current!;

    stateRef.current.animationElements = [];
    stateRef.current.hexElements = [];
    stateRef.current.capElements = [];

    while (layer1.firstChild) layer1.removeChild(layer1.firstChild);
    while (layer2.firstChild) layer2.removeChild(layer2.firstChild);

    createGradients(svg);

    centerDot.setAttribute("r", String(P.centerR));
    centerDot.setAttribute("stroke", "var(--stroke-color)");
    centerDot.setAttribute("fill", "var(--fill-color)");
    centerDot.setAttribute("opacity", "0");
    centerDot.setAttribute("stroke-width", String(P.strokeWidth));
    centerDot.setAttribute("vector-effect", "non-scaling-stroke");
    centerDot.setAttribute("data-role", "center");
    (centerDot.style as any).shapeRendering = "geometricPrecision";
    stateRef.current.animationElements.push(centerDot);

    drawSet(layer1, P, "layer1");
    const P2 = scaledParams(P, P.scale);
    drawSet(layer2, P2, "layer2");

    layer2.setAttribute("transform", `translate(${P.tx} ${P.ty}) rotate(${P.rot})`);
    layer1.setAttribute("filter", "url(#akaza-glow)");
    layer2.setAttribute("filter", "url(#akaza-glow)");
  }

  function smoothFadeIn(el: Element, dur = 400, delay = 0, nat = true): Promise<void> {
    return new Promise<void>((resolve) => {
      const t = window.setTimeout(() => {
        const d = nat ? nDur(spd(dur), 0.12) : spd(dur);
        const a = (el as HTMLElement).animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: d, easing: EZ_SMOOTH, fill: "forwards", delay: 0 }
        );
        trackAnim(a);
        a.addEventListener("finish", () => resolve());
      }, nat ? nDelay(spd(delay), 0.2) : spd(delay));
      trackTimer(t);
    });
  }

  async function startSpreadAnimation(): Promise<void> {
    const centerDot = centerDotRef.current!;
    const els = stateRef.current.animationElements;
    els.forEach((el) => ((el as HTMLElement).style.opacity = "0"));

    const compass = compassRef.current!;
    compass.className = [
      "absolute inset-0 pointer-events-none opacity-0 rounded-full z-0",
      "bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,20,147,0.15)_0deg,rgba(255,20,147,0.03)_60deg,rgba(255,20,147,0.15)_120deg,rgba(255,20,147,0.03)_180deg,rgba(255,20,147,0.15)_240deg,rgba(255,20,147,0.03)_300deg,rgba(255,20,147,0.15)_360deg)]",
      "will-change-transform transform-gpu"
    ].join(" ");
    applyCircularMask(compass);

    trackAnim(compass.animate(
      [
        { opacity: 0, transform: "rotate(0deg)" },
        { opacity: 0.25, transform: "rotate(26deg)" }
      ],
      { duration: nDur(spd(820), 0.1), fill: "forwards", easing: EZ_NATURAL }
    ));

    const energyField = energyFieldRef.current!;
    energyField.className = [
      "absolute inset-0 pointer-events-none opacity-0 rounded-full z-0",
      "bg-[radial-gradient(circle_at_50%_50%,rgba(255,20,147,0.09)_0%,rgba(255,20,147,0.045)_40%,rgba(255,20,147,0.018)_80%,transparent_100%)]",
      "will-change-transform transform-gpu"
    ].join(" ");
    applyCircularMask(energyField);

    trackAnim(energyField.animate(
      [
        { opacity: 0, transform: "rotate(0deg)" },
        { opacity: 0.18, transform: "rotate(42deg)" }
      ],
      { duration: nDur(spd(900), 0.1), fill: "forwards", easing: EZ_NATURAL }
    ));

    await smoothFadeIn(centerDot, 520, T.spreadStartDelay);
    const glowColor = stateRef.current.theme === "pink" ? "var(--glow-pink)" : "var(--glow-blue)";
    (centerDot as SVGCircleElement).style.filter = `drop-shadow(0 0 12px ${glowColor})`;

    const aura = auraRef.current!;
    aura.className = [
      "absolute inset-0 pointer-events-none opacity-0 rounded-full z-10",
      "bg-[radial-gradient(circle_at_50%_50%,var(--glow-pink-soft)_0%,transparent_72%)]",
      "will-change-transform transform-gpu"
    ].join(" ");
    applyCircularMask(aura, 0.55, 0.78);

    await new Promise(r => { const t = setTimeout(r, nDelay(spd(T.spreadStep), 0.2)); trackTimer(t as unknown as number); });
    const mainLines = els.filter(el => el.getAttribute("data-element") === "main-line");
    await Promise.all(mainLines.map((el, i) => {
      (el as HTMLElement).style.filter = `drop-shadow(0 0 6px ${glowColor})`;
      const a = (el as HTMLElement).animate(
        [
          { opacity: 0, strokeDasharray: "0 1000" },
          { opacity: 0.35, strokeDasharray: "200 800", offset: 0.3 },
          { opacity: 1, strokeDasharray: "1000 0" }
        ],
        { duration: nDur(spd(520), 0.15), delay: nDelay(i * 35, 0.3), easing: EZ_NATURAL, fill: "forwards" }
      );
      trackAnim(a);
      return new Promise(res => a.addEventListener("finish", () => res(undefined)));
    }));

    await new Promise(r => { const t = setTimeout(r, nDelay(spd(T.spreadStep), 0.2)); trackTimer(t as unknown as number); });
    const hexes = stateRef.current.hexElements;
    await Promise.all(hexes.map((hex, i) => {
      const a = (hex as HTMLElement).animate(
        [
          { opacity: 0, transform: "scale(0.7)" },
          { opacity: 1, transform: "scale(1.05)", offset: 0.6 },
          { opacity: 1, transform: "scale(1)" }
        ],
        { duration: nDur(spd(450), 0.18), delay: nDelay(i * T.hexStagger, 0.25), easing: EZ_NATURAL, fill: "forwards" }
      );
      trackAnim(a);
      return new Promise(res => a.addEventListener("finish", () => res(undefined)));
    }));

    await new Promise(r => { const t = setTimeout(r, nDelay(spd(T.spreadStep), 0.2)); trackTimer(t as unknown as number); });
    const branches = els.filter(el => el.getAttribute("data-element") === "branch");
    await Promise.all(branches.map((b, i) => {
      (b as HTMLElement).style.filter = `drop-shadow(0 0 4px ${glowColor})`;
      const a = (b as HTMLElement).animate(
        [
          { opacity: 0, strokeDasharray: "0 100" },
          { opacity: 1, strokeDasharray: "100 0" }
        ],
        { duration: nDur(spd(380), 0.2), delay: nDelay(i * 28, 0.25), easing: EZ_NATURAL, fill: "forwards" }
      );
      trackAnim(a);
      return new Promise(res => a.addEventListener("finish", () => res(undefined)));
    }));

    await new Promise(r => { const t = setTimeout(r, nDelay(spd(T.spreadStep), 0.2)); trackTimer(t as unknown as number); });
    const exts = els.filter(el => {
      const k = el.getAttribute("data-element");
      return k === "extension" || k === "cap";
    });
    await Promise.all(exts.map((e, i) => {
      const a = (e as HTMLElement).animate(
        [
          { opacity: 0, transform: "scale(0.8)" },
          { opacity: 1, transform: "scale(1)" }
        ],
        { duration: nDur(spd(320), 0.15), delay: nDelay(i * 20, 0.25), easing: EZ_NATURAL, fill: "forwards" }
      );
      trackAnim(a);
      return new Promise(res => a.addEventListener("finish", () => res(undefined)));
    }));

    const capDots = els.filter(el => el.getAttribute("data-element") === "cap-nucleus");
    await Promise.all(capDots.map((e, i) => smoothFadeIn(e, 220, i * 14)));

    await new Promise(r => { const t = setTimeout(r, nDelay(spd(T.spreadStep), 0.2)); trackTimer(t as unknown as number); });
    const texts = els.filter(el => el.getAttribute("data-element") === "text");
    await Promise.all(texts.map((d, i) => {
      (d as HTMLElement).style.filter = `drop-shadow(0 0 6px ${glowColor})`;
      (d as HTMLElement).style.textRendering = "geometricPrecision";
      return smoothFadeIn(d, 360, i * nDelay(24, 0.25));
    }));
  }

  async function startHexGlowSequence(): Promise<void> {
    const hexes = [...stateRef.current.hexElements];
    const svg = svgRef.current!;
    const glowColor = stateRef.current.theme === "pink" ? "var(--glow-pink)" : "var(--glow-blue)";

    const compass = compassRef.current!;
    trackAnim(compass.animate(
      [{ transform: "rotate(26deg)" }, { transform: "rotate(388deg)" }],
      { duration: nDur(spd(T.hexPulse * hexes.length * 0.8), 0.1), easing: "linear", fill: "forwards" }
    ));

    await Promise.all(hexes.map((hex, i) =>
      new Promise<void>((resolve) => {
        const t = window.setTimeout(() => {
          const a = (hex as HTMLElement).animate(
            [
              { filter: `drop-shadow(0 0 4px ${glowColor})` },
              { filter: `drop-shadow(0 0 14px ${glowColor})` },
              { filter: `drop-shadow(0 0 8px ${glowColor})` },
            ],
            { duration: nDur(spd(T.hexPulse), 0.12), easing: EZ_NATURAL, fill: "forwards" }
          );
          trackAnim(a);
          a.addEventListener("finish", () => resolve());
        }, i * nDelay(spd(T.hexStagger), 0.25));
        trackTimer(t);
      })
    ));

    const a = svg.animate(
      [
        { filter: `drop-shadow(0 0 10px ${glowColor})` },
        { filter: `drop-shadow(0 0 20px ${glowColor})` },
        { filter: `drop-shadow(0 0 12px ${glowColor})` }
      ],
      { duration: nDur(spd(700), 0.1), fill: "forwards", easing: EZ_OUT }
    );
    trackAnim(a);
    await new Promise(res => a.addEventListener("finish", () => res(undefined)));
  }

  async function transitionExplosion(): Promise<void> {
    const host = rootRef.current!;
    const explosionContainer = document.createElement('div');
    explosionContainer.className = 'fixed inset-0 pointer-events-none z-[9999] overflow-visible mix-blend-screen';
    host.appendChild(explosionContainer);

    const anticip = host.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.98)", offset: 0.3 },
        { transform: "scale(1)" }
      ],
      { duration: nDur(160, 0.05), easing: EZ_NATURAL, fill: "none" }
    );
    trackAnim(anticip);

    const waveCount = 3; // Increased for HD effect
    for (let wave = 0; wave < waveCount; wave++) {
      const ring = document.createElement('div');
      ring.className = [
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "pointer-events-none aspect-square h-[65vmin] rounded-full", // Increased size
        "bg-[radial-gradient(circle_at_50%_50%,rgba(255,20,147,0.18)_0%,rgba(255,20,147,0.08)_70%,transparent_100%)]",
        "will-change-transform transform-gpu"
      ].join(" ");
      explosionContainer.appendChild(ring);

      const grow = ring.animate(
        [
          { opacity: 0, transform: "translate(-50%, -50%) scale(0.3)" },
          { opacity: 0.85, transform: "translate(-50%, -50%) scale(1.2)", offset: 0.4 },
          { opacity: 0.35, transform: "translate(-50%, -50%) scale(2.4)", offset: 0.8 },
          { opacity: 0, transform: "translate(-50%, -50%) scale(3.2)" }
        ],
        { duration: nDur(950 - wave * 120, 0.1), delay: nDelay(80 + wave * 110, 0.1), easing: EZ_NATURAL, fill: "forwards" }
      );
      trackAnim(grow);
    }

    for (let i = 0; i < 8; i++) { // Increased count
      const angle = i * 45 + rrange(-8, 8);
      const stream = document.createElement('div');
      const length = 38 + rrange(-6, 6); // Increased length
      stream.className = [
        "absolute left-1/2 top-1/2 -translate-x-1/2 origin-top pointer-events-none",
        `h-[${length}vh] w-[4px]`, // Increased width
        "bg-[linear-gradient(to_bottom,rgba(255,20,147,0.9)_0%,rgba(255,20,147,0.5)_50%,transparent_100%)]",
        "shadow-[0_0_12px_rgba(255,20,147,0.5)]", // Enhanced shadow
        `rotate-[${angle}deg]`,
        "rounded-full opacity-0",
        "will-change-transform transform-gpu"
      ].join(" ");
      explosionContainer.appendChild(stream);

      const streamAnim = stream.animate(
        [
          { opacity: 0, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(0) scaleX(0.5)` },
          { opacity: 0.95, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(0.85) scaleX(1)`, offset: 0.3 },
          { opacity: 0.65, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(1.25) scaleX(0.8)`, offset: 0.7 },
          { opacity: 0, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(1.6) scaleX(0.6)` }
        ],
        { duration: nDur(800, 0.12), delay: nDelay(i * 45, 0.2), easing: EZ_NATURAL, fill: "forwards" }
      );
      trackAnim(streamAnim);
    }

    const particleHolder = document.createElement('div');
    particleHolder.className = "absolute inset-0 pointer-events-none";
    explosionContainer.appendChild(particleHolder);
    const particles = 20; // Increased particles
    for (let p = 0; p < particles; p++) {
      const baseAngle = (360 / particles) * p;
      const angle = baseAngle + rrange(-12, 12);
      const particle = document.createElement('div');
      const size = 0.4 + rrange(-0.15, 0.15); // Slightly larger
      particle.className = [
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        `h-[${size}vh] w-[${size}vh] rounded-full`,
        "bg-[radial-gradient(circle,rgba(255,105,180,0.95)_0%,rgba(255,105,180,0.4)_60%,transparent_100%)]",
        `rotate-[${angle}deg]`,
        "will-change-transform transform-gpu"
      ].join(" ");
      particleHolder.appendChild(particle);

      const dist = 20 + rrange(-5, 5); // Increased distance
      const particleAnim = particle.animate(
        [
          { opacity: 0, transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(0) scale(0.8)` },
          { opacity: 0.85, transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${dist * 0.6}vmin) scale(1)`, offset: 0.4 },
          { opacity: 0.45, transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${dist}vmin) scale(0.9)`, offset: 0.8 },
          { opacity: 0, transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${dist * 1.2}vmin) scale(0.7)` }
        ],
        { duration: nDur(850 + rrange(-120, 120), 0.15), delay: nDelay(60 + (p % 5) * 25, 0.25), easing: EZ_OUT, fill: "forwards" }
      );
      trackAnim(particleAnim);
    }

    await new Promise(resolve => {
      const t = window.setTimeout(() => {
        if (explosionContainer.parentNode) explosionContainer.parentNode.removeChild(explosionContainer);
        resolve(undefined);
      }, 1300);
      trackTimer(t);
    });
  }

  async function switchThemeToBlueWoosh(): Promise<void> {
    const svg = svgRef.current!;

    const explosionPromise = transitionExplosion();

    const a1 = svg.animate(
      [
        { filter: "drop-shadow(0 0 12px var(--glow-pink))" },
        { filter: "drop-shadow(0 0 28px var(--glow-pink)) drop-shadow(0 0 24px var(--glow-blue))" },
        { filter: "drop-shadow(0 0 15px var(--glow-blue))" },
      ],
      { duration: nDur(T.woosh, 0.1), easing: EZ_NATURAL, fill: "forwards" }
    );
    trackAnim(a1);

    const compass = compassRef.current!;
    trackAnim(compass.animate(
      [{ transform: "rotate(388deg)" }, { transform: "rotate(540deg)" }],
      { duration: nDur(T.woosh, 0.1), easing: EZ_NATURAL, fill: "forwards" }
    ));

    await new Promise(r => {
      const t = setTimeout(r, nDelay(T.wooshBetween, 0.15));
      trackTimer(t as unknown as number);
    });

    const root = rootRef.current!;
    stateRef.current.theme = "blue";
    (root.style as any).setProperty("--stroke-color", AKAZA_BLUE.stroke);
    (root.style as any).setProperty("--text-color", AKAZA_BLUE.text);
    (root.style as any).setProperty("--fill-color", AKAZA_BLUE.fill);

    if (compassRef.current) {
      compassRef.current.className = [
        "absolute inset-0 pointer-events-none opacity-0 rounded-full z-0",
        "bg-[conic-gradient(from_0deg_at_50%_50%,rgba(0,229,255,0.15)_0deg,rgba(0,229,255,0.03)_60deg,rgba(0,229,255,0.15)_120deg,rgba(0,229,255,0.03)_180deg,rgba(0,229,255,0.15)_240deg,rgba(0,229,255,0.03)_300deg,rgba(0,229,255,0.15)_360deg)]",
        "will-change-transform transform-gpu"
      ].join(" ");
      applyCircularMask(compassRef.current);
    }
    if (energyFieldRef.current) {
      energyFieldRef.current.className = [
        "absolute inset-0 pointer-events-none opacity-0 rounded-full z-0",
        "bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.09)_0%,rgba(0,229,255,0.045)_40%,rgba(0,229,255,0.018)_80%,transparent_100%)]",
        "will-change-transform transform-gpu"
      ].join(" ");
      applyCircularMask(energyFieldRef.current);
    }
    if (auraRef.current) {
      auraRef.current.className = [
        "absolute inset-0 pointer-events-none opacity-0 rounded-full z-10",
        "bg-[radial-gradient(circle_at_50%_50%,var(--glow-blue-soft)_0%,transparent_72%)]",
        "will-change-transform transform-gpu"
      ].join(" ");
      applyCircularMask(auraRef.current, 0.55, 0.78);
    }

    createGradients(svg);

    const els = stateRef.current.animationElements;
    els.forEach((el) => {
      const role = el.getAttribute("data-element");
      const baseGlow = role === "branch" ? 4 : role === "main-line" ? 6 : role === "text" ? 6 : 8;
      (el as HTMLElement).style.filter = `drop-shadow(0 0 ${baseGlow}px var(--glow-blue))`;
    });

    const aura = auraRef.current!;
    const a3 = aura.animate([{ opacity: 0.2 }, { opacity: 0.28 }],
      { duration: nDur(380, 0.1), fill: "forwards", easing: EZ_NATURAL });
    trackAnim(a3);

    await Promise.all([
      new Promise(res => a1.addEventListener("finish", () => res(undefined))),
      new Promise(res => a3.addEventListener("finish", () => res(undefined))),
      explosionPromise,
    ]);
  }

  async function blueBoom(): Promise<void> {
    const ring = ringRef.current!;
    const aura = auraRef.current!;
    const svg = svgRef.current!;
    const compass = compassRef.current!;
    const energyField = energyFieldRef.current!;

    const auraDown = aura.animate(
      [{ opacity: 0.28 }, { opacity: 0.15 }],
      { duration: nDur(150, 0.05), fill: "forwards", easing: EZ_NATURAL }
    );
    trackAnim(auraDown);

    ring.className = [
      "absolute inset-0 pointer-events-none opacity-0 rounded-full z-20 mix-blend-screen",
      "bg-[radial-gradient(circle_at_50%_50%,var(--glow-blue)_0%,rgba(0,229,255,0.6)_20%,rgba(0,229,255,0.25)_50%,transparent_80%)]",
      "will-change-transform transform-gpu"
    ].join(" ");
    applyCircularMask(ring, 0.5, 0.85);

    const a1 = ring.animate(
      [
        { opacity: 0, transform: "scale(0.2)" },
        { opacity: 0.7, transform: "scale(1.5)", offset: 0.45 },
        { opacity: 0.4, transform: "scale(2.6)", offset: 0.82 },
        { opacity: 0, transform: "scale(3.6)" },
      ],
      { duration: nDur(T.boom, 0.1), easing: EZ_NATURAL, fill: "forwards" }
    );
    trackAnim(a1);

    const a2 = compass.animate(
      [
        { opacity: 0.25, transform: "rotate(540deg) scale(1)" },
        { opacity: 0.45, transform: "rotate(720deg) scale(1.02)" },
        { opacity: 0, transform: "rotate(900deg) scale(1)" },
      ],
      { duration: nDur(T.boom, 0.1), easing: EZ_NATURAL, fill: "forwards" }
    );
    trackAnim(a2);

    const a3 = energyField.animate(
      [
        { opacity: 0.18, transform: "rotate(45deg)" },
        { opacity: 0.35, transform: "rotate(-90deg)" },
        { opacity: 0, transform: "rotate(-270deg)" },
      ],
      { duration: nDur(Math.round(T.boom * 1.08), 0.1), easing: EZ_NATURAL, fill: "forwards" }
    );
    trackAnim(a3);

    const a4 = svg.animate(
      [
        { filter: "drop-shadow(0 0 15px var(--glow-blue))" },
        { filter: "drop-shadow(0 0 30px var(--glow-blue))" },
        { filter: "drop-shadow(0 0 18px var(--glow-blue))" },
      ],
      { duration: nDur(T.boom, 0.1), easing: EZ_INOUT, fill: "forwards" }
    );
    trackAnim(a4);

    spawnNaturalEnergyBurst();

    await Promise.all([
      new Promise(res => a1.addEventListener("finish", () => res(undefined))),
      new Promise(res => a2.addEventListener("finish", () => res(undefined))),
      new Promise(res => a3.addEventListener("finish", () => res(undefined))),
      new Promise(res => a4.addEventListener("finish", () => res(undefined))),
      new Promise(res => auraDown.addEventListener("finish", () => res(undefined))),
    ]);
  }

  function spawnNaturalEnergyBurst() {
    const host = rootRef.current!;
    const burstContainer = document.createElement('div');
    burstContainer.className = 'fixed inset-0 pointer-events-none z-[9999] overflow-visible mix-blend-screen';
    host.appendChild(burstContainer);

    const energyWave = document.createElement('div');
    energyWave.className = [
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      "pointer-events-none aspect-square h-[60vmin]", // Increased size
      "bg-[radial-gradient(circle_at_50%_50%,rgba(0,234,255,0.3)_0%,rgba(0,234,255,0.15)_40%,rgba(0,234,255,0.06)_70%,transparent_100%)]",
      "rounded-full will-change-transform transform-gpu"
    ].join(" ");
    burstContainer.appendChild(energyWave);

    const waveAnimation = energyWave.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4) rotate(0deg)' },
        { opacity: 0.9, transform: 'translate(-50%, -50%) scale(1.15) rotate(30deg)', offset: 0.35 },
        { opacity: 0.45, transform: 'translate(-50%, -50%) scale(2.4) rotate(90deg)', offset: 0.75 },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(3.8) rotate(150deg)' }
      ],
      { duration: nDur(1000, 0.1), easing: EZ_NATURAL, fill: 'forwards' }
    );
    trackAnim(waveAnimation);

    for (let i = 0; i < 10; i++) { // Increased count
      const base = i * 36;
      const angle = base + rrange(-10, 10);
      const flow = document.createElement('div');
      const length = 35 + rrange(-7, 7); // Increased variation
      const width = 2 + rrange(-0.4, 0.4); // Increased width
      flow.className = [
        "absolute left-1/2 top-1/2 -translate-x-1/2 origin-top pointer-events-none",
        `h-[${length}vh] w-[${width}px]`,
        "bg-[linear-gradient(to_bottom,rgba(0,234,255,0.95)_0%,rgba(0,234,255,0.5)_60%,transparent_100%)]",
        "shadow-[0_0_8px_rgba(0,234,255,0.6)]", // Enhanced shadow
        `rotate-[${angle}deg]`,
        "rounded-full will-change-transform transform-gpu"
      ].join(" ");
      burstContainer.appendChild(flow);

      const flowAnimation = flow.animate(
        [
          { opacity: 0, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(0) scaleX(0.6)` },
          { opacity: 0.95, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(0.75) scaleX(1)`, offset: 0.4 },
          { opacity: 0.55, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(1.15) scaleX(0.8)`, offset: 0.75 },
          { opacity: 0, transform: `translate(-50%, 0) rotate(${angle}deg) scaleY(1.5) scaleX(0.6)` }
        ],
        { duration: nDur(800 + rrange(-60, 60), 0.12), delay: nDelay((i % 5) * 30, 0.2), easing: EZ_NATURAL, fill: 'forwards' }
      );
      trackAnim(flowAnimation);
    }

    const t = window.setTimeout(() => {
      if (burstContainer.parentNode) burstContainer.parentNode.removeChild(burstContainer);
    }, 1500);
    trackTimer(t);
  }

  async function runOnce(): Promise<void> {
    const root = rootRef.current!;
    (root.style as any).setProperty("--stroke-color", AKAZA_PINK.stroke);
    (root.style as any).setProperty("--text-color", AKAZA_PINK.text);
    (root.style as any).setProperty("--fill-color", AKAZA_PINK.fill);
    stateRef.current.theme = "pink";

    ensureNoiseOverlay();

    if (compassRef.current) {
      compassRef.current.className = [
        "absolute inset-0 pointer-events-none opacity-0 z-0",
        "bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,20,147,0.15)_0deg,rgba(255,20,147,0.03)_60deg,rgba(255,20,147,0.15)_120deg,rgba(255,20,147,0.03)_180deg,rgba(255,20,147,0.15)_240deg,rgba(255,20,147,0.03)_300deg,rgba(255,20,147,0.15)_360deg)]",
        "will-change-transform transform-gpu"
      ].join(" ");
      applyCircularMask(compassRef.current);
    }
    if (energyFieldRef.current) {
      energyFieldRef.current.className = [
        "absolute inset-0 pointer-events-none opacity-0 z-0 rounded-full",
        "bg-[radial-gradient(circle_at_50%_50%,rgba(255,20,147,0.09)_0%,rgba(255,20,147,0.045)_40%,rgba(255,20,147,0.018)_80%,transparent_100%)]",
        "will-change-transform transform-gpu"
      ].join(" ");
      applyCircularMask(energyFieldRef.current);
    }
    if (auraRef.current) {
      auraRef.current.className = [
        "absolute inset-0 pointer-events-none opacity-0 z-10 rounded-full",
        "bg-[radial-gradient(circle_at_50%_50%,var(--glow-pink-soft)_0%,transparent_72%)]",
        "will-change-transform transform-gpu"
      ].join(" ");
      applyCircularMask(auraRef.current, 0.55, 0.78);
    }

    setupSnowflake();

    await new Promise(r => { const t = setTimeout(r, spd(T.startDelay)); trackTimer(t as unknown as number); });
    await startSpreadAnimation();
    await new Promise(r => { const t = setTimeout(r, spd(150)); trackTimer(t as unknown as number); });
    await startHexGlowSequence();
    await new Promise(r => { const t = setTimeout(r, spd(T.afterAllGlow)); trackTimer(t as unknown as number); });
    await new Promise(r => { const t = setTimeout(r, spd(T.beforeWooshBlue)); trackTimer(t as unknown as number); });
    await switchThemeToBlueWoosh();
    await new Promise(r => { const t = setTimeout(r, 200); trackTimer(t as unknown as number); });
    await blueBoom();

    setExiting(true);
    const c = containerRef.current!;
    const fadeOut = c.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0.75, transform: "scale(0.985)" },
        { opacity: 0, transform: "scale(0.96)" }
      ],
      { duration: nDur(1100, 0.06), easing: EZ_OUT, fill: "forwards" }
    );
    trackAnim(fadeOut);
    await new Promise(res => fadeOut.addEventListener("finish", () => res(undefined)));

    clearAllAsync();
    setExited(true);
    onFinish?.();
  }

  function restartLoopIfNeeded() {
    if (!LOOP) return;
    const t = window.setTimeout(() => {
      clearAllAsync();
      runOnce();
      restartLoopIfNeeded();
    }, TOTAL_LOADING_TIME + 1500);
    trackTimer(t);
  }

  useEffect(() => {
    runOnce();
    restartLoopIfNeeded();
    return () => { clearAllAsync(); };
  }, []);

  if (exited) return null;

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-visible bg--blue ${exiting ? "pointer-events-none" : ""}`}
      style={rootVars}
      aria-hidden={exiting}
      aria-label="Loading"
    >
      <div ref={compassRef} className="absolute inset-0 pointer-events-none opacity-0 z-0" />
      <div ref={energyFieldRef} className="absolute inset-0 pointer-events-none opacity-0 z-0" />

      <div
        ref={containerRef}
        className="relative w-screen h-screen flex items-center justify-center overflow-visible"
      >
        <div ref={auraRef} className="absolute inset-0 pointer-events-none opacity-0 z-10" />

        <svg
          ref={svgRef}
          viewBox="-300 -300 600 600"
          aria-label="Loading Animation"
          className="w-[min(80vw,80vh)] h-[min(80vw,80vh)] max-w-[600px] max-h-[600px] min-w-[320px] min-h-[320px] z-10"
          shapeRendering="geometricPrecision"
          style={{ 
            textRendering: "geometricPrecision",
            imageRendering: "crisp-edges"
          }}
        >
          <defs>
            <style>
              {`
                @media (max-width: 640px) {
                  text { font-size: 20px; }
                }
                @media (max-width: 480px) {
                  text { font-size: 18px; }
                }
                @media (min-width: 1200px) {
                  text { font-size: 28px; }
                }
              `}
            </style>
          </defs>
          <circle ref={centerDotRef} cx="0" cy="0" r="12" data-role="center" />
          <g ref={layer1Ref}></g>
          <g ref={layer2Ref}></g>
        </svg>

        <div
          ref={ringRef}
          className="absolute inset-0 pointer-events-none opacity-0 z-20 mix-blend-screen rounded-full
                    bg-[radial-gradient(circle_at_50%_50%,var(--glow-blue)_0%,rgba(0,229,255,0.6)_20%,rgba(0,229,255,0.25)_50%,transparent_80%)]" />
      </div>
    </div>
  );
};

export default LoadingScreen