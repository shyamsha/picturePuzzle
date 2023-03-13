import { useContext } from "react";
import { GameContext } from "../../store/GameContext";

const BoardCell = ({ x, y, imgX, imgY, canPlay = false, cellSize }) => {
  const { play, size, puzzleImage } = useContext(GameContext);

  // the puzzle image is not defined upon first render
  if (!puzzleImage) return null;

  return (
    <div
      style={{
        top: y * cellSize,
        left: x * cellSize,
        height: cellSize,
        width: cellSize,
      }}
      className={
        "z-10 absolute overflow-hidden transition-all duration-300 ease-in-out " +
        " border border-[#fff3] " +
        (canPlay
          ? " cursor-pointer hover:opacity-80 hover:border-indigo-700"
          : "")
      }
      onClick={canPlay ? () => play(x, y) : undefined}
    >
      <div
        style={{
          backgroundImage: `url('${puzzleImage}')`,
          top: -1 * imgY * cellSize,
          left: -1 * imgX * cellSize,
          height: size.y * cellSize,
          width: size.x * cellSize,
        }}
        className="h-[500px] w-[400px] bg-cover bg-center absolute"
      />
    </div>
  );
};

export default BoardCell;
