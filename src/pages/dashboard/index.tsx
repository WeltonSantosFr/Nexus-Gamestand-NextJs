import Background from "../../components/Background";
import Header from "./../../components/Header";
import GameCard from "./../../components/GameCard";
import { useContext, useEffect } from "react";
import { NexusContext } from "../../context/NexusContext";
import Profile from "../../components/ProfileModal";

interface IDashboardProps {
  games: IGame[];
}

interface IGame {
  id: string;
  productName: string;
  description: string;
  category: string;
  image: {
    URL: string;
  };
  platform: string;
}

export default function Dashboard({ games }: IDashboardProps) {
  const { userModalOpen } = useContext(NexusContext);
  const sortedGames = games.sort((currentGame, nextGame) =>
    currentGame.productName.localeCompare(nextGame.productName)
  );
  const { checked, setChecked, handleChange } = useContext(NexusContext);

  return (
    <Background config="flex-col gap-8 items-center">
      <Header />

      {userModalOpen && (
        <Profile checked={checked} handleChange={() => handleChange()} />
      )}

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
            {sortedGames.map(({ id, productName, image, platform }: IGame) => (
              <GameCard
                key={id}
                id={id}
                name={productName}
                img={image.URL}
                platform={platform}
              />
            ))}
          </ul>
        </section>
      </main>
    </Background>
  );
}

interface IXboxProduct {
  LocalizedProperties: {
    ProductTitle: string;
    ShortDescription: string;
    Images: IXboxProductImage[];
  }[];
  Properties: {
    Category: string;
  };
}

interface IXboxProductImage {
  ImagePurpose: string;
  FileId: string;
  Uri: string;
}

interface ISteamProduct {
  appid: string;
  name: string;
}

export async function getStaticProps() {
  const response = await fetch(
    "https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=9P0617LN3SF9,9NL4KTK0N4CG,9ND0CG3LM22K,9NJWTJSVGVLJ,9NJDD0JGPP2Q,9N1HF804QXN4,9N94NCGM1Q2N,9P3RMG6MSCFB,9P6ZJT035WVV,9NSRJ872SGH7,9PG28RXDG9GQ,9NG07QJNK38J,9MVSRJWZBG9G,9PJPV2PC3MWR,9PN9WG83X4XF,9P3MGM8ZCS5D,9P686C1GJ91L,9P6JQDDZ2MQB,9NXQKPGMHH9G,9NR7XDNVP5SW,9MW7H0DVS9T6,9NBLGGH43KZB,BXLL06QN8HVP,9NC9TNXS9C8G,9MTTMQ6WSDP8,9NQVDQS2BC10,9N7GCF5SGCXC,9N360TZQZ0TR,9NJWFF2KHL6H,9NNFFCR5XGZ3,9NX6XGVJ0J3D,9MXPZ33Z9PWH,9PHJSGJNX37S,9PDXF172R7VJ,9MZZNL8J2MSZ,9PNNV537W2SN,9P0FQ0XCV0LB,9NV2VTVG0L31,9NN1Z8LHMFBV,9NWVC7XP3PFD,9N6F97F9WGL0,9N8WVMD7J5GQ,9N17CM38WNN8,C2X6ZCNKN2WR,9PLGBZWN65RG,9NXR6469DM2P,9NTM9G539XTT,9NWNX54ZMT1K,9NGCPXQG3NLZ,9N7GG222GTTH,9NQLVQTLPRS1,9N27NM3BT3ML,9N07T7TGP6JG,9NKK6CX54183,9NMS4SFNBGBH,9NKVX66J0ZSK,9NKCHZZTL308,9MXKWW4K9LP2,9NNBPBM2F60W,9NHFVWX1V7QJ,C37XBX7DCBZ0,9N7L81J5XW7T,9PC4C9NLP3ZD,9PJGM0T0827V,9P4GS31NHKT7,9MW4RJDRSF78,9P1N07XDL1D4,9MVF0PGV94F7,9N6Z8DQXSQWH,9P544PGZXC0P,9N6V2181GHLM,9PLZPHBNHTMF,9NSL68D814GC,9MXND4PQLK3W,9PK09BL31FK1,9PLT62LRF9V7,9NZTSFKR9M94,9PFD00CZJ35V,9PBDC0XZ8TXK,9NB7FZ2GV5N1,9NN7M263513G,9P934697Z4W4,9NMD6VV08WGF,9P9XS9D0LBPV,9PPSH9GQKLCB,9P3NT9H51RMR,9PHQJWGLTZM8,9PFX7F33KVG8,9NPC5398SCQ6,9P87731ZDLG0,9NJG36MFVR1L,9NSG9H451FK3,9PL4HXW1H502,9N42CT1J5WGW,9P1JS86M9SXH,9NBZ9JF6TFMD,9P71MB9QCF77,9NKGNMNK3K3Z,9NDV7FRVD7ML,9MZR11JRF7BX,9MT3D7Z4NWDV,9NBBCKL3LTRH,9MTV87HFMF43,9MVJ3VL1V3VP,BQQKG9H2STC0,9NLM4TTHCWSH,9MZNFF29W9ZX,9MVJ0V2JHK28,9P982VRDSV6G,9P5SFDNW6V13,9PNJXVCVWD4K,9NKX70BBCDRN,9NS0KH25D76X,9P3ZRGNQVC7D,9NKBH79N7HVW,BPQZT43FWD49,9PP09MJRH2XD,9P4KMR76PLLQ,9NBLGGH4PBBM,9NBLGGH3SHM5,9NN3HCKW5TPC,C20WW4W29FQ1,9MWGGC7JH35B,9MXWKHJ3VZZH,9NX3G3Z38CV2,9MVK5W0HMRP7,C41M2F4NWB2S,9PC288TN7R8K,9PJTHRNVH62H,9P8DL6W0JBB8,9P5739G419LD,9PGL2Z1H9M4R,9P6VZCRGXFMX,9P8CFXZH93CK,9PP5G1F0C2B6,9NP1P1WFS0LB,9NBLGGH515BD,9NBLGGH5WLR0,9NWQMVSB63N4,9N9WZT3PJ27W,9WZDNCRFHWFH,9WZDNCRFJBFJ,9NTM9HXNLSZX,9MW8RMSBB5QH,9NF6WPNS1S73,9NCLP4LV5K7Z,9P5NHF9ZP4ST,9PDRM8BFW1X1,9MW9469V91LM,9NBFGKQLMV33,BSMZH25V6V46,9PM7HXJ92D6W,9MXGJ8JZL0LK,9P2XMXXFQV5G,9NK7HNCG0R8D,9PHT4W7WBBDQ,C17GQF31D617,9NCFNFTSBM96,9NPHVDB4XFJP,9MWHMJ0SRBXV,9P9MC8B7R5FP,9P6FTM76L1S7,9MZVSHQZ666K,9NBLGGH51BMC,9P87CGF1TCCX,9N5GLFTT40SN,9NF0SNBQWN63,9NPFJTM4HBH9,9NCVD24B83VS,9NFWSNN4JWKB,9PLF9MR720SJ,9PM9ZVWT18WR,9MV6MCVLT8GR,9N8C03GW2TRB,9N14MFN0DV4K,9P5B81KVDGP1,BRX6HS1G5CDK,9PGLL77C201J,9P8X0RH2WV5J,9PB86W3JK8Z5,9PDDP6ML6XHF,9MTJ74MKQM46,9WZDNCRFHWD2,9PDV8FKWP3B4,9PH1Q5TKPQCQ,9P3W7QMHR450,9MV8J6MFJNQV,9NB6BVL3MTG4,9P5X4QVLC2XR,9NXP44L49SHJ,9PBWWQGXVMKC,9NP4BGBLLLXM,9P7VCSGBP9KL,9P8XJRLCLH2P,BTC0L0BW6LWC,9PC2BJDXR2LK,9NV1V176PTC2,9NMH293554QQ,9NDJLXD2X2DM,9NBLSN1JP7TH,9P6PQLFP9BN0,9MVVDHS95RCL,9PLWSGHFQ4PS,9NNSTP6KJTZ9,9MZN3SMXN824,9PBGCRBQKXTP,9N27DBP8GNNB,9NZ5QW71X49G,9PGSC3PW4N8Z,9NCG3X89KRLD,BQVQTL3PCH05,9NFZ65KKJ10X,9NRDVCW02JD7,9NZFZXDRZQLR,9N3K4M5K357L,9N9606CC950J,9NQJTF424KPX,9N8LVGJ6RDBP,9P8WMQ1S4TF9,9NL1GX15SQJK,9N4K8K2ZGF1L,9NKKDCVR3VW9,9NBLGGH1Z6FB,9N8CD0XZKLP4,C596FKDKMQN7,C083G6BGJ334,9PGB72NFG5JN,9P3RX0V3HW8H,9P6W2Q41BB8V,9PLZ7HZR7JGT,9N673ZL1TCS7,9N3TF03KNTBD,9NVN8NSXDK41,9P1P5Q3BNM7J,9N8QNKN5ZKTH,9N8N7NZSVTG3,9P5LZC1KB48V,9P5VMG8D4P4B,9NHDJC0NW20M,9PBC1QFBW563,9MZRSLLWKWDV,9NQ73XB1Q5ZG,9NCT87FKQ4GM,9NBR2VXT87SJ,9P34LH5ZWBVG,9P1Z43KRNQD4,9P2JXK37PFLZ,9MTXSN4FTFG3,9NWNLS28ZG37,9N1JLJR48FBG,9P2J7WHV0K4N,9PDRJWHBSK88,9NRBH9HS807L,9NBLGGH1Z6FQ,9NNZJ389GSW2,9N1WT4X26SHW,9MZCCHNRK9R1,9NS84HCWZD8B,9NVBKDF85W8T,9P47S7NJGWZL,9PL36RW9ZTPW,9P3PL76N0KWZ,9MZ4V4RG0W81,9N9RMHTJX41P,9P2N57MC619K,9P9JZLNFQ9PT,9P7GBPGT90L3,9PFT1PR924WB,9P1JHJ127HR4,9N4PGNQQ7ZFK,9ND3N9W1VRV1,9N2Q2VL8FGBK,9PN7NK4D9VCH,9NW4Z3HPJVKW,9MZQR8317S3B,C2NC88M7NWZ1,9PP8Q82H79LC,9NP6WL1XQDBW,9N1KQPLTR7S5,9NVD5DB5T3HD,9N23WV1HGLTQ,9PM85QK6C13H,9NG5L58FD3X5,9MTSBWPWPQVQ,9MWR1NC6VQ6L,9NT4X7P8B9NB,9NXQPGMR917R,BX3S1Q5DVHRD,9NDCJXL11096,9NNLBL0T2Z43,9PLMGFWCFZ9G,9NVR4ZQKNBSB,9P75CZFXMS7N,9P1ZVVW7NRR3,9N4V8K7Z5RRG,9MZGGWHPKQ4C,9NS3673HVH41,9NF83PRZK6K3,9NLHWTCWLKGX,9PPBVK3TK83M,9P9S593SLMV7,9NGH2MTP0T44,C27QL5JBKQ8M,9PN3VDFTB5HZ,C2B4T86TXLRS,9MVN4ND41DD3,9MT8HTJC4GSB,9PFXKRLVWJ0B,9PP7XSG5LDH1,9P2J5D12GJL5,9P03JGQ4S1GC,9MX8R81JW1B5,9NT0NT8JQMQN,9NJ4R763M7TH,9MSP68027100,9P008L2LS87F,9NQTJK43NCQJ,9NFKN56ZBMR0,9MWD2Z8L1FBQ,9NTX07HR22TG,9NW7S04QK7XV,9NN8PGK5JDN5,9NBTL551XL5N,9NQV7C0G1040,9MT6TG9CXR2H,9NC0071DJ6XC,9PJDSPZKQD6W,9NGGB0GZPB9D,9PC4RWP34M2D,9NFM39PSFXJD,9NSFGM8J6MBJ,9PCQRLT7C2BH,9NJ0PDX8NDDL,9N2VDJVMFKQ9,9NLRT31Z4RWM,9N6781PMXC02,9N0T8V0R7MBC,9P55TJKCL1BC,9PCW1SMN9RGG,9N08S5VPC4SX,9PKLF2W8J0TF,9N046HWGQ4J2,9PJ517SDHQPF,9NH5HN11FG4M,9P31WJ3N46KB,9N7KBCL0NC5H,9PD5BM2Z8C4L,9P9V698V6MVR,9PFLW6WZVJC7,C521HDXRTS7F,9NLT5XR52ZS7,9NGH1FK0RJGL,9NBLGGH5342P,9P8JGTJTQQF4,BSLGLG8P9T01,9N232RBCFR2G,9P7Z1D3N8KR7,9NDBKK9G0FHL,9P75CBJ9WT9W,9PBB4QHMSDKR,9PHFTS44F99K,9N015DFDMVK6,9NVRZZJ4NG99,9NG06CSMM97P,9PD0BJRBLRJM,9NC4QMRHCNZK,9NWZTB9JQG9S,9MVX1V7W5SW8,9N9WWM5JXCBZ,9MZNFNN3XJ3F,99P0617LN3SF9,9NL4KTK0N4CG,9ND0CG3LM22K,9NJWTJSVGVLJ,9NJDD0JGPP2Q,9N1HF804QXN4,9N94NCGM1Q2N,9P3RMG6MSCFB,9P6ZJT035WVV,9NSRJ872SGH7,9PG28RXDG9GQ,9NG07QJNK38J,9MVSRJWZBG9G,9PJPV2PC3MWR,9PN9WG83X4XF,9P3MGM8ZCS5D,9P686C1GJ91L,9P6JQDDZ2MQB,9NXQKPGMHH9G,9NR7XDNVP5SW,9MW7H0DVS9T6,9NBLGGH43KZB,BXLL06QN8HVP,9NC9TNXS9C8G,9MTTMQ6WSDP8,9NQVDQS2BC10,9N7GCF5SGCXC,9N360TZQZ0TR,9NJWFF2KHL6H,9NNFFCR5XGZ3,9NX6XGVJ0J3D,9MXPZ33Z9PWH,9PHJSGJNX37S,9PDXF172R7VJ,9MZZNL8J2MSZ,9PNNV537W2SN,9P0FQ0XCV0LB,9NV2VTVG0L31,9NN1Z8LHMFBV,9NWVC7XP3PFD,9N6F97F9WGL0,9N8WVMD7J5GQ,9N17CM38WNN8,C2X6ZCNKN2WR,9PLGBZWN65RG,9NXR6469DM2P,9NTM9G539XTT,9NWNX54ZMT1K,9NGCPXQG3NLZ,9N7GG222GTTH,9NQLVQTLPRS1,9N27NM3BT3ML,9N07T7TGP6JG,9NKK6CX54183,9NMS4SFNBGBH,9NKVX66J0ZSK,9NKCHZZTL308,9MXKWW4K9LP2,9NNBPBM2F60W,9NHFVWX1V7QJ,C37XBX7DCBZ0,9N7L81J5XW7T,9PC4C9NLP3ZD,9PJGM0T0827V,9P4GS31NHKT7,9MW4RJDRSF78,9P1N07XDL1D4,9MVF0PGV94F7,9N6Z8DQXSQWH,9P544PGZXC0P,9N6V2181GHLM,9PLZPHBNHTMF,9NSL68D814GC,9MXND4PQLK3W,9PK09BL31FK1,9PLT62LRF9V7,9NZTSFKR9M94,9PFD00CZJ35V,9PBDC0XZ8TXK,9NB7FZ2GV5N1,9NN7M263513G,9P934697Z4W4,9NMD6VV08WGF,9P9XS9D0LBPV,9PPSH9GQKLCB,9P3NT9H51RMR,9PHQJWGLTZM8,9PFX7F33KVG8,9NPC5398SCQ6,9P87731ZDLG0,9NJG36MFVR1L,9NSG9H451FK3,9PL4HXW1H502,9N42CT1J5WGW,9P1JS86M9SXH,9NBZ9JF6TFMD,9P71MB9QCF77,9NKGNMNK3K3Z,9NDV7FRVD7ML,9MZR11JRF7BX,9MT3D7Z4NWDV,9NBBCKL3LTRH,9MTV87HFMF43,9MVJ3VL1V3VP,BQQKG9H2STC0,9NLM4TTHCWSH,9MZNFF29W9ZX,9MVJ0V2JHK28,9P982VRDSV6G,9P5SFDNW6V13,9PNJXVCVWD4K,9NKX70BBCDRN,9NS0KH25D76X,9P3ZRGNQVC7D,9NKBH79N7HVW,BPQZT43FWD49,9PP09MJRH2XD,9P4KMR76PLLQ,9NBLGGH4PBBM,9NBLGGH3SHM5,9NN3HCKW5TPC,C20WW4W29FQ1,9MWGGC7JH35B,9MXWKHJ3VZZH,9NX3G3Z38CV2,9MVK5W0HMRP7,C41M2F4NWB2S,9PC288TN7R8K,9PJTHRNVH62H,9P8DL6W0JBB8,9P5739G419LD,9PGL2Z1H9M4R,9P6VZCRGXFMX,9P8CFXZH93CK,9PP5G1F0C2B6,9NP1P1WFS0LB,9NBLGGH515BD,9NBLGGH5WLR0,9NWQMVSB63N4,9N9WZT3PJ27W,9WZDNCRFHWFH,9WZDNCRFJBFJ,9NTM9HXNLSZX,9MW8RMSBB5QH,9NF6WPNS1S73,9NCLP4LV5K7Z,9P5NHF9ZP4ST,9PDRM8BFW1X1,9MW9469V91LM,9NBFGKQLMV33,BSMZH25V6V46,9PM7HXJ92D6W,9MXGJ8JZL0LK,9P2XMXXFQV5G,9NK7HNCG0R8D,9PHT4W7WBBDQ,C17GQF31D617,9NCFNFTSBM96,9NPHVDB4XFJP,9MWHMJ0SRBXV,9P9MC8B7R5FP,9P6FTM76L1S7,9MZVSHQZ666K,9NBLGGH51BMC,9P87CGF1TCCX,9N5GLFTT40SN,9NF0SNBQWN63,9NPFJTM4HBH9,9NCVD24B83VS,9NFWSNN4JWKB,9PLF9MR720SJ,9PM9ZVWT18WR,9MV6MCVLT8GR,9N8C03GW2TRB,9N14MFN0DV4K,9P5B81KVDGP1,BRX6HS1G5CDK,9PGLL77C201J,9P8X0RH2WV5J,9PB86W3JK8Z5,9PDDP6ML6XHF,9MTJ74MKQM46,9WZDNCRFHWD2,9PDV8FKWP3B4,9PH1Q5TKPQCQ,9P3W7QMHR450,9MV8J6MFJNQV,9NB6BVL3MTG4,9P5X4QVLC2XR,9NXP44L49SHJ,9PBWWQGXVMKC,9NP4BGBLLLXM,9P7VCSGBP9KL,9P8XJRLCLH2P,BTC0L0BW6LWC,9PC2BJDXR2LK,9NV1V176PTC2,9NMH293554QQ,9NDJLXD2X2DM,9NBLSN1JP7TH,9P6PQLFP9BN0,9MVVDHS95RCL,9PLWSGHFQ4PS,9NNSTP6KJTZ9,9MZN3SMXN824,9PBGCRBQKXTP,9N27DBP8GNNB,9NZ5QW71X49G,9PGSC3PW4N8Z,9NCG3X89KRLD,BQVQTL3PCH05,9NFZ65KKJ10X,9NRDVCW02JD7,9NZFZXDRZQLR,9N3K4M5K357L,9N9606CC950J,9NQJTF424KPX,9N8LVGJ6RDBP,9P8WMQ1S4TF9,9NL1GX15SQJK,9N4K8K2ZGF1L,9NKKDCVR3VW9,9NBLGGH1Z6FB,9N8CD0XZKLP4,C596FKDKMQN7,C083G6BGJ334,9PGB72NFG5JN,9P3RX0V3HW8H,9P6W2Q41BB8V,9PLZ7HZR7JGT,9N673ZL1TCS7,9N3TF03KNTBD,9NVN8NSXDK41,9P1P5Q3BNM7J,9N8QNKN5ZKTH,9N8N7NZSVTG3,9P5LZC1KB48V,9P5VMG8D4P4B,9NHDJC0NW20M,9PBC1QFBW563,9MZRSLLWKWDV,9NQ73XB1Q5ZG,9NCT87FKQ4GM,9NBR2VXT87SJ,9P34LH5ZWBVG,9P1Z43KRNQD4,9P2JXK37PFLZ,9MTXSN4FTFG3,9NWNLS28ZG37,9N1JLJR48FBG,9P2J7WHV0K4N,9PDRJWHBSK88,9NRBH9HS807L,9NBLGGH1Z6FQ,9NNZJ389GSW2,9N1WT4X26SHW,9MZCCHNRK9R1,9NS84HCWZD8B,9NVBKDF85W8T,9P47S7NJGWZL,9PL36RW9ZTPW,9P3PL76N0KWZ,9MZ4V4RG0W81,9N9RMHTJX41P,9P2N57MC619K,9P9JZLNFQ9PT,9P7GBPGT90L3,9PFT1PR924WB,9P1JHJ127HR4,9N4PGNQQ7ZFK,9ND3N9W1VRV1,9N2Q2VL8FGBK,9PN7NK4D9VCH,9NW4Z3HPJVKW,9MZQR8317S3B,C2NC88M7NWZ1,9PP8Q82H79LC,9NP6WL1XQDBW,9N1KQPLTR7S5,9NVD5DB5T3HD,9N23WV1HGLTQ,9PM85QK6C13H,9NG5L58FD3X5,9MTSBWPWPQVQ,9MWR1NC6VQ6L,9NT4X7P8B9NB,9NXQPGMR917R,BX3S1Q5DVHRD,9NDCJXL11096,9NNLBL0T2Z43,9PLMGFWCFZ9G,9NVR4ZQKNBSB,9P75CZFXMS7N,9P1ZVVW7NRR3,9N4V8K7Z5RRG,9MZGGWHPKQ4C,9NS3673HVH41,9NF83PRZK6K3,9NLHWTCWLKGX,9PPBVK3TK83M,9P9S593SLMV7,9NGH2MTP0T44,C27QL5JBKQ8M,9PN3VDFTB5HZ,C2B4T86TXLRS,9MVN4ND41DD3,9MT8HTJC4GSB,9PFXKRLVWJ0B,9PP7XSG5LDH1,9P2J5D12GJL5,9P03JGQ4S1GC,9MX8R81JW1B5,9NT0NT8JQMQN,9NJ4R763M7TH,9MSP68027100,9P008L2LS87F,9NQTJK43NCQJ,9NFKN56ZBMR0,9MWD2Z8L1FBQ,9NTX07HR22TG,9NW7S04QK7XV,9NN8PGK5JDN5,9NBTL551XL5N,9NQV7C0G1040,9MT6TG9CXR2H,9NC0071DJ6XC,9PJDSPZKQD6W,9NGGB0GZPB9D,9PC4RWP34M2D,9NFM39PSFXJD,9NSFGM8J6MBJ,9PCQRLT7C2BH,9NJ0PDX8NDDL,9N2VDJVMFKQ9,9NLRT31Z4RWM,9N6781PMXC02,9N0T8V0R7MBC,9P55TJKCL1BC,9PCW1SMN9RGG,9N08S5VPC4SX,9PKLF2W8J0TF,9N046HWGQ4J2,9PJ517SDHQPF,9NH5HN11FG4M,9P31WJ3N46KB,9N7KBCL0NC5H,9PD5BM2Z8C4L,9P9V698V6MVR,9PFLW6WZVJC7,C521HDXRTS7F,9NLT5XR52ZS7,9NGH1FK0RJGL,9NBLGGH5342P,9P8JGTJTQQF4,BSLGLG8P9T01,9N232RBCFR2G,9P7Z1D3N8KR7,9NDBKK9G0FHL,9P75CBJ9WT9W,9PBB4QHMSDKR,9PHFTS44F99K,9N015DFDMVK6,9NVRZZJ4NG99,9NG06CSMM97P,9PD0BJRBLRJM,9NC4QMRHCNZK,9NWZTB9JQG9S,9MVX1V7W5SW8,9N9WWM5JXCBZ,9MZNFNN3XJ3F,9P40SC5DQ9K0,9NXCSWCQTNFG,9PMM5T8C0CN6,9P47H1RVDWWW,9PLSCHRN5715,9PJ06TZX4NMHP40SC5DQ9K0,9NXCSWCQTNFG,9PMM5T8C0CN6,9P47H1RVDWWW,9PLSCHRN5715,9PJ06TZX4NMH&market=US&languages=en-us&MS-CV=DGU1mcuYo0WMMp+F.1"
  );
  const responseJSON = await response.json();

  const xboxGames = responseJSON.Products.map((product: IXboxProduct) => {
    const { ProductTitle, ShortDescription, Images } =
      product.LocalizedProperties[0];
    const { Category } = product.Properties;
    const correctImage = Images.find(
      (image: IXboxProductImage) =>
        image.ImagePurpose === "TitledHeroArt" ||
        image.ImagePurpose === "SuperHeroArt" ||
        image.ImagePurpose === "BoxArt"
    );

    return {
      id: correctImage?.FileId,
      productName: ProductTitle,
      description: ShortDescription,
      category: Category,
      image: {
        URL: `http:${correctImage?.Uri}`,
      },
      platform: "xbox",
    };
  });

  const steamKeyAPI = "CD931AB5F0BA950471A81DEFF485FA5C";
  const usernameSteam = "wolfremgames";

  const steamAccountID = await fetch(
    `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamKeyAPI}&vanityurl=${usernameSteam}`
  );
  const steamAccountIDJSON = await steamAccountID.json();

  const responseSteam = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKeyAPI}&steamid=${steamAccountIDJSON.response.steamid}&include_appinfo=true&format=json`
  );
  const responseSteamJSON = await responseSteam.json();

  const steamGames = responseSteamJSON.response.games.map(
    ({ appid, name }: ISteamProduct) => {
      return {
        id: appid,
        productName: name,
        description: "",
        category: "",
        image: {
          URL: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
        },
        platform: "steam",
      };
    }
  );

  return {
    props: {
      games: [...steamGames, ...xboxGames],
    },
  };
}
