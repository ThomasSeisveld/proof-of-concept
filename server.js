import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()
const engine = new Liquid()

const API = 'https://fdnd-agency.directus.app/items'
const golfersUrl = `${API}/into_golf_golfers`
const roundsUrl = `${API}/into_golf_rounds`
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

// golfers ophalen
    const golferResponse = await fetch(`${golfersUrl}?${params.toString()}`)
    const golferResponseJSON = await golferResponse.json()
    const allGolfers = golferResponseJSON.data ?? []


// montly ranking ophalen
    const monthlyRankingResponse = await fetch(`${monthlyRankingUrl}?${params.toString()}`)
    const monthlyRankingResponseJSON = await monthlyRankingResponse.json()
    const monthlyRankings = monthlyRankingResponseJSON.data ?? []
    const currentRankingSet = monthlyRankings[0] ?? null
    const rankings = currentRankingSet?.rankings ? JSON.parse(currentRankingSet.rankings) : []
    const rankingMonthLabel = currentRankingSet?.month
      ? new Intl.DateTimeFormat('nl-NL', { month: 'long' }).format(new Date(`${currentRankingSet.month}-01T00:00:00Z`))
      : ''

// console.log('Current Ranking Set:', currentRankingSet)
    
    response.render('myscore.liquid', {
      golfers: allGolfers,
      totalGolfers: allGolfers.length,
    
      rankings,
      rankingCategory: currentRankingSet?.category ?? 'monthly-ranking',
      rankingMonth: currentRankingSet?.month ?? '',
      rankingMonthLabel
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