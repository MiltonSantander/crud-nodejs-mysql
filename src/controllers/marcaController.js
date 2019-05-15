const controller = {};

//se agrega al objeto controller un key: list y como value: la funcion que sigue
controller.list =  function (req, res) { 
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        var x = conn.query("SELECT id, name FROM brand", (err, brandRows) => {
            if(err){
                res.json(err);
            }
            res.render("marcas", {
                rows : brandRows
            });
            // console.log(x.sql);
        });
    });
};

//se agrega al objeto controller un key: save y como value: la funcion que sigue
// console.log("LLEGA HASTA  AQUIII2");

controller.save =  function (req, res) { 
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const dataForm = req.body;
    // console.log(dataForm);
    req.getConnection((err, conn) =>{
        conn.query("INSERT INTO brand SET ?", [dataForm], (err, rows) => {
            res.redirect("/marcas/vistamarcas");
        });
    });
};

controller.selection =  function (req, res) { 
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query("SELECT id, name FROM brand WHERE id = ?", [id], (err, brandRows) => {
            if(err){
                res.json(err);
            }
            res.render("marcas_edit", {
                rows: brandRows[0]
            });
        });
    });
};

controller.update = function (req, res) { 
    const id = req.params.id;
    const dataForm = req.body;
    req.getConnection((err, conn) => {
       conn.query("UPDATE brand SET ? WHERE id = ?", [dataForm, id], () => {
           res.redirect("/marcas/vistamarcas");
       }) 
    })
}

//se agrega al objeto controller un key: delete y como value: la funcion que sigue
controller.delete =  function (req, res) { 
    req.getConnection((err, conn) => {
        const id = req.params.id;
        conn.query("DELETE FROM brand WHERE id = ?", [id], (err, rows) => {
            res.redirect("/marcas/vistamarcas");
        });
    });
};

module.exports = controller;