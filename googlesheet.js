// script.js
let table = document.getElementById("spreadsheet");
let selectedCell = null;
let isDragging = false;
let dragStartCell = null;

// Function to generate the spreadsheet
function generateSpreadsheet() {
    const numRows = 25;
    const numCols = 26;

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
            cell.addEventListener("mousedown", cellMouseDown);
            cell.addEventListener("mouseup", cellMouseUp);
            cell.addEventListener("mousemove", cellMouseMove);
            cell.addEventListener("click", function(event) {
                selectCell(event.target); // Select cell on click
            });
        }
    }
}

function applyFormat(format, value) {
    if (selectedCell) {
        switch (format) {
            case 'bold':
                selectedCell.style.fontWeight = selectedCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
                break;
            case 'italic':
                selectedCell.style.fontStyle = selectedCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
                break;
            case 'color':
                selectedCell.style.color = value;
                break;
            case 'fontSize':
                selectedCell.style.fontSize = value + 'px';
                break;
        }
    }
}

function changeFontSize() {
    let fontSize = prompt("Enter font size (in pixels):", "16");
    if (fontSize) {
        applyFormat('fontSize', fontSize);
    }
}

function addRow() {
    let table = document.getElementById("spreadsheet");
    let newRow = table.insertRow(table.rows.length);
    // Add row header cell
    let th = document.createElement('th');
    th.innerText = table.rows.length;
    newRow.appendChild(th);

    for (let i = 1; i < table.rows[0].cells.length; i++) {
        let cell = newRow.insertCell(i);
        cell.contentEditable = true;
        cell.addEventListener("mousedown", cellMouseDown);
        cell.addEventListener("mouseup", cellMouseUp);
        cell.addEventListener("mousemove", cellMouseMove);
        cell.addEventListener("click", function(event) {
            selectCell(event.target);
        });
        cell.id = String.fromCharCode(64 + i) + table.rows.length;
    }
}

function addColumn() {
    let table = document.getElementById("spreadsheet");
    for (let i = 0; i < table.rows.length; i++) {
        let newCell;
        if (i === 0) {
            newCell = table.rows[i].insertCell(table.rows[i].cells.length);
            newCell.innerText = String.fromCharCode(64 + table.rows[i].cells.length - 1);
        } else {
            newCell = table.rows[i].insertCell(table.rows[i].cells.length);
            newCell.contentEditable = true;
            newCell.addEventListener("mousedown", cellMouseDown);
            newCell.addEventListener("mouseup", cellMouseUp);
            newCell.addEventListener("mousemove", cellMouseMove);
            newCell.addEventListener("click", function(event) {
                selectCell(event.target);
            });
            newCell.id = String.fromCharCode(64 + table.rows[i].cells.length - 1) + i;
        }
    }
}

function deleteRow() {
    if (selectedCell) {
        let row = selectedCell.parentNode.rowIndex;
        table.deleteRow(row);
        updateRowNumbers(); // Update row numbers after deletion
    }
}

function deleteColumn() {
    let selectedCellId = document.getElementById("selectedCell").value;
    if (!selectedCellId) return;

    let colLetter = selectedCellId.charAt(0);
    let colIndex = colLetter.charCodeAt(0) - 64;

    if (isNaN(colIndex) || colIndex < 1 || colIndex > table.rows[0].cells.length) {
        alert("Please select a valid cell within the column to delete.");
        return;
    }

    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(colIndex);
    }

    //call update column letters to update it
    updateColumnLetters();
}

function updateRowNumbers() {
    const table = document.getElementById("spreadsheet");
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i;
    }
}

function updateColumnLetters() {
    const table = document.getElementById("spreadsheet");
    let headerRow = table.rows[0];
    for (let i = 1; i < headerRow.cells.length; i++) {
        headerRow.cells[i].innerText = String.fromCharCode(64 + i);
    }
}

// defining functions to handle the select and format for any cell
function cellMouseDown(event) {
    isDragging = true;
    dragStartCell = event.target;
    selectCell(event.target);
}

function cellMouseUp(event) {
    isDragging = false;
    dragStartCell = null;
}

function cellMouseMove(event) {
    if (!isDragging) return;

    let targetCell = event.target;

    if (targetCell && targetCell.tagName === "TD") {
        selectCell(targetCell);
    }
}

function selectCell(cell) {
    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }
    selectedCell = cell;
    selectedCell.classList.add("selected");

    //
    updateSelectedCellId(cell.id);
}

function updateSelectedCellId(cellId) {
    document.getElementById('selectedCell').value = cellId
}

function applyFormat(format, value) {
    if (!selectedCell) {
        return;
    }

    switch (format) {
        case 'bold':
            selectedCell.style.fontWeight = (selectedCell.style.fontWeight === 'bold') ? 'normal' : 'bold';
            break;
        case 'italic':
            selectedCell.style.fontStyle = (selectedCell.style.fontStyle === 'italic') ? 'normal' : 'italic';
            break;
        case 'color':
            selectedCell.style.color = value;
            break;
        case 'fontSize':
            selectedCell.style.fontSize = value + 'px';
            break;
    }
}

function changeFontSize() {
    let fontSize = prompt("Enter font size (in pixels):", "16");
    if (fontSize) {
        applyFormat('fontSize', fontSize);
    }
}

function applyEventListnersToButtons() {
    // Add click event listeners to buttons
    document.querySelector(".toolbar").addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            const action = event.target.innerText.toLowerCase();
            switch (action) {
                case "bold":
                    applyFormat('bold');
                    break;
                case "italic":
                    applyFormat('italic');
                    break;
                case "font size":
                    changeFontSize();
                    break;
                case "add row":
                    addRow();
                    break;
                case "add column":
                    addColumn();
                    break;
                case "delete row":
                    deleteRow();
                    break;
                case "delete column":
                    deleteColumn();
                    break;
            }
        }
    });

    // Add change event listener to font color input
    document.getElementById("fontColor").addEventListener("change", function() {
        applyFormat('color', this.value);
    });
}

function performLower(cellRefs) {
    const selectedCellId = document.getElementById("selectedCell").value;
    if (!selectedCellId) return;
    const cell = document.getElementById(selectedCellId);
    if (cell) {
        cell.innerText = cell.innerText.toLowerCase();
    }
}

function performUpper(cellRefs) {
    // const selectedCellId = document.getElementById("selectedCell").value;
    // if (!selectedCellId) return;
    // const cell = document.getElementById(selectedCellId);
    // if (cell) {
    //     cell.innerText = cell.innerText.toUpperCase();
    // }
    for (const cellRef of cellRefs) {
        const cell = document.getElementById(cellRef);
        if (cell) {
            cell.innerText = cell.innerText.toUpperCase();
        }
    }
}

function performTrim(cellRefs) {
    const selectedCellId = document.getElementById("selectedCell").value;
    if (!selectedCellId) return;
    const cell = document.getElementById(selectedCellId);
    if (cell) {
        cell.innerText = cell.innerText.trim();
    }
}

function calculateCountAll(cellRefs) {
    let count = 0;
    const resultCellId = "F10"; // Cell where the count is displayed

    for (const cellRef of cellRefs) {
        const cellValue = document.getElementById(cellRef).innerText; // Use innerText to get the displayed text

        if (cellValue.trim() !== "") {
            // Only increment count if the cell is not empty
            count++;
        }
    }

    // Display the result in cell F10
    document.getElementById("result").innerText = count;
}

function calculateCount(cellRefs) {
    let count = 0;
    const resultCellId = "E10"; // Cell where the count is displayed
    const errorCellId = "A10";

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText); // Parse cell value as a floating-point number

        if (isNaN(cellValue)) {
            document.getElementById(errorCellId).innerText = `Error: Non-numeric value in cell ${cellRef}`; // Display error message if cell value is not a number
            return;
        } else {
            count++; // Increment count if cell value is a number
        }
    }

    // Display the result in cell E10
    document.getElementById("result").innerText = count;
}

function calculateMin(cellRefs) {
    let min = Infinity; // Initialize with positive infinity to ensure any number is smaller
    const resultCellId = "D10"; // Cell where the min is displayed
    const errorCellId = "A10";

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (isNaN(cellValue)) {
            document.getElementById(errorCellId).innerText = `Error: Non-numeric value in cell ${cellRef}`;
            return;
        }

        if (cellValue < min) {
            min = cellValue;
        }
    }

    // Display the result in cell D10
    document.getElementById("result").innerText = min;
}

function calculateMax(cellRefs) {
    let max = -Infinity; // Initialize with negative infinity to ensure any number is greater
    const resultCellId = "C10"; // Cell where the max is displayed
    const errorCellId = "A10";

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (isNaN(cellValue)) {
            document.getElementById(errorCellId).innerText = `Error: Non-numeric value in cell ${cellRef}`;
            return;
        }

        if (cellValue > max) {
            max = cellValue;
        }
    }

    // Display the result in cell C10
    document.getElementById("result").innerText = max;
}

function calculateAverage(cellRefs) {
    let sum = 0;
    let count = 0;
    const resultCellId = "B10"; // Cell where the average is displayed
    const errorCellId = "A10";

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (isNaN(cellValue)) {
            document.getElementById(errorCellId).innerText = `Error: Non-numeric value in cell ${cellRef}`;
            return;
        }
        sum += cellValue;
        count++;
    }

    // Display the result in cell B10
    document.getElementById("result").innerText = (sum / count) || 0;
}

function calculateSum() {
    const formulaInput = document.getElementById("formulaInput").value;
    const resultCellId = "A10"; // Cell where the result is displayed
    let cellRefs = [];

    if (formulaInput.startsWith("=SUM(")) {

        if (!formulaInput.startsWith("=SUM(") || !formulaInput.endsWith(")")) {
            document.getElementById(resultCellId).innerText = "Error: Invalid formula syntax";
            return;
        }

        // Extract cell references from the formula
        const cellRefsString = formulaInput.substring(5, formulaInput.length - 1);
        cellRefs = cellRefsString.split(",").map(ref => ref.trim()); // Split by comma and trim whitespace

        let sum = 0
            // Iterate over cell references
        for (const cellRef of cellRefs) {
            const cellValue = parseFloat(document.getElementById(cellRef).innerText);

            if (isNaN(cellValue)) {
                document.getElementById(resultCellId).innerText = `Error: Non-numeric value in cell ${cellRef}`;
                return;
            }

            sum += cellValue;
        }

        // Display the result in cell A10
        document.getElementById("result").innerText = sum;
    } else if (formulaInput.startsWith("=AVERAGE(")) { // Extract cell references from the formula
        const cellRefsString = formulaInput.substring(9, formulaInput.length - 1);
        cellRefs = cellRefsString.split(",").map(ref => ref.trim()); // Split by comma and trim whitespace

        calculateAverage(cellRefs);
    } else if (formulaInput.startsWith("=MAX(")) {

        // Extract cell references from the formula
        const cellRefsString = formulaInput.substring(5, formulaInput.length - 1);
        cellRefs = cellRefsString.split(",").map(ref => ref.trim()); // Split by comma and trim whitespace

        calculateMax(cellRefs);
    } else if (formulaInput.startsWith("=MIN(")) {

        // Extract cell references from the formula
        const cellRefsString = formulaInput.substring(5, formulaInput.length - 1);
        cellRefs = cellRefsString.split(",").map(ref => ref.trim()); // Split by comma and trim whitespace

        calculateMin(cellRefs);
    } else if (formulaInput.startsWith("=COUNT(")) {

        // Extract cell references from the formula
        const cellRefsString = formulaInput.substring(7, formulaInput.length - 1);
        cellRefs = cellRefsString.split(",").map(ref => ref.trim()); // Split by comma and trim whitespace

        calculateCount(cellRefs);
    } else if (formulaInput.startsWith("=COUNT_ALL(")) {

        // Extract cell references from the formula
        const cellRefsString = formulaInput.substring(11, formulaInput.length - 1);
        cellRefs = cellRefsString.split(",").map(ref => ref.trim()); // Split by comma and trim whitespace

        calculateCountAll(cellRefs);
    } else if (formula.startsWith("=TRIM(")) {
        const cellRefsString = formula.substring(5, formula.length - 1);
        const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
        performTrim(cellRefs);
    } else if (formulaInput.startsWith("=UPPER(")) {
        const cellRefsString = formula.substring(6, formula.length - 1);
        const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
        performUpper(cellRefs);
    } else if (formula.startsWith("=LOWER(")) {
        const cellRefsString = formula.substring(6, formula.length - 1);
        const cellRefs = cellRefsString.split(",").map(ref => ref.trim());
        performLower(cellRefs);
    } else if (formula.startsWith("=REMOVE_DUPLICATES(")) {
        const cellRefsString = formula.substring(17, formula.length - 1);
        const cellRefs = cellRefsString.split(":").map(ref => ref.trim());
        performRemoveDuplicates(cellRefs);
    }
}
generateSpreadsheet();