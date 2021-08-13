import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import React, {ChangeEvent, MouseEvent, useCallback, useEffect, useState} from 'react';
import {CardsInitialStateType, deletePackTC, setCardPacksTC, updatePackTC} from '../../../../bll/packs-reducer';
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
import {LearnCardsModal} from '../../commonComponents/modal/learnCardsModal/LearnCardsModal';
import {OnePackType} from '../../../../dal/cards-api';
import {CardsForLearnInitialStateType, fetchCardsOfPackTC} from '../../../../bll/learn-reducer';
import {EditPackModal} from "../../commonComponents/modal/editPackModal/EditPackModal";
import {TableSortLabel} from "@material-ui/core";


export const PacksListTable = React.memo((props: PacksListTableProps) => {

    const classes = useStyles()
    const dispatch = useDispatch()

    const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
    const cardsForLearn = useSelector<AppRootStateType, CardsForLearnInitialStateType>(state => state.cardsForLearn) //103 карточки
    const id = useSelector<AppRootStateType, string>(state => state.profile._id)

    const [editPackModal, setEditPackModal] = useState(false) //false
    const [editPackData, setEditPackData] = useState({id: '', name: ''}) //false
    const [learnCardsModal, setLearnCardsModal] = useState(false) //false
    const [learnButtonClick, setLearnButtonClick] = useState(false) //false //true
    const [randomCard, setRandomCard] = useState({} as OnePackType) //{}
    const [name, setName] = useState<string>('') //interview1


    useEffect(() => {
        if (cardsForLearn.length && learnButtonClick) {
            setRandomCard(getCard(cardsForLearn))
            setLearnCardsModal(true)
        }
    }, [cardsForLearn, learnButtonClick])


    const onClickSortHandler = (sortValue: SortByType) => {
        if (packs.sortPacksDirection === 0) {
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
        dispatch(setCardPacksTC({pageCount: parseInt(e.target.value)}))
    }

    const getCard = (cards: OnePackType[]) => {
        const sumOfRepeats = cards.map(card => (6 - card.grade) ** 2).reduce((acc, el) => (acc + el), 0)
        const random = Math.random() * sumOfRepeats
        let sum = 0
        let i = 0
        do {
            sum = sum + ((6 - cards[i].grade) ** 2)
            i++
        } while (sum < random)
        return cards[i - 1]
    }

    // const getCard1 = (cards: number[]) => {
    //     const sumOfRepeats = cards.map(card => (6 - card) ** 2).reduce((acc, el) => (acc + el), 0)
    //     const random = Math.random() * sumOfRepeats //21
    //     let sum = 0
    //     let i = 0
    //     do {
    //         sum = sum + ((6 - cards[i]) ** 2) // |||||||||||||| ||| |
    //         i++
    //     } while (sum < random)
    //     return i - 1
    // }
    // console.log([getCard1([])]) //1 4 16

    const openLearnCardsModal = async (cardsPack_id: string, pageCount: number, name: string) => {
        await dispatch(fetchCardsOfPackTC({cardsPack_id, pageCount}))
        setName(name)
        setLearnButtonClick(true)
    }
    const closeLearnCardsModal = () => {
        setLearnCardsModal(false)
        setLearnButtonClick(false)
        setRandomCard({} as OnePackType)
    }
    const openEditPackModal = (id: string, name: string) => {
        setEditPackData({id, name})
        setEditPackModal(true)
    }
    const closeEditPackModal = () => {
        setEditPackModal(false)
    }
    const updatePackName = (newName?: string) => {
        dispatch(updatePackTC(editPackData.id, newName))
    }


    return (
        <>
            {learnCardsModal &&
            <LearnCardsModal
                closeLearnCardsModal={closeLearnCardsModal}
                question={randomCard.question}
                answer={randomCard.answer}
                card_id={randomCard._id}
                packName={name}
            />
            }
            {
                editPackModal &&
                <EditPackModal
                    oldName={editPackData.name}
                    closeEditPackModal={closeEditPackModal}
                    updatePackName={updatePackName}
                />
            }
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={packs.sortBy === 'name'}
                                direction={packs.sortPacksDirection === 1 ? 'desc' : 'asc'}
                                onClick={() => onClickSortHandler('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={packs.sortBy === 'cardsCount'}
                                direction={packs.sortPacksDirection === 1 ? 'desc' : 'asc'}
                                onClick={() => onClickSortHandler('cardsCount')}
                            >
                                Cards
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={packs.sortBy === 'updated'}
                                direction={packs.sortPacksDirection === 1 ? 'desc' : 'asc'}
                                onClick={() => onClickSortHandler('updated')}
                            >
                                Last Updated
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={packs.sortBy === 'created'}
                                direction={packs.sortPacksDirection === 1 ? 'desc' : 'asc'}
                                onClick={() => onClickSortHandler('created')}
                            >
                                Created By
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        packs.cardPacks.map((pack) => (
                                <TableRow key={pack._id}>
                                    <TableCell component="th">
                                        <NavLink to={`/pack/${pack._id}`} className={classes.navLink}>
                                            {trimmedString(pack.name, 10)}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell align="right">{pack.cardsCount}</TableCell>
                                    <TableCell align="right">{updateDate(pack.updated)}</TableCell>
                                    <TableCell align="right">{trimmedString(pack.user_name, 10)}</TableCell>
                                    <TableCell align="right" style={{width: '224px'}}>
                                                    <span className={classes.buttonsOfActionsSection}>
                                                        {pack.user_id === id &&
                                                        <span>
                                                            <Button onClick={() => onDeleteButtonClickHandler(pack._id)}
                                                                    size={'small'} color={'secondary'}
                                                                    variant={'outlined'}>Delete</Button>
                                                            <Button size={'small'} variant={'outlined'}
                                                                    style={{margin: '0 10px'}}
                                                                    onClick={() => openEditPackModal(pack._id, pack.name)}
                                                            >
                                                                Edit
                                                            </Button>
                                                        </span>
                                                        }
                                                        <Button size={'small'}
                                                                variant={'outlined'}
                                                                onClick={() => openLearnCardsModal(pack._id, pack.cardsCount, pack.name)}
                                                                disabled={pack.cardsCount === 0}
                                                        >
                                                            Learn
                                                        </Button>
                                                    </span>
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <td className={classes.footerPage}>
                            Page: {packs.page} (Total:{Math.ceil(packs.cardPacksTotalCount / packs.pageCount)})
                        </td>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {
                                label: 'All',
                                value: packs.cardPacksTotalCount
                            }]}
                            colSpan={6}
                            count={packs.cardPacksTotalCount}
                            rowsPerPage={packs.pageCount}
                            page={packs.page - 1}
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
        </>
    )
})

type SortByType = 'name' | 'cardsCount' | 'updated' | 'created'
type PacksListTableProps = {
    labelRowsPerPage: string
}