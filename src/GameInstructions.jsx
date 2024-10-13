import { Dialog, DialogContent } from "@mui/material";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import './index.css'

const styles = {
    howToPlay: {
        margin: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        maxWidth: '30rem',
        // backgroundColor: '#1a1724'
    }
};

export default function GameInstructions(props) {
    const { openModal, setOpenModal, handleSetEndGame } = { ...props }
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
                <SwipeableTextMobileStepper setOpenModal={setOpenModal} handleSetEndGame={handleSetEndGame} />
            </DialogContent>
        </Dialog>
    )
}