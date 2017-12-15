var superDogs = ['Bulldog', 'K9', 'Great Danes', 'Chihuahua', 'Pug'];

jQuery(document).ready(function(){
	$('#addDog').on('click', function(){
		var newButton = $('#dogInput').val().trim();
		superDogs.push(newButton);
		
		renderButtons();
		return false;
	});	

	$('#superDog').on('click', 'img', function(){
		if ($(this).val() == 'still'){
			var imageNumber = $(this).attr('id');
			var gifUrl = $('#gifImage' + imageNumber).val();
			$(this).attr('src', gifUrl);
			$(this).val('gif');
		}
		else{
			var imageNumber = $(this).attr('id');
			var stillUrl = $('#stillImage' + imageNumber).val();
			$(this).attr('src', stillUrl);
			$(this).val('still');
		}
	})

	$(document).on('click', '.dog', displayDogInfo);
	renderButtons();
});

function displayDogInfo(){
	var dog = $(this).attr('data-name');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + dog + '&api_key=dc6zaTOxFJmzC&limit=10&rating=pg';
	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
			$('#superDog').empty();

			for(var i=0; i < response.data.length; i++){
				var superDog = $('<div>');
				superDog.addClass('');

				var url = response.data[i].images.fixed_height_still.url;
				var imageHtml = $('<img>');
				imageHtml.attr('src', url);
				imageHtml.attr('id', i);
				imageHtml.val('still');

				var rating = response.data[i].rating;
				var ratingHtml = $('<p>').text("Rating: " + rating);

				var stillImageHtml = $('<input>').attr('type', 'hidden');
				stillImageHtml.val(url);
				stillImageHtml.attr('id', 'stillImage' + i);

				var gifImageHtml = $('<input>').attr('type', 'hidden');
				gifImageHtml.val(response.data[i].images.fixed_height.url);
				gifImageHtml.attr('id', 'gifImage' + i);

				superDog.append(ratingHtml);
				superDog.append(imageHtml);
				superDog.append(gifImageHtml);
				superDog.append(stillImageHtml);
				
				$('#superDog').append(superDog);
			}
		}); 
};

function renderButtons(){ 
	$('#dogButtons').empty();
	for (var i = 0; i < superDogs.length; i++){
		// Then dynamicaly generates buttons for each movie in the array
	    var button = $('<button>') 
	    button.addClass('dog'); 
	   	button.attr('data-name', superDogs[i]); 
	    button.text(superDogs[i]);
	    $('#dogButtons').append(button); 

	}
}

