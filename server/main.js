const express = require('express')
const path = require('path')
const webpack = require('webpack')
const logger = require('../build/lib/logger')
const webpackConfig = require('../build/webpack.config')
const project = require('../project.config')
const compress = require('compression')
const bodyParser = require("body-parser");
const app = express()
app.use(compress())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api/addEntity', function (req, res) {
  console.log(req.body.table);
  res.json({
    "status": "ok",
    "response": "bad error"
  })
})

app.post('/api/updateEntity', function (req, res) {
  console.log(req.body.table);
  res.json({
    "status": "ok",
    "response": "update"
  })
})

app.post('/api/removeEntity', function (req, res) {
  console.log(req.body.table);
  res.json({
    "status": "ok",
    "response": "remove"
  })
})

app.post('/api/getTopByParams', function (req, res) {
  console.log(req.body.table);
  res.json({
    "status": "ok",
    "response": {
      "members": [
        {
          "id": 1,
          "place": 1,
          "points": 101,
          "secondName": "SecondName1",
          "firstName": "FirstName1",
          "lastName": "LastName1"
        },
        {
          "id": 2,
          "place": 2,
          "points": 100,
          "secondName": "SecondName2",
          "firstName": "FirstName2",
          "lastName": "LastName2"
        },
        {
          "id": 3,
          "place": 3,
          "points": 99,
          "secondName": "SecondName3",
          "firstName": "FirstName3",
          "lastName": "LastName3"
        },
        {
          "id": 4,
          "place": 4,
          "points": 98,
          "secondName": "SecondName4",
          "firstName": "FirstName4",
          "lastName": "LastName4"
        },
        {
          "id": 5,
          "place": 5,
          "points": 97,
          "secondName": "SecondName5",
          "firstName": "FirstName5",
          "lastName": "LastName5"
        },
        {
          "id": 6,
          "place": 6,
          "points": 96,
          "secondName": "SecondName6",
          "firstName": "FirstName6",
          "lastName": "LastName6"
        },
        {
          "id": 7,
          "place": 7,
          "points": 95,
          "secondName": "SecondName7",
          "firstName": "FirstName7",
          "lastName": "LastName7"
        },
        {
          "id": 8,
          "place": 8,
          "points": 94,
          "secondName": "SecondName8",
          "firstName": "FirstName8",
          "lastName": "LastName8"
        },
        {
          "id": 9,
          "place": 9,
          "points": 93,
          "secondName": "SecondName9",
          "firstName": "FirstName9",
          "lastName": "LastName9"
        },
        {
          "id": 10,
          "place": 10,
          "points": 92,
          "secondName": "SecondName10",
          "firstName": "FirstName10",
          "lastName": "LastName10"
        },
        {
          "id": 11,
          "place": 11,
          "points": 91,
          "secondName": "SecondName11",
          "firstName": "FirstName11",
          "lastName": "LastName11"
        },
        {
          "id": 12,
          "place": 12,
          "points": 90,
          "secondName": "SecondName12",
          "firstName": "FirstName12",
          "lastName": "LastName12"
        },
        {
          "id": 13,
          "place": 13,
          "points": 89,
          "secondName": "SecondName13",
          "firstName": "FirstName13",
          "lastName": "LastName13"
        },
        {
          "id": 14,
          "place": 14,
          "points": 88,
          "secondName": "SecondName14",
          "firstName": "FirstName14",
          "lastName": "LastName14"
        }
      ]
    }
  })
})

app.get('/api/getTables', function (req, res) {

  res.json({
    "status": "ok",
    "response": {
      "contests": [
        {
          "id": 1,
          "organizationId": 2,
          "name": "First Winner Games",
          "status": "Not started",
          "startDate": "янв. 7, 2019",
          "endDate": "янв. 1, 2019"
        },
        {
          "id": 2,
          "organizationId": 3,
          "name": "Second Winner Games",
          "status": "Not started",
          "startDate": "февр. 27, 2019",
          "endDate": "февр. 23, 2019"
        }
      ],
      "infringements": [

      ],
      "members": [
        {
          "id": 1,
          "number": 10,
          "contestId": 1,
          "organizationId": 1,
          "resultId": 0,
          "groupId": 1,
          "secondName": "Иванов",
          "firstName": "Сергей",
          "lastName": "Владимирович"
        },
        {
          "id": 2,
          "number": 11,
          "contestId": 1,
          "organizationId": 2,
          "resultId": 0,
          "groupId": 1,
          "secondName": "Пушкин",
          "firstName": "Александр",
          "lastName": "Александрович"
        },
        {
          "id": 3,
          "number": 100,
          "contestId": 1,
          "organizationId": 1,
          "resultId": 0,
          "groupId": 2,
          "secondName": "Красавина",
          "firstName": "Екатерина",
          "lastName": "Андреевна"
        },
        {
          "id": 4,
          "number": 101,
          "contestId": 1,
          "organizationId": 3,
          "resultId": 0,
          "groupId": 2,
          "secondName": "del",
          "firstName": "María",
          "lastName": "Amparo"
        },
        {
          "id": 455,
          "number": 101,
          "contestId": 1,
          "organizationId": 3,
          "resultId": 0,
          "groupId": 2,
          "secondName": "del",
          "firstName": "María",
          "lastName": "Amparo"
        },
        {
          "id": 45,
          "number": 101,
          "contestId": 1,
          "organizationId": 3,
          "resultId": 0,
          "groupId": 2,
          "secondName": "del",
          "firstName": "María",
          "lastName": "Amparo"
        }
      ],
      "organizations": [
        {
          "id": 1,
          "locationId": 2,
          "name": "MskSportSchool"
        },
        {
          "id": 2,
          "locationId": 1,
          "name": "PrmSportSchool"
        },
        {
          "id": 3,
          "locationId": 3,
          "name": "MdrdSportSchool"
        }
      ],
      "groups": [
        {
          "id": 1,
          "age": 18,
          "sex": 1,
          "weight": 85.5,
          "rank": "MS"
        },
        {
          "id": 2,
          "age": 18,
          "sex": 0,
          "weight": 65.5,
          "rank": "MS"
        }
      ],
      "locations": [
        {
          "id": 1,
          "country": "Russia",
          "city": "Perm"
        },
        {
          "id": 2,
          "country": "Russia",
          "city": "Moscow"
        },
        {
          "id": 3,
          "country": "Spain",
          "city": "Madrid"
        }
      ],
      "judges": [
        {
          "id": 1,
          "organizationId": 1,
          "contestId": 1,
          "firstName": "Петров",
          "secondName": "Максим",
          "lastName": "Дмитриевич"
        },
        {
          "id": 2,
          "organizationId": 2,
          "contestId": 1,
          "firstName": "Васильев",
          "secondName": "Матвей",
          "lastName": "Игоревич"
        },
        {
          "id": 3,
          "organizationId": 3,
          "contestId": 2,
          "firstName": "Lesley",
          "secondName": "Ann",
          "lastName": "Warren"
        },
        {
          "id": 4,
          "organizationId": 3,
          "contestId": 2,
          "firstName": "Barbara ",
          "secondName": "Bel",
          "lastName": "Geddes"
        }
      ],
      "results": [

      ]
    }
  });
});
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(project.basePath, project.srcDir),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: 'normal',
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, 'public')))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))
}

module.exports = app
