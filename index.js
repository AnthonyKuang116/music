let currentPage = 0;
let maxPageSize = 50;
let totalResults;

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

    newAlbumn.onclick = (event) => {
        modalPop(album);
        event.stopPropagation();
    }
    return newAlbumn;
}

function renderResults() {
    let minSlice = maxPageSize * currentPage;
    let maxSlice = minSlice + maxPageSize;
    document.getElementById('display_songs').innerHTML = '';
    let fiftyResult = totalResults.slice(minSlice, maxSlice);
    fiftyResult.forEach(function (render) {
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
                totalResults = result.results;
                renderResults();
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


function modalPop(title) {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal').innerHTML = `<p class="modalTitle">${title.collectionName}</p>`;
}

window.onclick = function (event) {
    if (event.target != document.getElementById('modal')) {
        document.getElementById('modal').style.display = "none";
    }
}

function nextPage() {
    document.getElementById("prevButton").disabled = false;
    let page = Math.floor((totalResults.length / maxPageSize) - 1);
    if (currentPage < page) {
        currentPage += 1;
        renderResults();
        if (currentPage === page) {
            document.getElementById("nextButton").disabled = true;
        }
    }
}

function previousPage() {
    document.getElementById("nextButton").disabled = false;
    if (currentPage > 0) {
        currentPage -= 1;
        renderResults();
        if (currentPage === 0) {
            document.getElementById("prevButton").disabled = true;
        }
    }
}