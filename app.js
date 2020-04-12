const express = require('express')
const app = express()
app.listen(8085, '0.0.0.0', () => console.log('running !'))
const path=require('path')
app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/view/index.html')))
app.get('/search', async (req, res) => {
  let result = await findTorrentAndReturnBestOne(req.query.q)
  console.log("result", result)
  if(!Array.isArray(result)) result=[result]
  return res.send(result)

})
const TorrentIndexer = require("torrent-indexer");
const torrentIndexer = new TorrentIndexer();
let queries = [

]
const sleep = () => {
  return new Promise((r,j) => {
    setTimeout(function () {
      return r()
    },5000)
  })
}
const findTorrentAndReturnBestOne = async (query) => {
  console.log("gonna get", query)

  const torrents = await torrentIndexer.search(query);
  let sorted = torrents.sort((a, b) => {
    return parseInt(a.seeders) < parseInt(b.seeders) ? 1:-1
  })
  // console.log("run -> sorted", sorted)
  let bestOption = sorted[0]
  console.log("got this", query)
  return bestOption
}
const run = async () => {
  console.log('boot up ')
  for (let i = 0; i < queries.length; i++){
    // await sleep()
    let result = await findTorrentAndReturnBestOne(queries[i])
    console.log("run -> result", result)
  }

  // let torrents = await Promise.all(promises)
  // console.log("run -> torrents", torrents)
}
// run()
//