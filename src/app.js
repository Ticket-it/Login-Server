/**
 * Requires
 */
const express = require('express')
require("dotenv").config();
const morgan = require('morgan')
var cors = require("cors");
const accountRouter = require("./routes/account.router")
const errorHandler = require("./middlewares/errorHandler");

/**
 * Instances
 */
const app = express()
const ACCOUNT_ROUTER = "/api/account"
const port = process.env.PORT || 3003;

/**
 * Middlewares
 */

// Logging
//app.use(morgan('combined'))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// Error Handler
app.use(errorHandler)


/**
 * Routes
 */
app.use(ACCOUNT_ROUTER,accountRouter)

/**
 * Listen on defined port
 */
app.listen(port, () => {
  console.log(`Users' Server listening on port ${port}`)
})