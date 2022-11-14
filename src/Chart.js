// 時間格式
const timeFormat = (timestamp) => {

    const days = ['日','一','二','三','四','五','六'];
    const date = new Date(timestamp * 1000);
    // M/D (dd)
    return `${date.getMonth()+1}/${date.getDate()}(${days[date.getDay()]})`;

};

// 四捨五入
const tempFormat = (float) => Math.round(float);

//
const Item = ({ data: { temp, dt, humidity } }) => (

    <li>
        {timeFormat(dt)}
        <div className="item">
            <div className="bar-chart">
                <div className="column">
                    <span
                        className="max"
                        style={{
                            height: `${tempFormat(temp.max) * 3}%`
                        }}
                    >
                    </span>
                    最高溫<br />
                    {tempFormat(temp.max)}°C
                </div>
                <div className="column">
                    <span
                        className="min"
                        style={{
                            height: `${tempFormat(temp.min) * 3}%`
                        }}
                    >
                    </span>
                    最低溫<br />
                    {tempFormat(temp.min)}°C
                </div>
            </div>

            <div
                className="pie-chart"
                style={{
                    background: `conic-gradient(#FAA43A ${humidity}%, #F15854 0)`
                }}
            >
                <span>
                    濕度<br />
                    {`${humidity}%`}
                </span>
            </div>
        </div>
    </li>

);

//
const Chart = ({ data }) => (

    <ul className="chart">
        {
            data?.map((obj, idx) => (

                (idx <= 3) &&
                    <Item
                        key={idx}
                        data={obj}
                    />

            ))
        }
    </ul>

);

export default Chart;
