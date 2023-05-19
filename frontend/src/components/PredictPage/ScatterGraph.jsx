import { useEffect, useRef } from "react";

import vis from "vis";

const ScatterGraph = ({ data }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    const draw3DScatterVisualization = () => {
      const visData = new vis.DataSet();

      for (const chain of data) {
        visData.add({
          x: chain["loose"],
          y: chain["broken"],
          z: chain["lost"],
          style: chain["viewpoint"],
        });
      }

      const options = {
        showLegend: false,
        width: "450px",
        height: "450px",
        style: "dot-color",
        dotSizeRatio: 0.015,
        showPerspective: true,
        showGrid: true,
        keepAspectRatio: false,
        verticalRatio: 1.0,
        legendLabel: "viewpoint",
        xLabel: "loose",
        yLabel: "broken",
        zLabel: "lost",
        cameraPosition: {
          horizontal: -0.5,
          vertical: 0.25,
          distance: 2.0,
        },
        backgroundColor: {
          // 그래프의 배경 색상 설정
          // stroke: "white",
          // background: "#f2f2f2",
        },
      };

      const container = graphRef.current;
      const graph = new vis.Graph3d(container, visData, options);
    };

    draw3DScatterVisualization();
  }, [data]);

  return <div style={{marginBottom: "20px"}} ref={graphRef} />;
};

export default ScatterGraph;
