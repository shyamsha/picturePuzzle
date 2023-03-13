import { createContext, useCallback, useEffect, useState } from "react";
import Game from "../models/Game";
import { pickRandomImage } from "../data/imageList";

export const GameContext = createContext({
  size: { x: 0, y: 0 },
  setSize: () => {},
  game: null,
  board: [],
  start: () => {},
  play: (x, y) => {},
  togglePause: () => {},
  puzzleImage: null,
  pickNewImage: () => {},
});

/**
 * Game Context Provider with its state
 */
export const GameContextProvider = ({ children }) => {
  const [size, setSize] = useState(
    /** Number of columns and rows of the puzzle*/
    { x: 3, y: 3 }
  );

  const [imagePicked, setImagePicked] = useState(
    /** name of the puzzle image file selected */
    () => pickRandomImage()
  );

  const [puzzleImage, setPuzzleImage] = useState(
    /** dynamic path to the puzzle image */
    null
  );

  const [game, setGame] = useState(
    /** instance of the Game */
    null
  );

  const [board, setBoard] = useState(
    /** state of the puzzle board being rendered */
    null
  );

  // sets the dynamic path to the image used for the puzzle
  useEffect(() => {
    if (!imagePicked) return;
    setPuzzleImage(require("../assets/images/" + imagePicked));
  }, [imagePicked]);

  // creates an instance of the game,
  // the dependency on the imagePicked is here to force re-render when the image changes
  useEffect(() => {
    setGame(new Game({ size }));
  }, [size, imagePicked]);

  // sets the puzzle board state, the board is what actually gets rendered by react
  useEffect(() => {
    if (!game) return;
    setBoard(game.getBoard());
  }, [game]);

  /**
   * Stats the game and causes re-render of the puzzle board
   */
  const start = useCallback(() => {
    if (!game) return;
    game.start();
    setBoard(game.getBoard());
  }, [game]);

  /**
   * Plays the piece of the puzzle at the given column and row and causes re-render
   */
  const play = useCallback(
    (x, y) => {
      if (!game) return;
      const isWon = game.play(x, y);
      setBoard(game.getBoard());
      // re-render the board with a delay to allow a css transition
      if (isWon) {
        setTimeout(() => setBoard(game.getBoard()), 300);
      }
    },
    [game]
  );

  /**
   * Sets pause or resumes the game, and re-renders
   */
  const togglePause = useCallback(() => {
    if (!game) return;
    game.togglePause();
    setBoard(game.getBoard());
  }, [game]);

  /**
   * Changes the image selected to a new random image
   */
  const pickNewImage = useCallback(() => {
    setImagePicked(pickRandomImage());
  }, []);

  return (
    <GameContext.Provider
      value={{
        size,
        setSize,
        game,
        board,
        start,
        play,
        togglePause,
        puzzleImage,
        pickNewImage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
