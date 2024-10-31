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
    const { 
        firstPage: firstPageText = 'First', 
        previous: previousText = 'Previous', 
        next: nextText = 'Next', 
        lastPage: lastPageText = 'Last' 
    } = text || {};

    const { 
        wrapper: { type: Wrapper = 'div', props: wrapperProps = {} } = {}, 
        button: { type: ButtonTag = 'button', ...buttonProps } = {}, 
        ul: ulProps = {}, 
        li: liProps = {}, 
        currentButton: { li: currentLiProps = {}, button: currentBtnProps = {} } = {}
    } = properties;

    const { 
        type: ListDataInfoTag = 'p', 
        props: listDataInfoProps = { style: { textAlign: 'center', marginTop: '10px' } }, 
        position, 
        showingText = 'Showing', 
        toText = 'to', 
        ofText = 'of', 
        entriesText = 'entries', 
        showTextWrappers = { 
            showingText: { tag: 'span', props: {} }, 
            toText: { tag: 'span', props: {} }, 
            ofText: { tag: 'span', props: {} }, 
            entriesText: { tag: 'span', props: {} }
        },
    } = listDataInfo || {};
    const numPages = Math.ceil(maxItems / maxItemsPerPage);
    const start = Math.max(0, Math.min(numPages - displayedButtons, currentPage - Math.floor(displayedButtons / 2)));
    const end = Math.min(numPages, start + displayedButtons);

    const showingStart = currentPage * maxItemsPerPage + 1;
    const showingEnd = Math.min(showingStart + maxItemsPerPage - 1, maxItems);

    const ShowingTextTag = showTextWrappers.showingText.tag || 'span';
    const ToTextTag = showTextWrappers.toText.tag || 'span';
    const OfTextTag = showTextWrappers.ofText.tag || 'span';
    const EntriesTextTag = showTextWrappers.entriesText.tag || 'span';

    return (
        <Wrapper {...wrapperProps}>
            {position === 'left' && <ListDataInfoTag {...listDataInfoProps}>
                <ShowingTextTag {...showTextWrappers.showingText.props}>{showingText}</ShowingTextTag> {showingStart} <ToTextTag {...showTextWrappers.toText.props}>{toText}</ToTextTag> {showingEnd} <OfTextTag {...showTextWrappers.ofText.props}>{ofText}</OfTextTag> {maxItems} <EntriesTextTag {...showTextWrappers.entriesText.props}>{entriesText}</EntriesTextTag>
            </ListDataInfoTag>}
            <ul {...ulProps}>
                {firstPage && <li key="first" {...liProps}><ButtonTag {...buttonProps} onClick={() => setCurrentPage(0)}>{firstPageText}</ButtonTag></li>}
                {previous && <li key="prev" {...liProps}><ButtonTag {...buttonProps} onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}>{previousText}</ButtonTag></li>}

                {[...Array(end - start)].map((_, i) => {
                    const page = start + i;
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
            {position === 'right' && <ListDataInfoTag {...listDataInfoProps}>
                <ShowingTextTag {...showTextWrappers.showingText.props}>{showingText}</ShowingTextTag> {showingStart} <ToTextTag {...showTextWrappers.toText.props}>{toText}</ToTextTag> {showingEnd} <OfTextTag {...showTextWrappers.ofText.props}>{ofText}</OfTextTag> {maxItems} <EntriesTextTag {...showTextWrappers.entriesText.props}>{entriesText}</EntriesTextTag>
            </ListDataInfoTag>}
        </Wrapper>
    );
};
