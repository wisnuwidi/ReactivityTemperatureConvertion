import React from "react";

/**
 * The ToggleBox component renders a toggle switch with a label.
 * 
 * @param {Object} props The props passed to the component.
 * @param {Function} props.actionHandle The callback method that is called when the
 * toggle switch is clicked.
 * @param {String} props.actionResult The text to be displayed as the label for the toggle switch.
 * 
 * @returns {ReactElement} The ToggleBox component.
 */
function ToggleBox(props) {
    return (
        <>
        {/*<!-- The toggle-container class is used to position the toggle switch absolute at the top right corner of the page -->*/}
        <div className="toggle-container">
            {/*<!-- The toggle class is used to style the toggle switch -->*/}
            <div className={props.actionClass} onClick={props.actionHandle}>
                {/*<!-- The label class is used to style the label for the toggle switch -->*/}
                <div className="label switch-label">{props.actionResult}</div>
            </div>
        </div>
        </>
    );
}

class ToggleMode extends React.Component {
    /**
     * The ToggleMode class is a React component responsible for rendering a toggle switch
     * for switching between light and dark modes.
     * 
     * @param {props} props The props passed to the component.
     */
    constructor(props) {
        /**
         * The constructor method initializes the component state and binds the
         * handleClick method to the component.
         * 
         * @param {props} props The props passed to the component.
         */
        super(props);
        this.state = {
            /**
             * The isDarkMode state property is a boolean flag that indicates
             * whether the application is in dark mode or not.
             */
            isDarkMode: false
        };

        /**
         * The handleClick method is a callback method that is called when the
         * toggle switch is clicked.
         */
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * The handleClick method is a callback method that is called when the
     * toggle switch is clicked. It toggles the isDarkMode state property.
     * 
     * @this {ToggleMode}
     */
    handleClick() {
        /**
         * The setState method is called with a callback function that returns
         * a new state object, which is then used to update the state of the
         * component. The callback function takes the previous state as an
         * argument, and returns an object with the new state values.
         * 
         * @param {Object} prevState The previous state of the component.
         * @returns {Object} The new state of the component.
         */
        this.setState(prevState => ({
            isDarkMode: !prevState.isDarkMode
        }));
    }
    
    /**
     * The render method renders the ToggleMode component.
     * 
     * @returns {ReactElement} The rendered component.
     */
    render() {
        return (
            <>
            {/* The ToggleBox component is rendered with the following props: */}
            {/* actionHandle: The handleClick method is passed as a callback to handle the click event of the toggle switch. */}
            {/* actionResult: The result of the toggle switch is passed as a prop. If the state is in dark mode, it renders 'Dark Mode', otherwise it renders 'Light Mode'. */}
            {/* actionClass: The class name of the toggle switch is passed as a prop. If the state is in dark mode, it renders 'toggle active', otherwise it renders 'toggle'. */}
            <ToggleBox 
                actionHandle = {this.handleClick}
                actionResult = {
                    this.state.isDarkMode ? 
                    "Dark Mode" : "Light Mode"
                }
                actionClass = {
                    this.state.isDarkMode ? 
                    "toggle active" : "toggle"
                }
            />

            {/* The ToggleBindingMode function is called with the state of the toggle switch as an argument. */}
            {/* It adds the 'dark-mode' class to the body element if the state is in dark mode, and removes it otherwise. */}
            {/* It also sets the value of the 'darkMode' key in local storage to true if the state is in dark mode, and false otherwise. */}
            { ToggleBindingMode(this.state.isDarkMode) }
            </>
        );
    }
}

/**
 * The ToggleBindingMode function is called with the state of the toggle switch as an argument.
 * It adds the 'dark-mode' class to the body element if the state is in dark mode, and removes it otherwise.
 * It also sets the value of the 'darkMode' key in local storage to true if the state is in dark mode, and false otherwise.
 * 
 * @param {Boolean} props The state of the toggle switch.
 */
function ToggleBindingMode(props) {
    const body = document.querySelector('body');

    // If the state is in dark mode, add the 'dark-mode' class to the body element.
    if (true === props) {
        body.classList.add('dark-mode');

        // Set the value of the 'darkMode' key in local storage to true.
        localStorage.setItem('darkMode', 'true');
    } else {
        // If the state is not in dark mode, remove the 'dark-mode' class from the body element.
        body.classList.remove('dark-mode');

        // Set the value of the 'darkMode' key in local storage to false.
        localStorage.setItem('darkMode', 'false');
    }
}

export default ToggleMode;