import { readFileSync, readdirSync, writeFile } from 'fs'
import { basename } from 'path'
import cheerio from 'cheerio'
import _ from 'lodash'

// Trim a string and turn newlines into whitespace
const trim = str => {
  return str.replace(/\n/g, ' ').trim() 
}

// Scrape a single file
function scrapeFile(path) {
  let file = readFileSync(path, "utf8");

  let $ = cheerio.load(file)
  $("br").replaceWith("\n");

  // Each key-value pair is an h3 followed by a div
  let kvs = []
  $('h3').each(function(i, elem) {
    const key = $(this).text()
    const div = $(this).next('div')
    const value = div.text();

    kvs.push([trim(key), trim(value)])
  })

  // Remove useless key-value pairs
  kvs = _.remove(kvs, kv => kv[0].indexOf("PDF") != 0)

  const obj = _.fromPairs(kvs)
  return obj
}

// Get list of html files
const htmls = _.filter(readdirSync("data/html"), file => file.indexOf(".htm") != -1)

_.each(htmls, file => {
  const infile = `data/html/${file}`
  const outfile = `data/json/${basename(file, '.htm')}.json`

  // Parse raw html to json
  const scraped = scrapeFile(infile)

  // If this file wasn't a 404, dump to json
  if (!_.isEmpty(scraped))
    writeFile(outfile, JSON.stringify(scraped))
})

