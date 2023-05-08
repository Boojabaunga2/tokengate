const Form = require ('../models/models_tokengate')
export default async (req, res) => {
  try {
    // Save form data to the database
    const read = await Form.find({});
    console.log(read,"read")
    read.forEach(element => {
      console.log(element)
      console.log(element.collectionAddress,"asdfmkl;sadfkl;")
    });


   
    res.status(200).json({ message: 'Form data saved to the database', data: read })
    ;
  } catch (err) {
    console.log(err)
   
  }
};
