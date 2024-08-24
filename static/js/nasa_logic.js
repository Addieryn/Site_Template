console.log("nasa logic is loaded")

// setting up api key and default variables
let api_key = "SzJT9rMVM1caktWPqH0sEhmSMHxtuYMgKEGoALPb";
let url = "https://api.nasa.gov/planetary/apod?api_key=";
let date_default = "&date="
let user_date = "2023-05-12"
//creating elements for html input
const user_date_el = document.getElementById("user_date")
const submit_button_el = document.getElementById("submit_button")

//function to fetch live api data, filter it and display into our containers
async function fetch_data(selected_date) {
  let date_url = date_default + selected_date
  let response = await fetch(url + api_key + date_url)
  response = await response.json()

  document.getElementById("title").textContent = response.title;
  document.getElementById("date").textContent = response.date;
  document.getElementById("pic").src = response.hdurl;
  document.getElementById("explanation").textContent = response.explanation;
  //running other js file funcyion through this to utilize date selection at the same time
  await fetch_epic(selected_date)
}
//function to handle submit button
function handle_sumbit(event) {
  event.preventDefault()
  user_date = user_date_el.value
  fetch_data(user_date)
}
//add event istener to run funtion
submit_button_el.addEventListener("click", handle_sumbit)
fetch_data(user_date)

