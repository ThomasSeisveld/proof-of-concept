import express, { json } from "express";
import { Liquid } from "liquidjs";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");

const baseUrl = "https://fdnd-agency.directus.app/items/into_";
const golfers = "golf_golfers";
const rounds = "golf_rounds";
const handicapHistory = "golf_handicap_history";
const milestones = "golf_milestones";
const monthlyRanking = "golf_monthly_ranking";

function formatRoundDate(dateValue) {
	if (!dateValue) {
		return "";
	}

	const parsedDate = new Date(`${dateValue}T00:00:00Z`);
	if (Number.isNaN(parsedDate.getTime())) {
		return dateValue;
	}

	return new Intl.DateTimeFormat("nl-NL", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(parsedDate);
}

function normalizeRound(round) {
	const scoreValue = round?.differential ?? round?.hcp ?? round?.score ?? "";
	return {
		...round,
		date: formatRoundDate(round?.date),
		course: round?.course ?? round?.course_name ?? "Onbekend",
		badge: round?.type ?? round?.badge ?? "",
		hcp: scoreValue === "" || scoreValue === null ? "-" : Number(scoreValue).toFixed(1),
	};
}

function getInitials(fullName) {
	if (!fullName) {
		return "";
	}

	return fullName
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}


app.get("/", async function (request, response) {
	const golfer = await fetch(baseUrl + golfers + "/1");
	const allGolfers = await fetch(baseUrl + golfers + "?limit=20");
	const scores = await fetch(baseUrl + rounds + "?filter[golfer_id][_eq]=1&sort=-date&limit=5",);
	const handicapData = await fetch(baseUrl + handicapHistory + "?filter[golfer_id][_eq]=1&sort=-date&limit=12");

	// ranking fetch 
	const ranking = await fetch(baseUrl + monthlyRanking + "?filter[golfer_id][_eq]=1&sort=-month&limit=1",);
	const monthlyRankingResponseJSON = await ranking.json();
	const monthlyRankings = monthlyRankingResponseJSON.data ?? [];
	const currentRankingSet = monthlyRankings[0] ?? null;
	const allGolfersJson = await allGolfers.json();
	const golferNameById = new Map(
		(Array.isArray(allGolfersJson.data) ? allGolfersJson.data : []).map((golferRecord) => [
			golferRecord.id,
			golferRecord.name,
		]),
	);
	const rankings = currentRankingSet?.rankings
		? typeof currentRankingSet.rankings === "string"
			? JSON.parse(currentRankingSet.rankings)
			: currentRankingSet.rankings
		: [];
	const rankingsWithNames = rankings.map((ranking) => {
		const actualName = golferNameById.get(ranking.golfer_id) ?? ranking.name;
		return {
			...ranking,
			name: actualName,
			initials: getInitials(actualName),
		};
	});
	const rankingMonthLabel = currentRankingSet?.month
		? new Intl.DateTimeFormat("nl-NL", { month: "long" }).format(
			new Date(`${currentRankingSet.month}-01T00:00:00Z`),
		)
		: "";

	
	const milestone = await fetch(baseUrl + milestones + "?filter[golfer_id][_eq]=1",);
	const golferJson = await golfer.json();
	const scoresJson = await scores.json();
	const recentRounds = Array.isArray(scoresJson.data)
		? scoresJson.data.map(normalizeRound)
		: [];

	const milestoneJson = await milestone.json();

	console.log("rankings", rankingsWithNames);

	response.render("myscore.liquid", {
		golfer: golferJson.data,
		recentRounds,
		rankings: rankingsWithNames,
        rankingCategory: currentRankingSet?.category ?? 'monthly-ranking',
        rankingMonth: currentRankingSet?.month ?? '',
        rankingMonthLabel,
		milestones: milestoneJson.data,
	});
});

app.post("/score-toevoegen", async function (request, response) {
	const scoreUrl = await fetch(baseUrl + rounds);

	await fetch(scoreUrl.url, {
		method: "POST",
		body: JSON.stringify({
			golfer_id: request.body.golfer_id,
			date: request.body.date,
			course: request.body.course,
			differential: request.body.score,
			type: request.body.type,
		}),

		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
	});

	response.redirect(303, "/");
});

app.post("/score-verwijderen", async function (request, response) {
	const scoreId = request.body.score_id;

	const deleteResponse = await fetch(
		`https://fdnd-agency.directus.app/items/into_golf_rounds/${scoreId}`,
		{
			method: "DELETE",
		},
	);

	if (!deleteResponse.ok) {
		response.status(500).send("Het verwijderen niet gelukt");
		return;
	}

	response.redirect(303, "/");
	// response.redirect(303, "/?deleted=true");
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
	console.log(`http://localhost:${app.get("port")}`);
});