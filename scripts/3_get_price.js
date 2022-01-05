
const Factory = artifacts.require("UniswapV2Factory")
const Router = artifacts.require("UniswapV2Router02")
const Pair = artifacts.require("UniswapV2Pair")
const Any = artifacts.require("ANY")
const Multi = artifacts.require("MULTI")

const factoryAddr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const routerAddr = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"

const anyAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const multiAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"


const getPrice = async () => {
  const [ deployer, feeToSetter, feeTo ] = await web3.eth.getAccounts()
  const factory = await Factory.at(factoryAddr)
  const router = await Router.at(routerAddr)
  const any = await Any.at(anyAddr)
  const multi = await Multi.at(multiAddr)

  const now = Math.floor(Date.now() / 1000)
  const tenMins = now + 600

  const pairAddr = await factory.getPair(anyAddr, multiAddr)
  const pair = await Pair.at(pairAddr)

  const { _reserve0, _reserve1 } = await pair.getReserves()
  console.log(`Reserve 0: ${ web3.utils.fromWei(_reserve0) }`)
  console.log(`Reserve 1: ${ web3.utils.fromWei(_reserve1) }`)
  

  await router.swapExactTokensForTokens(
    web3.utils.toWei("0.1", "ether"),
    web3.utils.toWei("0.0003", "ether"),
    [ anyAddr, multiAddr ],
    deployer,
    tenMins
  )

  console.log("\n\n\n\n")

  const swapEvt = await pair.getPastEvents("Swap", { fromBlock: 10, toBlock: 10 })
  console.log(swapEvt)

  const lpBal = await pair.balanceOf(deployer)
  // const removeLp = lpBal.sub("10000000")
  // console.log(removeLp)

  // await pair.approve(router.address, web3.utils.toWei("1", "ether"))
  // console.log(web3.utils.fromWei(await pair.allowance(deployer, router.address)))



  console.log("\n\n\n\n")

  console.log("any: " + web3.utils.fromWei(await any.balanceOf(deployer)))
  console.log("multi: " + web3.utils.fromWei(await multi.balanceOf(deployer)))


  console.log("\n\n\n\n")

  console.log(await factory.feeTo())
}

try {
  getPrice().then(() => process.exit(0))
} catch(err) {
  console.log(err.message)
}