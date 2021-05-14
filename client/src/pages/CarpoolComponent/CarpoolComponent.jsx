import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import DriveEtaSharpIcon from "@material-ui/icons/DriveEtaSharp";
import "./carpoolComponent.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Carpool({ carpool, onCarpoolClick }) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  console.log(carpool.carpool);
  return carpool.carpool ? (
    <div
      className="carpool"
      onClick={() => onCarpoolClick(carpool.carpool._id)}
    >
      <Card className={classes.root}>
        <CardContent>
          <div className="carpoolHeader">
            <DriveEtaSharpIcon className="carIcon" />
            <Typography variant="h6" component="h2">
              {carpool.carpool.name}
            </Typography>
          </div>
          <Typography className={classes.title}>
            {`From: ${carpool.carpool.from}
            To: ${carpool.carpool.to}`}
          </Typography>
          <Typography className={classes.pos}>
            {moment(carpool.carpool.date).format("DD.MM.YYYY HH:mm")}
            {/* {carpool.carpool.date} */}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {carpool.carpool.owner ? "Carpool owner" : ""}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </div>
  ) : null;
}
