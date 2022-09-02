import series from "./films.json" assert { type: "json" }
const genres = {
  action: "Action",
  adventure: "Adventure",
  comedy: "Comedy",
  drama: "Drama",
  family: "Family",
  fantasy: "Fantasy",
  horror: "Horror",
  mystery: "Mystery",
  romance: "Romance",
  thriller: "Thriller",
};

const getUserSubscriptions = (subscriptions) => {
  const subscriptionList = []
  for (let i of subscriptions) {
    subscriptionList.push(i.streamingService['name'])
  }
  return subscriptionList
}

class User {
  subscriptions = []
  constructor(name, subscriptions) {
    this.name = name
    this.subscriptions = subscriptions
  }

  subscribe(StreamingService) {
    if (this.subscriptions.includes(StreamingService)) {
      console.log(
        `User have a subscription on ${StreamingService.name}`,
      )
    } else {
      console.log(`${this.name} subscribed on ${StreamingService.name}`)
      this.subscriptions.push({ ...new Subscription(StreamingService) })
    }
   return new Subscription(StreamingService)
  }

  userSubscriptions() {
    const list = getUserSubscriptions(this.subscriptions)
    console.log(`User ${this.name} is subscribed on ${list}`)
  }
}

class Subscription {
  constructor(StreamingService) {
    this.streamingService = StreamingService
  }

 watch(showName) {
    const show = this.getShowByName(this.streamingService.shows, showName)[0]

    if (show === undefined) {
      console.log(`"${showName}" can not be found`)
    } else {
      show.viewed += 1
      console.log(`${Tatiana.name} watched "${showName}", `)
      console.log(`Information about "${showName}": number of views: ${show.viewed},  genre: ${show.genre}, release date: ${show.releaseDate}`)
    } 
  }

  getShowByName = (showList, showName) => {
    return showList.filter((el) => el.name === showName)
  }

  getRecommendationTrending() {
    const releaseDate = new Date().getFullYear()
    const result = this.getRandomShow(
      this.streamingService.getMostViewedShowsOfYear(releaseDate),
    )
    console.log(`Recommendationt trending show: "${result.name}"`)
  }

  getRecommendationByGenre(genre) {
    const result = this.getRandomShow(
      this.streamingService.getMostViewedShowOfGenre(genre),
    )
    console.log(`Recommendationt show by genre: "${result.name}"`)
  }

  getRandomShow = (shows) => {
    return shows[Math.floor(Math.random() * shows.length)]
  } 
}

class StreamingService {
  shows = series

  constructor(name) {
    this.name = name
    this.shows = this.shows
  }


  addShow(show) {
    if (this.shows.includes(show)) {
      console.log(`"${show}" has already exist`)
    } else {
      this.shows.push(show)
      console.log(`"${show.name}" successfully added, number of views: ${show.viewed},  genre: ${show.genre}, release date: ${show.releaseDate}`)
    }
  }

  getMostViewedShowsOfYear(releaseDate) {
    return this.getMostViewedShows(this.getShowsByYear(this.shows, releaseDate))
  }

  getMostViewedShowOfGenre(genre) {
    return this.getMostViewedShows(this.getShowsByGenre(this.shows, genre))
  }

  getMostViewedShows = (shows) => {
    const sortedShows = shows.sort((a, b) => b.viewed - a.viewed)
    return sortedShows.slice(0, sortedShows.length / 2)
  }

  getShowsByYear = (showList, releaseDate) =>
    showList.filter((el) => el.releaseDate === releaseDate)

  getShowsByGenre = (showList, genre) => 
    showList.filter((el) => el.genre === genre)
}

class Show {
  constructor(name, genre, releaseDate, viewed) {
    this.name = name
    this.genre = genre
    this.releaseDate = releaseDate
    this.viewed = viewed
  }
  getDuration() {
    const duration =  Math.round(60 - 0.5 + Math.random() * (81))
    console.log(`${this.name} duration is ${duration} min.`)
  }
}

class Movie extends Show {
  name;
  genre;
  releaseDate;
  constructor(name, genre, releaseDate) {
      super(name, genre, releaseDate);
      this.name = name;
      this.genre = genre;
      this.releaseDate = releaseDate;
  }
}
class Episode extends Show {
  name;
  genre;
  releaseDate;
  constructor(name, genre, releaseDate) {
      super(name, genre, releaseDate);
      this.name = name;
      this.genre = genre;
      this.releaseDate = releaseDate;
  }
}
class Series extends Show {
  name;
  genre;
  releaseDate;
  episodes;
  constructor(name, genre, releaseDate, episodes) {
      super(name, genre, releaseDate);
      this.name = name;
      this.genre = genre;
      this.releaseDate = releaseDate;
      this.episodes = episodes;
  }
}




//create StreamingServices
const megogo = new StreamingService('Megogo')
const netflix = new StreamingService('Netflix')

//create new User
const Tatiana = new User('Tatiana', [])
console.log("Сurrent user",Tatiana.name)
console.log("StreamingService",megogo.name)

// check watch the show
const megogoSubscription = Tatiana.subscribe(megogo)
megogoSubscription.watch('Luck')
megogoSubscription.watch('Right way')

//check getRecommendationByGenre, getRecommendationTrending
megogoSubscription.getRecommendationTrending()
megogoSubscription.getRecommendationTrending()
megogoSubscription.getRecommendationTrending()
megogoSubscription.getRecommendationByGenre('Family')
megogoSubscription.getRecommendationByGenre('Family')


// check addShow
megogo.addShow(
  new Series (
    "Big boss", genres.family, 2020, 1399)
);
megogo.addShow(
  new Series (
    "New adventure", genres.adventure, 2021, 997)
);

