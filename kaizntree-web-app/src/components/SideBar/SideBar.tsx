import { Dispatch, SetStateAction, useState } from "react"
import styles from "./SideBar.module.scss"
import {Home, SoftwareResourceCluster, Store, Tools, 
    Money, ShoppingCart, Arrival, Events,
    Fragments, Lifesaver, Logout
} from "@carbon/icons-react"
import { signOut } from "next-auth/react"

const navTabs = [
    {name: "Home", icon: <Home size={20}/>},
    {name: "Items", icon: <SoftwareResourceCluster size={20} />},
    {name: "Stock", icon: <Store size={20} />},
    {name: "Build", icon:<Tools size={20} />},
    {name: "Sales Orders", icon: <Money size={20} />},
    {name: "Purchase Orders", icon: <ShoppingCart size={20} />},
    {name: "Suppliers", icon: <Arrival size={20} />},
    {name: "Customers", icon: <Events size={20} />},
]

const basicFunc = [
    {name: "Integrations", icon: <Fragments size={20}/>},
    {name: "Help", icon: <Lifesaver size={20}/>},
    {name: "Logout", icon: <Logout size={20}/>},
]

const SideBar: React.FC<{currentTab: number, setCurrentTab: Dispatch<SetStateAction<number>>}> = ({currentTab, setCurrentTab}) => {


    return <div className={styles.wrapper}>
       <div className={styles.functionalities}> 
            <img src="/logo_name.avif" className={styles.logo}/>
            <div className={styles.navTabsWrapper}>
                {navTabs.map((tab, i) => 
                <div 
                    className={`${styles.navTab} ${currentTab===i ? styles.selected : null}`}
                    onClick={()=>setCurrentTab(i)}
                >
                    {tab.icon}
                    <p>{tab.name}</p>
                </div>)}
            </div>
       </div>
       <div className={styles.basic}>
            {basicFunc.map((func, i) => 
            <div className={styles.funcWrap} onClick={()=>{
               if (func.name.toLowerCase() === "logout") signOut({ callbackUrl: "/signin" })
            }}>
                {func.icon}
                <p>{func.name}</p>
            </div>
            )}
       </div>
    </div>
}

export default SideBar