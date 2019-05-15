const controller = {};

//se agrega al objeto controller un key: list y como value: la funcion que sigue
controller.list =  function (req, res) { 
    req.getConnection((err, conn) => {
        conn.query("SELECT p.id, p.name, p.barcode, p.price, p.quantity, b.name as brandName, t.name as typeName FROM product p JOIN brand b on p.id_brand=b.id JOIN type t on p.id_type=t.id", (err, productosRows) => {
            if(err){
                res.json(err);
            }
            conn.query("select id AS brandId, name AS brandName FROM brand", (err, brandRows) => {  
                if(err){
                res.json(err);
                }
                conn.query("select id AS typeId, name AS typeName FROM type", (err, typeRows) => {  
                    if(err){
                        res.json(err);
                    }
                    res.render("productos", {
                        rows : productosRows, rows2: brandRows, rows3: typeRows
                    });
                });
            });
        });
    });
};

//se agrega al objeto controller un key: save y como value: la funcion que sigue
controller.save =  function (req, res) { 
    const dataForm = req.body;
    req.getConnection((err, conn) =>{
        conn.query("INSERT INTO product SET ?", [dataForm], (err, rows) => {
            res.redirect("/productos/vistaproductos");
        });
    });
};

controller.selection =  function (req, res) { 
    const id = req.params.id;
    req.getConnection((err, conn) => {
        var x = conn.query("SELECT p.id, p.name, p.barcode, p.price, p.quantity, b.name as brandName, t.name as typeName FROM product p JOIN brand b on p.id_brand=b.id JOIN type t on p.id_type=t.id WHERE p.id = ?", [id], (err, productosRows) => {
            // console.log(productosRows);
            if(err){
                res.json(err);
            }
            conn.query("select id AS brandId, name AS brandName FROM brand", (err, brandRows) => {  
                // console.log(brandRows);
                if(err){
                res.json(err);
                }
                conn.query("select id AS typeId, name AS typeName FROM type", (err, typeRows) => {  
                    // console.log(typeRows);
                    if(err){
                        res.json(err);
                    }
                    res.render("producto_edit", {
                        rows: productosRows[0], rows2: brandRows, rows3: typeRows
                    });
                });
            });
            // console.log(x.sql);
        });
        // conn.query("SELECT p.id, p.name, p.barcode, p.price, p.quantity, b.name as brandName, t.name as typeName FROM product p JOIN brand b on p.id_brand=b.id JOIN type t on p.id_type=t.id WHERE p.id = ?", [id], (err, rows) => {
        //     res.render("producto_edit", {
        //         data: rows[0]
        //     });
        // });
    });
};

controller.update = function (req, res) { 
    const id = req.params.id;
    const dataForm = req.body;
    req.getConnection((err, conn) => {
       conn.query("UPDATE product SET ? WHERE id = ?", [dataForm, id], () => {
        //    console.log(var_PreparedStatement.sql); para visualizar el query
           res.redirect("/productos/vistaproductos");
       }) 
    })
}

//se agrega al objeto controller un key: delete y como value: la funcion que sigue
controller.delete =  function (req, res) { 
    req.getConnection((err, conn) => {
        const id = req.params.id;
        conn.query("DELETE FROM product WHERE id = ?", [id], (err, rows) => {
            res.redirect("/productos/vistaproductos");
        });
    });
};

module.exports = controller;