// islands/RippleBackground.tsx
import { useEffect, useRef, useState } from "preact/hooks";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number; // This refers to the property of the Ripple object
  opacity: number;
  speed: number;
  color: string;
  lineWidth: number;
}

interface RippleBackgroundProps {
  imageUrl: string;
  children?: preact.ComponentChildren;
  rippleColor?: string;
  rippleSpeed?: number;
  maxRippleRadius?: number; // This is the prop name
  rippleLineWidth?: number;
}

export default function RippleBackground(
  {
    imageUrl,
    children,
    rippleColor = "rgba(255, 255, 255, 0.3)",
    rippleSpeed = 0.5,
    maxRippleRadius = 60,
    rippleLineWidth = 2,
  }: RippleBackgroundProps,
) {
  const containerRef = useRef<HTMLDivElement>(null); // For mouse events and dimensions
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  // Removed imageLoaded state as background is CSS again
  
  useEffect(() => {
    console.log("RippleBackground (Overlay): useEffect triggered. Props:", { rippleColor, rippleSpeed, maxRippleRadius, rippleLineWidth });

    const canvas = canvasRef.current;
    const container = containerRef.current; // This is the div that will get mouse events
    if (!canvas || !container) {
      console.error("RippleBackground (Overlay): Canvas or container ref not available.");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("RippleBackground (Overlay): Failed to get 2D context from canvas.");
      return;
    }
    console.log("RippleBackground (Overlay): Canvas context obtained successfully.");

    const resizeCanvasAndContainer = () => {
      // Canvas takes dimensions from container
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      console.log(`RippleBackground (Overlay): Canvas resized to: ${canvas.width}w x ${canvas.height}h`);
    };

    resizeCanvasAndContainer(); // Initial resize

    const createRipple = (x: number, y: number) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: maxRippleRadius,
        opacity: 1,
        speed: rippleSpeed,
        color: rippleColor,
        lineWidth: rippleLineWidth,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Get mouse position relative to the container (which is also canvas parent)
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log(`RippleBackground: Mouse move on CONTAINER at (${x.toFixed(0)}, ${y.toFixed(0)})`);
      createRipple(x, y);
    };

    const animateRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 

      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += ripple.speed;
        ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius); 

        if (ripple.opacity > 0) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2, false);
          try {
            const baseColorMatch = ripple.color.match(/rgba?\(([^,]+),([^,]+),([^,]+)/);
            if (baseColorMatch) {
                const r = baseColorMatch[1];
                const g = baseColorMatch[2];
                const b = baseColorMatch[3];
                ctx.strokeStyle = `rgba(${r},${g},${b},${ripple.opacity.toFixed(2)})`;
            } else {
                ctx.strokeStyle = `rgba(255,255,255,${ripple.opacity.toFixed(2)})`;
                console.warn("RippleBackground (Overlay): Could not parse rippleColor. Using fallback.", ripple.color);
            }
          } catch (e) {
            console.error("RippleBackground (Overlay): Error setting strokeStyle", e, ripple.color);
            ctx.strokeStyle = `rgba(255,255,255,${ripple.opacity.toFixed(2)})`;
          }
          ctx.lineWidth = ripple.lineWidth;
          ctx.stroke();
          return true;
        }
        return false;
      });
      animationFrameIdRef.current = requestAnimationFrame(animateRipples);
    };

    console.log("RippleBackground (Overlay): Setting up event listeners and animation loop.");
    window.addEventListener("resize", resizeCanvasAndContainer);
    container.addEventListener("mousemove", handleMouseMove); // Attach to container
    animationFrameIdRef.current = requestAnimationFrame(animateRipples);

    return () => {
      console.log("RippleBackground (Overlay): Cleaning up.");
      window.removeEventListener("resize", resizeCanvasAndContainer);
      container.removeEventListener("mousemove", handleMouseMove); // Clean up from container
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [imageUrl, rippleColor, rippleSpeed, maxRippleRadius, rippleLineWidth]);

  return (
    <div
      ref={containerRef} // This div will have the background image and listen for mouse events
      class="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <canvas
        ref={canvasRef}
        class="absolute top-0 left-0 w-full h-full pointer-events-none" // Canvas is now purely for drawing, doesn't need pointer events
      >
      </canvas>
      {/* Content container no longer needs pointer-events-none */}
      <div class="absolute inset-0 min-h-screen flex flex-col justify-center items-center p-4 text-center z-10">
        {children}
      </div>
    </div>
  );
}
