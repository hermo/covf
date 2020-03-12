const covf20200310 = x => 1.48284516349*Math.pow(Math.E, 0.252960184179*x)
const covf20200311 = x => 1.46021640082*Math.pow(Math.E, 0.2560357853*x)
const covf20200312 = x => 0.0176295582645*Math.pow(x, 4)-0.441513050654*Math.pow(x,3)+3.81783962521*Math.pow(x,2)-11.1483424417*x+11.2604062609

const covfFunctions = {
  '2020-03-10': covf20200310,
  '2020-03-11': covf20200311,
  '2020-03-12': covf20200312,
}
let fnName = '2020-03-12'

const now = (new Date()).getTime()
const epoch = (new Date('2020-02-26')).getTime()
const day = 24*60*60*1e3

const daysSinceStart = Math.ceil((now-epoch)/day)


// Allow running simulation using estimate equation for older periods
if (process.argv[2]) {
  fnName = process.argv[2]
}

const covf = covfFunctions[fnName]

if (!covf) {
  console.error('Invalid date:', fnName)
  console.log('Available functions:', Object.keys(covfFunctions))
  process.exit(1)
}

console.log('== Estimated SARS-CoV-2 infections in Finland ==')
console.log('* Using data from', fnName)


let prev=null

console.log(`date\t\ttotal\tnew`)
for(let i=daysSinceStart-3; i < daysSinceStart+14; i++) {
  const date = (new Date(epoch + day*i)).toISOString().substr(0,10)
  const today = covf(i)
  const delta = prev ? today-prev : 0
  console.log(`${date}\t${~~today}\t+${~~delta} ${i === daysSinceStart-1 ? 'today' : ''}`)
  prev = today
}
