'use strict';

// write code here
const headline = document.querySelector('thead');

function getCleanedValue(row, index) {
  const cells = row.querySelectorAll('td')[index];

  if (!cells) {
    return '';
  }

  const cleanedCell = cells.textContent.trim().replace(/[$,]/g, '');

  return isNaN(cleanedCell) ? cleanedCell : parseInt(cleanedCell);
}

headline.addEventListener('click', (e) => {
  const clickedElement = e.target.closest('th');

  if (!clickedElement) {
    return;
  }

  const columnIndex = clickedElement.cellIndex;
  const tableRows = [...document.querySelectorAll('tbody tr')];
  const tbody = document.querySelector('tbody');

  tableRows.sort((row1, row2) => {
    const value1 = getCleanedValue(row1, columnIndex);
    const value2 = getCleanedValue(row2, columnIndex);

    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 - value2;
    }

    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2);
    }
  });

  tableRows.forEach((rowData) => {
    tbody.appendChild(rowData);
  });
});
