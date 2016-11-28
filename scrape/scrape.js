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
    const key = trim($(this).text())

    // Tags are actually a series of anchors after the h3
    if (key === "Tags") {
      const anchors = $(this).nextAll('a') 
      const values = anchors.map(function(i, el) { return trim($(this).text())}).get()
      kvs.push([key, values])
    // Otherwise just take the next div
    } else {
      const value = $(this).next('div').text()

      // Let's do some cleanup of actual transcript
      if (key === "Transcript") {
        let lines = value.split(/\n/)
        lines = _.filter(lines, (line) => {
          line = line.trim()
          // Remove comments from transcript people
          if (line[0] == '[' || line[line.length-1] == ']') return false

          // Remove lines that are just a number
          if (line.length == 1) return false

          return true
        })
        kvs.push([key, trim(lines.join(" "))])
      } else {
        kvs.push([key, trim(value)])
      }
    }
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

