import { Dialog, DialogContent } from "@mui/material";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";

const styles = {
    howToPlay: {
        margin: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        borderRadius: '3rem',
    }
};

export default function GameInstructions(props) {
    const { openModal, setOpenModal, setEndGame } = { ...props }
    return (
        <Dialog
            className="how-to-play-title"
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="how-to-play-title"
            maxWidth="sm"
            fullWidth
            PaperProps={{ style: styles.howToPlay }}
        >
            <DialogContent>
                <SwipeableTextMobileStepper setOpenModal={setOpenModal} setEndGame={setEndGame} />
            </DialogContent>
        </Dialog>
    )
}