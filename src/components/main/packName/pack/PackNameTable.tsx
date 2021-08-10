import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import React, {ChangeEvent, MouseEvent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import {PackInitialStateType, setPackTC} from '../../../../bll/pack-reducer';
import {trimmedString} from '../../../../utils/trimmedString-util';
import {updateDate} from '../../../../utils/updateDate-util';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import {TablePaginationActions} from '../../commonComponents/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';
import {useLocation} from 'react-router-dom';


export const PackNameTable = React.memo((props: PackNameTableProps) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const pack = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)
    const packID = useLocation().pathname.substring(6)

    const onClickSortHandler = (sortValue: SortByType) => {
        if (pack.sortCardDirection === 0) {
            dispatch(setPackTC({cardsPack_id: packID, sortCards: '1' + sortValue}))
        } else {
            dispatch(setPackTC({cardsPack_id: packID, sortCards: '0' + sortValue}))
        }
    }

    const handleChangePage = useCallback((e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPackTC({cardsPack_id: packID, page: newPage + 1}))
    }, [dispatch, packID])

    const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setPackTC({cardsPack_id: packID, pageCount: parseInt(e.target.value, 10)}))
    }

    return (
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell onClick={() => onClickSortHandler('question')}>
                        <Button variant={pack.sortBy === 'question' ? 'outlined' : 'text'}>
                            Question
                        </Button>
                    </TableCell>
                    <TableCell onClick={() => onClickSortHandler('answer')}
                               align="right">
                        <Button variant={pack.sortBy === 'answer' ? 'outlined' : 'text'}>
                            Answer
                        </Button>
                    </TableCell>
                    <TableCell onClick={() => onClickSortHandler('updated')} align="right">
                        <Button variant={pack.sortBy === 'updated' ? 'outlined' : 'text'}>
                            Last Updated
                        </Button>
                    </TableCell>
                    <TableCell onClick={() => onClickSortHandler('grade')} align="right">
                        <Button variant={pack.sortBy === 'grade' ? 'outlined' : 'text'}>
                            Grade
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    pack.cards.map((pack) => (
                            <TableRow key={pack._id}>
                                <TableCell component="th">{trimmedString(pack.question)}</TableCell>
                                <TableCell align="right">{trimmedString(pack.answer)}</TableCell>
                                <TableCell align="right">{updateDate(pack.updated)}</TableCell>
                                <TableCell align="right">{pack.grade}</TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <td className={classes.footerPage}>
                        Page: {pack.page}
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