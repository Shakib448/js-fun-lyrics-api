const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('display-result');


const API_URL = "https://api.lyrics.ovh/";

// Adding event listener in form

form.addEventListener('submit', e =>{
    e.preventDefault();
    const searchValue = search.value.trim(); 


    // checking search value is empty or not 
    if(!searchValue && searchValue == undefined){
        alert("There is noting in search");
    }else{
        searchSong(searchValue);
    }
})


async function searchSong(searchValue){
    const searchResult =  await fetch(`${API_URL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    // console.log(data);
    showData(data) //This connection help to show the data
}

function showData(data){
    result.innerHTML = `
        ${data.data.map(song => `
        <div class="single-result row align-items-center my-3 p-3">

        <div class="col-md-9">

        <h3 class="lyrics-name"> 

        ${song.artist.name} 

        </h3>

        <p class="author lead">Album by <span>${song.title}</p>

        </div>

        <div class="col-md-3 text-md-right text-center">

        <button data-artist="${song.artist.name}" data-songTitle="${song.title}" class="btn btn-success">Get Lyrics</button>

        </div>

        </div>

        `).join('') //This method are joining the all off html tags in html
    }
       
        `
}

//Event Listener in get lyrics button 

result.addEventListener('click', e =>{
    const clickedElement = e.target;

    //checking clicked element is button or not

    if(clickedElement.tagName === 'BUTTON'){
        const artist = clickedElement.getAttribute("data-artist"); //This will interact the data-artist
        const songTitle = clickedElement.getAttribute("data-songTitle"); //This will interact the data-songTitle

        getLyrics (artist, songTitle)
    }
})

//Get Lyrics

async function getLyrics(artist, songTitle){
    try {
        let res = await fetch(`${API_URL}/v1/${artist}/${songTitle}`); // Here is the most tricky part
        let data = await res.json()
            
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br/>'); // This will replace all the lyrics at the same time

        if(data.lyrics == undefined){
            alert('No lyrics fount !!!')
        } 

        result.innerHTML = `

        <div class="single-lyrics text-center">

        <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>

        <pre class="lyric text-white">${lyrics}</pre>

        </div>

        `;
      } catch(err) {
        // catches errors both in fetch and response.json
        alert('This lyrics is not found!!!.');
        location.reload()
      }
    
    console.log(data);
}

