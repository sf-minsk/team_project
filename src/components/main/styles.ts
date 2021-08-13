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
    buttonEditCard: {
        variant: "outlined",
        color: "primary"
    },
    footerPage: {
        display: 'flex',
        height: '53px',
        marginLeft: '10px',
        alignItems: 'center',
    },
    tableHead: {
        backgroundColor: 'lightblue',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black'
    },
    learnCardsModalDarkWindow: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        height: '100%',
        width: '100%',
        backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.6})`,
        zIndex: 10,
    },
    learnCardsModalWindowByQuestion: {
        position: 'fixed',
        left: `calc(50vw - 230px)`,
        top: `calc(50vh - 164px)`,
        width: '440px',
        height: '250px',
        border: '1px solid white',
        borderRadius: '6px 6px 6px 6px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 0 40px',
        zIndex: 11,
    },

}))