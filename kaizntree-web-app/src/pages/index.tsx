
import Items from "@/components/Items/Items";
import SideBar from "@/components/SideBar/SideBar";
import TabHeader from "@/components/TabHeader/TabHeader";
import styles from "@/styles/index.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(1)
  const [token, setToken] = useState<string | null>(null)

  const tabsComponents: {[key: number]: any} = {
    1: <Items token={token}/>
  }

  console.log(status)

  useEffect(()=>{
    if (status === "unauthenticated") {
      router.push('/signin')
    }

    if (session && session.token) setToken(session.token)

  }, [status, router])

  if (status === 'loading') {
    return <p>Loading...</p>
  } 

  if (!session) return null; 

  return (
    <div className={styles.contentWrapper}>
      <SideBar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <div className={styles.tabWrapper}>
        <TabHeader />
        {tabsComponents[currentTab] ?? 'Maintenance...'}
      </div>
    </div>
  )
}
