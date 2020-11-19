import React, { useEffect, useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";

export const AvatarCanvas = () => {
  const canvasFaceRef = React.useRef<HTMLCanvasElement>(null);
  const canvasRestRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null
  );

  const rootStore = useContext(RootStoreContext);
  const { avatar } = rootStore.avatarStore;

  useEffect(() => {
    if (canvasFaceRef.current) {
      const renderCtx = canvasFaceRef.current.getContext("2d");

      if (renderCtx) {
        setContext(renderCtx);
        let img = new Image();
        img.src = "avatars/elements/twarz.png";

        img.onload = function () {
          renderCtx.drawImage(img, 80, 120, img.width / 2, img.height / 2);
        };
      }
      if (canvasRestRef.current) {
        const renderRestCtx = canvasRestRef.current.getContext("2d");

        if (renderRestCtx) {
          setContext(renderRestCtx);
          let img = new Image();
          img.src = `avatars/elements/${avatar.clothes}.png`;
          img.onload = function () {
            renderRestCtx.drawImage(
              img,
              83,
              262,
              img.width / 2,
              img.height / 2
            );
          };

          let img2 = new Image();
          img2.src = `avatars/elements/${avatar.eyes}.png`;
          img2.onload = function () {
            renderRestCtx.drawImage(
              img2,
              85,
              100,
              img2.width / 2,
              img2.height / 2
            );
          };

          let img3 = new Image();
          img3.src = `avatars/elements/${avatar.hair}.png`;
          img3.onload = function () {
            renderRestCtx.drawImage(
              img3,
              137,
              60,
              img3.width / 2,
              img3.height / 2
            );
          };

          let img4 = new Image();
          img4.src = `avatars/elements/${avatar.eyebrows}.png`;
          img4.onload = function () {
            renderRestCtx.drawImage(
              img4,
              157,
              125,
              img4.width / 2,
              img4.height / 2
            );
          };

          let img5 = new Image();
          img5.src = `avatars/elements/${avatar.mouth}.png`;
          img5.onload = function () {
            renderRestCtx.drawImage(
              img5,
              155,
              230,
              img5.width / 2,
              img5.height / 2
            );
          };
        }
      }
    }
  }, [context, avatar]);

  return (
    <div>
      <h2>Twój avatar</h2>
      <div id="canvases">
        <canvas
          height={500}
          width={500}
          id="twarz"
          className="avatar-editing-canvas"
          ref={canvasFaceRef}
        />
        <canvas
          height={500}
          width={500}
          id="reszta"
          className="avatar-editing-canvas"
          ref={canvasRestRef}
        />
      </div>
    </div>
  );
};
