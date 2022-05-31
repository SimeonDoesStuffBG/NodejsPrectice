const dns = require('dns/promises');

async function main(){
try{const addresses = await dns.resolve4('yahoo.com');
console.log(`addresses: ${JSON.stringify(addresses)}`)

addresses.forEach(async (addr) => {
    dns.reverse(addr, (err,hostnames)=>{
    console.log(`addresses [${addr}] => ${JSON.stringify(hostnames)}`)
     } );
        })
    });
}
}