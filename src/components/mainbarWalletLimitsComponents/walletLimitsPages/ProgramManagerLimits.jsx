import React, { useState } from 'react'
import './ProgramManagerLimits.css'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios';
const ProgramManagerLimits = () => {
    const {pmLimits,setPmLimits} = useOutletContext();

    const [editingField,setEditingField] = useState({id:null,field:null})

    const [inputValue,setInputValue] = useState('')

    const handleEdit = (item,field) => {
        setEditingField({id:item.id,field})
        setInputValue(item[field])
    }

    const handleSave = async () => {
        const updatedItem = { ...pmLimits.find(item => item.id === editingField.id) };
        updatedItem[editingField.field] = inputValue;
      
        try {
          await axios.put(`http://localhost:3002/ProgramManagerLimits/${editingField.id}`, updatedItem);
      
          // Update UI locally without reload
          const updatedList = pmLimits.map(item =>
            item.id === updatedItem.id ? updatedItem : item
          );
          setPmLimits(updatedList);
          setEditingField({ id: null, field: null });
        } catch (error) {
          console.error("Failed to save data:", error);
        }
      };
      
  return (
    <div className='programmanagerlimits'>
        {pmLimits.map((item) =>{
            return(
                <>
                    <div className="cards">
                        <div className="header">
                            <div className="image">
                            <div className="img">
                                <img src="/assets/main/Wallet.png" alt="" />
                            </div>
                            </div>
                            <div className="text">
                                <h1>{item.title}</h1>
                            </div>
                        </div>
                        <div className="body">
                            <div className="innercard">
                                <div className="icons">
                                    <div className="uppericon">
                                        <img src="/assets/main/Upperlimits.png" alt="" />
                                    </div>
                                    <div className="sideicon">
                                        <img src="/assets/main/icon.png" alt="" />
                                    </div>
                                </div>
                                <div className="values">
                                    <div className='textfield'><h1>Upper Limits</h1></div>
                                    <div className='valuefield'>
                                        {editingField.id === item.id && editingField.field === 'UpperLimits' ? (   
                                            <>
                                                <div style={{display:'flex',flexDirection:"column",gap:'3px'}}>
                                                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{height:'35px',width:'120px',border:'none'}}/>
                                                    <button style={{height:'30px',width:'50px'}} onClick={handleSave}>save</button>
                                                </div>
    
                                            </>):(
                                            <>
                                                <h1>{item.UpperLimits}</h1>
                                                <img src="/assets/main/editbar.png" alt=""  onClick={() => {handleEdit(item,'UpperLimits')}}/>
                                            </>)}
                                    </div>
                                </div>
                            </div>
                            <div className="innercard">
                                <div className="icons">
                                    <div className="uppericon">
                                        <img src="/assets/main/Upperlimits.png" alt="" />
                                    </div>
                                    <div className="sideicon">
                                        <img src="/assets/main/icon.png" alt="" />
                                    </div>
                                </div>
                                <div className="values">
                                    <div className='textfield'><h1>Lower Limits</h1></div>
                                    <div className='valuefield'>
                                        {editingField.id === item.id && editingField.field === 'LowerLimits' ? (   
                                            <>
                                                <div style={{display:'flex',flexDirection:"column",gap:'3px'}}>
                                                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{height:'35px',width:'120px',border:'none'}}/>
                                                    <button style={{height:'30px',width:'50px'}} onClick={handleSave}>save</button>
                                                </div>
    
                                            </>):(
                                            <>
                                                <h1>{item.LowerLimits}</h1>
                                                <img src="/assets/main/editbar.png" alt=""  onClick={() => {handleEdit(item,'LowerLimits')}}/>
                                            </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        })}
    </div>
  )
}

export default ProgramManagerLimits

