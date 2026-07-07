import React, { useRef, useEffect } from "react";
import { getActiveIdx } from "./planetScroll";

const WARP_COUNT  = 600;
const WARP_SPEED  = 2.6;
const BG_STARS    = 4500;

const PLANETS = [
  {
    // Home — Ice-blue gas giant   ← tiny corner
    base: [0,50,110], mid: [0,90,170], glow: [0,212,255],
    rings: true, ringClr: [0,212,255],
    bands: [
      { off:-0.28, h:0.11, clr:[0,140,220],  a:0.26 },
      { off: 0.08, h:0.09, clr:[0,180,255],  a:0.20 },
      { off: 0.38, h:0.08, clr:[0,110,190],  a:0.22 },
    ],
    storm:{ offX:0.30, offY:-0.10, rF:0.22, clr:[80,200,255] },
    rotSpeed: 0.00006,
    xF:0.96, yF:0.82, rF:0.07,
  },
  {
    // Projects — replaced by the real 3D Venus model (see VenusPlanet.jsx)
    skip: true,
    xF:0.14, yF:0.52, rF:0.12,
  },
  {
    // Services — Quantum purple   ← RIGHT
    base:[38,8,78], mid:[88,28,148], glow:[124,58,237],
    rings: true, ringClr:[124,58,237],
    bands: [
      { off:-0.18, h:0.13, clr:[100,38,178], a:0.28 },
      { off: 0.22, h:0.09, clr:[ 58,18,138], a:0.22 },
    ],
    storm:{ offX:0.24, offY:-0.14, rF:0.18, clr:[160,90,255] },
    rotSpeed: 0.00018,
    xF:0.80, yF:0.48, rF:0.14,
  },
  {
    // Experience — Golden ringed  ← LEFT
    base:[115,75,0], mid:[178,128,8], glow:[255,215,0],
    rings: true, ringClr:[255,205,0],
    bands: [
      { off:-0.28, h:0.10, clr:[198,148,18], a:0.25 },
      { off: 0.10, h:0.12, clr:[155,108, 0], a:0.22 },
      { off: 0.38, h:0.08, clr:[218,168,28], a:0.20 },
    ],
    storm:{ offX:-0.22, offY: 0.12, rF:0.14, clr:[255,240,80] },
    rotSpeed: 0.00014,
    xF:0.16, yF:0.48, rF:0.13,
  },
  {
    // Contact — Emerald gas giant   ← RIGHT
    base:[5,62,72], mid:[10,115,125], glow:[0,215,185],
    rings: true, ringClr:[0,215,185],
    bands: [
      { off:-0.32, h:0.10, clr:[0,160,145],  a:0.30 },
      { off:-0.10, h:0.13, clr:[15,185,165], a:0.26 },
      { off: 0.14, h:0.10, clr:[0,140,130],  a:0.28 },
      { off: 0.36, h:0.08, clr:[10,170,155], a:0.22 },
    ],
    storm:{ offX:0.18, offY:0.08, rF:0.22, clr:[0,245,210] },
    rotSpeed: 0.00022,
    xF:0.82, yF:0.50, rF:0.15,
  },
];

// ── helpers ───────────────────────────────────────────────────────────────────
const c3  = (r,g,b,a=1) => a<1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
const ca  = ([r,g,b], a) => c3(r,g,b,a);
const lerp = (a,b,t)    => a + (b-a)*t;
const clamp= (v,lo,hi)  => Math.max(lo, Math.min(hi,v));

// ── static galaxy background (rendered once to offscreen canvas) ──────────────
function buildGalaxy(oc, w, h) {
  const ctx = oc.getContext("2d");
  ctx.clearRect(0, 0, w, h);

  // nebula clouds
  const nebulas = [
    { x:0.18, y:0.28, r:0.55, clr:[20, 5,80],  a:0.10 },
    { x:0.80, y:0.65, r:0.45, clr:[0, 35,100],  a:0.09 },
    { x:0.50, y:0.50, r:0.70, clr:[70,  5,55],  a:0.07 },
    { x:0.08, y:0.75, r:0.38, clr:[0,  55,75],  a:0.08 },
    { x:0.90, y:0.18, r:0.40, clr:[35,  0,80],  a:0.09 },
    { x:0.55, y:0.85, r:0.35, clr:[0,  80,110], a:0.07 },
  ];
  for (const n of nebulas) {
    const nx=n.x*w, ny=n.y*h, nr=n.r*Math.max(w,h);
    const g=ctx.createRadialGradient(nx,ny,0,nx,ny,nr);
    g.addColorStop(0,   c3(...n.clr, n.a));
    g.addColorStop(0.45,c3(...n.clr, n.a*0.5));
    g.addColorStop(1,   c3(...n.clr, 0));
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(nx,ny,nr,0,Math.PI*2); ctx.fill();
  }

  // dense star field with Milky Way band + colour variation
  for (let i=0; i<BG_STARS; i++) {
    let sx, sy;
    if (Math.random() < 0.42) {
      // Milky Way diagonal band
      const t = Math.random();
      sx = t * w;
      sy = (0.25 + t*0.50) * h + (Math.random()-0.5)*h*0.28;
    } else {
      sx = Math.random()*w;
      sy = Math.random()*h;
    }

    const size = Math.random()<0.82 ? Math.random()*0.9+0.2 : Math.random()*1.8+0.9;
    const b    = Math.pow(Math.random(), 0.55)*0.85+0.12;
    const cr   = Math.random();
    let sr, sg, sb;
    if      (cr<0.58) { sr=sg=sb=Math.round(210+b*45); }           // white
    else if (cr<0.80) { sr=Math.round(180+b*40); sg=Math.round(205+b*40); sb=255; } // blue-white
    else              { sr=255; sg=Math.round(215+b*40); sb=Math.round(140+b*60); } // warm

    ctx.fillStyle=`rgba(${sr},${sg},${sb},${b.toFixed(2)})`;
    const px=Math.round(sx), py=Math.round(sy), ps=Math.ceil(size);
    ctx.fillRect(px,py,ps,ps);

    // diffraction spikes on brighter stars
    if (size>1.4) {
      ctx.fillStyle=`rgba(${sr},${sg},${sb},${(b*0.28).toFixed(2)})`;
      ctx.fillRect(px-2,py,ps+4,ps);
      ctx.fillRect(px,py-2,ps,ps+4);
    }
  }

  // star clusters — dense glowing patches
  const clusters = [
    { x:0.12, y:0.18, n:120, spread:0.045 },
    { x:0.84, y:0.32, n:150, spread:0.055 },
    { x:0.40, y:0.78, n:100, spread:0.040 },
    { x:0.68, y:0.12, n:130, spread:0.050 },
    { x:0.25, y:0.60, n: 90, spread:0.038 },
    { x:0.72, y:0.88, n:110, spread:0.042 },
  ];
  for (const cl of clusters) {
    const cx=cl.x*w, cy=cl.y*h;
    // soft glow behind cluster
    const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,cl.spread*Math.min(w,h)*2.5);
    cg.addColorStop(0,'rgba(180,200,255,0.06)');
    cg.addColorStop(1,'rgba(180,200,255,0)');
    ctx.fillStyle=cg;
    ctx.beginPath(); ctx.arc(cx,cy,cl.spread*Math.min(w,h)*2.5,0,Math.PI*2); ctx.fill();

    for (let i=0; i<cl.n; i++) {
      const angle=Math.random()*Math.PI*2;
      const dist =Math.pow(Math.random(),0.45)*cl.spread*Math.min(w,h);
      const px2  =cx+Math.cos(angle)*dist;
      const py2  =cy+Math.sin(angle)*dist;
      const b2   =Math.random()*0.75+0.25;
      ctx.fillStyle=`rgba(210,225,255,${b2.toFixed(2)})`;
      ctx.fillRect(Math.round(px2),Math.round(py2),1,1);
    }
  }
}

// ── planet renderer ───────────────────────────────────────────────────────────
function drawPlanet(ctx, p, W, H, opacity, t) {
  if (opacity<=0.01) return;
  const x=p.xF*W, y=p.yF*H, r=p.rF*Math.min(W,H);
  ctx.save(); ctx.globalAlpha=opacity;

  // rear ring
  if (p.rings) {
    ctx.beginPath();
    ctx.ellipse(x, y+r*0.13, r*1.90, r*0.29, 0, Math.PI, Math.PI*2);
    ctx.strokeStyle=ca(p.ringClr,0.32); ctx.lineWidth=r*0.10; ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x, y+r*0.13, r*2.18, r*0.35, 0, Math.PI, Math.PI*2);
    ctx.strokeStyle=ca(p.ringClr,0.15); ctx.lineWidth=r*0.055; ctx.stroke();
  }

  // atmosphere glow
  const ag=ctx.createRadialGradient(x,y,r*0.82,x,y,r*1.48);
  ag.addColorStop(0,  ca(p.glow,0.22));
  ag.addColorStop(0.5,ca(p.glow,0.08));
  ag.addColorStop(1,  ca(p.glow,0));
  ctx.fillStyle=ag; ctx.beginPath(); ctx.arc(x,y,r*1.48,0,Math.PI*2); ctx.fill();

  // sphere
  ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.clip();

  // drifting specular highlight simulates Y-axis rotation
  const rotAngle = t * (p.rotSpeed || 0.0001);
  const hlX = x + Math.sin(rotAngle) * r * 0.22 - r * 0.18;
  const hlY = y - r * 0.26;

  const sg=ctx.createRadialGradient(hlX,hlY,0, x,y,r*1.05);
  sg.addColorStop(0,   ca(p.glow, 0.90));
  sg.addColorStop(0.28,ca(p.mid,  1));
  sg.addColorStop(0.72,ca(p.base, 1));
  sg.addColorStop(1,   'rgb(0,0,0)');
  ctx.fillStyle=sg; ctx.fillRect(x-r,y-r,r*2,r*2);

  const shift=Math.sin(t*0.00028)*0.045;
  for (const b of p.bands) {
    const by=y+(b.off+shift)*r, bh=b.h*r;
    const [br,bg2,bb]=b.clr;
    const bg=ctx.createLinearGradient(x-r,by,x+r,by);
    bg.addColorStop(0,  c3(br,bg2,bb,0));
    bg.addColorStop(0.2,c3(br,bg2,bb,b.a));
    bg.addColorStop(0.8,c3(br,bg2,bb,b.a));
    bg.addColorStop(1,  c3(br,bg2,bb,0));
    ctx.fillStyle=bg; ctx.fillRect(x-r,by-bh/2,r*2,bh);
  }

  // continents — rotated ellipses with hard centre, soft edge
  if (p.continents) {
    const cshift = Math.sin(t*0.00022)*0.025;
    for (const cnt of p.continents) {
      const cx2 = x + cnt.offX*r;
      const cy2 = y + (cnt.offY + cshift)*r;
      const rx  = cnt.rx*r, ry = cnt.ry*r;
      const maxR = Math.max(rx, ry);
      const [lr,lg,lb] = cnt.clr;

      ctx.save();
      ctx.translate(cx2, cy2);
      if (cnt.rot) ctx.rotate(cnt.rot);

      // gradient from solid centre → transparent edge for crisp-ish look
      const lg2 = ctx.createRadialGradient(0,0, maxR*0.35, 0,0, maxR);
      lg2.addColorStop(0,    c3(lr,lg,lb, cnt.a));
      lg2.addColorStop(0.72, c3(lr,lg,lb, cnt.a * 0.82));
      lg2.addColorStop(0.90, c3(lr,lg,lb, cnt.a * 0.28));
      lg2.addColorStop(1,    c3(lr,lg,lb, 0));
      ctx.fillStyle = lg2;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  // clouds — white wisps with breaks for realism
  if (p.clouds) {
    const cs = Math.sin(t*0.00036)*0.055;
    for (const cl of p.clouds) {
      const by = y + (cl.off + cs)*r;
      const bh = cl.h*r;
      // main wisp
      const cg = ctx.createLinearGradient(x-r, by, x+r, by);
      cg.addColorStop(0,    `rgba(255,255,255,0)`);
      cg.addColorStop(0.12, `rgba(255,255,255,${cl.a})`);
      cg.addColorStop(0.45, `rgba(255,255,255,${(cl.a*0.6).toFixed(2)})`);
      cg.addColorStop(0.60, `rgba(255,255,255,${cl.a})`);
      cg.addColorStop(0.88, `rgba(255,255,255,${cl.a})`);
      cg.addColorStop(1,    `rgba(255,255,255,0)`);
      ctx.fillStyle=cg; ctx.fillRect(x-r, by-bh/2, r*2, bh);
    }
  }

  if (p.storm) {
    // orbit the storm spot around the Y-axis at the planet's rotSpeed
    const sAngle  = t * (p.rotSpeed || 0.0001);
    const cosA    = Math.cos(sAngle);
    const visible = Math.max(0, cosA);           // fades as it wraps to back
    if (visible > 0.02) {
      const sx = x + p.storm.offX * r * cosA;   // X shrinks as spot goes to limb
      const sy = y + p.storm.offY * r;
      const sr = p.storm.rF * r * (0.4 + 0.6 * visible); // shrinks near edge
      const [sr2,sg3,sb]=p.storm.clr;
      const stg=ctx.createRadialGradient(sx,sy,0,sx,sy,sr);
      stg.addColorStop(0,  c3(sr2,sg3,sb, 0.42*visible));
      stg.addColorStop(0.5,c3(sr2,sg3,sb, 0.18*visible));
      stg.addColorStop(1,  c3(sr2,sg3,sb, 0));
      ctx.fillStyle=stg; ctx.beginPath();
      ctx.ellipse(sx,sy,sr,sr*0.52,0,0,Math.PI*2); ctx.fill();
    }
  }

  const limb=ctx.createRadialGradient(x,y,r*0.55,x,y,r);
  limb.addColorStop(0,'rgba(0,0,0,0)'); limb.addColorStop(1,'rgba(0,0,0,0.68)');
  ctx.fillStyle=limb; ctx.fillRect(x-r,y-r,r*2,r*2);
  ctx.restore();

  // front ring
  if (p.rings) {
    ctx.beginPath();
    ctx.ellipse(x,y+r*0.13,r*1.90,r*0.29,0,0,Math.PI);
    ctx.strokeStyle=ca(p.ringClr,0.55); ctx.lineWidth=r*0.10; ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x,y+r*0.13,r*2.18,r*0.35,0,0,Math.PI);
    ctx.strokeStyle=ca(p.ringClr,0.28); ctx.lineWidth=r*0.055; ctx.stroke();
  }

  ctx.restore();
}

// ── component ─────────────────────────────────────────────────────────────────
export default function Scene() {
  const canvasRef   = useRef(null);
  const offscreenRef= useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // offscreen canvas for static galaxy background
    const oc = document.createElement("canvas");
    offscreenRef.current = oc;

    let W, H, warpStars, animId;
    let activeIdx  = 0;
    let smoothIdx  = 0;
    let lastCheck  = 0;

    const spawnWarp = () => ({
      x: (Math.random()-0.5)*2,
      y: (Math.random()-0.5)*2,
      z: Math.random(),
      pz: null,
    });

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      oc.width = W; oc.height = H;
      buildGalaxy(oc, W, H);
      warpStars = Array.from({ length:WARP_COUNT }, spawnWarp);
    };

    const drawWarp = () => {
      const cx=W/2, cy=H/2;
      for (const s of warpStars) {
        const sx=cx+s.x*W*(1/s.z);
        const sy=cy+s.y*H*(1/s.z);
        if (s.pz!==null) {
          const px=cx+s.x*W*(1/s.pz);
          const py=cy+s.y*H*(1/s.pz);
          const b=Math.pow(1-s.z,1.5);
          ctx.strokeStyle=`rgba(${Math.round(180+b*75)},${Math.round(215+b*40)},255,${(b*0.85).toFixed(2)})`;
          ctx.lineWidth=Math.max(0.4,b*2.0);
          ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(sx,sy); ctx.stroke();
        }
        s.pz=s.z; s.z-=WARP_SPEED/W;
        if (s.z<=0.001||sx<0||sx>W||sy<0||sy>H) {
          Object.assign(s,spawnWarp()); s.z=1; s.pz=null;
        }
      }
    };

    const frame = (t) => {
      if (t-lastCheck>250) { activeIdx=getActiveIdx(); lastCheck=t; }
      smoothIdx = lerp(smoothIdx, activeIdx, 0.032);

      // trail fade (keeps warp star streaks)
      ctx.fillStyle="rgba(0,0,10,0.28)";
      ctx.fillRect(0,0,W,H);

      // galaxy background (static stars + nebula)
      ctx.drawImage(oc,0,0);

      // planets — one visible at a time, smooth blend
      for (let i=0;i<PLANETS.length;i++) {
        if (PLANETS[i].skip) continue;
        const opacity=clamp(1-Math.abs(smoothIdx-i),0,1);
        drawPlanet(ctx,PLANETS[i],W,H,opacity,t);
      }

      // warp stars on top
      drawWarp();

      animId=requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    animId=requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:"fixed", top:0, left:0,
        width:"100%", height:"100%",
        zIndex:-1, pointerEvents:"none",
      }}
    />
  );
}
