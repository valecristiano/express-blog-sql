const connection = require("../database/connection");

//index
function index(req, res) {
  //prova errore 500:
  // console.log(a.b);

  const sql = `SELECT * FROM posts`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    res.json(results);
  });
}

module.exports = { index };
