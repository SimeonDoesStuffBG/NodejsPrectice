const dns = require('dns');

dns.resolve4('yahoo.com', (err, addresses)=>{
    if(err) throw err;
    console.log(`addresses: ${JSON.stringify(addresses)}`)

    addresses.forEach(addr => {
        dns.reverse(addr, (err,hostnames)=>{
            if(err) throw err;
            console.log(`addresses [${addr}] => ${JSON.stringify(hostnames)}`)
        } );
    })
});