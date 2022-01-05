
const Router = artifacts.require("UniswapV2Router02")
const Any = artifacts.require("ANY")
const Multi = artifacts.require("MULTI")


const anyAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const multiAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const wethAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
const factoryAddr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const routerAddr = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"


const create = async () => {
  const [ deployer ] = await web3.eth.getAccounts()
  const router = await Router.at(routerAddr)
  const any = await Any.at(anyAddr)
  const multi = await Multi.at(multiAddr)

  const now = Math.floor(Date.now() / 1000)
  const tenMins = now + 600
  
  await any.approve(routerAddr, web3.utils.toWei("100", "ether"))
  await multi.approve(routerAddr, web3.utils.toWei("100", "ether"))
  
  const receipt = await router.addLiquidity(
    multiAddr,
    anyAddr,
    web3.utils.toWei("1", "ether"),
    web3.utils.toWei("1", "ether"),
    web3.utils.toWei("1", "ether"),
    web3.utils.toWei("1", "ether"),
    deployer,
    tenMins
  )

  console.log("\n\n\n\n")
}

create().then(() => process.exit(0))