import TableRow from '@material-ui/core/TableRow';
import React, {ChangeEvent, MouseEvent, useCallback} from 'react';
import {CardsInitialStateType, setCardPacksTC} from '../../../../bll/cards-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import TablePagination from '@material-ui/core/TablePagination';
import {TablePaginationActions} from './TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

export const PacksListTableFooter: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)

    const handleChangePage = useCallback((e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setCardPacksTC({page: newPage + 1}))
    }, [dispatch])

    const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setCardPacksTC({pageCount: parseInt(e.target.value, 10)}))
    }


    return (
        <TableFooter>
            <TableRow>
                <td className={classes.footerPage}>
                    Page: {cards.page}
                </td>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, {
                        label: 'All',
                        value: cards.cardPacksTotalCount
                    }]}
                    colSpan={6}
                    count={cards.cardPacksTotalCount}
                    rowsPerPage={cards.pageCount}
                    page={cards.page - 1}
                    SelectProps={{
                        inputProps: {'aria-label': 'rows per page'},
                        native: true,
                    }}
                    labelRowsPerPage={'Cards per Page'}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangePageCount}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    )
})
