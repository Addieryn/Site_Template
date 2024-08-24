

let api_key2 = "SzJT9rMVM1caktWPqH0sEhmSMHxtuYMgKEGoALPb";


async function fetch_epic(selected_date) {
  let epic_url = `https://api.nasa.gov/EPIC/api/natural/date/${selected_date}?api_key=${api_key2}`;
  let response = await fetch(epic_url)
  response = await response.json()  
  let img_url =  `https://epic.gsfc.nasa.gov/archive/natural/${selected_date.replaceAll("-", "/")}/png/`;
  let img_type = ".png";
  console.log(response)
  console.log(selected_date.replaceAll("-", "/"))
    document.getElementById("img1").src = img_url + response[0].image + img_type;
    document.getElementById("img2").src = img_url + response[2].image + img_type;
    document.getElementById("img3").src = img_url + response[5].image + img_type;
    document.getElementById("img4").src = img_url + response[8].image + img_type;

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
    setTimeout(showSlides, 500); // Change image every 2 seconds
}