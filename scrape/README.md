Dear Bird Scraper
====

Convert unstructured HTML from the [LBJ Library archive](http://archives.lbjlibrary.org/) into structured data representing the 1934 courtship letters.

In `data/html`, we have the original HTML pages downloaded directory from the library archive. JSON transcripts are stored in `data/json`, one for each letter.

The structure of each transcript is as follows:
- `Date`: an estimate of when the letter was written
- `Abstract`: a summary of the letter's content
- `Creator`: either Lyndon or Lady Bird
- `Transcript`: full text of the letter
- `Format`: always the string "Letter"
- `Item Type`: always the string "Document"
- `Rights`: copyright information
- `Publisher`: publisher information
- `Collection`: title and details regarding the collection of love letters
- `Citation`: how to cite this letter
- `Tags`: array of tags associated with this letter

Run
===

The scraper itself is written in ES6, which requires babel to run. The following should work with a reasonably modern version of Node:

```
npm install
npm run-script scrape
```
