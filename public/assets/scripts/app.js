const container= document.getElementById("artist-carousel");
const track = document.getElementById("artist-carousel-track");
let currentIndex = 0;

function loadCarousel() {
    track.innerHTML = artistas.map(artista => `
        <div id="artist-carousel-item" onclick="viewArtist(${artista.id})">
            <img src="${artista.image}">
            <div>
                <h1>${artista.nome}</h1>
            </div>
        </div>
        `
    ).join('')
}

function slide(direction) {
    const totalItems = artistas.length;
    const containerWidth = container.offsetWidth; 
    const maxIndex = totalItems - 1;                

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    track.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
}

function loadGrid() {
    const grid = document.getElementById("artist-grid");
    grid.innerHTML = artistas.map(artista => `
        <div id="artist-grid-item" onclick="viewArtist(${artista.id})">
            <img src="${artista.image}">
            <h2>${artista.nome}</h2>
            <p>Gêneros:${artista.generos}</p>
        </div>`    
    ).join('')    
}
function viewArtist(id) {
    window.location.href = `detalhe.html?id=${id}`;
}

function loadArtist() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const artista = artistas.find(a => a.id == id);
    const container = document.getElementById("artist-data");
    if (artista) {
        container.innerHTML = `
            <div id="artist-details">
                <img src="${artista.image}">
                <div>
                    <h1>${artista.nome}</h1>
                    <p>Gêneros: ${artista.generos}</p>
                    <p>Idiomas: ${artista.idioma}</p>
                    <p>Vocaloids: ${artista.vocaloids}</p>
                </div>
            </div>
            <h2>Álbuns</h2>
            <div id="line"></div>
            <div id="album-grid">
        `+artista.albuns.map(album => `
            <div id="album-grid-item">
                <img src="${album.imagem}">
                <p>${album.nome}</p>
            </div>
            `).join('')+
        "</div>"
    } else {
        container.innerHTML = `
        <h1>Artista não encontrado.</h1>
        `
    }
}
window.onload = (() => {
    try{loadGrid()} catch(e){console.error(e)}
    try{loadCarousel()} catch(e){console.error(e)}
    try{loadArtist()} catch(e){console.error(e)}
})