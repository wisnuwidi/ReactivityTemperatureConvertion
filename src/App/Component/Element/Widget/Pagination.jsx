/**
 * @filename        : Pagination.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 31-10-2024, 01:04:47
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a label element in a form.
 */
import React from 'react';

/**
 * @function Pagination - A component for rendering pagination buttons in a table.
 * 
 * @param {number} currentPage - The current page number.
 * @param {function(number)} setCurrentPage - A function to set the current page number.
 * @param {number} maxItems - The total number of items in the table.
 * @param {number} displayedButtons - The number of buttons to display.
 * @param {boolean} firstPage - Whether to display the 'First' button.
 * @param {boolean} previous - Whether to display the 'Previous' button.
 * @param {boolean} next - Whether to display the 'Next' button.
 * @param {boolean} lastPage - Whether to display the 'Last' button.
 * @param {object} properties - An object containing configuration for buttonProps, wrapperProps, ulProps, liProps, currentButtonProps.
 * @param {object} text - An object containing text for button labels.
 * @param {object} [listDataInfo] - An object containing configuration for the list data info tag. The object can contain the following properties:
 *   - type: The type of the HTML tag (default is 'p').
 *   - props: An object containing the props that will be passed to the HTML tag (default is an empty object).
 *   - position: The position of the list data info tag relative to the ul element. It can be 'left' or 'right' (default is 'left').
 *   - showingText: The text of the 'Showing' part of the list data info tag. (default is 'Showing')
 *   - toText: The text of the 'to' part of the list data info tag. (default is 'to')
 *   - ofText: The text of the 'of' part of the list data info tag. (default is 'of')
 *   - entriesText: The text of the 'entries' part of the list data info tag. (default is 'entries')
 *   - showTextWrappers: An object specifying tags to wrap the showingText, toText, ofText and entriesText, along with their props. 
 *     E.g., { showingText: { tag: 'span', props: { className: 'showing-class' } }, ... } (default tags are all 'span' with empty props).
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
                    className: 'pagination',
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                    },
                },
            },
            button: {
                type: 'button',
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
        listDataInfo={{
            type: 'span',
            position: 'right',
            props: {
                style: {
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '10px',
                },
            },
            showingText: 'Displaying',
            toText: 'to',
            ofText: 'of',
            entriesText: 'items',
            showTextWrappers: {
                showingText: { tag: 'span', props: { className: 'showing-class' } },
                toText: { tag: 'em', props: { className: 'to-class' } },
                ofText: { tag: 'strong', props: { className: 'of-class' } },
                entriesText: { tag: 'span', props: { className: 'entries-class' } },
            },
        }}
    />
 */
export const Pagination = ({ currentPage, setCurrentPage, maxItems, displayedButtons, firstPage, previous, next, lastPage, text, properties, listDataInfo, maxItemsPerPage }) => {
    
    // Destructure button text options with default values
    const { 
        firstPage : firstPageText = 'First', 
        previous  : previousText  = 'Previous', 
        next      : nextText      = 'Next', 
        lastPage  : lastPageText  = 'Last' 
    } = text.button || {};
    
    // Destructure and default properties for wrapper, buttons, and list items
    const { 
        wrapper       : { type: Wrapper      = 'div', props: wrapperProps  = {} } = {}, 
        button        : { type: ButtonTag    = 'a', ...buttonProps }       = {}, 
        ul            : ulProps = {}, 
        li            : liProps = {}, 
        currentButton : { li: currentLiProps = {}, button: currentBtnProps = {} } = {}
    } = properties || {};
    
    // Destructure list data info with default values
    const { 
        type  : ListDataInfoTag   = 'p', 
        props : listDataInfoProps = { className: 'text-sm text-gray-700' }, 
        position, 
        showingText      = 'Showing', 
        toText           = 'to', 
        ofText           = 'of', 
        entriesText      = 'entries', 
        showTextWrappers = { 
            showingText : { tag: 'span', props: { className: 'default-showing-class' } }, 
            toText      : { tag: 'span', props: {} }, 
            ofText      : { tag: 'span', props: {} }, 
            entriesText : { tag: 'span', props: {} }
        },
    } = listDataInfo || {};
    
    // Base class names for styling
    const baseClassNames = {
        wrapper    : 'flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6',
        ul         : 'isolate inline-flex -space-x-px rounded-md shadow-sm',
        button     : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
        currentBtn : 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    };

    // Resolve class names with provided properties or defaults
    const wrapperClassName   = wrapperProps?.className    || baseClassNames.wrapper;
    const ulClassName        = ulProps?.className         || baseClassNames.ul;
    const buttonClassName    = buttonProps?.className     || baseClassNames.button;
    const curentBtnClassName = currentBtnProps?.className || baseClassNames.currentBtn;

    // Calculate pagination related variables
    const numPages           = Math.ceil(maxItems / maxItemsPerPage);
    const start              = Math.max(0, Math.min(numPages - displayedButtons, currentPage - Math.floor(displayedButtons / 2)));
    const end                = Math.min(numPages, start + displayedButtons);
    const showingStart       = currentPage * maxItemsPerPage + 1;
    const showingEnd         = Math.min(showingStart + maxItemsPerPage - 1, maxItems);
    
    // Resolve tags for text wrappers
    const ShowingTextTag     = showTextWrappers?.showingText?.tag || 'span';
    const ToTextTag          = showTextWrappers?.toText?.tag      || 'span';
    const OfTextTag          = showTextWrappers?.ofText?.tag      || 'span';
    const EntriesTextTag     = showTextWrappers?.entriesText?.tag || 'span';
    const showTextWrapClass  = 'font-medium';

    return (
        <Wrapper className={wrapperClassName} {...wrapperProps}>
            {position === 'left' && <ListDataInfoTag {...listDataInfoProps}>
                <ShowingTextTag className={showTextWrappers?.showingText?.className || showTextWrapClass} {...showTextWrappers?.showingText?.props}>{showingText} </ShowingTextTag> 
                {showingStart} 
                <ToTextTag className={showTextWrappers?.toText?.className || showTextWrapClass} {...showTextWrappers?.toText?.props}> {toText} </ToTextTag> 
                {showingEnd} 
                <OfTextTag className={showTextWrappers?.ofText?.className || showTextWrapClass} {...showTextWrappers?.ofText?.props}> {ofText} </OfTextTag> 
                {maxItems} 
                <EntriesTextTag className={showTextWrappers?.entriesText?.className || showTextWrapClass} {...showTextWrappers?.entriesText?.props}> {entriesText}</EntriesTextTag>
            </ListDataInfoTag>}

            <ul className={ulClassName} {...ulProps}>
                {firstPage && <li key="first" {...liProps}><ButtonTag className={currentPage >= 1 ? `${buttonClassName} hover:cursor-pointer` : `${buttonClassName} text-gray-400`} {...buttonProps} onClick={() => setCurrentPage(0)} disabled={currentPage >= 1 ? false : true}>{firstPageText}</ButtonTag></li>}
                {previous  && <li key="prev" {...liProps}><ButtonTag className={currentPage >= 1 ? `${buttonClassName} hover:cursor-pointer` : `${buttonClassName} text-gray-400`} {...buttonProps} onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)} disabled={currentPage >= 1 ? false : true}>{previousText}</ButtonTag></li>}
                {currentPage >= displayedButtons - 1 && <li key="first_visible" {...liProps}><ButtonTag className={currentPage > 1 ? `${buttonClassName} hover:cursor-pointer` : buttonClassName} {...buttonProps} onClick={() => setCurrentPage(0)}>1</ButtonTag></li>}
                {currentPage >= displayedButtons - 1 && <li key="ellipsis_prev" {...liProps}><ButtonTag className={buttonClassName} {...buttonProps}>...</ButtonTag></li>}
                
                {[...Array(end - start)].map((_, i) => {
                    const page      = start + i;
                    const isCurrent = page === currentPage;

                    return (
                        <li key={page} {...liProps} {...(isCurrent ? currentLiProps : {})}>
                            <ButtonTag 
                                className={isCurrent ? curentBtnClassName : `${buttonClassName} hover:cursor-pointer`} 
                                {...buttonProps} 
                                {...(isCurrent ? currentBtnProps : {})}
                                onClick={isCurrent ? null : () => setCurrentPage(page)}
                            >
                                {`${page + 1}`}
                            </ButtonTag>
                        </li>
                    );
                })}

                {currentPage < numPages - 1 && <li key="ellipsis_next" {...liProps}><ButtonTag className={buttonClassName} {...buttonProps}>...</ButtonTag></li>}
                {currentPage < numPages - (displayedButtons - 1) && <li key={numPages - 1} {...liProps}><ButtonTag className={currentPage !== numPages - 1 ? `${buttonClassName} hover:cursor-pointer` : buttonClassName} {...buttonProps} onClick={() => setCurrentPage(numPages - 1)} disabled={currentPage !== numPages - 1 ? false : true}>{numPages}</ButtonTag></li>}
                {next     && <li key="next" {...liProps}><ButtonTag className={currentPage !== numPages - 1 ? `${buttonClassName} hover:cursor-pointer` : `${buttonClassName} text-gray-400`} {...buttonProps} onClick={() => currentPage < numPages - 1 && setCurrentPage(currentPage + 1)} disabled={currentPage !== numPages - 1 ? false : true}>{nextText}</ButtonTag></li>}
                {lastPage && <li key="last" {...liProps}><ButtonTag className={currentPage !== numPages - 1 ? `${buttonClassName} hover:cursor-pointer` : `${buttonClassName} text-gray-400`} {...buttonProps} onClick={() => setCurrentPage(numPages - 1)}>{lastPageText}</ButtonTag></li>}
            </ul>

            {position === 'right' && <ListDataInfoTag {...listDataInfoProps}>
                <ShowingTextTag className={showTextWrappers?.showingText?.className || showTextWrapClass} {...showTextWrappers?.showingText?.props}>{showingText} </ShowingTextTag> 
                {showingStart} 
                <ToTextTag className={showTextWrappers?.toText?.className || showTextWrapClass} {...showTextWrappers?.toText?.props}> {toText} </ToTextTag> 
                {showingEnd} 
                <OfTextTag className={showTextWrappers?.ofText?.className || showTextWrapClass} {...showTextWrappers?.ofText?.props}> {ofText} </OfTextTag> 
                {maxItems} 
                <EntriesTextTag className={showTextWrappers?.entriesText?.className || showTextWrapClass} {...showTextWrappers?.entriesText?.props}> {entriesText}</EntriesTextTag>
            </ListDataInfoTag>}
        </Wrapper>
    );
};
