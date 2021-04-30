const $ = require('cheerio')
const fs = require('fs')

const html = fs.readFileSync('laptops.html', 'utf-8')

const tbody = $('.row', html)

let data = []

$('.col-sm-4', tbody).each((i, col) => {
  const a = $('.thumbnail', col)
  var ratings = $('.ratings', col)

  data.push({
    produit: $('.title', col).attr("title"),
    prix: $('.pull-right', col).text().trim(),
    // etoiles: $('.ratings p[data-rating=' + rating + ']', col).text().trim(),
    etoiles: $('p[data-rating]', col).val,
  })
})

fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')