import React, { useRef } from 'react';

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
    const putImage = (x: number, y: number, imgSrc: string) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
        let img = new Image();
        img.src = imgSrc;
        img.onload = function() {
             context.drawImage(img, x, y, img.width/2, img.height/2);
         }
        }
    };

    const canvasRef = useRef<HTMLCanvasElement>(null);
    return <canvas ref={canvasRef} height={height} width={width} className="avatar-editing-canvas"/>;
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Canvas;