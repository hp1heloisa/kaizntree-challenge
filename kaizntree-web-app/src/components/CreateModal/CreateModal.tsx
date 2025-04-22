import { Button, ComposedModal, Dropdown, ModalBody, ModalFooter, ModalHeader, NumberInput, TextInput } from "@carbon/react";
import { Dispatch, SetStateAction, useState } from "react";
import styles from './CreateModal.module.scss'

//TODO: add a unit option for cost
const CreateModal: React.FC<{
    modal: {open: boolean, kind: string}, 
    setModal: Dispatch<SetStateAction<{open: boolean, kind: string}>>,
    categories: {[key:string]: string}[]
}> = ({modal, setModal, categories}) => {
    const [name, setName] = useState('')
    const [availableStock, setAvailableStock] = useState<number | undefined>(undefined)
    const [cost, setCost] = useState<number | undefined>(undefined)
    const [category, setCategory] = useState<{[key:string]: string} | undefined>(undefined)
     

    return <ComposedModal open={modal.open} onClose={() => {
        setModal({open:false, kind: ''});
      }} >
            <ModalHeader title={`Add a new ${modal.kind}`} />
            <ModalBody className={styles.modalBody}>
              <TextInput data-modal-primary-focus id="item-name" labelText="Name" value={name} onChange={e => setName(e.target.value)}  />
              {modal.kind === 'item' && <> 
                <NumberInput id="available-stock" label="Available Stock" value={availableStock} onChange={(event, { value, direction }) => setAvailableStock(value as number)} />
                <NumberInput id="cost" label="Cost" value={cost} onChange={(event, { value, direction }) => setCost(value as number)}/>
                <Dropdown id="categories-dropdown" label="" items={categories} itemToString={(item) => item?.name ?? ''} titleText="Category" 
                    
                    />
            </>}
             </ModalBody>
            <ModalFooter>
                <Button kind="secondary">Add</Button>
            </ModalFooter>
          </ComposedModal>
}

export default CreateModal