import {ChartBar, Chat, Hourglass, Notification, UserAvatar, AddFilled
} from "@carbon/icons-react"
import styles from './TabHeader.module.scss'

const items = [
    {name: "", icon: <ChartBar size={20}/>},
    {name: "", icon: <Chat size={20} />},
    {name: "", icon: <Hourglass size={20} />},
    {name: "", icon: <Notification size={20} />},
    {name: "", icon: <UserAvatar size={20} />},
    {name: "", icon: <div className={styles.plusIcon}>+</div>}
]

const TabHeader: React.FC<{}> = ({}) => {
    return <div className={styles.wrapper}>{items.map((item, i) => 
        <div className={styles.item}>
            {item.icon}
        </div>)}</div>
}

export default TabHeader