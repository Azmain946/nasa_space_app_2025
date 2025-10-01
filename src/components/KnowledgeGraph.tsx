import React, { useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

interface KnowledgeGraphProps {
  publicationId: number | string;
}


const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({publicationId}) => {
  const fgRef = useRef();
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });
  const [rawData, setRawData] = useState({
    nodes: [],
    edges: []
  });
  console.log(publicationId)
  // Transform the data for react-force-graph-2d
  const graphData = {
    nodes: rawData.nodes.map(node => ({
      id: node.id,
      name: node.label,
      tooltip: node.tooltip,
      val: 12 // Smaller node size
    })),
    links: rawData.edges.map(edge => ({
      source: edge.from,
      target: edge.to,
      label: edge.label
    }))
  };

  // No need for useEffect with d3Force anymore

  const handleNodeHover = (node, prevNode) => {
    if (node) {
      setTooltip({
        visible: true,
        x: 0,
        y: 0,
        content: `${node.name}: ${node.tooltip}`
      });
    } else {
      setTooltip({ visible: false, x: 0, y: 0, content: "" });
    }
  };

  const handleLinkHover = (link, prevLink) => {
    if (link) {
      setTooltip({
        visible: true,
        x: 0,
        y: 0,
        content: `${link.source.name} → ${link.target.name}: ${link.label}`
      });
    } else {
      setTooltip({ visible: false, x: 0, y: 0, content: "" });
    }
  };

  useEffect(() => {
      const fetchKnowledgeGraph = async () => {
        try {
          const response = await fetch(
            `https://www.syfuddhin.com/api/graph/${publicationId}`
          );
          if (!response.ok) throw new Error("Fetching failed!");
          const result = await response.json();
          setRawData(result)
        } catch (error) {
          console.error(error);
        }
      };
      fetchKnowledgeGraph();
    }, [publicationId]);

  return (
    <div className="publication-card">
      <div className="flex justify-between items-center mb-3">
        <div className="font-bold">Knowledge Graph</div>
        <div className="text-sm text-white/70">Interactive chart</div>
      </div>
      <div
        className="h-64 rounded-xl border border-white/5 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.02))",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.45)",
        }}
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={400}
          height={256}
          backgroundColor="transparent"
          
          // Node styling
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            
            // Draw node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.val/2, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2/globalScale;
            ctx.stroke();
            
            // Draw label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(label, node.x, node.y);
          }}
          
          // Link styling
          linkCanvasObject={(link, ctx, globalScale) => {
            const start = link.source;
            const end = link.target;
            
            // Draw link line
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1.5/globalScale;
            ctx.stroke();
            
            // Draw arrow
            const headlen = 4/globalScale; // Reduced arrow size
            const angle = Math.atan2(end.y - start.y, end.x - start.x);
            const arrowX = end.x - (end.val/2 + 3/globalScale) * Math.cos(angle);
            const arrowY = end.y - (end.val/2 + 3/globalScale) * Math.sin(angle);
            
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - headlen * Math.cos(angle - Math.PI/6), arrowY - headlen * Math.sin(angle - Math.PI/6));
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - headlen * Math.cos(angle + Math.PI/6), arrowY - headlen * Math.sin(angle + Math.PI/6));
            ctx.stroke();
            
            // Draw label
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            const fontSize = 10/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Rotate text along the link
            ctx.save();
            ctx.translate(midX, midY);
            ctx.rotate(angle);
            ctx.fillText(link.label, 0, -8/globalScale);
            ctx.restore();
          }}
          
          // Interactions
          onNodeHover={handleNodeHover}
          onLinkHover={handleLinkHover}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
            ctx.fill();
          }}
          
          // Physics
          cooldownTime={3000}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.1}
        />
        
        {/* Custom tooltip */}
        {tooltip.visible && (
          <div className="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 rounded max-w-xs z-10">
            {tooltip.content}
          </div>
        )}
        
        {/* Instructions */}
        <div className="absolute bottom-2 right-2 text-xs text-white/50">
          Hover nodes & edges for details
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
