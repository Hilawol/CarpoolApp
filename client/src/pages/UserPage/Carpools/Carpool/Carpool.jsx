// import React from 'react'
// import './carpool.css';

// function Carpool({ carpool }) {

//   return (
//     carpool ?
//       <div className="carpool">
//         <p className="title"></p>
//         Carpool Name: {carpool.carpool.name} {carpool.owner ? " (You created this carpool)" : ''}
//       From:{carpool.carpool.from}
//       To: {carpool.carpool.to}
//       Date: {carpool.carpool.date}
//       </div> :
//       null
//   )
// }

// export default Carpool

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './carpool.css';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
  const bull = <span className={classes.bullet}>•</span>;

  console.log(carpool)
  return (
    carpool.carpool ?
      <div className="carpool" onClick={() => onCarpoolClick(carpool._id)}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {carpool.carpool.name}
            </Typography>
            <Typography variant="h5" component="h2">
              {`From:${carpool.carpool.from}
            To: ${carpool.carpool.to}`}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
        </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
          <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
      :
      null
  );
}
