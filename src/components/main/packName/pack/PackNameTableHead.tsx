import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import {PackInitialStateType, setPackTC} from '../../../../bll/pack-reducer';

export const PackNameTableHead: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const card = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)

    const onClickSortHandler = (sortValue: SortByType) => {
        if (card.sortCardDirection === 0) {
            dispatch(setPackTC({cardsPack_id: card.cardsPack_id, sortCards: '1' + sortValue}))
        } else {
            dispatch(setPackTC({cardsPack_id: card.cardsPack_id, sortCards: '0' + sortValue}))
        }
    }

    return (
        <TableHead className={classes.tableHead}>
            <TableRow>
                <TableCell onClick={() => onClickSortHandler('question')}>
                    <Button variant={card.sortBy === 'question' ? 'outlined' : 'text'}>
                        Question
                    </Button>
                </TableCell>
                <TableCell onClick={() => onClickSortHandler('answer')}
                           align="right">
                    <Button variant={card.sortBy === 'answer' ? 'outlined' : 'text'}>
                       Answer
                    </Button>
                </TableCell>
                <TableCell onClick={() => onClickSortHandler('updated')} align="right">
                    <Button variant={card.sortBy === 'updated' ? 'outlined' : 'text'}>
                        Last Updated
                    </Button>
                </TableCell>
                <TableCell onClick={() => onClickSortHandler('grade')} align="right">
                    <Button variant={card.sortBy === 'grade' ? 'outlined' : 'text'}>
                        Grade
                    </Button>
                </TableCell>
            </TableRow>
        </TableHead>
    )
})

type SortByType = 'question' | 'answer' | 'updated' | 'grade'