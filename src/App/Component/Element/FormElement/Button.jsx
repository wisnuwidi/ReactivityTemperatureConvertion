/**
 * @filename        : Button.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 31-10-2024, 01:03:34
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering multiple buttons in a form.
 */

/**
 * @function Button - A component for rendering multiple buttons.
 * 
 * @param {array} buttons - An array of button objects, each containing id, onClick, className, props, and text properties.
 * @param {object} props - Additional props to be passed to each button element.
 * @returns {ReactElement} A React element representing the buttons.
 * 
 * @example
 * // Example usage:
   const buttonsData = [
       { id: 'btn1', onClick: () => console.log('Button 1 clicked'), className: 'btn-class', props: {}, text: 'Button 1' },
       { id: 'btn2', onClick: () => console.log('Button 2 clicked'), className: 'btn-class', props: {}, text: 'Button 2' },
   ];
   
   <Button buttons={buttonsData} />
 */
export const Button = ({ buttons = [], ...props }) => (
    buttons.map(button => (
        <button
            key={button.id}
            onClick={button.onClick}
            className={button.className}
            {...button.props}
        >
            {button.text}
        </button>
    ))
);
