import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useSigner,useSDK } from "@thirdweb-dev/react";
import { useContractRead } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import styles from "../styles/Theme.module.css";

export default function TokenGate() {
  const signer=useSigner()
  const address = useAddress();
  const abi = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
  ];
  let sdk = new ThirdwebSDK("mumbai")
  const router = useRouter();
  const {collectionAddress}=router.query
  const { contract } = useContract("0xa1c612884012D1Ed490Def0459e02cD2b6e0d708",abi);

  const [data, setData] = useState([]);
  const [walletaddress,setWalletAddress]=useState('')
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [url, seturl] = useState('');
  const [token,setTokens]=useState('')
  const [ApprovedUrl,setApprovedUrl]=useState('')

if(address){
  sdk = ThirdwebSDK.fromSigner(signer);
  console.log(address)
}

  const readGates = async () => {
    try {
      const response = await axios.get("/api/read_collection");
      setData(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readGates();
  }, []);

  useEffect(() => {
    if (collectionAddress) {
      console.log(collectionAddress);
      data.forEach((element) => {
        const temp = element.collectionAddress;
        
        if (temp === collectionAddress) {
          console.log("it worked");
         
          setName(element.name)
          seturl(element.url)
        }
        // else{

        //   seturl("not associated with boojabaunga")
        // }
        
        
      });
    }
  }, [collectionAddress, data]);

  async function showUrl() {  
  console.log(address)    
   
  try{
    setWalletAddress(address)
    const marketplacecontract = await sdk.getContract(
      collectionAddress // The address of your smart contract
     
    );
    const tx = await marketplacecontract.call("balanceOf",
    
    [address]);
    if((parseInt(tx))>=1){


      console.log("here is your url")
      setTokens(parseInt(tx))
      setApprovedUrl(url)
  
    }
    else{
      console.log("you dont own any")
      setTokens(0)
      setText("you dont own any")
    

    }
    
    
    }
    catch(err){
    console.log(err)
    }
 
  }
 
  useEffect(() => {
    if (address) {
      showUrl();
    }
  }, [address]);



  return(
    <div style={{marginTop:100, marginLeft:50}}>
      <label>You Own: </label>
      <input
          name="text"
          type="text"
          value={token}
          readOnly
          className={styles.textInput}
          placeholder="Progress"
          style={{minWidth:55}}
        />
        <br/>
        <label>URL: </label>
         <input
          name="text"
          type="text"
          value={ApprovedUrl}
          readOnly
          className={styles.textInput}
          placeholder="URL Loading"
          style={{minWidth:320}}
        />


  
</div>
  )
}