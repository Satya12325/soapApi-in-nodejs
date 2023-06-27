const express =  require('express'); 
const soap = require("soap");
const axios = require('axios');
const bodyParser = require('body-parser');

const { parseStringPromise } = require('xml2js');
let xmlParser = require('xml2json');

const port = 8000;
let app = express();

const routers = require("./Routes/router")

app.use(bodyParser.json());

app.post('/data', async function(req, res){
    console.log(req.body);
    
    const num = req.body.number;
    const url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl";
    
    // const url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl";
  const xmlPayload = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
          <ubiNum>${num}</ubiNum>
        </NumberToWords>
      </soap:Body>
    </soap:Envelope>`;

  try {
    const response = await axios.post(url, xmlPayload, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    // Handle the SOAP response
    // Convert SOAP response from XML to JSON
    const jsonData = await parseStringPromise(response.data, {
        explicitArray: false,
        explicitRoot: false,
      });
  
      // Handle the SOAP response in JSON format
    //   console.log(jsonData);
     let reslt =  xmlParser.toJson(response.data)
     console.log(reslt);
      res.send(response.data);
}
     catch (err) {
        console.error(err);
    }
})

app.use("/admin",routers)
app.listen(port,()=>{
    console.log(`Listining at port: ${port}`);
})