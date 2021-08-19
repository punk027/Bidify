import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react'

const dummyConnection = {
  address: '0xEac1B9b245D7935402F905d6Fc295bA3A52b4907',
  networks: {
    active: 'Ropsten Network',
    idle: ['Goerli Network', 'Rinkeby Network']
  },
  balance: {
    ETH: 56
  }
}

const dummyBrief = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod llum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const dummyMyCollection = [
  {
    name: 'NFT Bay Panda',
    img_path: '/logo.png',
    brief: dummyBrief
  },
    {
    name: 'Cake Loop',
      img_path: '/logo.png',
        brief: dummyBrief

  },
      {
    name: 'Wanka Swapper',
        img_path: '/logo.png',
        brief: dummyBrief

  },
        {
    name: 'Blue limer',
          img_path: '/logo.png',
        brief: dummyBrief

  }
]

const Home = () => {

  const [connection, setConnection] = useState()
  const [myCollections, setMyCollections] = useState()
  const [message, setMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (connection?.networks?.active)
    {
      //dummy my collection setup
      if (!myCollections) setTimeout(() => {
        setIsLoading(true)
      }, 2000)
      setTimeout(() => {
        setMyCollections(dummyMyCollection)
        setIsLoading(false)
      },8000)
    }
  },[connection, myCollections])

  const connectWalletHandler = (e) => {
    e.preventDefault()
    console.log('connect wallet function, to be integrated here.')
    //dummy handler setup
    setConnection(dummyConnection)
    setMessage('Connected successfully')
 
              setTimeout(() => {
          setMessage()
    },2000)
  }

  const disconnectWalletHandler = (e) => {
    e.preventDefault()
    console.log('disconnect wallet function, to be integrated here.')
    //dummy handler setup
    setConnection()
    setMyCollections()
    setMessage('Disconnected successfully')
       setTimeout(() => {
          setMessage()
    },2000)
  }

  const sellOnAuctionHandler = (e) => {
    e.preventDefault()
    console.log('sellOnAuction, to be integrated here.')
    //dummy handler setup
  }


  const renderConnectionInformation = <>
  <div>
          <b>CONNECTED ADDRESS</b>
          <p>{connection?.address}</p>
        </div>
        <div>
           <div>
          <b>CONNECTED NETWROK</b>
          <p>{connection?.networks?.active}</p>
        </div>
          <div className={styles.block}>
            <b>SWITCH NETWORK</b>
          <select id='networks'>Switch network
          {connection?.networks?.idle.map((network, index) => {
            return <option id='networks' key='index' value={network} >{network}</option>
          })}
            </select>
          </div>
        </div>
        <div>
          <b>ETH BALANCE</b>
          <p>{connection?.balance?.ETH}</p>
        </div>

  </>


  const renderMyCollections = <>
    <b>MY COLLECTIBLES</b>
      <div className={styles.collections}>
        {myCollections?.map((myCollection, index) => {
          return (
            <div key={index} className={styles.card}>
              <Image src={myCollection.img_path} height='100' width='100' alt='my-collection' />
              <b>{myCollection.name} </b>
              <p>{myCollection.brief}</p>
              <button onClick={(e)=> sellOnAuctionHandler(e)}>Sell on auction</button>
          </div>)
        })}
      </div>
  </>
  
  const renderToast = 
      <div className={styles.toast}>
        <p>{message}</p>
    </div>

  const renderLoader =
  <div className={styles.loaderbar}>
    <div className={styles.loader}></div>
    <i>loading my collections...</i>
  </div>
  
  return (
    <div className={styles.container}>
      {message  && renderToast}
      <Head>
        <title>Bidify | NFT Marketplace</title>
      </Head>
      <div className={styles.header}>
        <Image src='/logo.png' alt='logo' width='100' height='100' />
        <h1>BIDIFY</h1>
        {connection?.networks?.active && renderConnectionInformation}
        </div>
      <button onClick={(e) => connection?.networks?.active ? disconnectWalletHandler(e) : connectWalletHandler(e)}>{connection?.networks?.active ? 'DISCONNECT' : 'CONNECT WALLET'}</button>
      {isLoading && renderLoader}
      {(myCollections && connection?.networks?.active) && renderMyCollections ||
      (!myCollections && connection?.networks?.active && !isLoading) && 
        <div className={styles.empty}>
          <p>You donot have any assets. Create one in rarible</p>
          <button>Visit Rarible</button>
        </div>
      }
    </div>
  )
}

export default Home