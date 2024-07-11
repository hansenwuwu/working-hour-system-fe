import React, { useEffect, useState, useRef } from "react";
import cardTemplate from "../assets/images/card.jpg";

function CardGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = cardTemplate;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("Your Text Here", 50, 50); // 调整文本位置

      const dataUrl = canvas.toDataURL("image/png");
      setDownloadLink(dataUrl);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {downloadLink && (
        <a
          style={{ fontSize: "50px" }}
          href={downloadLink}
          download="modified-image.png"
        >
          Download Image
        </a>
      )}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default CardGenerator;
