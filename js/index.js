// var key = "a1b96ed182e044e76e8308f42dfe1f5d";
//let location;

$("document").ready(function() {
  
  // GEOLOCATION AND ERROR
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, ifError); 
  }
  
  //IF LOCATION IS FOUND
  function showPosition(position) {
      var lat = position.coords.latitude;
      console.log(lat);
      var long = position.coords.longitude;
      console.log(lat, long);

    //ACCESS THE API
      var api =
        "https://fcc-weather-api.glitch.me//api/current?lon=" + long + "&lat=" + lat;

    //DEFINE THE API INFO AS VARIABLES
      $.getJSON(api, function(data) {
        var city = data.name;
        var country = data.sys.country;
        var cTemp = Math.floor(data.main.temp);
        console.log(cTemp);
        var description = data.weather[0].description;
        var icon = data.weather[0].icon;
        var fTemp = Math.floor(cTemp * 9 / 5 + 32);

    //PLACE API INFO INTO PEDEFINED HTML DIVS
        $(".temperature").text(cTemp);

        $(".location-name").html("<p>" + city + " , " + country + "</p>");
        $(".load").hide("");
        // if(description === "clear sky"){
        //   $(".icon").append("<img  src= http://iconshow.me/media/images/ui/ios7-icons/png/512/cloud-outline.png />");
        // }
      $(".icon").append("<img  src=" + icon + "/>");

        $(".description").html("<p>" + description + "</p>");

        $("button").on("click", function() {
          if ($("button").text() === "C") {
            $("button").text("F");
          } else {
            $("button").text("C");
          }

          if ($("button").text() === "C") {
            $(".temp-style").text(cTemp);
          } else if ($("button").text() === "F") {
            $(".temp-style").text(fTemp);
          }
          
        });
      });
     } 
  });

//ERROR FUNCTION
function ifError(error) {
   $(".location-name").html("<p>Could not get the location</p>");
    $(".temperature").text("Temperature is unavailable");
  $(".temperature").css("font-size", "16px");
  $(".temp-style").css("padding-left", "7rem");
  $(".temp-button").hide("");
   $(".load").hide("");
}