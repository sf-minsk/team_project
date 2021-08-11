import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import React, {ChangeEvent, MouseEvent, useCallback} from 'react';
import {CardsInitialStateType, deletePackTC, setCardPacksTC} from '../../../../bll/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import Table from '@material-ui/core/Table';
import {NavLink} from 'react-router-dom';
import {trimmedString} from '../../../../utils/trimmedString-util';
import {updateDate} from '../../../../utils/updateDate-util';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import {TablePaginationActions} from '../../commonComponents/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

export const PacksListTable = React.memo((props: PacksListTableProps) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
    const id = useSelector<AppRootStateType, string>(state => state.profile._id)

    const onClickSortHandler = (sortValue: SortByType) => {
        if (cards.sortPacksDirection === 0) {
            dispatch(setCardPacksTC({sortPacks: '1' + sortValue}))
        } else {
            dispatch(setCardPacksTC({sortPacks: '0' + sortValue}))
        }
    }

    const onDeleteButtonClickHandler = (packId: string) => {
        dispatch(deletePackTC(packId))
    }

    const handleChangePage = useCallback((e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setCardPacksTC({page: newPage + 1}))
    }, [dispatch])

    const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setCardPacksTC({pageCount: parseInt(e.target.value, 10)}))
    }


    return (
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell onClick={() => onClickSortHandler('name')}>
                        <Button variant={cards.sortBy === 'name' ? 'outlined' : 'text'}>
                            Name
                        </Button>
                    </TableCell>
                    <TableCell onClick={() => onClickSortHandler('cardsCount')}
                               align="right">
                        <Button variant={cards.sortBy === 'cardsCount' ? 'outlined' : 'text'}>
                            Cards
                        </Button>
                    </TableCell>
                    <TableCell onClick={() => onClickSortHandler('updated')} align="right">
                        <Button variant={cards.sortBy === 'updated' ? 'outlined' : 'text'}>
                            Last Updated
                        </Button>
                    </TableCell>
                    <TableCell onClick={() => onClickSortHandler('created')} align="right">
                        <Button variant={cards.sortBy === 'created' ? 'outlined' : 'text'}>
                            Created By
                        </Button>
                    </TableCell>
                    <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    cards.cardPacks.map((card) => (
                            <TableRow key={card._id}>
                                <TableCell component="th">
                                    <NavLink to={`/pack/${card._id}`} className={classes.navLink}>
                                        {trimmedString(card.name)}
                                    </NavLink>
                                </TableCell>
                                <TableCell align="right">{card.cardsCount}</TableCell>
                                <TableCell align="right">{updateDate(card.updated)}</TableCell>
                                <TableCell align="right">{trimmedString(card.user_name)}</TableCell>
                                <TableCell align="right" style={{width: '224px'}}>
                                                    <span className={classes.buttonsOfActionsSection}>
                                                        {card.user_id === id &&
                                                        <span>
                                                            <Button onClick={() => onDeleteButtonClickHandler(card._id)}
                                                                    size={'small'} color={'secondary'}
                                                                    variant={'outlined'}>Delete</Button>
                                                            <Button size={'small'} variant={'outlined'}
                                                                    style={{margin: '0 10px'}}>Edit</Button>
                                                        </span>
                                                        }
                                                        <Button size={'small'}
                                                                variant={'outlined'}>Learn</Button></span>
                                </TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <td className={classes.footerPage}>
                        Page: {cards.page} (Total:{Math.ceil(cards.cardPacksTotalCount / cards.pageCount)})
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

type SortByType = 'name' | 'cardsCount' | 'updated' | 'created'
type PacksListTableProps = {
    labelRowsPerPage: string
}