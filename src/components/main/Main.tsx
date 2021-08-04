import React, {ChangeEvent, useState} from 'react';
import {ErrorSnackbar} from "../../features/errors/ErrorSnackbar";
import Container from "@material-ui/core/Container/Container";
import {
    Button,
    ButtonGroup,
    IconButton,
    Paper,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Theme
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import withStyles from '@material-ui/styles/withStyles/withStyles';

export const Main = () => {

    let [myButtonClicked, setMyButtonClicked] = useState(true)
    const onMyButtonClick = () => {
        setMyButtonClicked(true)
    }
    const onAllButtonClick = () => {
        setMyButtonClicked(false)
    }

    const classes = makeStyles(() => ({
        paper: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            minHeight: '800px',
            minWidth: '1000px',
        },
        navBar: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '240px',
            backgroundColor: 'lightblue',
            borderRadius: '4px 0px 0px 4px',
        },
        body: {
            margin: '10px 15px 10px 15px',
        },
        table: {
            minWidth: 700,
        },
    }))();

    const [searchValue, setSearchValue] = useState("")
    const [sliderValue, setSliderValue] = useState<number[]>([10, 20])
    const changeSliderValue = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValue(newValue as number[])
    }

    const StyledTableCell = withStyles((theme: Theme) => ({
        head: {
            // backgroundColor: theme.palette.common.black,
            // color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme: Theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                // backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    function createData(name: string, cards: number, lastUpdated: number, createdBy: string, actions?: any) {
        return {name, cards, lastUpdated, createdBy, actions};
    }

    const rows = [
        createData('Pack 1', 1, 23, 'das', ''),
        createData('Pack 2', 12, 21, 'dadas', ''),
        createData('Pack 3', 312, 11, 'dasdas', ''),
        createData('Pack 4', 12, 13, 'dasda', ''),
        createData('Pack 5', 32, 15, 'dsadas', ''),
    ];


    return (
        <Container>

            <Paper className={classes.paper}>
                <Grid className={classes.navBar}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px'}}>Show packs cards</span>
                    <ButtonGroup variant="contained" color="primary" style={{marginTop: '20px'}}>
                        <Button onClick={onMyButtonClick}
                                variant={myButtonClicked ? "contained" : "outlined"}>My</Button>
                        <Button onClick={onAllButtonClick}
                                variant={myButtonClicked ? "outlined" : "contained"}>All</Button>
                    </ButtonGroup>
                    <Slider
                        style={{marginTop: '50px', width: '160px'}}
                        value={sliderValue}
                        onChange={changeSliderValue}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        // getAriaValueText={value}
                    />
                </Grid>
                <Container className={classes.body}>
                    <div style={{fontSize: '30px', fontWeight: 'bold'}}>Packs list</div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>

                        <TextField
                            placeholder="Search"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),

                                endAdornment: searchValue && (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setSearchValue("")}
                                    ><CancelRoundedIcon/></IconButton>
                                )
                            }}
                        />
                        <Button style={{width: '180px'}} variant="contained" color="primary">Add new pack</Button>
                    </div>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align="right">Cards</StyledTableCell>
                                        <StyledTableCell align="right">Last Updated</StyledTableCell>
                                        <StyledTableCell align="right">Created By</StyledTableCell>
                                        <StyledTableCell align="right">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.cards}</StyledTableCell>
                                            <StyledTableCell align="right">{row.lastUpdated}</StyledTableCell>
                                            <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
                                            <StyledTableCell align="right">{row.actions}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>



                </Container>


            </Paper>


            <ErrorSnackbar/>
        </Container>
    )
}