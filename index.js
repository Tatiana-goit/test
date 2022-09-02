import series from "./films.json" assert { type: "json" }


const getMostViewedShows = (shows) => {
  const sortedShows = shows.sort((a, b) => b.viewed - a.viewed)
  return sortedShows.slice(0, sortedShows.length / 2)
}

const getRandomShow = (shows) => {
  return shows[Math.floor(Math.random() * shows.length)]
}

const getShowByName = (showList, name) => {
  return showList.filter((item) => item.name === name)
}

const getShowsByGenre = (showList, genre) =>
  showList.filter((item) => item.genre === genre)

const getShowsByYear = (showList, releaseDate) =>
  showList.filter((item) => item.releaseDate === releaseDate)

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

  // const getShowByName = (showList, name) => {
  //   return showList.filter((item) => item.name === name)
  // }

  watch(showName) {
    const show = getShowByName(this.streamingService.shows, showName)[0]
    if (show === undefined) {
      console.log(`"${showName}" can not be found`)
    } else {
      show.viewed += 1
      console.log(`${Tatiana.name} watched "${showName}", `)
      console.log(`Information about "${showName}": number of views: ${show.viewed},  genre: ${show.genre}, release date: ${show.releaseDate}`)
    } 
  }
  
  // const getRandomShow = (shows) => {
  //   return shows[Math.floor(Math.random() * shows.length)]
  // } 

  getRecommendationByGenre(genre) {
    // const result = getRandomShow(
    //   this.streamingService.getMostViewedShowOfGenre(genre),
    // )
    // console.log(result)
    // console.log(result.name)
  }

  getRecommendationTrending() {
    const currentYear = new Date().getFullYear()
    const result = getRandomShow(
      this.streamingService.getMostViewedShowsOfYear(currentYear),
    )
    // console.log(result.name)
  }
}

class StreamingService {
  shows = []

  constructor(name) {
    this.name = name
    this.shows = this.shows
  }

  addShow(show) {
    if (this.shows.includes(show)) {
      console.log(`${show} has already exist`)
    } else {
      this.shows.push(show)
      // console.log(`${show.name} successfully added`)
    }
  }

  getMostViewedShowOfGenre(genre) {
    return getMostViewedShows(getShowsByGenre(this.shows, genre))
  }

  getMostViewedShowsOfYear(year) {
    return getMostViewedShows(getShowsByYear(this.shows, year))
  }
}

class Show {
  constructor(name, genre, releaseDate, viewed) {
    this.name = name
    this.genre = genre
    this.releaseDate = releaseDate
    this.viewed = viewed
  }
}

class Series extends Show {
  episodes = []

  constructor(name, genre, releaseDate, viewed, episodes) {
    super(name, genre, releaseDate, viewed)
    this.episodes = episodes
  }
  getDuration() {
    const duration = this.episodes.length * 60
    console.log(`${this.name} duration is ${duration} min.`)
  }
}

// Start

const megogo = new StreamingService('Megogo')

for (let i = 0; i < series.length; i++) {
  megogo.addShow(
    new Series(
      series[i].name,
      series[i].genre,
      series[i].releaseDate,
      series[i].viewed,
      series[i].episodes,
    ),
  )
}

const Tatiana = new User('Tatiana', [])
console.log("Сurrent user",Tatiana.name)
console.log("StreamingService",megogo.name)


const megogoSubscription = Tatiana.subscribe(megogo)
// console.log(megogoSubscription.streamingService.shows);

megogoSubscription.watch('Luck')
megogoSubscription.watch('Right way')
megogoSubscription.getRecommendationByGenre('drama')
megogoSubscription.getRecommendationTrending()
