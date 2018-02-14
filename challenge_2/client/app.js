//create input text box

//add an form input box to the div.
$(document).ready(function() {
	$("form").submit(function(e) {
		e.preventDefault();
		sendAjaxRequest();
	})
})

//for some reason, it refreshes

//when you press enter or click submit, send an ajax request and display the response

var textInBox = $("#string").val()
console.log(textInBox)


var sendAjaxRequest = function() {
$.ajax({
	url: '/',
	type: 'POST',
	data: JSON.stringify(textInBox),
	contentType: 'application/json',
	success: function(data) {
		console.log(textInBox)
		console.log(data);
		console.log('success')
	},
	error: function (data) {
		console.log('not sent')
	}

})
}


$("body").append("<p>" + textInBox + "</p>");