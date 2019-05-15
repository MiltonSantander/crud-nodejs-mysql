const controller = {};

//se agrega al objeto controller un key: list y como value: la funcion que sigue
controller.list =  function (req, res) { 
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        var x = conn.query("SELECT id,serial_number as 'serialNumber',date,issuer_name as 'issuerName',payment_concept as paymentConcept,amount_received as 'amountReceived',address FROM receipt", (err, receiptRows) => {
            if(err){
                res.json(err);
            }
            res.render("recibos", {
                rows : receiptRows
            });
            // console.log(x.sql);
        });
    });
};

//se agrega al objeto controller un key: save y como value: la funcion que sigue

controller.save =  function (req, res) { 
    const dataForm = req.body;
    // console.log(dataForm);
    req.getConnection((err, conn) =>{
        conn.query("INSERT INTO receipt SET ?", [dataForm], (err, rows) => {
            res.redirect("/recibos/vistarecibos");
        });
    });
};

controller.selection =  function (req, res) { 
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query("SELECT id,serial_number as 'serialNumber',date,issuer_name as 'issuerName',payment_concept as paymentConcept,amount_received as 'amountReceived',address FROM receipt WHERE id = ?", [id], (err, receiptRows) => {
            if(err){
                res.json(err);
            }
            res.render("recibos_edit", {
                rows: receiptRows[0]
            });
        });
    });
};

controller.update = function (req, res) { 
    const id = req.params.id;
    const dataForm = req.body;
    req.getConnection((err, conn) => {
       conn.query("UPDATE receipt SET ? WHERE id = ?", [dataForm, id], () => {
           res.redirect("/recibos/vistarecibos");
       }) 
    })
}

//se agrega al objeto controller un key: delete y como value: la funcion que sigue
controller.delete =  function (req, res) { 
    req.getConnection((err, conn) => {
        const id = req.params.id;
        conn.query("DELETE FROM receipt WHERE id = ?", [id], (err, rows) => {
            res.redirect("/recibos/vistarecibos");
        });
    });
};

module.exports = controller;