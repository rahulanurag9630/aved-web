import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
    Box,
    Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

// Transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function VirtualTourModal({
    isOpen,
    handleCloseTour,
    isFullscreen,
    toggleFullscreen,
    virtualTour,
}) {
    return (
        <Dialog
            open={isOpen}
            onClose={handleCloseTour}
            fullScreen={isFullscreen}
            maxWidth="md"
            fullWidth
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
                    padding: "1px",
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    p: 2,
                    borderRadius: "16px 16px 0 0",
                }}
            >
                <Typography variant="h4" color="primary" fontWeight="bold">
                    Virtual Tour
                </Typography>

                <Box>
                    {/* Fullscreen Toggle */}
                    <IconButton onClick={toggleFullscreen} sx={{ color: "#000", mr: 1 }}>
                        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>

                    {/* Close Button */}
                    <IconButton onClick={handleCloseTour} sx={{ color: "#000" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        width: "100%",
                        height: isFullscreen ? "90vh" : "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    {virtualTour &&
                        virtualTour.endsWith(".glb") ? (
                        <model-viewer
                            src={virtualTour}
                            alt="3D Virtual Tour"
                            auto-rotate
                            camera-controls
                            ar
                            style={{ width: "100%", height: "100%" }}
                        />
                    ) : (
                        <Typography variant="h4" color="primary">
                            No Virtual Tour Available
                        </Typography>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default VirtualTourModal;
