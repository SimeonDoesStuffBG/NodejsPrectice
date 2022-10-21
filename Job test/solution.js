const express = require('express');
const sql = require('mssql');
const fs = require('fs');

const app = express();

const SQLconfig = {
    user: 'sa',
    password: 'Password',
    server:'DESKTOP-K4PHPMN\\MSSQLSERVER01',
    database:'D:\\PRJ\\TT\\API\\TT.MVC\\APP_DATA\\TT.MDF',
    options:{
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
};

const getKids = (property, parents, properties)=>{
    
    return { [property.Name] : parents.filter(elem=>elem.ParentId===property.Id).map(elem=>{
                
            if(parents.filter(part=>part.ParentId===elem.Id).length>0){
                return getKids(elem,parents,properties);
            }else{
                return properties.filter(prop=>elem.Id===prop.PropertyId)[0].Value;
            }
        })
    };
    
}

app.get('/', (req,res)=>{
    sql.connect(SQLconfig, err=>{
        if (err) {
            console.log(err);
            return;
        }

        let request = new sql.Request();

        request.query('select Name from Brand', (err, recordset)=>{
            let brands = recordset.recordset;
            let brandsStr = "";
            brands.forEach(brand=>brandsStr+=`<a href http://localhost:5000/${brand.Name}>${brand.Name}</a><br/>`)
            res.send(brandsStr);
        });
    });
});

app.get('/:brandName', (req,res)=>{
    let brandName = req.params.brandName;

    sql.connect(SQLconfig, (err)=>{
        if (err) {
            console.log(err);
            return;
        }
    

        let request = new sql.Request();
        /*let JSONselector = `Brand.Name as \'Brand\', Products.Name as \'Product\', Products.[Key] as \'Code\'
        from Brand
        left join Products
        on Products.BrandId=Brand.Id
        for JSON auto;`;
        
        console.log(JSONselector);
        request.query(JSONselector, (err, recordset)=>{
            if(err){
                console.log(err);
            }
            res.send(recordset);
            console.log('done');
        });*/

        let productSelector = `select  Products.Id, Brand.Name as \'Brand\', Products.Name as \'Product\', Products.[Key] as \'Code\' 
        from Brand 
        left join Products 
        on BrandId=Brand.Id 
        where Brand.Name=\'${brandName}\';`;

        request.query(productSelector,(err, recordset)=>{
            if(err) {
                console.log(err);
                return;
            }
            let products = recordset.recordset;
            //console.log(products);
            products.forEach(prod=>{
                //console.log(prod);
                //console.log("delim");
                let productPropertySelector = `select ProductProperties.PropertyId, Properties.Name, ProductProperties.Value 
                from ProductProperties, Properties 
                where ProductProperties.ProductId = ${prod.Id} and Properties.Id = ProductProperties.PropertyId`;

                request.query(productPropertySelector, (err, recordset)=>{
                    if(err){
                        console.err;
                        return;
                    }
                    
                    let properties = recordset.recordset;
                    
                    let propertyParentSearcher = `with Parents as
                    (
                    select *
                    from Properties
                    where Id in (${properties.map(prop=>prop.PropertyId)})
                    union all
                    select Properties.*
                    from Properties, Parents
                    where Properties.Id = Parents.ParentId and not Properties.ParentId = 0
                    )
                    select distinct *
                    from Parents
                    order by ParentId`;

                    

                    request.query(propertyParentSearcher, (err, recordset)=>{
                        if (err){
                            console.log(err);
                            return;
                        }
                        //console.log(recordset.recordset);
                        let parents = recordset.recordset;
                        let obj = {
                            Brand:brandName,
                            Products:products.map(product=>{
                                return {
                                    Code:product.Code,
                                    Name:product.Product,
                                    Properties: parents.filter(parent=>parent.ParentId===1).map(parent=> {
                                        
                                        return getKids(parent, parents, properties)})
                                    }
                                        
                                })
                        };
                        
                        let objStr=JSON.stringify(obj,null,'\t');
                        
                        console.log("success");
                        res.send("success");
                        fs.writeFile('query.json', objStr, err=>{
                            if(err){
                                console.err;
                                return;
                            }
                        })
                    })

                    });
                });
        });
        
    });
});

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Running server on port ${PORT}`);
});
