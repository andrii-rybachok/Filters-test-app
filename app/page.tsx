import Image from "next/image";
import styles from "./page.module.css";
import WorkPlaces from "./workPlace/page";
async function getWorkPlaces() {
  const res = await fetch("http://127.0.0.1:7196/api/workPlace/workInfo", {
     method: "GET",
  }).catch((error) => {
     throw error;
  });
  return res.json();
}
export default async function Home() {
  const workPlaces=await getWorkPlaces();
   return <main className={styles.main}>
    <WorkPlaces workPlaces={workPlaces}/>
   </main>;
}
