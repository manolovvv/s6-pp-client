import React from "react";

//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

import Icon from "@material-ui/core/Icon";
import PageviewIcon from "@material-ui/icons/Pageview";
import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CollectionsIcon from "@material-ui/icons/Collections";

import { TextField } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

import { FormControl } from "@material-ui/core";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@material-ui/core";

// Search
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";

//Tabs
import { withStyles } from "@material-ui/core/styles";
import { Filter } from "@mui/icons-material";

const imageGallery = [
  "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
  "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
  "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
];

const styles = theme => ({
  root: {
    maxWidth: "500px",
    display: "grid",
    marginTop: "64px",
    backgroundColor: theme.palette.background.paper,
    marginLeft: "auto",
    marginRight: "auto",
    //display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white"
  },
  input: {
    display: "none"
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center"
  },
  button: {
    color: blue[900],
    margin: 10
  },
  secondaryButton: {
    color: "gray",
    margin: 10
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "default"
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  searchInput: {
    marginLeft: 8,
    flex: 1
  },
  searchIconButton: {
    padding: 10
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

class CreatePost extends React.Component {
  state = {
    mainState: "initial", // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile: null,
    type: "CARP",
    text: ""
  };

  handleChangeText = event => {
    this.setState({ text: event.target.value })
    console.log(this.state.text)
  }
  handleUploadClick = event => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
  };

  handleSubmit = (event) => {
    event.preventDefault()

    const jwt = window.sessionStorage.getItem("jwt")
    window.sessionStorage.setItem("jwt", jwt)

    let formData = new FormData();
    formData.append('model', JSON.stringify({ text: this.state.text, category: this.state.type }));
    // model.append("category", this.state.type);
    // if (this.state.imageUploaded) {

    //   // const file = new File([this.state.selectedFile[0]], "image", { type: "image/png" })
    //   formData.append('image', this.state.selectedFile[0], "image.png")
    // }
    axios.post('http://localhost:8082', formData,
      {
        headers: {

          Authorization: "Bearer " + jwt,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        console.log(response)
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSearchClick = event => {
    this.setState({
      mainState: "search"
    });
  };

  handleGalleryClick = event => {
    this.setState({
      mainState: "gallery"
    });
  };

  handleChangeType = (event) => {
    this.setState({ type: event.target.value })
    console.log(event.target.value)
  }

  renderInitialState() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <CardContent style={{ marginLeft: "auto" }}>
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            {/* <Fab className={classes.button} onClick={this.handleSearchClick}>
              <SearchIcon />
            </Fab>
            <Fab className={classes.button} onClick={this.handleGalleryClick}>
              <CollectionsIcon />
            </Fab> */}
          </Grid>
        </CardContent>


      </React.Fragment>
    );
  }

  handleSearchURL = event => {
    console.log();
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
  };

  handleImageSearch(url) {
    var filename = url.substring(url.lastIndexOf("/") + 1);
    console.log(filename);
    this.setState({
      mainState: "uploaded",
      imageUploaded: true,
      selectedFile: url,
      fileReader: undefined,
      filename: filename
    });
  }

  handleSeachClose = event => {
    this.setState({
      mainState: "initial"
    });
  };

  renderSearchState() {
    const { classes } = this.props;

    return (
      <Paper className={classes.searchRoot} elevation={1}>
        <InputBase className={classes.searchInput} placeholder="Image URL" />
        <IconButton
          className={classes.button}
          aria-label="Search"
          onClick={this.handleImageSearch}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.searchDivider} />
        <IconButton
          color="primary"
          className={classes.secondaryButton}
          aria-label="Close"
          onClick={this.handleSeachClose}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    );
  }

  handleAvatarClick(value) {
    var filename = value.url.substring(value.url.lastIndexOf("/") + 1);
    console.log(filename);
    this.setState({
      mainState: "uploaded",
      imageUploaded: true,
      selectedFile: value.url,
      fileReader: undefined,
      filename: filename
    });
  }

  renderGalleryState() {
    const { classes } = this.props;
    const listItems = this.props.imageGallery.map(url => (
      <div
        onClick={value => this.handleAvatarClick({ url })}
        style={{
          padding: "5px 5px 5px 5px",
          cursor: "pointer"
        }}
      >
        <Avatar src={url} />
      </div>
    ));

    /*const listItems = this.props.imageGallery.map(url => (
      <div
        onClick={value => this.handleAvatarClick({ url })}
        style={{
          padding: "5px 5px 5px 5px",
          cursor: "pointer"
        }}
      >
        <Avatar shape="square" size={100} src={url} />
      </div>
    ));*/

    return (
      <React.Fragment>
        <Grid>
          {listItems}
          <IconButton
            color="primary"
            className={classes.secondaryButton}
            aria-label="Close"
            onClick={this.handleSeachClose}
          >
            <ReplayIcon />
          </IconButton>
        </Grid>
      </React.Fragment>
    );
  }

  renderUploadedState() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler}>
          <img
            width="100%"
            className={classes.media}
            src={this.state.selectedFile}
          />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = event => {
    console.log("Click!");
    this.setState({
      mainState: "initial",
      selectedFile: null,
      imageUploaded: 0
    });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Card className={this.props.cardName}>
            {(this.state.mainState == "initial" && this.renderInitialState()) ||
              //   (this.state.mainState == "search" && this.renderSearchState()) ||
              (this.state.mainState == "gallery" &&
                this.renderGalleryState()) ||
              (this.state.mainState == "uploaded" &&
                this.renderUploadedState())}
          </Card>
          <form style={{ display: "grid" }}>
            <TextField id="outlined-basic" label="Text" style={{ marginTop: "24px" }} value={this.state.text} onChange={(event) => this.handleChangeText(event)} variant="outlined" />
            <FormControl style={{ marginTop: "24px" }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.type}
                label="type"
                onChange={this.handleChangeType}
              >
                <MenuItem value={"FEEDER"}>Feeder</MenuItem>
                <MenuItem value={"MATCH"}>Match</MenuItem>
                <MenuItem value={"ICE"}>Ice</MenuItem>
                <MenuItem value={"CARP"}>Carp</MenuItem>
                <MenuItem value={"FLY"}>Fly</MenuItem>
              </Select>
            </FormControl>
            <input type="submit" style={{ marginTop: "24px" }} value="Create post" onClick={(event) => this.handleSubmit(event)} />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreatePost);
