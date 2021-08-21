import TopLayout from '../components/TopLayout';
import BottomLayout from '../components/BottomLayout';
import 'date-fns';
import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { alpha } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInput from '../hooks/useInput';

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [input1,onChangeInput1] = useInput('');
    const [input2,onChangeInput2] = useInput('');
    const [input3,onChangeInput3] = useInput('');
    const [input4,onChangeInput4] = useInput('');
    const [input5,onChangeInput5] = useInput('');

    const handleDateChange = useCallback((date) => {
        setSelectedDate(date);
        console.log(date);
    },[selectedDate]);


    const onClickSubmit = useCallback(()=>{
        console.log(input1);
        console.log(input2);
        console.log(input3);
        console.log(input4);
        console.log(input5);
    },[input1,input2,input3,input4,input5]);

    return (
        <>
            <TopLayout></TopLayout>
            <div style = {{textAlign : "center", marginTop : "60px"}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="날짜 선택"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div><TextField label="일정1" style = {{marginBottom : "15px", marginTop : "5px"}} value = {input1} onChange = {onChangeInput1}></TextField></div>
                <div><TextField label="일정2" style = {{marginBottom : "15px", marginTop : "5px"}} value = {input2} onChange = {onChangeInput2}></TextField></div>
                <div><TextField label="일정3" style = {{marginBottom : "15px", marginTop : "5px"}} value = {input3} onChange = {onChangeInput3}></TextField></div>
                <div><TextField label="일정4" style = {{marginBottom : "15px", marginTop : "5px"}} value = {input4} onChange = {onChangeInput4}></TextField></div>
                <div><TextField label="일정5" style = {{marginBottom : "15px", marginTop : "5px"}} value = {input5} onChange = {onChangeInput5}></TextField></div>
                <div>
                <Button variant="outlined" color="primary" style = {{marginTop:"10px"}} onClick = {onClickSubmit}>
                    설정 완료
                </Button>
                </div>
            </div>
            <BottomLayout></BottomLayout>
        </>
    );
};

export default Schedule;