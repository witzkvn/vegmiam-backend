const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')
const userRouter = require('./routes/userRoutes')

const app = express()
app.enable('trust proxy');

// SECURITY
app.use(helmet({ contentSecurityPolicy: false }));

const limiter = rateLimit({
  max: 120,
  windowMs: 60 * 60 * 1000,
  message: 'Trop de requêtes depuis votre adresse IP. Merci de réessayer dans une heure :)'
});
app.use('/api', limiter);
app.use(express.json({
  limit: '10kb'
}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize())
app.use(xss())
app.use(hpp({
  whitelist: [] // insérer les request params en String ici, exemple 'ratingsAverage', 'ratingsQuantity', 'difficulty', 'price'...
}))
app.use(cors())
app.options('*', cors())

if (process.env.NODE_ENV === "development") {
  app.use(morgan('common'))
}

app.use(compression())

// ROUTES
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/recipes', recipesRouter);

app.use('/', function (req, res) {
  res.send('Bienvenue sur l\'API Vegmiam :)')
})

// if request get until here, error
app.all('*', (req, res, next) => {
  next(new AppError(`Oooops ! L'URL ${req.originalUrl} n'a pas été trouvé sur ce serveur... Merci d'essayer un autre URL.`, 404))
})

// global error handler
app.use(globalErrorHandler)

module.exports = app;




module.exports = app;