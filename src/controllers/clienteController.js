const controller = {};

//se agrega al objeto controller un key: list y como value: la funcion que sigue
controller.list =  function (req, res) { 
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        var x = conn.query("SELECT id, name, address, document_number AS documentNumber FROM client", (err, clientRows) => {
            if(err){
                res.json(err);
            }
            // console.log(clientRows);
            res.render("clientes", {
                rows : clientRows
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
        conn.query("INSERT INTO client SET ?", [dataForm], (err, rows) => {
            res.redirect("/clientes/vistaclientes");
        });
    });
};

controller.selection =  function (req, res) { 
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query("SELECT id, name, document_number AS documentNumber, address FROM client WHERE id = ?", [id], (err, clientesRows) => {
            if(err){
                res.json(err);
            }
            // console.log(clientesRows);
            res.render("clientes_edit", {
                rows: clientesRows[0]
            });
        });
    });
};

controller.update = function (req, res) { 
    const id = req.params.id;
    const dataForm = req.body;
    req.getConnection((err, conn) => {
       conn.query("UPDATE client SET ? WHERE id = ?", [dataForm, id], () => {
        //    console.log(var_PreparedStatement.sql); para visualizar el query
           res.redirect("/clientes/vistaclientes");
       }) 
    })
}

//se agrega al objeto controller un key: delete y como value: la funcion que sigue
controller.delete =  function (req, res) { 
    req.getConnection((err, conn) => {
        const id = req.params.id;
        conn.query("DELETE FROM client WHERE id = ?", [id], (err, rows) => {
            res.redirect("/clientes/vistaclientes");
        });
    });
};

module.exports = controller;