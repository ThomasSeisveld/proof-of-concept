import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()
const engine = new Liquid()

const API = 'https://fdnd-agency.directus.app/items'
const roundsUrl = `${API}/into_golf_rounds`
const handicapHistoryUrl = `${API}/into_golf_handicap_history`

const handicapHistoryUrl = `${API}/into_golf_handicap_history`
const milestonesUrl = `${API}/into_golf_milestones`
const monthlyRankingUrl = `${API}/into_golf_monthly_ranking`

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

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