import axios from 'axios'
import { useState,useEffect } from 'react';
import styles from "../styles/Theme.module.css";
import { useAddress } from '@thirdweb-dev/react';

export default function Admin(){
    const address= useAddress()
    const [data, setData] = useState([])


    const readGates = () => {
        (async()=> {
          try { 
             const data = await axios.get('/api/read_url');
            //  console.log('data', )
            
             setData(data?.data?.data)
            
              // Send form data to the API endpoint
             
              } catch (err) {
              console.log(err)
              }
        
         })()
       }
       useEffect(()=> {
        readGates()
             
              
        }, [])


if(address ==="0xc77e556cd96235A7B72d46EAAf13405d698CB2C0"){

        return(

   

            <div>
        <>
        
        {data.length && data.map(item =>{
        
        return<>
        <form style={{width:500, marginTop:100 }} onSubmit={(e) => handleSubmit(e, item._id)} >
        
        <h1 style={{fontSize:15}}>Name: {item.name}</h1>
       
        <h1 style={{fontSize:15}}>Collection Address: {item.collectionAddress}</h1>

        <h1 style={{fontSize:15, minWidth:200}}>URL: {item.url}</h1>

        <button className={styles.mainButton} style={{width:250, marginTop:50}}
              type="submit" >Remove this TokenGate</button>
        {/* <button className={styles.mainButton} onClick={createListing}>List</button> */}
        
        
        </form>
        </>
        
        })}
        
        
        
        
        
        </>
        
        
        
            </div>
  
        )
    }else{
        return(


            <div style={{marginTop:100}}>
            You are not the owner
          </div>
        )


    }
}