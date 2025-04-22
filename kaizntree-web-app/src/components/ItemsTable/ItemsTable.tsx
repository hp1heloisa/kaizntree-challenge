import { useState } from "react"
import styles from "./ItemsTable.module.scss"
import {SearchLocateMirror, OpenPanelRight, ArrowsVertical} from "@carbon/icons-react"
import { Tag } from "@carbon/react"

const ItemsTable: React.FC<{categories: {name: string, id: number}[],
items: {[key:string]: string | number}[]}> = ({categories, items}) => {
    const [catFilter, setCatFilter] = useState(-1)
    const [pagIndex, setPagIndex] = useState(0)

    return <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
            <div className={styles.catWrapper}>
                <div className={`${styles.catItem} ${catFilter===-1 ? styles.selectedCat : ''}`}
                onClick={()=>setCatFilter(-1)}
                >All</div>
                {categories.map((cat, i) => <div key={`category_${cat.id}`} 
                className={`${styles.catItem} ${catFilter===i ? styles.selectedCat : ''}`}
                onClick={()=>setCatFilter(i)}
                >{cat.name}</div>)}
            </div>
            <div className={styles.filterOptions}>
            <Tag className={styles.filterItem} renderIcon={SearchLocateMirror} size="md" type="outline"/>
            <Tag className={styles.filterItem} renderIcon={OpenPanelRight} size="md" type="outline"/>
            <Tag className={styles.filterItem} renderIcon={ArrowsVertical} size="md" type="outline"/>
            </div>
        </div>
        <div className={styles.itemsTable}>
            <div className={styles.itemsHeader}>
                <span>SKU</span>
                <span>Name</span>
                <span>Category</span>
                <span>Cost</span>
                <span>Available Stock</span>
            </div>
            {items.filter((item)=>  (catFilter===-1 ? item : item.category === categories[catFilter].id ? item : '')).map((item)=><div className={styles.itemWrap}>
                <span>{item.sku}</span>
                <span>{item.name}</span>
                <span>{categories.filter(cat=>cat.id===item.category)[0].name}</span>
                <span>${item.cost}/{item.unit}</span>
                <span>{item.available_stock}</span>
            </div>).slice(pagIndex*10, (pagIndex+1)*10)}
            {items.filter((item)=>  (catFilter===-1 ? item : item.category === categories[catFilter].id ? item : '')).length === 0 && 
            <div className={styles.notFound}>No items found... </div>}
        </div>
        <div className={styles.tableFooter}>
            <div className={styles.paginationHandle}>
            <div className={`${ pagIndex === 0  ? styles.disabled : ''}`} onClick={()=>{
                if (pagIndex > 0) setPagIndex(pagIndex-1)}}>{`<`}</div>
                <div 
                className={`${ items.filter((item)=>  (catFilter===-1 ? item : item.category === categories[catFilter].id ? item : ''))
                    .slice((pagIndex+1)*10, (pagIndex+2)*10).length === 0  ? styles.disabled : ''}`} 
                onClick={()=>{
                    if (items.filter((item)=>  (catFilter===-1 ? item : item.category === categories[catFilter].id ? item : ''))
                        .slice((pagIndex+1)*10, (pagIndex+2)*10).length > 0)
                        setPagIndex(pagIndex+1)
                    }}>{`>`}</div>
            </div>
        </div>
    </div>
}

export default ItemsTable