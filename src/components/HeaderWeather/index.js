import CheckerWeather from '../../scripts/checkWeather';
import styles from './headerWeather.module.scss';

function HeaderWeather(props) {
  const checker = new CheckerWeather(props.weather);
  const iconUrl = checker.getIconUrl();
  const tempObj = checker.getTemp();
  const wind = checker.getWind();
  const otherObj = checker.getOther();

  return (
    <div className={styles.data}>

      <div className={styles.windData}>
        <img src='/weatherIcons/dark/ветер.svg' alt='' />
        <p>{wind && wind + 'м/c'}</p>
      </div>

      <div className={styles.mainData}>
        <img src={iconUrl} alt=''/>
        <div>
          <p>{tempObj && tempObj.temp + '°C'}</p>
          <span>{tempObj && tempObj.tempFeelsLike + '°C по ощущению'}</span>
        </div>
      </div>

      <div className={styles.otherData}>
        <p>влажность: <span>{otherObj && otherObj.humidity +'%'}</span></p>
        <p>давление: <span>{otherObj && otherObj.pressure +' мм рт.ст.'}</span></p>
      </div>

    </div>
  );
}

export default HeaderWeather;
