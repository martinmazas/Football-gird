import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './index.css';

const TOURNAMENTS = {
    'CHAMPIONS LEAGUE': 0,
    'COPA LIBERTADORES': 1,
    'MLS': 2,
};

const TOURNAMENT_NAMES = Object.fromEntries(
    Object.entries(TOURNAMENTS).map(([key, value]) => [value, key])
);

export default function TournamentTab({ setTournament, handleClick, tournament }) {
    const [value, setValue] = React.useState(TOURNAMENTS[tournament] ?? 0);

    const handleChange = (event, newValue) => {
        handleClick();
        setTournament(TOURNAMENT_NAMES[newValue]);
        setValue(newValue);
    };

    return (
        <div className="tab-container">
            <Tabs
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#f2b705',
                    }
                }}
            >
                <Tab id='tab' label="Champions League 24/25" />
                <Tab id='tab' label="Copa Libertadores 2024" />
                {/* <Tab id='tab' label="MLS 2025" /> */}
            </Tabs>
        </div>
    );
}
