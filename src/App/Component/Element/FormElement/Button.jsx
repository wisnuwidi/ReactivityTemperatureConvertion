/**
 * @filename        : Button.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 31-10-2024, 01:03:34
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering checkbox elements in a form.
 *                    It supports managing the state of multiple checkbox elements and allows adding new checkbox elements dynamically.
 */

/**
 * @function Button - A component for rendering a button.
 * 
 * @param {function} onClick - A function to be called when the button is clicked.
 * @param {ReactNode} children - The content of the button.
 * @param {string} className - The class name of the button.
 * @param {object} props - Additional props to be passed to the button element.
 * @returns {ReactElement} A React element representing the button.
 * 
 * @example
    <Button onClick={() => console.log('Button clicked!')}>
        Click Me
    </Button>
 */
export const Button = ({ onClick, children, className, ...props }) => (
    <button onClick={onClick} className={className} {...props}>
        {children}
    </button>
);