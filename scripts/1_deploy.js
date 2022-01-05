
const Factory = artifacts.require("UniswapV2Factory")
const Router = artifacts.require("UniswapV2Router02")
const ANY = artifacts.require("ANY")
const MULTI = artifacts.require("MULTI")
const WETH = artifacts.require("WETH")


const deploy = async () => {
    let any, multi, weth, factory, router

    const [ deployer, feeToSetter, feeTo, user ] = await web3.eth.getAccounts()
    const INITIAL_SUPPLY = web3.utils.toWei("100000000")
    
    try {
        console.log(`Deploying ANY ...`)
        any = await ANY.new(INITIAL_SUPPLY)
        console.log(`Deployed ANY at ${ any.address }`)
    } catch(err) {
        console.log(`Failed to deploy ANY: ${ err.message }`)
    }

    try {
        console.log(`Deploying MULTI ...`)
        multi = await MULTI.new(INITIAL_SUPPLY)
        console.log(`Deployed MULTI at ${ multi.address }`)
    } catch(err) {
        console.log(`Failed to deploy MULTI: ${ err.message }`)
    }

    try {
        console.log(`Deploying WETH ...`)
        weth = await WETH.new(INITIAL_SUPPLY)
        console.log(`Deployed WETH at ${ weth.address }`)
    } catch(err) {
        console.log(`Failed to deploy WETH: ${ err.message }`)
    }

    try {
        console.log(`Deploying factory ...`)
        factory = await Factory.new(feeToSetter)
        await factory.setFeeTo(feeTo, { from: feeToSetter })
        console.log(`Deployed factory at ${ factory.address }`)
    } catch(err) {
        console.log(`Failed to deploy factory: ${ err.message }`)
    }

    try {
        console.log(`Deploying router ...`)
        router = await Router.new(factory.address, weth.address)
        console.log(`Deployed router at ${ router.address }`)
    } catch(err) {
        console.log(`Failed to deploy router: ${ err.message }`)
    }

    console.log("\n\n\n\n")
}

try {
    deploy().then(() => process.exit(0))
} catch(err) {
    console.log(err.message)
}