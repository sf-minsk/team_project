import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import React, {ChangeEvent, MouseEvent, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import {deleteCardTC, editCardTC, PackInitialStateType, resetPackAC, setPackTC} from '../../../../bll/pack-reducer';
import {trimmedString} from '../../../../utils/trimmedString-util';
import {updateDate} from '../../../../utils/updateDate-util';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import {TablePaginationActions} from '../../commonComponents/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';
import {useLocation} from 'react-router-dom';
import {PackTableActions} from "./PackTableActions";
import {EditCardRequestType} from "../../../../dal/cards-api";
import {TableSortLabel} from "@material-ui/core";


export const PackTable = React.memo((props: PackNameTableProps) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const pack = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)
    const idUser = useSelector<AppRootStateType, string>(state => state.profile._id)
    const packID = useLocation().pathname.substring(6)

    const onClickSortHandler = (sortValue: SortByType) => {
        if (pack.sortCardDirection === 0) {
            dispatch(setPackTC({cardsPack_id: packID, sortCards: '1' + sortValue}))
        } else {
            dispatch(setPackTC({cardsPack_id: packID, sortCards: '0' + sortValue}))
        }
    }

    useEffect(() => {
        return function () {
            dispatch(resetPackAC())
        }
    }, [dispatch])


    const handleChangePage = useCallback((e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPackTC({cardsPack_id: packID, page: newPage + 1}))
    }, [dispatch, packID])

    const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setPackTC({cardsPack_id: packID, pageCount: parseInt(e.target.value, 10)}))
    }

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCardTC(pack.cardsPack_id, cardId))
    }
    const editCardHandler = (data: EditCardRequestType) => {
        dispatch(editCardTC({...data}))
    }


    return (
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell>
                        <TableSortLabel
                            active={pack.sortBy === 'question'}
                            direction={pack.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('question')}
                        >
                            Question
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        <TableSortLabel
                            active={pack.sortBy === 'answer'}
                            direction={pack.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('answer')}
                        >
                            Answer
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">

                        <TableSortLabel
                            active={pack.sortBy === 'updated'}
                            direction={pack.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('updated')}
                        >
                            Last Updated
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        <TableSortLabel
                            active={pack.sortBy === 'grade'}
                            direction={pack.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('grade')}
                        >
                            Grade
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    pack.cards.map((pack) =>
                        <TableRow key={pack._id}>
                            <TableCell component="th">{trimmedString(pack.question, 20)}</TableCell>
                            <TableCell align="right">{trimmedString(pack.answer, 20)}</TableCell>
                            <TableCell align="right">{updateDate(pack.updated)}</TableCell>
                            <TableCell align="right">{Math.round(pack.grade)}</TableCell>
                            {pack.user_id === idUser ?
                                <PackTableActions
                                    deleteCard={deleteCardHandler}
                                    editCard={editCardHandler}
                                    card={pack}
                                />
                                : <TableCell/>}
                        </TableRow>
                    )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <td className={classes.footerPage}>
                        Page: {pack.page} (Total:{Math.ceil(pack.cardsTotalCount / pack.pageCount)})
                    </td>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, {
                            label: 'All',
                            value: pack.cardsTotalCount
                        }]}
                        colSpan={6}
                        count={pack.cardsTotalCount}
                        rowsPerPage={pack.pageCount}
                        page={pack.page - 1}
                        SelectProps={{
                            inputProps: {'aria-label': 'rows per page'},
                            native: true,
                        }}
                        labelRowsPerPage={props.labelRowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangePageCount}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    )
})

type SortByType = 'question' | 'answer' | 'updated' | 'grade'
type PackNameTableProps = {
    labelRowsPerPage: string
}