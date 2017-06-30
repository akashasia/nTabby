
// Thumbnails Gotten Handler
function thumbnailsGotten(data) {
	
	// Get the topsites list
	var cList = $('ul#topsites')

	// Loop through the top 10 most visited sites
	$.each(data.slice(0, 10), function(i) {
		// Fetch the favicon
		var favicon = 'url(chrome://favicon/' + data[i].url +')';

		// Create each line item
		cList.append($('<li>').append($('<div>').append($('<a>')
				.attr('href', data[i].url)
				.attr('class', 'listlink')
				.append($('<span>')
				.css('background-image', favicon)
				.css('padding-left','24px')) 
			.append(data[i].title)
			.append($('<div>').attr('class','subtitle').append(data[i].url)
				))));
	});	

	// -- older code | lacks the subtitle --
	// $.each(data.slice(0, 10), function(i) {
	// 	var favicon = 'url(chrome://favicon/' + data[i].url +')';
	// 	cList.append($('<li>').append($('<a>')
	// 			.attr('href', data[i].url)
	// 			.append($('<span>')
	// 			.css('background-image', favicon)
	// 			.css('padding-left','24px') //.attr('class', 'tab')
	// 		.append(data[i].title))));
	// });

}
window.onload = function() {
	// Tell chrome to give us the top sites
	chrome.topSites.get(thumbnailsGotten);

	// Get the Date String
	var date = new Date().toDateString();

	// Set the date
	document.getElementById("date").textContent = date.slice(0,-4);
}

chrome.identity.getProfileUserInfo(function(userInfo) {
 /* Use userInfo.email, or better (for privacy) userInfo.id
    They will be empty if user is not signed in in Chrome */
	console.log(userInfo)
});

function startTime() {
	var d = new Date();
	var n = d.toLocaleTimeString();
	var time = n.slice(0,-6)
	var ampm = n.slice(-3)

	document.getElementById("time").textContent = time;
	document.getElementById("ampm").textContent = ampm;

	// Refresh time every 500ms
	t = setTimeout(function() {
		startTime()
	}, 500);
}

startTime();