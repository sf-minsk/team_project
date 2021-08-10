import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import React from 'react';
import {CardsInitialStateType, setCardPacksTC} from '../../../../bll/cards-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';

export const PacksListTableHead: React.FC = React.memo(() => {

    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)

    const onClickSortHandler = (sortValue: SortByType) => {
        if (cards.sortPacksDirection === 0) {
            dispatch(setCardPacksTC({sortPacks: '1' + sortValue}))
        } else {
            dispatch(setCardPacksTC({sortPacks: '0' + sortValue}))
        }
    }

    return (
        <TableHead>
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
    )
})

type SortByType = 'name' | 'cardsCount' | 'updated' | 'created'