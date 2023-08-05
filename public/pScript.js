const playlistForm = document.getElementById('playlistForm');
const playlistNameInput = document.getElementById('playlistName');
const playlistList = document.getElementById('playlistList');
const movieForm = document.getElementById('movieForm');
const movieTitleInput = document.getElementById('movieTitle');
const selectedPlaylistInput = document.getElementById('selectedPlaylist');

let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

displayPlaylists();

playlistForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const playlistName = playlistNameInput.value;
  const privacy = document.querySelector('input[name="privacy"]:checked').value;
  createPlaylist(playlistName, privacy);
});

movieForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const movieTitle = movieTitleInput.value;
  const selectedPlaylistId = parseInt(selectedPlaylistInput.value);
  addMovieToPlaylist(movieTitle, selectedPlaylistId);
});

function createPlaylist(name, privacy) {
  const playlist = {
    id: Date.now(),
    name,
    privacy,
    movies: []
  };
  playlists.push(playlist);
  localStorage.setItem('playlists', JSON.stringify(playlists));
  displayPlaylists();
  playlistForm.reset();
}

function addMovieToPlaylist(movieTitle, playlistId) {
  const playlist = playlists.find(playlist => playlist.id === playlistId);
  if (playlist) {
    const movie = {
      id: Date.now(),
      title: movieTitle
    };
    playlist.movies.push(movie);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    displayPlaylists();
    movieForm.reset();
  }
}

function displayPlaylists() {
  playlistList.innerHTML = '';
  playlists.forEach(playlist => {
    const listItem = document.createElement('li');
    listItem.textContent = `${playlist.name} (${playlist.privacy})`;
    const movieList = document.createElement('ul');
    playlist.movies.forEach(movie => {
      const movieItem = document.createElement('li');
      movieItem.textContent = movie.title;
      movieList.appendChild(movieItem);
    });
    listItem.appendChild(movieList);
    playlistList.appendChild(listItem);
  });
}
