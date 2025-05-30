// islands/RippleBackground.tsx
import { useEffect, useRef } from "preact/hooks";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
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
  maxRippleRadius?: number; // Prop name
  rippleLineWidth?: number;
}

export default function RippleBackground(
  {
    imageUrl,
    children,
    rippleColor = "rgba(255, 255, 255, 0.3)",
    rippleSpeed = 0.5,
    maxRippleRadius = 70, // Default value for the prop
    rippleLineWidth = 1.5,
  }: RippleBackgroundProps,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current; 
    if (!canvas || !container) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resizeCanvasAndContainer = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvasAndContainer(); 

    const createRipple = (x: number, y: number) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: maxRippleRadius, // Use the prop value
        opacity: 1,
        speed: rippleSpeed,
        color: rippleColor,
        lineWidth: rippleLineWidth,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
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
            }
          } catch (e) {
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

    window.addEventListener("resize", resizeCanvasAndContainer);
    container.addEventListener("mousemove", handleMouseMove); 
    animationFrameIdRef.current = requestAnimationFrame(animateRipples);

    return () => {
      window.removeEventListener("resize", resizeCanvasAndContainer);
      container.removeEventListener("mousemove", handleMouseMove); 
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [imageUrl, rippleColor, rippleSpeed, maxRippleRadius, rippleLineWidth]);

  return (
    <div
      ref={containerRef} 
      class="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <canvas
        ref={canvasRef}
        class="absolute top-0 left-0 w-full h-full pointer-events-none" 
      >
      </canvas>
      <div class="absolute inset-0 min-h-screen flex flex-col justify-center items-center p-4 text-center z-10">
        {children}
      </div>
    </div>
  );
}
