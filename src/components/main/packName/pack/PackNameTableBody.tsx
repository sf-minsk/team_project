import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import {trimmedString} from '../../../../utils/trimmedString-util';
import {updateDate} from '../../../../utils/updateDate-util';
import TableBody from '@material-ui/core/TableBody';
import {PackInitialStateType} from '../../../../bll/pack-reducer';


export const PackNameTableBody: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const card = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)


    return (
        <TableBody>
            {
                card.cards.map((el) => (
                        <TableRow key={el._id}>
                            <TableCell component="th">{trimmedString(el.question)}</TableCell>
                            <TableCell align="right">{trimmedString(el.answer)}</TableCell>
                            <TableCell align="right">{updateDate(el.updated)}</TableCell>
                            <TableCell align="right">{el.grade}</TableCell>
                        </TableRow>
                    )
                )
            }
        </TableBody>
    )
})
