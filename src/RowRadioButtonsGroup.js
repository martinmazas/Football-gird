import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function RowRadioButtonsGroup(props) {
    const { playerOptions, setPlayerOptions } = { ...props }
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (value) => {
        const name = value.split(" ")
        const player = playerOptions.filter(p => p.first_name === name[0] && p.secondName === name[1])
        setPlayerOptions(player)
    }

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Select the desire player</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {playerOptions.map((p, i) => {
                    const player = `${p.first_name} ${p.secondName}`;
                    return <FormControlLabel key={i} value={player} control={<Radio />} label={player} />
                })}
            </RadioGroup>
            <Button onClick={() => handleSubmit(value)}>SELECT</Button>
        </FormControl>
    );
}
