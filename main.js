function start () {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/find?lat=-37&lon=-35&cnt=10&appid=7cd032422ed7196011cec831381eb45b',
		method: 'GET',
		success: function (results) {
			buildApp(results.list);
		}
	});
}

function buildApp (cities) {
	// var list = document.createElement('div'); // create an unordered list
	// list.id = 'whole';
	// for (var i = 0; i < cities.length; i++) { // loop so the cities iterrate
	// 	var forecast = new ForecastView('div', cities[i]); // list items of cities
	// 	forecast.render(); //
	// 	list.appendChild(forecast.element); // append the list item of cities to the ul
	// }
	// document.body.appendChild(list); // append the list item to the ul
	var appView = new AppView('div', cities);
	appView.render();
	document.body.appendChild(appView.element);
}

start();

function View (tagName, data) { // creating a function View with the element tagName and data
	this.element = document.createElement(tagName); 
	this.data = data;
}

function AppView () {
	View.apply(this, arguments);
}

AppView.protoype = Object.create(View.prototype);
AppView.prototype.render = function () {
	var today = new Date();
	this.element.innerHTML =
		'<div id="head">' +
			'<h1>Weather</h1>' +
			'<date>' + today.toLocaleString() + '</date>' +
		'</div>' +
		'<div id="whole"></div>';
	var whole = this.element.querySelector('#whole');
	for (var i = 0; i < this.data.length; i++) {
		var city = this.data[i];
		var view = new ForecastView('div', city);
		view.render();
		whole.appendChild(view.element);
	}
};

function ForecastView () {
	View.apply(this, arguments);
}

function kToF (kelvins) {
	return ((kelvins -273.15)*9/5)+32;
}
ForecastView.prototype = Object.create(View.prototype);
ForecastView.prototype.render = function () {
	var max = Math.floor(kToF(this.data.main.temp_max));
	var min = Math.floor(kToF(this.data.main.temp_min));
	this.element.classList.add('white');
	this.element.innerHTML =
		'<h5>' + this.data.name + '</h5>' +
		'<button>+</button>' + // float right
		'<div>' +
			'<h5 id="conditions">Conditions</h5>' +
			'<p id="description">' + this.data.weather[0].description + '<p>' + 
			'<img src="high.png">' +
			'<h5 id="hi">Hi</h5>' + 
			'<p id="hidata">' + max + '</p>' +
			'<img src="lo.png">' +
			'<h5 id="lo">Lo</h5>' +
			'<p id="lodata">' + min + '<p>' +
			'<h5 id="wind">Wind</h5>' + 
			'<p id="speed">' + this.data.wind.speed + ' MPH' + '<p>'
		'</div>';

	this.bindEvents();
};
ForecastView.prototype.bindEvents = function () {
	var _this = this;
	var button = this.element.querySelector('button');
	var sub = this.element.querySelector('button');
	button.addEventListener('click', function () {
		_this.element.classList.toggle('expanded');
		if (_this.element.classList.contains('expanded')) {
			button.textContent = '-';
		} else {
			button.textContent = '+';
		}

	});
};
