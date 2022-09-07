import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.sass";

type IPlatforms = {
  handleClick: () => void;
  bottomPage: any;
};
const Soon = ({ handleClick, bottomPage }: IPlatforms) => {
  return (
    <>
      <div
        ref={bottomPage}
        className="w-[60%] h-fit flex justify-center mx-auto m-4 flex-col items-center to rounded-lg"
      >
        <h1 className="font-bebas text-[4rem] text-text text-center m-4">COMING SOON</h1>
        <div className="gap-8 flex justify-center py-4 flex-wrap px-4">
        <Image 
            src="/epic.png"
            alt="Epic Games Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
            <Image 
            src="/playstation.jpg"
            alt="Epic Games Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
            <Image 
            src="/origin.jpg"
            alt="Origin Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
            <Image 
            src="/riot.jpg"
            alt="Epic Games Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
            <Image 
            src="/uplay.png"
            alt="Epic Games Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
            <Image 
            src="/riot.jpg"
            alt="Epic Games Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
            <Image 
            src="/gog.jpg"
            alt="GOG Galaxy Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
            <Image 
            src="/battle.jpg"
            alt="GOG Galaxy Logo"
            width={400}
            height={200}
            className={styles.images}
            onClick={handleClick}
            priority />
        </div>
      </div>
    </>
  );
};

export default Soon;
