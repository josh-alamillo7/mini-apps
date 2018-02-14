//create input text box

//add an form input box to the div.
$(document).ready(function() {
	$("form").submit(function(e) {
		e.preventDefault();
		var textInBox = $("input").val();
		console.log("text in box", textInBox);
		sendAjaxRequest()		
	})
})

//for some reason, it refreshes

//when you press enter or click submit, send an ajax request and display the response



var sendAjaxRequest = function() {
	var textInBox = $("input").val()
$.ajax({
	url: '/',
	type: 'POST',
	data: JSON.stringify(textInBox),
	contentType: 'application/json',
	success: function(data) {
		var textInBox = $("input").val();
		$("body").append("<p>" + textInBox + "</p>");
		setTimeout(sendAjaxGetRequest, 2000)
		},
	error: function (data) {
		console.log('data', data);
		console.log('not sent');
	}
})
}

var sendAjaxGetRequest = function() {
	$.ajax({
			url: '/',
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
				console.log("u got it")
				console.log("data", data)},
			error: function(data) {
				console.log('no')
			}

			})
}


