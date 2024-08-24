
let api_key = "SzJT9rMVM1caktWPqH0sEhmSMHxtuYMgKEGoALPb";


async function fetch_epic(user_date) {
  let epic_url = `https://api.nasa.gov/EPIC/api/enhanced/date/2024-05-02?api_key=${api_key}`;
  let response = await fetch(epic_url)
  response = await response.json()
  let img_url =  `https://epic.gsfc.nasa.gov/archive/enhanced/2024/05/02/png/`;
  let img_type = ".png";
  console.log(response)
    document.getElementById("img1").src = img_url + response[0].image + img_type;
    document.getElementById("img2").src = img_url + response[1].image + img_type;
    document.getElementById("img3").src = img_url + response[2].image + img_type;
    document.getElementById("img4").src = img_url + response[3].image + img_type;
    document.getElementById("img5").src = img_url + response[4].image + img_type;
    document.getElementById("img6").src = img_url + response[5].image + img_type;
    document.getElementById("img7").src = img_url + response[6].image + img_type;
    document.getElementById("img8").src = img_url + response[7].image + img_type;
    document.getElementById("img9").src = img_url + response[8].image + img_type;
    document.getElementById("img10").src = img_url + response[9].image + img_type;
    document.getElementById("img11").src = img_url + response[10].image + img_type;
    document.getElementById("img12").src = img_url + response[11].image + img_type;
    document.getElementById("img13").src = img_url + response[12].image + img_type;
    document.getElementById("img14").src = img_url + response[13].image + img_type;
    document.getElementById("img15").src = img_url + response[14].image + img_type;
    document.getElementById("img16").src = img_url + response[15].image + img_type;
    document.getElementById("img17").src = img_url + response[16].image + img_type;
    document.getElementById("img18").src = img_url + response[17].image + img_type;
    document.getElementById("img19").src = img_url + response[18].image + img_type;
    document.getElementById("img20").src = img_url + response[19].image + img_type;
    document.getElementById("img21").src = img_url + response[20].image + img_type;
    document.getElementById("img22").src = img_url + response[21].image + img_type;

}


let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 125); 
}

console.log("nasa logic is loaded")
//APOD
// from config import nasa_api_key

let url = "https://api.nasa.gov/planetary/apod?api_key=";

let date_default = "&date="
let user_date = "2024-05-02"



async function fetch_data(user_date) {
  let date_url = date_default + user_date
  let response = await fetch(url + api_key + date_url)
  response = await response.json()
  await fetch_epic(user_date)
}



fetch_data(user_date)

