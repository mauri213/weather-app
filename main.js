function mainMenu () {
	$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/find?lat=-37&lon=-118&cnt=10&appid=7cd032422ed7196011cec831381eb45b',
			method: 'GET',
			success: function (results) {
				mainMenu(results.key);
			}
		});
	}
}

function subMenu () {

}