import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import {EditCardModal} from "../../commonComponents/modal/editCardModal/EditCardModal";
import {EditCardRequestType, OnePackType} from "../../../../dal/cards-api";

type PackTableActionsPropsType = {
    deleteCard: (cardId: string) => void
    editCard: (data: EditCardRequestType) => void
    card: OnePackType
}

export const PackTableActions = React.memo(function (props: PackTableActionsPropsType) {
    const [editPackModal, setEditPackModal] = useState<boolean>(false)
    const openEditPackModal = () => {
        setEditPackModal(true)
    }
    const closeEditPackModal = () => {
        setEditPackModal(false)
    }

    return (
        <TableCell align="right">
            {editPackModal && <EditCardModal
                closeAddPackModal={closeEditPackModal}
                editCard={props.editCard}
                card={props.card}
            />}
            <Button
                style={{marginRight: '10px'}}
                variant="contained"
                color="secondary"
                onClick={() => props.deleteCard(props.card._id)}
            >DELETE</Button>
            <Button
                variant="outlined"
                color="primary"
                onClick={openEditPackModal}
            >EDIT</Button>
        </TableCell>
    )


})