function start () {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/find?lat=-37&lon=-118&cnt=10&appid=7cd032422ed7196011cec831381eb45b',
		method: 'GET',
		success: function (results) {
			buildApp(results.list);
		}
	});
}

function buildApp (cities) {
	var list = document.createElement('ul'); // create an unordered list
	for (var i = 0; i < cities.length; i++) { 
		var forecast = new ForecastView('li', cities[i]); // list of cities
		forecast.render();
		list.appendChild(forecast.element); // append the list item of cities to the ul
	}
	document.body.appendChild(list); // append the 
}

start();

function View (tagName, data) {
	this.element = document.createElement(tagName);
	this.data = data;
}

function ForecastView () {
	View.apply(this, arguments);
}

ForecastView.prototype = Object.create(View.prototype);
ForecastView.prototype.render = function () {
	this.element.textContent = this.data.name;
};

