const initialState = {
  grid: [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8],
  ],
  solved: false,
  canInteract: false,
  web3: {},
  user: {
    address: undefined,
    tokens: {
      0: true,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    }
  },
  tokenInformation: {
    open: false,
    help: false,
    activeNumber: 3,
    1: {
      title: 'limbo',
      description: 'The spirits of great men and women who claim to work in cryp- to remain suspended here in Limbo, the First Circle of Crypto Hell. Here lie the conference junkies, social media professors, and meet-up evangelists whose praises and condemnations have followed the whims of a volatile crypto market. This circle is char- acterized by weak hands holding crypto on exchange, hands that have never held a mobile wallet or touched a dApp. Their eternal status is,“Waiting for your response” on LinkedIn.',
    },
    2: {
      title: 'lust',
      description: 'Those who exchanged crypto in the sole pursuit of pleasure find themselves trapped in The Second Circle of Crypto Hell. This seedy layer is home to individuals whose desires were left un- quenched by goods and services available for sale on the clear web. Using crypto to buy illicit drugs, stolen credit cards, and jailbait on dark web markets, these sinners suffer quietly in Incog- nito Mode, clicking on dead .onion links and living in constant paranoia of receiving an unwelcome knock on their door.',
    },
    3: {
      title: 'gluttony',
      description: 'The gluttonous souls of the crypteau-riche languish in medioc- rity in the Third Circle of Crypto Hell. Once active, contributing members of the community, these softbellies no longer reply to e-mails because their inboxes are filled with receipts from Uber, Airbnb, and Amazon. It is nearly impossible to move here due to the ungodly amount of Lambo traffic. “I had that idea years ago,” the sinners cry helplessly, as they twist the top off the latest noo- tropic capsule and pour it directly into a cup of cold brew coffee.',
    },
    4: {
      title: 'avarice',
      description: 'The more enterprising strain of crypteau-riche continue to claw their way into the the Fourth Circle of Crypto Hell, Avarice. Here, sinners who hoarded and spent their cryptocurrency wastefully are unable to escape the swarm of lucrative opportunities which engulfs them, represented in this circle by purple bees with gold- en stingers. Reaching for every opportunity that flies their way, the greedy - swollen with welts and glimmering with golden nee- dles of dead bees - run directionless for all of eternity.'
    },
    5: {
      title: 'wrath',
      description: 'In the Fifth Circle of Crypto Hell, we hear the echoes of wrath- ful developers, voices raging as they try to sync a node to the blockchain. Cascading error messages etch themselves into ter- minal walls blacker than night behind closed eyelids, whispering unforgivable things into their ears as they sleep: invalid nonce, pending transaction, OUT OF GAS. Consumed by a furious anger, these sinners boil in their own blood as they are forced to watch a Client Syncing animation until the end of time.'
    },
    6: {
      title: 'heresy',
      description: 'Deniers, idolators, non-believers - all burn with the same scheme-y glow in the Sixth Circle of Crypto Hell. The heretics fill this circle with fear, uncertainty, and doubt, preying on the dreams of frail souls too weak to ignore their falsehoods. They lived their lives with too many opinions and not enough skin in the game, and what greater punishment than more of the same without end? Forever they toil on the sidelines, texting you at 3 a.m., “Is now a good time to buy?” never to receive a response.'
    },
    7: {
      title: 'violence',
      description: 'Hell hath no regulators: the Seventh Circle of Crypto Hell pun- ishes the violent among us who cause reckless harm to others, themselves, and the almighty blockchain. Algorithmic skeletons of crypto lending bots bury the poor with insurmountable debt. Daemons of malicious nodes exploit weak contract code and drain them of blood. For their transgressions against nature, evil contracts are pointed at one another, cutting the other into piec- es by re-entry attack again and again, without rest.'
    },
    8: {
      title: 'fraud',
      description: 'As we approach the innermost reaches of Crypto Hell, we en- counter the fraudsters - evildoers who deceive for their own self- ish gain. The Eighth Circle reeks of excrement from all the shit- coins that have gone down the Styx. It is crowded with imposters, the souls of forgotten opportunists who claimed to be Satoshi Nakamoto, tricksters with masks offering crypto giveaways too good to be true. Travelers passing through this circle often get lost following a bad MEW address and never find their way out.',
    },
    0: {
      title: 'treachery',
      description: 'The Ninth Circle is the darqest and furthest point from the Ethereal One. Strangely, everything here looks the same. Those who make it this far wonder what, if anything at all, has changed. Forget changing the world; pledge your soul to me and the block- chain will give you whatever your heart desires: more power, more wealth, more fame, more knowledge. This final circle is de- void of anything human, save for a single, familiar voice that whis- pers in your ear, moonrise to sunset, until the end of your days.',
    }
  }
}

export default initialState;
