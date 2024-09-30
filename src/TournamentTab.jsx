import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './index.css';

export default function TournamentTab(props) {
    const { setTournament, handleClick, tournament } = {...props}
    const [value, setValue] = React.useState(tournament === 'CHAMPIONS LEAGUE' ? 0 : 1);

    const handleChange = (event, newValue) => {
        handleClick()
        setTournament(event.target.innerText)
        setValue(newValue);
    };

    return (
        <div className="tab-container">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="disabled tabs example"
                centered
                TabIndicatorProps={{
                    style:{
                        backgroundColor: '#f2b705',
                    }
                }}
            >
                <Tab id='tab' label="Champions League" />
                <Tab id='tab' label="Copa Libertadores" />
            </Tabs>
        </div>
    );
}
