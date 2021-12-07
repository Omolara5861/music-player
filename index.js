function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}

// Stretch goals:
// - Allow the user to select different sounds.
let songList = [
	{
		thumbnail:"../img/images (2).jpg",
		audio:"../bells.mp3",
		songname:"🎄 Jingle all the way! 🔔",
		artistname:"Scrimba"
	},
	{
		thumbnail:"../img/60596-istock-860567864.jpg",
		audio:"../We-wish-you-a-merry-christmas.mp3",
		songname:"⛄ We Wish You a Merry Christmas 🎅",
		artistname:"Black Box"
	},
	{
		thumbnail:"../img/72216-pixabay.jpg",
		audio:"../amazing-grace-of-christmas-11162.mp3",
		songname:"🎄 Amazing Grace of Christmas 👼",
		artistname:"Lesfm",
	},
	{
		thumbnail:"../img/ac509c7186.0.jpeg",
		audio:"../christmas-atmosphere-11418.mp3",
		songname:" ⛪ Christmas Atmosphere 🎄",
		artistname:"Tommy Mutiu",
	},
	{
		thumbnail:"../img/christmas-carols-e1322586509796-610x400.jpg",
		audio:"../christmas-cinematic-dream-piano-9784.mp3",
		songname:"🎅 Christmas Cinematic ⛄",
		artistname:"AlexChernykh",
	},
	{
		thumbnail:"../img/christmassongs.jpg",
		audio:"../christmas-lounge-11615.mp3",
		songname:"Christmas Lounge",
		artistname:"Lesfm",
	},
	{
		thumbnail:"../img/images (1).jpg",
		audio:"../christmas-magic-night-11648.mp3",
		songname:"⛄ Christmas Magic 🎁",
		artistname:"Alex MakeMusic",
	},
	{
		thumbnail:"../img/images.jpg",
		audio:"../happy-christmas-11300.mp3",
		songname:"🎄 Happy Christmas 🤶",
		artistname:"Mike Relm",
	},
	{
		thumbnail:"../img/istockphoto-1058861638-612x612.jpg",
		audio:"../jingle-bells-2189.mp3",
		songname:"🔔 Jingle Bells 🔔",
		artistname:"Causmic",
	}
];
 
let currentSongIndex = 0;
 
let player = _(".player"),
	toggleSongList = _(".player .toggle-list");
 
let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control")
}
 
toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	player.classList.toggle("activeSongList");
});
 
_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex){
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="./files/${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));
 
let songListItems = _all(".player .player-list .list .item");
for(let i=0;i<songListItems.length;i++){
	songListItems[i].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}
 
function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src","./files/"+song.thumbnail);
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("./files/${song.thumbnail}") center no-repeat`;
	document.body.style.backgroundSize = "cover";	
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src","./files/"+song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		}
	})
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);
 
main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});

// Task:
// - Add the functionality to play, pause and stop the jingling bells (bells.mp3).
main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.audio.play();
		main.playPauseControl.classList.remove("paused");
		playing = true;

	} else {
		main.audio.pause();
		main.playPauseControl.classList.add("paused");
		playing = false;

	}
});
main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);

let volumeController = document.getElementById("volume-controller");
let volumeDisplay = document.getElementById("volume-display");
let volumeUpIcon = document.querySelector(".fa-volume-up");
let volumeMuteIcon = document.querySelector(".fa-volume-mute");
let stopSound = document.getElementById('stop');


// Stretch goals:
// - Add volume controls.
volumeController.oninput = volumeChange;

function volumeChange() {
    volumeDisplay.innerText = this.value;
    const setVolume = this.value/100;
    main.audio.volume = setVolume;
    volumeMuteIcon.hidden = setVolume == 0 ? false : true;
    volumeUpIcon.hidden = setVolume > 0 ? false: true;
}

volumeUpIcon.addEventListener('click', () => {
	volumeUpIcon.style.display = 'none';
    volumeMuteIcon.style.display = 'block';
    volumeController.value = 100;
    triggerEvent(volumeController, "input");
});

volumeMuteIcon.addEventListener('click', () => {
	volumeMuteIcon.style.display = 'none';
	volumeUpIcon.style.display = 'block';
    volumeController.value = 0;
    triggerEvent(volumeController, "input");
}); 



function triggerEvent(ele, event) {
    ele.dispatchEvent(new Event(event));
}