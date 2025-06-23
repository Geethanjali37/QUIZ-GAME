import { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const animationFrameRef = useRef();

  const createNode = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speedX = (Math.random() - 0.5) * 0.5;
    const speedY = (Math.random() - 0.5) * 0.5;
    
    return { x, y, speedX, speedY };
  };

  const initNodes = () => {
    const numNodes = Math.floor((window.innerWidth * window.innerHeight) / 25000);
    nodesRef.current = Array.from({ length: numNodes }, createNode);
  };

  const drawNodes = () => {
    if (!containerRef.current) return;
    
    // Clear previous nodes and lines
    containerRef.current.innerHTML = '';
    
    // Draw nodes
    nodesRef.current.forEach((node) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'node';
      nodeEl.style.left = `${node.x}px`;
      nodeEl.style.top = `${node.y}px`;
      containerRef.current.appendChild(nodeEl);
    });

    // Draw lines between nearby nodes
    nodesRef.current.forEach((node1, i) => {
      nodesRef.current.slice(i + 1).forEach(node2 => {
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) { // Only connect nodes within 150px
          const line = document.createElement('div');
          line.className = 'line';
          
          const angle = Math.atan2(dy, dx);
          const width = distance;

          line.style.width = `${width}px`;
          line.style.left = `${node1.x}px`;
          line.style.top = `${node1.y}px`;
          line.style.transform = `rotate(${angle}rad)`;
          
          containerRef.current.appendChild(line);
        }
      });
    });
  };

  const updateNodes = () => {
    nodesRef.current = nodesRef.current.map(node => {
      let newX = node.x + node.speedX;
      let newY = node.y + node.speedY;

      // Bounce off edges
      if (newX < 0 || newX > window.innerWidth) node.speedX *= -1;
      if (newY < 0 || newY > window.innerHeight) node.speedY *= -1;

      newX = Math.max(0, Math.min(window.innerWidth, newX));
      newY = Math.max(0, Math.min(window.innerHeight, newY));

      return {
        ...node,
        x: newX,
        y: newY
      };
    });

    drawNodes();
    animationFrameRef.current = requestAnimationFrame(updateNodes);
  };

  useEffect(() => {
    initNodes();
    updateNodes();

    const handleResize = () => {
      initNodes();
      drawNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="network-background" />;
};

export default NetworkBackground; 