import { useState, useRef, useEffect, useCallback } from "react";

import Resources from "./Resources.js";
import "./Canvas.css";
const defaultPos = 100;
const jumpLimit = 30;

function Canvas() {
  const [dino, setDino] = useState({
    x: 5,
    y: 100,
    speedY: 2,
  });

  const [cactus, setCactus] = useState({
    x: 600,
    y: 110,
    speedX: 2,
  })

  const [cactuses, setCactuses] = useState([])

  let [frame, setFrame] = useState(0);

  const [isJumping, setIsJumping] = useState(0);

  const canvasRef = useRef(null);

  const obstacle = useCallback((ctx) => {
    ctx.rect(cactus.x, cactus.y, 10, 40);
    console.log("cactus", cactus.x)
    if (cactus.x < 0) return setCactus({
      ...cactus, x: (cactus.x += 600)
    })
    setCactus({
      ...cactus, x: (cactus.x -= cactus.speedX)
    })
  }, [cactus])

  // const obstacles = useCallback((ctx) => {
  //   console.log("cactuses", cactuses)
  //   if (cactuses.length === 0) {
  //     console.log("masuk ke kosong")
  //     setCactuses((cactuses) => [...cactuses, { x: 600 }])
  //   }
  //   if (frame % 100 === 0) {
  //     setCactuses([...cactuses, { x: 600 }])
  //   }
  //   for (let index in cactuses) {
  //     setCactuses([...cactuses, { x: cactuses[index].x -= 2 }])
  //     ctx.rect(cactuses[index].x, 110, 10, 40);
  //   }
  // }, [])

  const jump = () => {
    console.log("terbang")
    if (dino.y === defaultPos) {
      const upInterval = setInterval(() => {
        if (dino.y <= jumpLimit + dino.speedY) {
          console.log("masuk juga")
          clearInterval(upInterval);
          const downInterval = setInterval(() => {
            if (dino.y >= defaultPos - dino.speedY) {
              clearInterval(downInterval);
            }
            setDino({ ...dino, y: dino.y += dino.speedY })
          }, 10)
        }
        setDino({ ...dino, y: dino.y -= dino.speedY })
      }, 10)
    }
  };

  const clipping = useCallback(
    (ctx) => {
      if (true) {
        console.log(frame);
        ctx.font = "20px Inter";
        if (localStorage.getItem('hiScore')) ctx.fillText("Highest Score: " + localStorage.getItem('hiScore'), 300, 20);
        ctx.fillText("Score: " + frame, 480, 20);

        if (collision()) {
          ctx.fillText("Press space to restart", 220, 75);
        }

        const img = new Image();
        img.src =
          "https://raw.githubusercontent.com/kubowania/chrome-trex-game/master/t-rex.png";
        img.onload = () => {
          ctx.drawImage(img, dino.x, dino.y, 35, 50);
        };
      }
      if (false) {
        ctx.rect(5, dino.y, 10, 10);
      }
      setFrame(frame++);
    },
    []
  );

  const collision = useCallback(() => {
    let crash = true
    if (dino.y + 50 < cactus.y || dino.y > cactus.y + 40 || dino.x + 35 < cactus.x || dino.x > cactus.x + 10) {
      crash = false
    }
    return crash;
  }, []);

  const draw = useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      // ctx.rect(5, dino.y, 10, 10);
      // const img = new Image();
      // img.src =
      //   "https://e7.pngegg.com/pngimages/372/920/png-clipart-tyrannosaurus-dino-t-rex-t-rex-chrome-vr-jump-trex-runner-lava-jump-dinosaur-angle-text.png";
      // img.onload = () => {
      //   ctx.drawImage(img, 5, dino.y, 50, 50);
      // };
      obstacle(ctx);
      console.log(dino.y);
      ctx.fill();

      if (isJumping === 0) {
        clipping(ctx);
        console.log("isJumping", isJumping);
      }

      // else {
      //   const img = new Image();
      //   img.src =
      //     "https://e7.pngegg.com/pngimages/372/920/png-clipart-tyrannosaurus-dino-t-rex-t-rex-chrome-vr-jump-trex-runner-lava-jump-dinosaur-angle-text.png";
      //   img.onload = () => {
      //     ctx.drawImage(img, 5, dino.y, 50, 50);
      //   };
      // }
    }, []);

  const reset = () => {
    setCactus({
      ...cactus, x: (cactus.x += 600)
    })
  }

  useEffect(() => {
    console.log("clicked")
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    window.onkeyup = (e) => {
      e.preventDefault();
      if (collision()) return e.keyCode === 32 ? window.location.reload() : console.log("restart error");
      e.keyCode === 32 ? jump() : console.log("error");
    };
    const globalInterval = setInterval(() => {
      if (collision()) {
        clearInterval(globalInterval);
        const previousHiScore = localStorage.getItem('hiScore');
        if (previousHiScore > frame) return localStorage.setItem('hiScore', previousHiScore);
        localStorage.setItem('hiScore', JSON.stringify(frame));
      }
      draw(context);
    }, 20);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={600} height={150}></canvas>
    </>
  );
}

export default Canvas;
