import makeStyles from '@material-ui/core/styles/makeStyles';
import {Theme} from '@material-ui/core/styles/createTheme';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    app: {
        position: 'static',
        flexDirection: 'row',
        display: 'flex',
        height: '72px',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tab: {},
    typo: {
        marginLeft: '10px',
    },
    logoutButton: {
        color: 'white',
        borderColor: 'white',
        marginRight: '10px',
    },
    container: {
        padding: '0 12px',
    },
    paper: {
        marginTop: '20px',
        marginBottom: '60px',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '600px',
        minWidth: '1000px',
    },
    navBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '200px',
        minWidth: '200px',
        backgroundColor: 'lightblue',
        borderRadius: '4px 0px 0px 4px',
    },
    body: {
        margin: '10px 12px',
        padding: '0 12px',
    },
    table: {

        minWidth: '700px',
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
        marginRight: '15px'
    },
    addNewPackButton: {
        width: '230px',
        marginLeft: '20px',
    },
    addNewCardButton: {
        width: '300px',
    },
    packListHeading: {
        fontSize: '30px',
        fontWeight: 'bold',
        overflowWrap: 'break-word',
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
    buttonEditCard:{
        variant: "outlined",
        color: "primary"
    },
    footerPage: {
        display: 'flex',
        height: '53px',
        marginLeft: '10px',
        alignItems: 'center',
    },
    // modalComponentStyle: {
    //     position: 'absolute',
    //     left: '50%',
    //     top: '50%',
    //     width: '100%',
    // },
    tableHead: {
        backgroundColor: 'lightblue',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black'
    },
}))