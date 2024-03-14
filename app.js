console.log("helloworld");

// Create some constant and variables that we will populate/
//  use later to find out about the workbook structure

const viz = document.getElementById("ourViz");
let workbook;
let VizActiveSheet;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// Log all info about the workbook
// with a function

function logWorkbookInformation() {
  // Get the workbook, this is where we reference the variables made

  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // Get the array of dashboards (tabs) & stand alone sheets

  let sheets = workbook.publishedSheetsInfo;

  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
is: "${element.name}`);
  });

  VizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet with name is : "${VizActiveSheet.name}"`);

  //   List all of the worksheets within the actice sheet

  listSheets = VizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
is: "${element.name}"`);
  });

  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// We are only interested in the active sheets

// Log the workbook info once the viz is interactive

viz.addEventListener("firstinteractive", logWorkbookInformation);

// tell JS which buttons are which

const OregoganWashingtonButton = document.getElementById(
  "oregan_and_Washington"
);

const ClearFilterButton = document.getElementById("Clear_Filter");

const UndoButton = document.getElementById("Undo");

// Functions to do when Buttons are clicked

function oreganWashFunction() {
  // Log what is pressed
  console.log(OregoganWashingtonButton.value);

  // This is where we start applying the filter to all of the sheets

  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearStateFilter() {
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

function Undo() {
  viz.undoAsync();
}

OregoganWashingtonButton.addEventListener("click", oreganWashFunction);
ClearFilterButton.addEventListener("click", clearStateFilter);
UndoButton.addEventListener("click", Undo);
