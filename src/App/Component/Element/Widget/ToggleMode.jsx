/**
 * @filename        : ToggleMode.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 24-10-2024, 03:52:03
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a label element in a form.
 */

import React from "react";

/**
 * @function ToggleMode
 * 
 * @description
 *      A React component that toggles between dark mode and light mode.
 *      It manages the display mode by toggling CSS classes on the body element.
 *      The user can pass custom text for the toggle label through props.
 * 
 * @param {object} props - The props object.
 * @param {string} [props.darkLabel="Switch Light"] - Text for the label when in dark mode.
 * @param {string} [props.lightLabel="Switch Dark"] - Text for the label when in light mode.
 * 
 * @example
 * <ToggleMode darkLabel="Dark Mode" lightLabel="Light Mode" />
 */

export const ToggleMode = ({ darkLabel = "Switch Light", lightLabel = "Switch Dark" }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode", "antialiased", "text-slate-500", "dark:text-slate-400", "bg-white", "dark:bg-slate-900");
            document.querySelector(".toggle").classList.add("active");
            document.querySelector(".label").textContent = darkLabel;
        } else {
            document.body.classList.remove("dark-mode");
            document.querySelector(".toggle").classList.remove("active");
            document.querySelector(".label").textContent = lightLabel;
        }
    }, [isDarkMode, darkLabel, lightLabel]);
    
    return (
        <div className="toggle-container">
            <div className="toggle" onClick={toggleDarkMode}>
                <div className="label switch-label"></div>
            </div>
        </div>
    )
}