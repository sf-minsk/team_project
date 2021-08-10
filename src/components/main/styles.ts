import makeStyles from '@material-ui/core/styles/makeStyles';
import {Theme} from '@material-ui/core/styles/createTheme';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    paper: {
        marginTop: '20px',
        marginBottom: '60px',
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
    showPacksCards: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: '10px',
    },
    MyAllButtons: {
        marginTop: '20px',
    },
    slider: {
        marginTop: '50px',
        width: '150px',
    },
    input: {
        height: '40px',
    },
    addNewPackButton: {
        width: '230px',
        marginLeft: '20px',
    },
    packsListHeading: {
        fontSize: '30px',
        fontWeight: 'bold',
    },
    inputButtonSection: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttonsOfActionsSection: {
        display: 'flex',
        width: '224px',
        justifyContent: 'flex-end',
    },
    footerPage: {
        display: 'flex',
        height: '53px',
        marginLeft: '10px',
        alignItems: 'center',
    },
    modalComponentStyle: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '100%',
    },
    tableHead: {
        backgroundColor: 'lightblue',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black'
    },
}))