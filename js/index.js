function id(str){
  return document.getElementById(str)
}

var playBtn = id('play')
var pauseBtn = id('pause')
var nextBtn = id('next')
var artist = id('artist')
var songTitle = id('title')
var description = id('description')
var genre = id('genre')
var date = id('date')
var artImg = id('artImg')

var tracks = []
var currentTrack = 0

SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
})

function getSong(){
  SC.get('/users/27897433/tracks').then(function(response){
    tracks = response

    artist.innerHTML = tracks[currentTrack].user.username
    artist.href = tracks[currentTrack].user.permalink_url
    title.innerHTML = tracks[currentTrack].title
    title.href = tracks[currentTrack].permalink_url

    description.innerHTML = "<em>Description</em>:<br>" + tracks[currentTrack].description
    genre.innerHTML = "<em>Genre</em>: " + tracks[currentTrack].genre
    date.innerHTML = "<em>Year</em>: " + tracks[currentTrack].release_year
    artImg.src = tracks[currentTrack].artwork_url

  }).then(function(){
    playSong()
  })
}

getSong()

function playSong(){
  SC.stream('/users/27897433/tracks/' + tracks[currentTrack].id).then(function(player){

    player.play()

    playBtn.addEventListener('click', function(){
      player.play()
    })

    pauseBtn.addEventListener('click', function(){
      player.pause()
    })

    nextBtn.addEventListener('click', function(){
      currentTrack += 1
      getSong()
      if(tracks.length < currentTrack){
        window.location.reload()
      }
    })

    player.on("finish", function(){
      currentTrack += 1
      getSong()
      if(tracks.length < currentTrack){
        window.location.reload()
      }
    })

  })
}
