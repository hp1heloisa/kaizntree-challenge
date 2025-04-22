import { useEffect, useState } from "react"
import styles from "./Items.module.scss"
import {Help} from "@carbon/icons-react"
import { getCategories, getItems } from "@/utils/functions"
import CreateModal from "../CreateModal/CreateModal"
import ItemsTable from "../ItemsTable/ItemsTable"

//TODO: loading behavior
const Items: React.FC<{token: string | null}> = ({token}) => {
    const [categories, setCategories] = useState<{name: string, id: number}[]>([])
    const [items, setItems] = useState<{[key:string]: string}[]>([])
    const [modal, setModal]= useState({open: false, kind: ''})

    console.log(items)
    console.log(categories)

    useEffect(()=>{
        if (token){ 
            getCategories(token)
                .then(res => setCategories(res))
                .catch(error => console.log(error))
            getItems(token)
                .then(res => setItems(res))
                .catch(error => console.log(error))
            }
    }, [token, modal])

    return <div className={styles.wrapper}>
        <div className={styles.headerWrap}>
            <h2 className={styles.title}>Item Dashboard</h2>
            <Help size={20}/>
        </div>
        <div className={styles.generalInfo}>
            <div>
                <p className={styles.titleGeneral}>Total Items</p>
                <p className={styles.quantGeneral}>{items.length}</p>
            </div>
            <div>
                <p className={styles.titleGeneral}>Total Categories</p>
                <div className={styles.quantWrapper}>
                    <p className={styles.quantGeneral}>{categories.length}</p>
                    <div>View</div>
                </div>
            </div>
        </div>
        <div className={styles.creationWrap}>
            <div onClick={()=> setModal({open: true, kind: 'item'})}>New Item</div>
            <div onClick={()=> setModal({open: true, kind: 'category'})}>New Category</div>
        </div>
        <ItemsTable categories={categories} items={items}/>
        {modal.open && <CreateModal token={token ?? ''} categories={categories} items={items.map(item => item.name)} modal={modal} setModal={setModal}/>}
    </div>
}

export default Items