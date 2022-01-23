const fs = require('fs')
const csv = require('csv-parser')
const results = []

fs.unlink('canada.txt', (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log("File deleted successfully...")
})

fs.unlink('usa.txt', (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log("File deleted successfully...")
})

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row['country'] === 'Canada') {
            fs.appendFileSync('canada.txt', row.country.toString() + ", " + row.year.toString() + ", " + row.population.toString() + "\n")
        }

        if (row['country'] === 'United States') {
            fs.appendFileSync('usa.txt', row.country.toString() + ", " + row.year.toString() + ", " + row.population.toString() + "\n")
        }
        
    })
    .on('end', () => {
        console.log('CSV file read')
    })
    