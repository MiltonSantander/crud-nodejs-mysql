const controller = {};

//se agrega al objeto controller un key: list y como value: la funcion que sigue
controller.list =  function (req, res) { 
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        var x = conn.query("SELECT id, name FROM type", (err, typeRows) => {
            if(err){
                res.json(err);
            }
            res.render("tipos", {
                rows : typeRows
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
        conn.query("INSERT INTO type SET ?", [dataForm], (err, rows) => {
            res.redirect("/tipos/vistatipos");
        });
    });
};

controller.selection =  function (req, res) { 
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query("SELECT id, name FROM type WHERE id = ?", [id], (err, typeRows) => {
            if(err){
                res.json(err);
            }
            res.render("tipos_edit", {
                rows: typeRows[0]
            });
        });
    });
};

controller.update = function (req, res) { 
    const id = req.params.id;
    const dataForm = req.body;
    req.getConnection((err, conn) => {
       conn.query("UPDATE type SET ? WHERE id = ?", [dataForm, id], () => {
           res.redirect("/tipos/vistatipos");
       }) 
    })
}

//se agrega al objeto controller un key: delete y como value: la funcion que sigue
controller.delete =  function (req, res) { 
    req.getConnection((err, conn) => {
        const id = req.params.id;
        conn.query("DELETE FROM type WHERE id = ?", [id], (err, rows) => {
            res.redirect("/tipos/vistatipos");
        });
    });
};

module.exports = controller;