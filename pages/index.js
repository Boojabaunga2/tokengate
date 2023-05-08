import { useState } from "react";
import styles from "../styles/Theme.module.css";
import axios from 'axios'
import { useAddress } from "@thirdweb-dev/react";
const FormExample = () => {
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState('');
    const address= useAddress()
    
    
    const handleChange = (event) => {
        console.log(event.target.name, event.target.value)


        setFormData({

            ...formData,
            [event.target.name]: event.target.value

        });
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        createUrl();


    }
    async function createUrl() {
      const tokenGatedata={

                name:formData.name,
                collectionAddress: formData.address,
                url:formData.url

      }
      try {
        // Send form data to the API endpoint
        await axios.post('/api/post_url', tokenGatedata);
        setStatus('Added to tokenGate');
        } catch (err) {
        console.log(err)
        setStatus('error code', err);
        }


    }




if(address==='0xc77e556cd96235A7B72d46EAAf13405d698CB2C0'){

    return (
      <form onSubmit={handleSubmit} >
      <div className={styles.container}>
          <label>
      <input type="text" name="address" placeholder="Collection Address" value={formData.address}
        required
       className={styles.textInput}             
       style={{ minWidth: "320px"}}
      onChange={handleChange} />
    </label>
    <label>
      <input type="text" name="name" placeholder="Collection Name" value={formData.name}
        required
       className={styles.textInput}             
       style={{ minWidth: "320px"}}
      onChange={handleChange} />
    </label>
    <label>
      <input type="text" name="url" placeholder="Collection Url" value={formData.url}
        required
       className={styles.textInput}             
       style={{ minWidth: "320px"}}
      onChange={handleChange} />
    </label>
    <br/>
    <button className={styles.mainButton}
      type="submit"
      
      >Submit</button>

        <input
          name="status"
          type="text"
          value={status}
          readOnly
          className={styles.textInput}
          placeholder="Progress"
          style={{minWidth:320}}
        />
      </div>
      </form>

  
    )}
    else{
      return(


        <div style={{marginTop:100}}>
        You are not the owner
      </div>
    )
9
    }
}
export default FormExample;