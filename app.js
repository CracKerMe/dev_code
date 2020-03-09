const cheerio = require('cheerio');
const superagent = require('superagent');
const Koa = require('koa')
const router = require('koa-router')()
const cors = require('koa-cors')
const app = new Koa()

// app.use(async (ctx, next) => {
//   if (ctx.request.path === '/') {
//       ctx.response.body = '<h1>index page</h1>';
//   } else {
//       await next();
//   }
// });
// app.use(async (ctx, next) => {
//   if (ctx.request.path === '/home') {
//       ctx.response.body = '<h1>home page</h1>';
//   } else {
//       await next();
//   }
// });
// app.use(async (ctx, next) => {
//   if (ctx.request.path === '/404') {
//       ctx.response.body = '<h1>404 Not Found</h1>';
//   } else {
//       await next();
//   }
// });


// var fs = require('fs');
router
  .get('/dfvideos/:id', async (ctx, next) => {
    let result = await getDfVideo(ctx.params.id)
    ctx.body = result
    next()
  })
function getDfVideo (id) {
  return new Promise((resolve, reject) => {
    superagent.get(`https://video.eastday.com/a/${id}.html`).end((err, response) => {
      if (err) {
        reject(err);
      }
      var $ = cheerio.load(response.text);
      $('script').filter((i, v) => {
        if (i == 4) {
          var oData = $(v).html().replace(/^\s*/g, '');
          eval(oData);
          var res = {
            typename: typename,
            d_source: d_source,
            d_dfhid: d_dfhid,
            mp4long: mp4long,
            typechinesename: typechinesename,
            ymd: ymd,
            uk_for_tbtj: uk_for_tbtj,
            tbtj: tbtj
          };
          resolve(JSON.stringify(res))
        }
      })
    })
  })
}
router.get('/feiyan', async (ctx, next) => {
  let result = await getDxyData()
  ctx.body = result
  next()
})
function getDxyData () {
  return new Promise((resolve, reject) => {
    superagent.get('https://ncov.dxy.cn/ncovh5/view/pneumonia').end((err, response) => {
      if (err) {
        console.log(err)
        resolve(err);
      }
      var $ = cheerio.load(response.text);
      let result = {}
      $('script').filter((i, v) => {
        if ($(v).html().indexOf('try { window.getAreaStat') !== -1) {
          var getAreaStat = $(v).html().replace(/^\s*/g, '').slice(27).slice(0, -11);
          result = getAreaStat
        }
      })
      resolve(result)
    })
  })
}

// router
//   .get('/:id', async (ctx, next) => {
//     let result = await getData(ctx.params.id)
//     ctx.body = result
//     next()
//   })
// function getData (id) {
//   return new Promise((resolve, reject) => {
//     superagent.get(`http://www.toutiao.com/${id}/`).end((err, response) => {
//       if (err) {
//         console.log(err)
//         resolve(err);
//       }
//       var $ = cheerio.load(response.text);
//       $('script').filter((i, v) => {
//         if (i == 6) {
//           var oData = $(v).html().replace(/^\s*/g, '');
//           eval(oData);
//           var res = BASE_DATA;
//           // fs.writeFileSync('toutiao-data.js', JSON.stringify(res));
//           // ctx.type = ''
//           resolve(JSON.stringify(res))
//         }
//       })
//     })
//   })

// }
app.use(router.routes())
app.use(cors())
app.listen(5566, () => {
  console.log('server is running at http://localhost:5566')
})
