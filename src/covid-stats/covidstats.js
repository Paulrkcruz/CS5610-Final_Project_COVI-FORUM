import React from 'react';
// import './covidstats.css';
import Papa from "papaparse";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Leaflet from "./Map.js";
import DateSlider from "./DateSlider.js";
import DataSelector from "./DataSelector.js";

const infectedUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const recoveredUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";
const deathUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"

class covidstats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            infectedData: [],
            deathData: [],
            recoveredData: [],
            date: "1/22/20",
            infectedOn: true,
            deathOn: false,
            recoveredOn: false,
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.toggleInfectedData = this.toggleInfectedData.bind(this);
        this.toggleRecoveredData = this.toggleRecoveredData.bind(this);
        this.toggleDeathData = this.toggleDeathData.bind(this);

    }

    componentDidMount() {
        const parsedInfectedData = covidstats.pullAndParseUrl(infectedUrl);
        const parsedRecoveredData = covidstats.pullAndParseUrl(recoveredUrl);
        const parsedDeathData = covidstats.pullAndParseUrl(deathUrl);

        console.log(parsedInfectedData);

        parsedInfectedData.then(result => {
            this.setState({ infectedData: result.data });
        });

        parsedRecoveredData.then(result => {
            this.setState({ recoveredData: result.data });
        });

        parsedDeathData.then(result => {
            this.setState({ deathData: result.data });
        });
    }

    static pullAndParseUrl(url) {
        return axios.get(url).then(response => Papa.parse(response.data, { header: true }));
    }


    handleDateChange(selectedDate) {
        this.setState({ "date": selectedDate });
    };

    toggleInfectedData() {
        this.setState({infectedOn: !this.state.infectedOn});
    }

    toggleRecoveredData() {
        this.setState({recoveredOn: !this.state.recoveredOn});
    }

    toggleDeathData() {
        this.setState({deathOn: !this.state.deathOn});
    }
    render() {
        return (
            <div className="App">
                <Grid container justify="center"   alignItems="center" spacing={3}>
                    <Grid item xs={8}>
                        <Typography id="titles" variant='h3'>
                            Covid-19 Statistics
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Leaflet
                            infectedData={this.state.infectedData}
                            infectedOn={this.state.infectedOn}
                            recoveredData={this.state.recoveredData}
                            recoveredOn={this.state.recoveredOn}
                            deathData={this.state.deathData}
                            deathOn={this.state.deathOn}
                            date={this.state.date}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        {this.state.date}
                        <DateSlider
                            handleDateChange={this.handleDateChange}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <DataSelector
                            toggleInfectedData={this.toggleInfectedData}
                            infectedOn={this.state.infectedOn}
                            toggleRecoveredData={this.toggleRecoveredData}
                            recoveredOn={this.state.recoveredOn}
                            toggleDeathData={this.toggleDeathData}
                            deathOn={this.state.deathOn}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography id="title" variant='caption'>
                            Data Source: Johns Hopkins CSSE Data Repository.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default covidstats;