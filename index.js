//function fetches the given word details from dictionary api
function searchData(url,word){
    fetch(url).then((response)=>{
        return response.text();
    })
    .then(data=>{

        /* changing background image each time user enters new word.
            the related bg image is fetched from the source.unsplash api*/
        document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?${word}')`;

        //making our own dictionary
        let dictionary = JSON.parse(data);

        //fetching the contents from the json that we require
        let definition = dictionary[0].meanings[0].definitions[0].definition;
        let phonetic = dictionary[0].phonetic;
        let antonyms = dictionary[0].meanings[0].antonyms;
        let synonyms = dictionary[0].meanings[0].synonyms;
        let pos = dictionary[0].meanings[0].partOfSpeech;

        //all contents will be shown in the website
        let code = `
            <div style="display: flex; justify-content:center"><h3>${word.toUpperCase()}</h3></div>
            <br>
            <p>${definition}</p>
            <br>
            <p><span>phonetics</span>: ${phonetic}</p>
            <p><span>synonyms</span>: ${synonyms}</p>
            <p><span>antonyms</span>: ${antonyms}</p>
            <p><span>part of speech</span>: ${pos}</p>
        `
        document.getElementById("inside").innerHTML = code;
        document.getElementById("input").style.border = 'none';

        //can also see data in console
        console.log(definition + phonetic+ antonyms +synonyms +pos);
    })
    /*incase an error (commonly 404) occurs
        set the bg image and html content accordingly*/
    .catch(error=>{
        let code = `
            <div id="oops">
                <div  id="oops2">
                    <h2>OOPS !</h2><br>
                    <p>not found what you're searching for</p>
                </div>
            </div>    
        `
        document.getElementById("inside").innerHTML = code;  
        document.body.style.backgroundImage = `url('static/error.png')`; 
        document.getElementById("input").style.border = '1px solid red';     
        console.log(error);
    })
}

//adding event listener to the search button 
document.getElementById("btn")
.addEventListener('click',()=>{

    //the below url fetches all the attributes of the given word from its word list
    let word = document.getElementById("input").value;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    searchData(url,word);
})

/*end of the Program*/

