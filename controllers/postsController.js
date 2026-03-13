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

function show(req, res) {
  const { id } = req.params;

  const sql = `Select * FROM posts WHERE id = ?`;

  const tagsSql = `
SELECT tags.*
FROM db_blog.posts
JOIN db_blog.post_tag
ON posts.id = post_tag.post_id
JOIN db_blog.tags
ON tags.id = post_tag.tag_id
WHERE posts.id = ?;
  `;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }

    if (results.length == 0) {
      const responseData = {
        result: `Blog post with id: ${id} not found`,
        success: false,
      };
      return res.status(404).json(responseData);
    }

    const post = results[0];

    connection.query(tagsSql, [id], (err, tagsResults) => {
      if (err) {
        return res.status(500).json({
          message: "Internal server error",
          success: false,
        });
      }
      post.tags = tagsResults;
      const responseData = {
        result: post,
        success: true,
      };
      res.json(responseData);
    });
  });
}

//Delete
function destroy(req, res) {
  console.log(`Delete element with id:${req.params.id} `);

  const { id } = req.params;

  const sql = `DELETE FROM posts WHERE id = ?`;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }

    if (results.affectedRows == 0) {
      const responseData = {
        result: `Blog post with id: ${id} not found`,
        success: false,
      };
      return res.status(404).json(responseData);
    }
  });

  const responseData = {
    message: `element with id: ${id} deleted`,
    success: true,
  };

  res.json(responseData);
}

module.exports = { index, show, destroy };
