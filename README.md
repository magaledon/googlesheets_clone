# Google Sheets Clone Project

## Description

This project is a web application that mimics the user interface and core functionalities of Google Sheets. 
It provides a spreadsheet interface with support for basic mathematical and data quality functions, data entry, and key UI interactions.

## Tech Stack

*   **HTML:** Used for structuring the spreadsheet interface and elements.
*   **CSS:** Used for styling the application to visually resemble Google Sheets.
*   **JavaScript:** Used for implementing the core functionalities, including:
    *   Generating the spreadsheet.
    *   Handling user input and formulas.
    *   Performing calculations and data quality operations.
    *   Managing cell dependencies (partially implemented).
    *   Implementing UI interactions (e.g., drag functions, cell formatting).

## Data Structures

*   **Arrays:** Used to store and manipulate cell data, row data, and column data.
*   **Objects:** Used to represent individual cells and their properties (e.g., value, formula).
*   **Sets:** Used in the `REMOVE_DUPLICATES` function to efficiently track unique rows.

## Explanation of Tech Stack and Data Structures

*   **HTML, CSS, and JavaScript:** These technologies were chosen as they are the fundamental building blocks for web applications. They provide the structure, styling, and interactivity needed to create the Google Sheets clone.
*   **Arrays:** Arrays are a natural choice for representing the rows and columns of a spreadsheet. They allow for easy access to cell data using row and column indices.
*   **Objects:** Objects provide a way to represent individual cells and their properties in a structured manner. This makes it easier to manage cell-specific data and functionality.
*   **Sets:** Sets are used in the `REMOVE_DUPLICATES` function to efficiently track unique rows. Sets provide constant-time complexity for checking if an element already exists, making the duplicate removal process faster.

## Implemented Features

*   **Spreadsheet Interface:**
    *   Mimics Google Sheets UI (toolbar, formula bar, cell structure).
    *   Basic drag functionality for cell content and selections.
    *   Support for basic cell formatting (bold, italics, font size, color).
    *   Ability to add, delete, and resize rows and columns.

*   **Mathematical Functions:**
    *   SUM: Calculates the sum of a range of cells.
    *   AVERAGE: Calculates the average of a range of cells.
    *   MAX: Returns the maximum value from a range of cells.
    *   MIN: Returns the minimum value from a range of cells.
    *   COUNT: Counts the number of cells containing numerical values in a range.

*   **Data Quality Functions:**
    *   TRIM: Removes leading and trailing whitespace from a cell.
    *   UPPER: Converts the text in a cell to uppercase.
    *   LOWER: Converts the text in a cell to lowercase.
    *   REMOVE\_DUPLICATES: Removes duplicate rows from a selected range.

## Known Issues

*   **Cell Dependencies:** The cell dependencies feature is not fully implemented. Formulas in cells do not automatically update when the values in the referenced cells change.
*   **FIND\_AND\_REPLACE:** The `FIND_AND_REPLACE` function is not yet implemented.

## Instructions

1.  Open the `index.html` file in your web browser.
2.  The spreadsheet interface will be displayed.
3.  Enter data into the cells.
4.  Use the formula bar to enter formulas (e.g., `=SUM(A1,B2)`).
5.  Click the "Calculate" button to execute the formula.
6.  The result will be displayed in the designated result area.



