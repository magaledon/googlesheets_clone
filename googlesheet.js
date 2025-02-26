const spreadsheet = document.getElementById("spreadsheet");
const numRows = 10;
const numCols = 10;

// Create the table
function createTable() {
    for (let i = 0; i < numRows; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < numCols; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("contenteditable", "true"); // Make the cell editable
            cell.id = String.fromCharCode(65 + j) + (i + 1); // Create cell ID (A1, B2, etc.)
            row.appendChild(cell);
        }
        spreadsheet.appendChild(row);
    }
}

createTable();



function calculateCountAll(cellRefs) {
    let count = 0;
    const resultCellId = "F10"; // Cell where the count is displayed

    for (const cellRef of cellRefs) {
        const cellValue = document.getElementById(cellRef).innerText;

        if (cellValue.trim() !== "") {
            // Only increment count if the cell is not empty
            count++;
        }
    }

    // Display the result in cell F10
    document.getElementById(resultCellId).innerText = count;
}

function calculateCount(cellRefs) {
    let count = 0;
    const resultCellId = "E10"; // Cell where the count is displayed
    const errorCellId = "A10";

    for (const cellRef of cellRefs) {
        const cellValue = parseFloat(document.getElementById(cellRef).innerText);

        if (isNaN(cellValue)) {
            document.getElementById(errorCellId).innerText = `Error: Non-numeric value in cell ${cellRef}`;
            return;
        } else {
            count++;
        }
    }

    // Display the result in cell E10
    document.getElementById(resultCellId).innerText = count;
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
    document.getElementById(resultCellId).innerText = min;
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
    document.getElementById(resultCellId).innerText = max;
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
    document.getElementById(resultCellId).innerText = (sum / count) || 0;
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
        document.getElementById(resultCellId).innerText = sum;
    } else if (formulaInput.startsWith("=AVERAGE(")) {

        // Extract cell references from the formula
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
    } else {
        document.getElementById(resultCellId).innerText = "Error: Invalid formula syntax";
        return;
    }
}










