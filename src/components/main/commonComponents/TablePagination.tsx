import useTheme from '@material-ui/core/styles/useTheme';
import React, {MouseEvent} from 'react';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import {useStyles} from '../styles';


export const TablePaginationActions = React.memo((props: TablePaginationActionsProps) => {

    const classes = useStyles()
    const theme = useTheme()
    const {count, rowsPerPage, page, onPageChange} = props

    const handleFirstPageButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, 0)
    }

    const handleBackButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page - 1)
    }

    const handleNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page + 1)
    }

    const handleLastPageButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    )
})

type TablePaginationActionsProps = {
    count: number
    rowsPerPage: number
    page: number
    onPageChange: (e: MouseEvent<HTMLButtonElement>, newPage: number) => void
}