/**
 * Render a rounded button with light blue/indigo background
 * @param {string|JSX.Element} children - the content to render inside the button
 * @param {object} rest - other attributes to pass on to the <button /> component (mostly the onClick attribute)
 * @returns {JSX.Element}
 * @constructor
 */
const ControlButton = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="w-full border-2 border-indigo-600 px-4 py-1 md:p-2 rounded-full bg-gradient-to-r from-blue-300 to-indigo-400 text-indigo-900 text-sm md:text-md"
    >
      {children}
    </button>
  );
};

export default ControlButton;
