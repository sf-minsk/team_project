import TableRow from '@material-ui/core/TableRow';
import React, {ChangeEvent, MouseEvent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import {TablePaginationActions} from '../../packsList/packs/TablePagination';
import {PackInitialStateType, setPackTC} from '../../../../bll/pack-reducer';

export const PackNameTableFooter: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const card = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)

    const handleChangePage = useCallback((e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPackTC({cardsPack_id: card.cardsPack_id, page: newPage + 1}))
    }, [dispatch])

    const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setPackTC({cardsPack_id: card.cardsPack_id, pageCount: parseInt(e.target.value, 10)}))
    }


    return (
        <TableFooter>
            <TableRow>
                <td className={classes.footerPage}>
                    Page: {card.page}
                </td>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, {
                        label: 'All',
                        value: card.cardsTotalCount
                    }]}
                    colSpan={6}
                    count={card.cardsTotalCount}
                    rowsPerPage={card.pageCount}
                    page={card.page - 1}
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
