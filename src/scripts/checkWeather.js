class CheckerWeather {

  constructor(data) {

    this.data = data;
    console.log(this.data);

    if (this.data) {
      this.temp = this.data.main.temp;
      this.tempFeelsLike = this.data.main.feels_like;
      this.wind = this.data.wind.speed;
      this.weatherDescription = this.data.weather[0].description;
      this.humidity = this.data.main.humidity;
      this.pressure = this.data.main.pressure;
      this._setIconUrl();
    } else {
      this.IconUrl = `/weatherIcons/dark/неизвестно.svg`; //иконка до получения данных
    }
  }

  _setIconUrl() {
    console.log(this.weatherDescription);
    this.IconUrl = `/weatherIcons/dark/${this.weatherDescription}.svg`
  }

  getIconUrl() {
    return this.IconUrl;
  }

  getTemp() {
    if (!this.temp) {return ''}; //чтоб Undefined не отправлять
    return {temp: this.temp, tempFeelsLike: this.tempFeelsLike};
  }

  getWind() {
    return this.wind;
  }

  getOther() {
    if (!this.humidity) {return ''}
    return {humidity: this.humidity, pressure: this.pressure}
  }

}

export default CheckerWeather;