const csvParse = require("csv-parse/lib/sync")
const csvStringify = require("csv-stringify/lib/sync")
const fs = require("fs-extra")
const path = require("path")

const inputData = fs.readFileSync(
  path.resolve("./_input/my-test-input.csv"),
  "utf-8"
)

const records = csvParse(inputData, {
  columns: true,
  delimiter: [";", ","],
  skipEmptyLines: true,
  trim: true,
})

// const columnNames = Object.keys(records[0])
// console.log("column names:", columnNames)

const recordsWithSum = records.map(function (record) {
  let categoryFactor
  if (record.Category === "A") categoryFactor = 2
  if (record.Category === "B") categoryFactor = 3
  if (record.Category === "C") categoryFactor = 5
  record.Sum = record.Operations * categoryFactor
  return record
})

// console.log(recordsWithSum)

const outputData = csvStringify(recordsWithSum, {
  header: true,
})

const currentDate = new Date()
const newFolderName = currentDate
  .toISOString()
  .slice(0, -5)
  .replace(/T/g, "_")
  .replace(/:/g, "-")
// on obtient la date avec heure UTC (et non pas l'heure locale)

if (!fs.existsSync("./_output")) fs.mkdirSync("./_output")

fs.mkdir(`./_output/${newFolderName}`, (err) => {
  if (err) throw err
  console.log(`Le dossier "${newFolderName}" a été créé dans "/_output/".`)
})

fs.writeFileSync(
  path.resolve(`./_output/${newFolderName}/test.csv`),
  outputData
)
