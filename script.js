let cities = [
    {
        arabicName: "الرياض",
        name: "Ar Riyāḑ"
    },
    {
        arabicName: "مكة المكرمة",
        name: "Makkah al Mukarramah"
    },
    {
        arabicName: "القــصيم",
        name: "Al Qaşīm"
    },
    {
        arabicName: "الشرقية",
        name: "Ash Sharqīyah"
    },
]

for (let city of cities) {
    const content = `
        <option style="color: black;">${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML += content;
}

document.getElementById("cities-select").addEventListener("change", function(){
console.log(this.value)
document.getElementById("city_name").innerHTML = this.value;
    let cityName = "";
    cities.some((cityObject) => {
        if(cityObject.arabicName === this.value)cityName =  cityObject.name;
    })
    getPrayersTimingsOfCity(cityName);
})

function getPrayersTimingsOfCity(cityName){
    let params = {
        country: "SA",
        city: cityName
    }
    axios.get(`https://api.aladhan.com/v1/timingsByCity`, {
        params: params,
    })
    .then(function(response){
        const timings = response.data.data.timings;
        fillTimeForPrayer("fajr_time", timings.Fajr)
        fillTimeForPrayer("sunrise_time", timings.Sunrise)
        fillTimeForPrayer("dhurh_time", timings.Dhuhr)
        fillTimeForPrayer("asr_time", timings.Asr)
        fillTimeForPrayer("sunset_time", timings.Maghrib)
        fillTimeForPrayer("isha_time", timings.Isha)
    
        const readableDate = response.data.data.date.readable;
        const weekDay = response.data.data.date.hijri.weekday.ar;
        const date = weekDay + " " + readableDate
        document.getElementById("date").innerHTML = date;
    
    })
    .catch(function (error){
        console.log(error)
    })
}

getPrayersTimingsOfCity("Ar Riyāḑ");


function fillTimeForPrayer(id, time){
    document.getElementById(id).innerHTML = time;
}