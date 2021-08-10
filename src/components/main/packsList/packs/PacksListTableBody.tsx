import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import React from 'react';
import {CardsInitialStateType, deletePackTC} from '../../../../bll/cards-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import {trimmedString} from '../../../../utils/trimmedString-util';
import {updateDate} from '../../../../utils/updateDate-util';
import TableBody from '@material-ui/core/TableBody';
import {NavLink} from 'react-router-dom'

export const PacksListTableBody: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const id = useSelector<AppRootStateType, string>(state => state.profile._id)
    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)

    const onDeleteButtonClickHandler = (packId: string) => {
        dispatch(deletePackTC(packId))
    }


    return (
        <TableBody>
            {
                cards.cardPacks.map((card) => (
                        <TableRow key={card._id}>
                            <TableCell component="th">{trimmedString(card.name)}</TableCell>
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
                                                        <Button size={'small'} variant={'outlined'}>Learn</Button></span>
                            </TableCell>
                        </TableRow>
                    )
                )
            }
        </TableBody>
    )
})
