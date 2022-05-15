const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

// Get port from dotenv
const port = process.env.PORT;

// Create express
const app = express()

// Get routes from ./routes.ts
const route = require('./routes')

// Set the middlewares
app.use(morgan('tiny'))

// Set the router
app.use(route)

// Start server on port informed
app.listen(port, () => {
    console.log(`⚡️[server] listening on http://localhost:${port}`)
})
