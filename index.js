import { readFileSync } from 'fs'
import cheerio from 'cheerio'
import _ from 'lodash'

// Trim a string and turn newlines into whitespace
const trim = str => {
  return str.replace(/\n/g, ' ').trim() 
}

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
	console.log(obj)
}

const path = "data/html/336.htm"
const scraped = scrapeFile(path)

//console.log(scraped;
