//creating containers for our data
const submit_button_el = document.querySelector("#submit_button")
const all_data = {
    volcano: null,
    ice: null,
    storm: null,
    wildfire: null,
    fireball: null
}
// function to filter chart data
function buildCharts(type, date) {
    //spliting dates to get month and year
    const filtered_data = all_data[type].events.filter(obj => obj['geometries'][0]['date'].split("T")[0].split("-").slice(0, 2).join("-")== date)
    //making one data list to access
    const plot_data = [
        [],
        [],
        [],
        []
    ]
    //filtering and appending values to list
    plot_data[0] = (filtered_data.map(obj => {
        const title = obj.title
        const link = obj.sources[0].url
        return `<a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>`
    }))
    plot_data[1] = (filtered_data.map(obj => obj.geometries[0].date))
    plot_data[2] = (filtered_data.map(obj => obj.geometries[0].coordinates[1]))
    plot_data[3] = (filtered_data.map(obj => obj.geometries[0].coordinates[0]))
    //selecting where to push data
    const html_table = d3.select("#event_table")
    html_table.html("")
    plot_data[0].forEach((title, i) => {
        const tr = html_table.append("tr")
        for (const column of plot_data) {
            tr.append("td").html(column[i])
        }
        console.log(title, i)
    });
}
// Function to run when loaded
async function init() {
    all_data.volcano = await d3.json("../../data/nature_json/volcano.json")
    all_data.wildfire = await d3.json("../../data/nature_json/wildfire.json")
    all_data.ice = await d3.json("../../data/nature_json/ice.json")
    all_data.storm = await d3.json("../../data/nature_json/storm.json")
    all_data.fireball = await d3.json("../../data/nature_json/fireball.json")
    //setting up date handler defaults
    handleDate(all_data.volcano)
    buildCharts("volcano", "2024-05")
    console.log(all_data)
}
//creating date handler function
function handleDate(current_data) {
    const date_dd = d3.select("#weather_month")
    date_dd.html("")
    const date_list = []
    current_data.events.forEach(event => {
        const event_date = event['geometries'][0]['date'].split("T")[0].split("-").slice(0, 2).join("-")
        if (!date_list.includes(event_date)) { 
            date_list.push(event_date) 
        }

    });
date_list.forEach(event => {
    date_dd.append("option").text(event)
});
}
//creating submit function
function handleSubmit(event) {
    const type = d3.select("#weather_type").property("value")
    const date = d3.select("#weather_month").property("value")
    buildCharts(type, date)
}
//adding event listener for submit values
submit_button_el.addEventListener("click", handleSubmit)
document.getElementById("weather_type").addEventListener("change", function(event){
    handleDate(all_data[event.target.value])
})
// Initialize the dashboard
init();
