import { readFileSync } from 'fs'
import cheerio from 'cheerio'

function scrapeFile(path) {
  let file = readFileSync(path, "utf8");

  let $ = cheerio.load(file)
	const header = $('h1')

  console.log(header.html());
}

const path = "data/html/336.htm"
const scraped = scrapeFile(path)

//console.log(scraped;
