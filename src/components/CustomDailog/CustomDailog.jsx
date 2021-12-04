import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@material-ui/core";
import "./CustomDailog.css";
import axios from "axios";
const darktheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomDailog({ children, media_type, id }) {
  // console.log(media_type)
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState([]);
  const [video, setVideo] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
    fetchdata();
    fetchVideo();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchdata = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    console.log(data.results);
    setVideo(data.results[0].key);
  };

  return (
    <ThemeProvider theme={darktheme}>
      <div className="media" onClick={handleClickOpen}>
        {children}
      </div>
      <BootstrapDialog
        style={{ textAlign: "center" }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          style={{ textTransform: "uppercase" }}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {content.original_title || content.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography paragraph gutterBottom>
            {content.overview}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              flex: 1,
              background: "skyblue",
              margin: "0 10px",
              borderRadius: "5px",
              color: "black",
            }}
            autoFocus
            onClick={handleClose}
            href={`https://www.youtube.com/watch?v=${video}`}
          >
            Watch Trailer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
