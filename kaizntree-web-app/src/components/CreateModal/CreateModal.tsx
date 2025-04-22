import { Button, ComposedModal, Dropdown, FormLabel, ModalBody, ModalFooter, ModalHeader, NumberInput, TextInput } from "@carbon/react";
import { Dispatch, SetStateAction, useState } from "react";
import styles from './CreateModal.module.scss'
import { createCategory, createItem } from "@/utils/functions";
import {WarningFilled} from "@carbon/icons-react"

const CreateModal: React.FC<{
    modal: {open: boolean, kind: string}, 
    setModal: Dispatch<SetStateAction<{open: boolean, kind: string}>>,
    categories: {name: string, id: number}[],
    items: string[], 
    token: string
}> = ({modal, setModal, categories, items, token}) => {
    const [name, setName] = useState('')
    const [sku, setSku] = useState('')
    const [unit, setUnit] = useState('')
    const [availableStock, setAvailableStock] = useState<number>(0)
    const [cost, setCost] = useState<number>(0)
    const [category, setCategory] = useState<{name: string, id: number}| null>(null)
    const [isValid, setIsValid] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const validateFields = () => {
        setIsValid(true)
        setErrorMessage('')
        if (!name || (modal.kind==='item' && ( category===undefined || !unit)))
            return setIsValid(false)
        if (modal.kind==='item' && items.includes(name)){
            setIsValid(false)
            setErrorMessage('This item already exist')
        }
        if (modal.kind==='category' && categories.map(category => category.name).includes(name)){
            setIsValid(false)
            setErrorMessage('This category already exist')
        }

    }
    
    const creationHandle = () => {
        validateFields()
        if (modal.kind === 'item') {
            const data:{name: string,available_stock: number,cost: number,unit:string, category: number, sku?:string} = {
                name,
                available_stock: availableStock,
                cost,
                unit,
                category: category?.id ?? 0
              }
              if (sku) data.sku = sku
              createItem(token,data)
                .then(res =>  setModal({open:false, kind: ''}))
                .catch(error => setErrorMessage(error.error))
        } else {
              createCategory(token,{name})
                .then(res =>  setModal({open:false, kind: ''}))
                .catch(error => setErrorMessage(error.error))
        }
    }     

    return <ComposedModal open={modal.open} onClose={() => {
        setModal({open:false, kind: ''});
      }} >
            <ModalHeader title={`Add a new ${modal.kind}`} />
            <ModalBody className={styles.modalBody}>
              <TextInput data-modal-primary-focus id="item-name" 
              labelText="Name" value={name} onChange={e => setName(e.target.value)} 
              invalid={!isValid && (!name || !errorMessage)}
              invalidText={errorMessage}
              />
              {modal.kind === 'item' && <> 
                <TextInput id="sku-name" labelText="SKU" value={sku} onChange={e => setSku(e.target.value)} />
                <NumberInput id="available-stock" label="Available Stock" value={availableStock} onChange={(event, { value, direction }) => setAvailableStock(value as number)} />
                <div className={styles.costWrap}>
                    <NumberInput id="cost" label="Cost" value={cost} onChange={(event, { value, direction }) => setCost(value as number)}/>
                    <TextInput invalid={!isValid && (!unit || !errorMessage)} invalidText={errorMessage} 
                        id="unit-name" labelText="Measurement Unit" value={unit} onChange={e => setUnit(e.target.value)} />
                </div>
                <Dropdown id="categories-dropdown" label="" items={categories} itemToString={(item) => item?.name ?? ''} titleText="Category" 
                    onChange={(data)=>setCategory(data.selectedItem)}
                    selectedItem={category}
                    />
            </>}
            {errorMessage && <FormLabel className={styles.errorMessage}><WarningFilled /> {errorMessage} </FormLabel>}
             </ModalBody>
            <ModalFooter>
                <Button kind="secondary" 
                disabled={!name || (modal.kind==='item' && (!unit || availableStock===undefined || cost===undefined || category===null))}
                onClick={creationHandle}
                >Add</Button>
            </ModalFooter>
          </ComposedModal>
}

export default CreateModal