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

function calculateSum() {
    const formulaInput = document.getElementById("formulaInput").value;

    if (formulaInput.startsWith("=SUM(")) {
        const range = formulaInput.substring(5, formulaInput.length - 1); // Extract "A1:A5"
        const [startCell, endCell] = range.split(":"); // Split into "A1" and "A5"

        // Get start and end column and row indexes
        const startCol = startCell.charCodeAt(0) - 65; // "A" -> 0, "B" -> 1, etc.
        const startRow = parseInt(startCell.substring(1)) - 1; // "1" -> 0, "2" -> 1, etc.
        const endCol = endCell.charCodeAt(0) - 65;
        const endRow = parseInt(endCell.substring(1)) - 1;

        let sum = 0;

        // Iterate over all cells in the range
        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                const cellId = String.fromCharCode(65 + j) + (i + 1); // Reconstruct cell ID
                const cellValue = parseFloat(document.getElementById(cellId).innerText) || 0;
                sum += cellValue;
            }
        }

        // Display the result in cell A10 (for now)
        document.getElementById("A10").innerText = sum;
    }
}

