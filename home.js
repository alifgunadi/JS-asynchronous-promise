const generalBtn = document.getElementById('general');
const businessBtn = document.getElementById('business');
const sportsBtn = document.getElementById('sports');
const technologyBtn = document.getElementById('technology');
const entertainmentBtn = document.getElementById('entertainment');
const searchBtn = document.getElementById('searchBtn');
const newsQuery = document.getElementById('newsQuery');
const newsType = document.getElementById('newsType');
const newsDetail = document.getElementById('newsDetail');

// ARRAY
let newsDataArr = [];


// API
const api_key = "9963d8018be64f6d92816e2533c73a1e";
const headlines_news = "https://newsapi.org/v2/top-headlines?country=id&apiKey=";
const general_news = "https://newsapi.org/v2/top-headlines?country=id&category=general&apiKey=";
const business_news = "https://newsapi.org/v2/top-headlines?country=id&category=business&apiKey=";
const sports_news = "https://newsapi.org/v2/top-headlines?country=id&category=sports&apiKey=";
const technology_news = "https://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey=";
const entertainment_news = "https://newsapi.org/v2/top-headlines?country=id&category=entertainment&apiKey=";
const search_news = "https://newsapi.org/v2/everything?q=";


window.onload = function() {
    newsType.innerHTML = "<h4>Headline News</h4>";
    fetchHeadlines();
}


generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>General</h4>";
    fetchGeneralNews();

});
businessBtn.addEventListener('click', function() {
    newsType.innerHTML="<h4>Business</h4>";
    fetchBusinessNews();

});
sportsBtn.addEventListener('click', function() {
    newsType.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();

});
technologyBtn.addEventListener('click', function() {
    newsType.innerHTML="<h4>Technology</h4>";
    fetchTechnologyNews();

});
entertainmentBtn.addEventListener('click', function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();

});
searchBtn.addEventListener('click', function() {
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();

});

const fetchHeadlines = async () => {
    const response = await fetch(headlines_news + api_key);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status + response.statusText);
        newsDetail.innerHTML = "<h4>No data found.</h4>";
    }
}

const fetchGeneralNews = async () => {
    const response = await fetch(general_news + api_key);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status + response.statusText);
        newsDetail.innerHTML = "<h4>No data found.</h4>";
    }

    displayNews();
}
const fetchBusinessNews = async () => {
    const response = await fetch(business_news + api_key);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status + response.statusText);
        newsDetail.innerHTML = "<h4>No data found.</h4>";
    }

    displayNews();
}
const fetchSportsNews = async () => {
    const response = await fetch(sports_news + api_key);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status + response.statusText);
        newsDetail.innerHTML = "<h4>No data found.</h4>";
    }

    displayNews();
}
const fetchTechnologyNews = async () => {
    const response = await fetch(technology_news + api_key);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status + response.statusText);
        newsDetail.innerHTML = "<h4>No data found.</h4>";
    }

    displayNews();
}
const fetchEntertainmentNews = async () => {
    const response = await fetch(entertainment_news + api_key);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status + response.statusText);
        newsDetail.innerHTML = "<h4>No data found.</h4>";
    }

    displayNews();
}
const fetchQueryNews = async () => {
    if(newsQuery.values == null)
        return;

    const response = await fetch(search_news + encodeURIComponent(newsQuery.value) + "&apiKey=&" + api_key)
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsDetail.innerHTML = "<h4>No data found.</h4>";
    }

    displayNews();
}


function displayNews() {

    newsDetail.innerHTML = "";
    if(newsDataArr.length == 0) {
        newsDetail.innerHTML = "<h4>No data found.</h4>";
        return;
    }

    newsDataArr.forEach(news => {
        let date = news.publishedAt.split("T");

        let col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        let card = document.createElement('div');
        card.className = "p-2";

        let image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        let cardBody = document.createElement('div');

        let newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement('h7');
        dateHeading.className = "text-secondary";
        dateHeading.innerHTML = date[0];

        let discription = document.createElement('p');
        discription.className = "text-muted";
        discription.innerHTML = news.description;

        let link = document.createElement('a');
        link.className = 'btn btn-dark';
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetail.appendChild(col);

    });
}
