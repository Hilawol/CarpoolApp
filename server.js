require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const usersRoute = require('./server/routes/users.routes');
const carpoolRoute = require('./server/routes/carpool.routes');
const driveRoute = require('./server/routes/drive.routes');
const passengerRoute = require('./server/routes/passenger.routes');

app.use('/api/users', usersRoute);
app.use('/api/carpools', carpoolRoute);
app.use('/api/drives', driveRoute);
app.use('/api/passengers', passengerRoute);

//connect to db with mongoose
mongoose.connect("mongodb+srv://hila_admin:J2ughdciUs7PR9d@cluster0.dhhlk.mongodb.net/carpoolApp?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("database connect")
}).catch((error) => {
  console.log(error);
})

const port = 5000;

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`)
});
