const cheerio = require("cheerio");



var http = require("http");
let fs = require("fs");

//create a server object:
http
  .createServer(async function(req, res) {
    let xml_data = fs.readFileSync(__dirname + "/../data.xml", "utf8");
    
    // const $ = cheerio.load(xml_data); 
    //  const proc = ($('area[type="location"]').next().next().next().next().text());
     
      res.write(xml_data);

    
    
    res.end();
  })
  .listen(8080); //the server object listens on port 8080

  const options = {
      method: 'GET',
      port: 8080
  }

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", d => {
            const $ = cheerio.load(d); 
             const proc = ($('area[type="location"]').next().next().next().next().text());

        console.log(proc);
      process.stdout.write($('area[type="location"]').next().next().next().next().text());
    });
  });

  req.on("error", error => {
    console.error("!!!!! " + error);
  });

  req.end();