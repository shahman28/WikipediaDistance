var request = require('request');
var cheerio = require('cheerio');
var queue = require('queue')
const base = 'https://en.wikipedia.org'
const start = 'https://en.wikipedia.org/wiki/United_States'
const end   = 'https://en.wikipedia.org/wiki/Ulysses_S._Grant'

var q = queue();
q.push(getLinks(start));
var visited = new Set();

while(queue.length != 0){
  vertex = q.pop()
  newlink = base+vertex
  if(newlink == end){
    console.log('found!');
    break;
  }
  visited.add(vertex)
  links = getLinks(base+vertex)
  q.push(links)
  
}




function getLinks(url){
  request(url, function(err, resp, body){
    rets = []
    $ = cheerio.load(body);
    links = $('a'); //jquery get all hyperlinks
    $(links).each(function(i, link){
      const hyperlink = $(link).attr('href')
      if($(link).attr('href') && ($(link).attr('href')).startsWith('/wiki') && !($(link).attr('href')).includes('(') && !($(link).attr('href')).includes(':'))
        rets.push(hyperlink)
    });
    return rets;
  });

}