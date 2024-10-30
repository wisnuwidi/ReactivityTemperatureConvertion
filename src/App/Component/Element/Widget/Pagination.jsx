/**
 * @filename        : Pagination.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 31-10-2024, 01:04:47
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a label element in a form.
 */

import { Button } from "../FormElement/Button";
/**
 * @function Pagination - A component for rendering pagination buttons in a table.
 * 
 * @param {number} currentPage - The current page number.
 * @param {function(number)} setCurrentPage - A function to set the current page number.
 * @param {number} maxItems - The total number of items in the table.
 * @param {number} displayedButtons - The number of buttons to display. If the number of buttons is less than the number of pages, then only the first and last buttons will be displayed.
 * @param {boolean} firstPage - Whether to display the 'First' button.
 * @param {boolean} previous - Whether to display the 'Previous' button.
 * @param {boolean} next - Whether to display the 'Next' button.
 * @param {boolean} lastPage - Whether to display the 'Last' button.
 * @param {object} properties - An object containing configuration for buttonProps, wrapperProps, ulProps, liProps, and currentButtonProps.
 * @param {object} text - An object containing text for button labels.
 * @returns {ReactElement} A React element representing the pagination buttons.
 * 
 * @example
    <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxItems={tableData.length}
        displayedButtons={10}
        firstPage={true}
        previous={true}
        next={true}
        lastPage={true}
        text={{
            button: {
                firstPage: 'First',
                previous: 'Prev',
                next: 'Next',
                lastPage: 'Last',
            },
        }}
        properties={{
            wrapper: {
                type: 'div',
                props: {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                    },
                },
            },
            button: {
                type: 'button', // New property to set button HTML tag
                className: 'btn btn-primary',
                style: {
                    margin: '0 5px',
                },
            },
            ul: {
                style: {
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                },
            },
            li: {
                style: {
                    margin: '0 5px',
                },
            },
            currentButton: {
                li: {
                    className: 'current-page-li',
                    style: {
                        fontWeight: 'bold',
                    },
                },
                button: {
                    className: 'current-page-btn',
                    style: {
                        pointerEvents: 'none',
                    },
                },
            },
        }}
    />
 */
export const Pagination = ({ currentPage, setCurrentPage, maxItems, displayedButtons, firstPage, previous, next, lastPage, text, properties }) => {
    const { 
        firstPage : firstPageText = 'First', 
        previous  : previousText  = 'Previous', 
        next      : nextText      = 'Next', 
        lastPage  : lastPageText  = 'Last' 
    } = text || {};

    const { 
        wrapper : { type: Wrapper   = 'div', props: wrapperProps = {} } = {}, 
        button  : { type: ButtonTag = 'button', ...buttonProps } = {}, 
        ul      : ulProps = {}, 
        li      : liProps = {}, 
        currentButton: { li: currentLiProps = {}, button: currentBtnProps = {} } = {}
    } = properties;

    const numPages = Math.ceil(maxItems / displayedButtons);
    const start    = Math.max(0, Math.min(numPages - displayedButtons, currentPage - Math.floor(displayedButtons / 2)));
    const end      = Math.min(numPages, start + displayedButtons);

    return (
        <Wrapper {...wrapperProps}>
            <ul {...ulProps}>
                {firstPage && <li key="first" {...liProps}><ButtonTag {...buttonProps} onClick={() => setCurrentPage(0)}>{firstPageText}</ButtonTag></li>}
                {previous  && <li key="prev"  {...liProps}><ButtonTag {...buttonProps} onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}>{previousText}</ButtonTag></li>}

                {[...Array(end - start)].map((_, i) => {
                    const page      = start + i;
                    const isCurrent = page === currentPage;
                    return (
                        <li key={page} {...liProps} {...(isCurrent ? currentLiProps : {})}>
                            <ButtonTag 
                                {...buttonProps} 
                                {...(isCurrent ? currentBtnProps : {})}
                                onClick={isCurrent ? null : () => setCurrentPage(page)}
                            >
                                {`${page + 1}`}
                            </ButtonTag>
                        </li>
                    );
                })}

                {next && <li key="next" {...liProps}><ButtonTag {...buttonProps} onClick={() => currentPage < numPages - 1 && setCurrentPage(currentPage + 1)}>{nextText}</ButtonTag></li>}
                {lastPage && <li key="last" {...liProps}><ButtonTag {...buttonProps} onClick={() => setCurrentPage(numPages - 1)}>{lastPageText}</ButtonTag></li>}
            </ul>
        </Wrapper>
    );
};
