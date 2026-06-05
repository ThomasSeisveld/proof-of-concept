import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()
const engine = new Liquid()

const golfersUrl = 'https://fdnd-agency.directus.app/items/into_golf_golfers'
const roundsUrl = 'https://fdnd-agency.directus.app/items/into_golf_rounds'
const handicapHistoryUrl = 'https://fdnd-agency.directus.app/items/into_golf_handicap_history'
const milestonesUrl = 'https://fdnd-agency.directus.app/items/into_golf_milestones'
const monthlyRankingUrl = 'https://fdnd-agency.directus.app/items/into_golf_monthly_ranking'

app.engine('liquid', engine.express())
app.set('view engine', 'liquid')
app.set('views', './views')

app.get('/', async function (request, response) {
  try {
    const params = new URLSearchParams()

    const golferResponse = await fetch(`${golfersUrl}?${params.toString()}`)
    const golferResponseJSON = await golferResponse.json()
    const allGolfers = golferResponseJSON.data ?? []

    response.render('home.liquid', {
      golfers: allGolfers,
      totalGolfers: allGolfers.length,
    })
  } catch (error) {
    console.error(error)
    response.status(500).send('Er ging iets mis bij het ophalen van de golfers.')
  }
})

app.get('/myscore', async function (request, response) {
  try {
    const params = new URLSearchParams()

    const golferResponse = await fetch(`${golfersUrl}?${params.toString()}`)
    const golferResponseJSON = await golferResponse.json()
    const allGolfers = golferResponseJSON.data ?? []

    response.render('myscore.liquid', {
      golfers: allGolfers,
      totalGolfers: allGolfers.length,
      roundsUrl,
      handicapHistoryUrl,
      milestonesUrl,
      monthlyRankingUrl,
    })
  } catch (error) {
    console.error(error)
    response.status(500).send('Er ging iets mis bij het ophalen van de golfers.')
  }
})

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Server draait op http://localhost:${port}`)
})