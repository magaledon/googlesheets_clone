 // Description: This file contains the JavaScript code for the Google Sheets clone project.

// Function to generate the spreadsheet
function generateSpreadsheet() {
    const numRows = 25;
    const numCols = 26;
    const table = document.getElementById("spreadsheet");

    // Clear existing table content
    table.innerHTML = "";

    // Create table headers (A, B, C, ...)
    let headerRow = table.insertRow();
    headerRow.insertCell().innerText = ""; // Top-left empty cell

    for (let j = 0; j < numCols; j++) {
        let headerCell = headerRow.insertCell();
        headerCell.innerText = String.fromCharCode(65 + j); // A, B, C...
    }

    // Create table cells
    for (let i = 0; i < numRows; i++) {
        let row = table.insertRow();
        // Row Headers (1, 2, 3, ...)
        let rowHeader = row.insertCell();
        rowHeader.innerText = i + 1;

        for (let j = 0; j < numCols; j++) {
            let cell = row.insertCell();
            cell.id = String.fromCharCode(65 + j) + (i + 1); // Unique cell ID (A1, A2, B1, ...)
            cell.contentEditable = true; // Make cell editable
            cell.addEventListener('input', function(event) {
                updateDependencies(event.target);
            });
            cell.setAttribute('data-formula', ''); // Initialize formula attribute
        }
    }
}

function performRemoveDuplicates(cellRefs) {
    const data = [];
    const resultElement = document.getElementById("result");

    // Extract data from the selected range
    let startCol = cellRefs[0].charCodeAt(0) - 65;
    let startRow = parseInt(cellRefs[0].substring(1)) - 1;
    let endCol = cellRefs[1].charCodeAt(0) - 65;
    let endRow = parseInt(cellRefs[1].substring(1)) - 1;

    if (startCol > endCol || startRow > endRow) {
        resultElement.innerText = "Error: Invalid cell range";
        return;
    }

    const extractedData = [];
    for (let i = startRow; i <= endRow; i++) {
        const rowData = [];
        for (let j = startCol; j <= endCol; j++) {
            const cellId = String.fromCharCode(65 + j) + (i + 1);
            const cell = document.getElementById(cellId);
            rowData.push(cell.innerText);
        }
        extractedData.push(rowData);
    }

    // Remove duplicate rows
    const uniqueData = [];
    const seen = new Set();

    for (const row of extractedData) {
        const rowString = JSON.stringify(row);
        if (!seen.has(rowString)) {
            uniqueData.push(row);
            seen.add(rowString);
        }
    }

    // Update the spreadsheet with unique data
    let rowCounter = startRow;
    for (const row of uniqueData) {
        for (let j = startCol; j <= endCol; j++) {
            if (rowCounter < numRows) {
                const cellId = String.fromCharCode(65 + j) + (rowCounter + 1);
                const cell = document.getElementById(cellId);
                cell.innerText = row[j - startCol];
            }
        }
        rowCounter++;
    }

    // Clear remaining rows
    for (let i = rowCounter; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
            const cellId = String.fromCharCode(65 + j) + (i + 1);
            const cell = document.getElementById(cellId);
            cell.innerText = "";
        }
    }

    resultElement.innerText = "Duplicates removed.";
}

function performLower(cellRefs) {
    const resultElement = document.getElementById("result");
    for (const cellRef of cellRefs) {
        const cell = document.getElementById(cellRef);
        if (cell) {
            cell.innerText = cell.innerText.toLowerCase();
        }
    }
    resultElement.innerText = "Text converted to lowercase.";
}

function performUpper(cellRefs) {
    const resultElement = document.getElementById("result");
    for (const cellRef of cellRefs) {
        const cell = document.getElementById(cellRef);
        if (cell) {
            cell.innerText = cell.innerText.toUpperCase();
        }
    }
    resultElement.innerText = "Text converted to uppercase.";
}

function performTrim(cellRefs) {
    const resultElement = document.getElementById("result");
    for (const cellRef of cellRefs) {
        const cell = document.getElementById(cellRef);
        if (cell) {
            cell.innerText = cell.innerText.trim();
        }
    }
    resultElement.innerText = "Whitespace trimmed.";
}

function calculateCountAll(cellRefs) {
    let count = 0;
    const resultElement = document.getElementById("result");

    for (const cellRef of cellRefs) {
        const cellValue = document.getElementById(cellRef).innerText;
        if (cellValue.trim() !== "") {
            count++;
        }
    }

    resultElement.innerText = count;
}

function calculateCount(cellRefs) {
    let count = 0;
    const resultElement = document.getElementById("result");

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (!isNaN(cellValue)) {
            count++;
        }
    }

    resultElement.innerText = count;
}

function calculateMin(cellRefs) {
    let min = Infinity;
    const resultElement = document.getElementById("result");

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (!isNaN(cellValue)) {
            min = Math.min(min, cellValue);
        }
    }

    resultElement.innerText = min === Infinity ? "Error" : min;
}

function calculateMax(cellRefs) {
    let max = -Infinity;
    const resultElement = document.getElementById("result");

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (!isNaN(cellValue)) {
            max = Math.max(max, cellValue);
        }
    }

    resultElement.innerText = max === -Infinity ? "Error" : max;
}

function calculateAverage(cellRefs) {
    let sum = 0;
    let count = 0;
    const resultElement = document.getElementById("result");

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (!isNaN(cellValue)) {
            sum += cellValue;
            count++;
        }
    }

    resultElement.innerText = count === 0 ? "Error" : (sum / count);
}

function calculateSum(cellRefs) {
    let sum = 0;
    const resultElement = document.getElementById("result");

    for (const cellRef of cellRefs) {
        if (cellRef.includes(':')) {
            const [startCell, endCell] = cellRef.split(':');
            const startCol = startCell.charCodeAt(0) - 65;
            const startRow = parseInt(startCell.substring(1)) - 1;
            const endCol = endCell.charCodeAt(0) - 65;
            const endRow = parseInt(endCell.substring(1)) - 1;

            for (let i = startRow; i <= endRow; i++) {
                for (let j = startCol; j <= endCol; j++) {
                    const cellId = String.fromCharCode(65 + j) + (i + 1);
                    const cell = document.getElementById(cellId);
                    if (cell) {
                        const cellValue = parseFloat(cell.innerText);
                        if (!isNaN(cellValue)) {
                            sum += cellValue;
                        }
                    }
                }
            }
        } else {
            const cell = document.getElementById(cellRef);
            if (cell) {
                const cellValue = parseFloat(cell.innerText);
                if (!isNaN(cellValue)) {
                    sum += cellValue;
                }
            }
        }
    }

    resultElement.innerText = sum;
}

function updateFormulaResult() {
    const formulaInput = document.getElementById("formulaInput").value;
    const resultElement = document.getElementById("result");
    let formula = formulaInput;

    if (formula.startsWith("=")) {
        formula = formula.substring(1);
    }

    try {
        if (formula.startsWith("SUM(")) {
            const cellRefsString = formula.substring(4, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            calculateSum(cellRefs);
        } else if (formula.startsWith("AVERAGE(")) {
            const cellRefsString = formula.substring(8, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            calculateAverage(cellRefs);
        } else if (formula.startsWith("MAX(")) {
            const cellRefsString = formula.substring(4, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            calculateMax(cellRefs);
        } else if (formula.startsWith("MIN(")) {
            const cellRefsString = formula.substring(4, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            calculateMin(cellRefs);
        } else if (formula.startsWith("COUNT(")) {
            const cellRefsString = formula.substring(6, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            calculateCount(cellRefs);
        } else if (formula.startsWith("COUNT_ALL(")) {
            const cellRefsString = formula.substring(10, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            calculateCountAll(cellRefs);
        } else if (formula.startsWith("TRIM(")) {
            const cellRefsString = formula.substring(5, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            performTrim(cellRefs);
        } else if (formula.startsWith("UPPER(")) {
            const cellRefsString = formula.substring(6, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            performUpper(cellRefs);
        } else if (formula.startsWith("LOWER(")) {
            const cellRefsString = formula.substring(6, formula.length - 1);
            const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
            performLower(cellRefs);
        } else if (formula.startsWith("REMOVE_DUPLICATES(")) {
            const cellRefsString = formula.substring(17, formula.length - 1);
            const cellRefs = cellRefsString.split(":").map(ref => ref.trim());
            performRemoveDuplicates(cellRefs);
        }
    } catch (error) {
        resultElement.innerText = "Error";
    }
}

function updateDependencies(changedCell) {
    const cellId = changedCell.id;
    const table = document.getElementById('spreadsheet');

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = table.rows[i].cells[j + 1]; // +1 to skip row header
            const formula = cell.getAttribute('data-formula');

            if (formula && formula.includes(cellId)) {
                try {
                    updateFormulaResult();
                } catch (error) {
                    cell.innerText = 'Error';
                }
            }
        }
    }
}

// Store the start cell and end cell
let startCell = null;
let endCell = null;

// Add event listener to the spreadsheet table
document.getElementById('spreadsheet').addEventListener('mousedown', function(event) {
    if (event.target.tagName === 'TD') {
        startCell = event.target;
        startCell.classList.add('selected');
    }
});

document.getElementById('spreadsheet').addEventListener('mousemove', function(event) {
    if (event.target.tagName === 'TD' && startCell) {
        endCell = event.target;
        endCell.classList.add('selected');
    }
});

document.getElementById('spreadsheet').addEventListener('mouseup', function(event) {
    startCell = null;
    endCell = null;
});

// Attach input event listener to the formula input
document.getElementById('formulaInput').addEventListener('input', function(event) {
    updateFormulaResult();
});

//Attaching event listeners to the cells
function attachEventListeners() {
    const numRows = 10;
    const numCols = 10;
    const table = document.getElementById("spreadsheet");

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cellId = String.fromCharCode(65 + j) + (i + 1);
            const cell = document.getElementById(cellId);

            cell.addEventListener('input', function(event) {
                updateDependencies(event.target);
                cell.setAttribute('data-formula', document.getElementById("formulaInput").value);
            });
        }
    }
}

// Call generateSpreadsheet() when the page loads
generateSpreadsheet();
attachEventListeners();
