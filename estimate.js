const covf20200310 = x => 1.48284516349*Math.pow(Math.E, 0.252960184179*x)
const covf20200311 = x => 1.46021640082*Math.pow(Math.E, 0.2560357853*x)

const covfFunctions = {
  '2020-03-10': covf20200310,
  '2020-03-11': covf20200311
}


const now = (new Date()).getTime()
const epoch = (new Date('2020-02-26')).getTime()
const day = 24*60*60*1e3

const daysSinceStart = Math.ceil((now-epoch)/day)

let fnName = '2020-03-11'

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

console.log('== Estimated COV-19 infections in Finland ==')
console.log('* Using data from', fnName)


for(let i=daysSinceStart-3; i < daysSinceStart+14; i++) { 
  console.log((new Date(epoch + day*i)).toISOString().substr(0,10), ~~covf(i+1), ((i === daysSinceStart-1)? 'today' : '')) 
}
