import React, { useState, useEffect } from 'react';
import './rapid.css';
import styles from './App.module.scss';
import axios from 'axios';
import Select, { components } from 'react-select';
import cityList from './cityList.json';
import HeaderWeather from './components/HeaderWeather';
import Content from './components/Content';


const apiOWMKey = '489e9332064698b34f036ff4ddf35c7e';

function App() {

  const [city, setCity] = useState();
  const [weather, setWeather] = useState({});
  const [coords, setCoords] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {

    function success(pos) {
      let crd = pos.coords;
      setCoords({
        "latitude": crd.latitude,
        "longitude": crd.longitude
      });
    };
    navigator.geolocation.getCurrentPosition(success, undefined, { enableHighAccuracy: true, timeout: 10000 });
  }, [])


  useEffect(async () => {
    if (Object.keys(coords).length !== 0) {
      const geocode = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiOWMKey}`);
      //const adressCity = geocode.adress.city;
      //setCity(adressCity);
    }
  }, [coords]);

  useEffect(async () => {
    if (city) {
      const OWM = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiOWMKey}`);
      setWeather(OWM);
    }
  }, [city]);


  const changeSearchInput = (text) => {
    setSearchInput(text);
  };

  useEffect(() => {
    const list = cityList.filter(elem => elem.city.toLowerCase().includes(searchInput.toLowerCase()));
    let newList = [];
    list.map(e => newList.push({ value: e.city, label: e.city }));
    while (newList.length >= 20) { newList.pop() };
    setOptions(newList);
  }, [searchInput]);

  return (
    <div className={styles.mainFrame}>
      <div className={styles.empty}>
        <Select
          className={styles.select}
          onChange={(obj) => setCity(obj.value)}
          selectContainer={(e) => console.log(e)}
          onInputChange={changeSearchInput}
          valueContainer={city}
          placeholder='Введите город'
          options={options}
        />
      </div>
      <header className='d-flex flex-center'>
        <HeaderWeather weather={weather.data} />
      </header>

      <div className={styles.content}>
        <Content />
      </div>

    </div>
  );
}

export default App;
