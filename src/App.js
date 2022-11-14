import { useState } from 'react';
import './App.css';
import Chart from './Chart';

//
const Loading = () => <div>Loading...</div>;

//
const App = () => {

    // State
    const [value, setValue] = useState('');
    const [daily, setDaily] = useState(null);
    const [loading, setLoading] = useState(false);

    // fetch
    const fetchData = async(url) => {

        return await fetch(url)
            .then((response) => response.json());

    };

    // change
    const handleChange = ({ target }) => {

        setValue(target.value);

    };

    // submit
    const handleSubmit = async(e) => {

        setLoading(true);
        e.preventDefault();

        const obj = {
            appid: '439d4b804bc8187953eb36d2a8c26a02',
            units: 'metric',
        };

        const resLocation = await fetchData(`https://openweathermap.org/data/2.5/find?appid=${obj.appid}&units=${obj.units}&q=${value}`);
        const { coord } = resLocation.list[0];
        const resData = await fetchData(`https://openweathermap.org/data/2.5/onecall?appid=${obj.appid}&units=${obj.units}&lat=${coord.lat}&lon=${coord.lon}`);
        setDaily(resData.daily);
        setLoading(false);

    };

    return (

        <section className="weather_wrap">
            <form
                onSubmit={handleSubmit}
                className="form"
            >
                <label>
                    請輸入城市名稱:
                    <span className="input">
                        <input
                            type="text"
                            onChange={handleChange}
                        />
                    </span>
                </label>
                <button type="submit">送出</button>
            </form>

            <div className="container">
                {loading ? <Loading /> : <Chart data={daily} />}
            </div>
        </section>

    );

};

export default App;
