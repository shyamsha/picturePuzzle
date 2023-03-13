import ControlButton from "./ControlButton";
import { useContext } from "react";
import { GameContext } from "../../store/GameContext";

const GameControls = () => {
  const { game, pickNewImage } = useContext(GameContext);

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex flex-row md:flex-col gap-2">
        {!game?.startTime && (
          <ControlButton onClick={pickNewImage} key="changeImage">
            Change Image
          </ControlButton>
        )}
        {!!game?.startTime && (
          <ControlButton onClick={pickNewImage}>New Game</ControlButton>
        )}
      </div>
    </div>
  );
};

export default GameControls;
