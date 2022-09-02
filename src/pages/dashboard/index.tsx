import Background from "../../components/Background";
import Header from './../../components/Header';
import GameCard from './../../components/GameCard';

interface IDashboardProps {
    games: IGame[]
}

interface IGame {
    id: string,
    productName: string,
    description: string,
    category: string,
    image: {
        URL: string                
    },
    platform: string
}

export default function Dashboard({ games }: IDashboardProps) {
    const sortedGames = games.sort((currentGame, nextGame) => currentGame.productName.localeCompare(nextGame.productName))

    return(
        <Background config="flex-col gap-8 items-center">
            <Header/>

            <main className="w-[80%] max-w-[1041px] flex flex-col gap-10 pb-10">

                <section className="flex flex-col gap-4">
                <h2 className="text-title2 text-text font-bold">Recommended</h2>

                <ul className="grid grid-cols-2 gap-[20.5px]">
                    <li className="w-[100%] h-[281px] bg-boxcolor rounded-lg"></li>
                    <li className="w-[100%] h-[281px] bg-boxcolor rounded-lg"></li>
                </ul>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-title2 text-text font-bold">Your games</h2>
                    <ul className="grid grid-cols-3 gap-[20.5px]">
                        {
                            sortedGames.map(({ id, productName, image, platform }: IGame) => <GameCard key={id} id={id} name={productName} img={image.URL} platform={platform}/>)
                        }  
                    </ul>
                </section>
            </main>
        </Background>
    )
}

interface IXboxProduct {
    LocalizedProperties: {ProductTitle: string, ShortDescription: string, Images: IXboxProductImage[]}[],
    Properties: {
        Category: string
    }
}

interface IXboxProductImage {
    ImagePurpose: string
    FileId: string,
    Uri: string
}

interface ISteamProduct {
    appid: string,
    name: string
}

export async function getStaticProps() {
    const xboxResponse = await fetch('https://games-api.herokuapp.com/games?_page=1&_limit=15')
    const xboxGames = await xboxResponse.json()

    const steamKeyAPI = 'CD931AB5F0BA950471A81DEFF485FA5C'
    const usernameSteam = 'wolfremgames'
    
    const steamAccountID = await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamKeyAPI}&vanityurl=${usernameSteam}`)
    const steamAccountIDJSON = await steamAccountID.json()

    const responseSteam = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKeyAPI}&steamid=${steamAccountIDJSON.response.steamid}&include_appinfo=true&format=json`)
    const responseSteamJSON = await responseSteam.json()

    const steamGames = responseSteamJSON.response.games.map(({ appid, name }: ISteamProduct) => {

        return {
            id: appid,
            productName: name,
            description: '',
            category: '',
            image: {
                URL: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`                
            },
            platform: 'steam'
        }
    })

    return {
        props: {
            games: [...steamGames, ...xboxGames]
        }
    }
}