function cardCreation(album) {
    const newAlbumn = document.createElement("div");
    newAlbumn.id = "card";

    const albumImg = document.createElement("img");
    albumImg.id = "albumImg";
    albumImg.src = `${album.artworkUrl60}`;

    const albumTitle = document.createElement("div");
    albumTitle.innerHTML = `<p class="albumTitle">${album.collectionName}</p>`


    newAlbumn.appendChild(albumImg);
    newAlbumn.appendChild(albumTitle);
    document.getElementById('display_songs').append(newAlbumn)
    return newAlbumn;
}

function renderResults(result) {
    document.getElementById('display_songs').innerHTML = '';
    result.forEach(function (render) {
        document.getElementById('display_songs').append(cardCreation(render));
    })
}

function searchSongs(input) {
    if (event.key === 'Enter') {
        let searchVal = input.value;
        fetch(`https://itunes.apple.com/search?term=${searchVal
            }&media=music&entity=album&attribute=artistTerm&limit=200`)
            .then((response) => response.json())
            .then((result) => {
                renderResults(result.results);
                songCount(result.results, searchVal);
                return result;
            })
            .catch(console.error)
    }
}

function songCount(count, input) {
    document.getElementById('result_counter').innerHTML = '';
    const songCount = document.createElement("div");
    songCount.innerHTML = `<p class="songCount">${count.length} results for "${input}"</p>`
    document.getElementById('result_counter').append(songCount);
}

