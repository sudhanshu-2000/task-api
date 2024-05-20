const express = require("express");
const app = express.Router();
const con = require("../db/conn");
const multer = require("multer");
var jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
SECRET_KEY_SUPERADMIN = '5e0+&:e3%bcc4<f7:1f%.08x4-9:a8$*$&?&a9_a46c!2.:<^b&^f?4*&7a*>b!.f:_7>8:c-77@>&4*@3_e4,-f:$93?0$-,+*.&4c%1*d$<_481_,-_>4:0@&5e@*615bc54*!2.8cc679>319%.+:!b562>a4,@7$eaad?1!e!3:-c25f+d^a%$%0e7^^ef1c,5&.5d3%@b&&<?!&.4@27:>_-+$@3+911&7&0$9^,.4c,3:8d:c6a39!.?!7a$@%16*d&7187?<*0.,6%2!da9-f<81ca+>5@>_.5<+d,*_!@+<e.-8++ed&,b95-!.?2_&3$97587,:.&5$:*83045!&^23?b:89c-?6>0^f,<4fb&<2*b39?>!c4_d2!8,,d>2e!4?.&3<3e34@<4087>f3:>&08.b@%,!-!2ced9a9e.?a-$&+48<ee.e+<0d!c71?5*5.e8$605>@c!9bd<?b:5:_<_+c:*4*f83,5c4<:&0*b&e8d7fdc,bebd92f-cf?:59_+5c&1$%-<9bc_3+28+@+3&4!?8!2@<?*-d>7170-+?43b3.a9%4,+8>_?@5:+^8^2c@+1bd99aa346*c185c.9*,e36fa&0,%b>:d2!+?6624%,-6_7_8:23?4*4c&-add+26@52229+5^*b>c._0-d0*bc*_@be6a+_f8$aa854!3$a,a^.@10<f.>+@:1::.fa,68010a<f-@e60_8f9:55d>62f@+!:18!@a-,c@+9>>8?<5bd<1--8e163_156%&d_%32*,40-*02$+165_-*&.5!82_5d^a,_!96e_3*+31<&>--?c4a%a7+?>6*,<:-?e:+2$8<?%e+&*d78%_@e>2>1.!48ca$^8+%3b>6$+@-&*&,0&$c054_d7&4-!d7d._:>&81-41:<1d,f0aa2:4a?8_>?,f1_,&77+!7&!9d^@_e?02$d69^-a__3bc2,@1<%.4e0$7&f>3?&1c03e9+a-+b9*7?d$eb$>3>%c!b<.';
SECRET_KEY_ADMIN = '%35ea7>+bc3c+b4-b42+9@!-e%5.:e3>xf$:50%>95>!4c3^$*68!6+3>@2@_b9$^1*6!0<%a6?-.5_0c,1:29d<,--!0?->ce!5ba3d!3&b_9&_3$*e_8a:%,>?&2.d_0-f2e$_:96%9429-:3c!?d4!48.4f7@-0^6-53_?f555>>a$>8e,:-c++%:d_&83&%*a9%e_130:_!98:-@-$0?2!1c9$d<9*@58e^%+e77caf?b8!1+%?%a.^9@&-&c!@c!3&_117+&%&_7<9%&.@,e_56:a1!9519%.&e.e%_@02_2^!.5882%.&a%07+f6_322?_d<4+3>@:6-_!c+e0*%cc$0-4!0a!a.,^6@1*^9a8+1fa%6%%32$@668-5a$%*.^f712*$4*^180,,3a,?ac3e69@3a*f^+^,b509*&.a6%07be:5_+$.%b1:9323^+1+^+1a:-%0ecfa7!?2?1:6:!1+44%980.!+fdce,,!^53^9+:-9fd22+0d@:^e&&d1^33387-2c2,@@<2_e@f1@65^0c_e83%?.2.b8?<7&?&-+-e$*a7.42$.?e?<fd?>*b2b%c4,8>ab5>9<e-8d!:b567!dd+3&$>&9:fe$d773%!ee<9<*@97@-&3c3%93?c5&+6^f0e,!<-<,958+d+5$,f3634.+9>%*2?b6?9+c:4%_<7!^@%5.21f26edd,5_<%c_,>17&e4>@4b&,:&_!a1a?b::!:1*>_?3-?ec+1:e!-_e6@>ec6299_6<!-$841b08^7-<a&4f?880e:%4@a$*1?f61-&3$d,e^.,%5*c7*>&a-1_@1b0@?08^,?<:+97>*4%e9d8-5>361$-c3b$-*+b,%6d7f90!6a-c?*d&a&:&+&12!2<<7ba>6&^.>:c$_,a8&e4$<e93.*a,88+b-b.>_:*+<-2?*d*_^^2d7+:@?7f!b6*.*2:a:-18b7d+d@4a5800,&_<c46:9&2d?30f:281^d,^b.@-7^a3&^c+@^%f6';
app.use("../../image", express.static("image"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "add_banner") {
      cb(null, "image/banners-details");
    } else if (file.fieldname == "add_cat") {
      cb(null, "image/catagory");
    } else if (file.fieldname == "add_sub_cat") {
      cb(null, "image/sub-catagory");
    } else if (file.fieldname == "add_slug") {
      cb(null, "image/slug");
    } else if (file.fieldname == "Add_plan_img") {
      cb(null, "image/plan");
    } else if (file.fieldname == "qr_code") {
      cb(null, "image/QR-Code");
    } else if (file.fieldname == "s_image") {
      cb(null, "image/shopping_image");
    } else if (file.fieldname == "game_type") {
      cb(null, "image/game-type");
    }
    else {
      cb(null, "image/buisness");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: storage });
const vstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/video");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".mp4");
  },
});
const vupload = multer({ storage: vstorage });

app.post("/login", (req, res) => {
  con.query("select (select name from role where id = role_id) as role from role_assign where user_id = (SELECT id FROM `login` where `username` = ?);", [req.body.username], (role_err, role_result) => {
    if (role_err) throw role_err;
    if (role_result.length > 0) {
      if ("Super Admin" == role_result[0].role) {
        con.query(
          "select * from login where username = ?",
          [req.body.username],
          (err, result) => {
            if (err) throw err;
            if (result[0] != null) {
              const match = bcrypt.compareSync(
                req.body.password,
                result[0].password
              );
              if (match) {
                jwt.sign(
                  { username: result[0].username },
                  SECRET_KEY_SUPERADMIN, { expiresIn: '3h' },
                  (err, token) => {
                    if (err) throw err;
                    else
                      con.query("UPDATE `login` SET `is_active` = 'Y' WHERE `username` = ?", [req.body.username])
                    res.status(200).json({
                      status: true,
                      username: result[0].username,
                      token,
                    });
                  }
                );
              } else {
                res.send("Username And Password is Wrong!");
              }
            } else {
              res.send("Username is not exist");
            }
          }
        );
      } else {
        con.query(
          "select * from login where username = ?",
          [req.body.username],
          (err, result) => {
            if (err) throw err;
            if (result[0] != null) {
              const match = bcrypt.compareSync(
                req.body.password,
                result[0].password
              );
              if (match) {
                jwt.sign(
                  { username: result[0].username },
                  SECRET_KEY_ADMIN, { expiresIn: '3h' },
                  (err, token) => {
                    if (err) throw err;
                    else
                      con.query("UPDATE `login` SET `is_active` = 'Y' WHERE `username` = ?", [req.body.username])
                    res.status(200).json({
                      status: true,
                      username: result[0].username,
                      token,
                    });
                  }
                );
              } else {
                res.send("Username And Password is Wrong!");
              }
            } else {
              res.send("Username is not exist");
            }
          }
        );
      }
    } else {
      res.status(404).json({
        error: true,
        status: false,
        massage: "This user is not assigned role"
      })
    }
  })
});
app.post("/logout", (req, res) => {
  con.query("UPDATE `login` SET `is_active` = 'N' WHERE `username` = ?", [req.body.username], (err, result) => {
    if (err) { throw err; }
    if (result) {
      res.status(200).send({ error: false, status: true });
    }
  })
});
app.post("/change", verifytoken, (req, res) => {
  con.query(
    "select * from login where username = ?",
    [req.body.username],
    (err, result) => {
      if (err) throw err;
      if (result) {
        const status = bcrypt.compareSync(
          req.body.password,
          result[0].password
        );
        if (status == true) {
          const hash = bcrypt.hashSync(
            req.body.new_password,
            bcrypt.genSaltSync(12)
          );
          con.query(
            "UPDATE `login` SET `password` = ? WHERE `username` = ?",
            [hash, req.body.username],
            (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).json({
                  error: false,
                  status: true,
                  message: "Reset Password Successfully",
                });
              }
            }
          );
        } else {
          res.status(200).json({
            error: true,
            message: "Password is Wrong",
          });
        }
      }
    }
  );
});
app.get("/get-map", (req, res) => {
  var sql =
    "SELECT module.module_name AS name from module  JOIN activity_maping ON module.id = activity_maping.show_manu";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/get-play", verifytoken, (req, res) => {
  con.query("SELECT button FROM `play_button`", (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ data: result });
    }
  });
});
app.post("/status-play", verifytoken, (req, res) => {
  con.query(
    "UPDATE `play_button` SET `button` = ?",
    [req.body.play],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).send(true);
      }
    }
  );
});

app.post("/add-admin", verifytoken, (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  con.query("select m.module_name FROM assign_module as am INNER join module as m on am.module = m.id WHERE am.role = (select role_id from role_assign where user_id = (SELECT id FROM `login` where `username` = ?))", [req.body.username], (err, module) => {
    if (err) throw err;
    if (module) {
      const arr = module;
      const f = arr.find(element => element.module_name == 'Sub-Admin');
      if (f == undefined) {
        res.status(403).send({ error: true, status: false, massage: 'You are not Capable to Create Admin' });
      } else {
        con.query("select * from login where username = ?", [req.body.nusername], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query(
              "INSERT INTO `login`(`name`, `username`, `password`) VALUES (?,?,?)",
              [req.body.name, req.body.nusername, hash],
              (err, result) => {
                if (err) throw err;
                if (result) {
                  con.query(
                    "INSERT INTO `role_assign`(`role_id`, `user_id`) VALUES (?, (select `id` from login where username = ?))",
                    [req.body.role, req.body.nusername],
                    (err, result) => {
                      if (err) throw err;
                      else {
                        res.status(200).send({ error: false, status: true, massage: 'New Admin Created Successfully' });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.status(302).send("Username is already exist");
          }
        }
        );
      }
    }
  })
});
app.post("/update-admin", verifytoken, (req, res) => {
  con.query("select m.module_name FROM assign_module as am INNER join module as m on am.module = m.id WHERE am.role = (select role_id from role_assign where user_id = (SELECT id FROM `login` where `username` = ?))", [req.body.username], (err, module) => {
    if (err) throw err;
    if (module) {
      const arr = module;
      const f = arr.find(element => element.module_name == 'Sub-Admin');
      if (f == undefined) {
        res.status(403).send({ error: true, status: false, massage: 'You are not Capable to Create Admin' });
      } else {
        con.query("select `id` from `login` where `username` = ?", [req.body.nusername], (err, check) => {
          if (err) throw err;
          if (check.length > 0) {
            if (check[0].id == req.body.id) {
              con.query(
                "UPDATE `login` SET `username` = ?, `name` = ? WHERE `id` = ?",
                [req.body.nusername, req.body.name, req.body.id],
                (err, result) => {
                  if (err) throw err;
                  if (result) {
                    con.query("UPDATE `role_assign` SET `role_id` = ? WHERE `user_id` = ?", [req.body.role, req.body.id], (err, result) => {
                      if (err) throw err;
                      if (result) {
                        res.status(200).send({ error: false, status: true, massage: 'Admin Details Updated Successfully' });
                      }
                    })
                  }
                }
              );
            } else {
              res.status(302).send({ error: true, status: false, massage: 'Username is already Exist' })
            }
          } else {
            con.query(
              "UPDATE `login` SET `username`= ?,`name`= ? WHERE `id` = ?",
              [req.body.nusername, req.body.name, req.body.id],
              (err, result) => {
                if (err) throw err;
                if (result) {
                  con.query("UPDATE `role_assign` SET `role_id` = ? WHERE `user_id` = ?", [req.body.role, req.body.id], (err, result) => {
                    if (err) throw err;
                    if (result) {
                      res.status(200).send({ error: false, status: true, massage: 'Admin Details Updated Successfully' });
                    }
                  })
                }
              }
            );
          }
        })
      }
    }
  })
});
app.post("/get-admin", verifytoken, (req, res) => {
  con.query("SELECT l.id, l.name, l.username, (IFNULL((select role.display_name FROM role WHERE role.id = ra.role_id), 'Not Assign')) as role, l.date,l.is_active, l.status  FROM `login` as l LEFT JOIN role_assign as ra on l.id = ra.user_id;", (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, data: result });
    }
  })
});
app.post("/del-admin", verifytoken, (req, res) => {
  con.query("DELETE FROM `role_assign` WHERE `user_id` = ?", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      con.query("DELETE FROM `login` WHERE `id` = ?", [req.body.id], (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, massage: 'Your Admin has been Deleted SuccessFully' })
        }
      })
    } else {
      con.query("DELETE FROM `login` WHERE `id` = ?", [req.body.id], (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, massage: 'Your Admin has been Deleted SuccessFully' })
        }
      })
    }
  })
});
app.post("/add-activity_maping", verifytoken, (req, res) => {
  con.query(
    "select * from activity_maping where activity_name = ?",
    [req.body.name],
    (err, result) => {
      if (err) throw err;
      if (result[0] == null) {
        con.query(
          "INSERT INTO `activity_maping`(`activity_name`, `active_url`, `is_active`, `show_manu`) VALUES (?,?,?,?)",
          [req.body.name, req.body.url, req.body.status, req.body.manu],
          (err, result) => {
            if (err) throw err;
            else {
              res.status(200).send(true);
            }
          }
        );
      } else {
        res.send("Display name is already exist");
      }
    }
  );
});

app.post("/get-user", verifytoken, (req, res) => {
  con.query("SELECT * FROM `user`", (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send({ data: result });
    }
  });
});
app.post("/del-user", verifytoken, (req, res) => {
  con.query("DELETE FROM `user` WHERE `id` = ?", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, massage: 'Your User has been Deleted SuccessFully' })
    }
  })
});
app.post("/status-user", verifytoken, (req, res) => {
  con.query(
    "UPDATE `user` SET `status` = ? WHERE `id` = ?",
    [req.body.status, req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});
app.post("/get-total-data", verifytoken, (req, res) => {
  con.query("SELECT ud.id,ud.mobile,(select SUM(p.total_video) as 'video' from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.status = 'Active' and bp.user_id = ud.mobile) as video,(select SUM(p.total_comment) as 'comment' from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.status = 'Active' and bp.user_id = ud.mobile) as 'comment',(select SUM(p.total_like) as 'like' from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.status = 'Active' and bp.user_id = ud.mobile) as 'like' FROM `user_details` as ud ", (err, result) => {
    if (err) throw err;
    if (result) {
      const video = result.reduce((prev, current) => ((prev.video > current.video) ? prev : current), 0);
      const like = result.reduce((prev, current) => ((prev.like > current.like) ? prev : current), 0);
      const comment = result.reduce((prev, current) => ((prev.comment > current.comment) ? prev : current), 0);
      con.query("select (SELECT COUNT(*) FROM `tasks_with_name` WHERE `type` = 'LIKE' and date(`date`) = CURRENT_DATE()) as 'like', (SELECT COUNT(*) FROM `tasks_with_name` WHERE `type` = 'VIDEO' and date(`date`) = CURRENT_DATE()) as video, (SELECT COUNT(*) FROM `tasks_with_name` WHERE `type` = 'COMMENT' and date(`date`) = CURRENT_DATE()) as comment", (err, resultt) => {
        if (err) throw err;
        if (resultt) {
          con.query("select (SELECT ifnull(COUNT(*),0) FROM `assign_task` WHERE `status` = 'Pending') as p_request,? as 'today_task_video',? as 'video',? as 'today_task_like',? as 'like',? as 'today_task_comment', ? as comment,(select IFNULL(COUNT(*), 0) from user_details) as total_user, (select IFNULL(COUNT(*), 0) from user_details WHERE is_active = 'Y') as active_user, (SELECT ifnull(SUM(`balance`), 0) FROM `deposit` WHERE `payment_type` = 'Deposit' and `status` = 'Success') as total_d, (SELECT ifnull(COUNT(`balance`), 0) FROM `deposit` WHERE `payment_type` = 'Deposit' and `status` = 'Pending') as total_d_p, (SELECT ifnull(SUM(`balance`), 0) FROM `deposit` WHERE `payment_type` = 'Deposit' and `status` = 'Success' AND date(`date`) = CURRENT_DATE()) as today_d, (SELECT ifnull(SUM(`balance`), 0) FROM `deposit` WHERE `payment_type` = 'Withdrawal' and `status` = 'Success') as total_w, (SELECT ifnull(SUM(`balance`), 0) FROM `deposit` WHERE `payment_type` = 'Withdrawal' and `status` = 'Success' AND date(`date`) = CURRENT_DATE()) as today_w, (SELECT ifnull(COUNT(`balance`), 0) FROM `deposit` WHERE `payment_type` = 'Withdrawal' and `status` = 'Pending') as total_w_p",
            [resultt[0].video, video.video, resultt[0].like, like.like, resultt[0].comment, comment.comment], (errr, resulttt) => {
              if (errr) { throw errr }
              if (resulttt) {
                res.status(200).json({
                  error: false,
                  status: true,
                  data: resulttt
                })
              }
            })
        }
      })
    }
  })
});
app.post("/get-menu", verifytoken, (req, res) => {
  con.query("select role_id from role_assign where user_id = (SELECT id FROM `login` where `username` = ?);", [req.body.username], (role_err, role_result) => {
    if (role_err) throw role_err;
    if (role_result.length > 0) {
      con.query("SELECT am.id, m.module_name, m.url, am.status, am.date FROM assign_module as am inner Join module as m on am.module = m.id where role = ? ORDER BY am.position ASC;", [role_result[0].role_id], (ro_err, ro_result) => {
        if (ro_err) throw ro_err;
        if (ro_result) {
          res.status(200).json({
            error: false,
            status: true,
            data: ro_result
          })
        }
      })
    } else {
      res.status(404).json({
        error: true,
        status: false,
        massage: "This user is not assigned role"
      })
    }
  })
});

app.post("/add-role", verifytoken, (req, res) => {
  con.query(
    "select * from role where display_name = ?",
    [req.body.display_name],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send("Display name is already exist");
      } else {
        con.query(
          "INSERT INTO `role`(`name`, `display_name`, `view`, `delete_d`, `update_d`, `play_btn`) VALUES (?,?,?,?,?,?)",
          [req.body.name, req.body.display_name, (req.body.view_d).toString(), (req.body.delete_d).toString(), (req.body.update_d).toString(), (req.body.play_d).toString()],
          (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json({
                error: false,
                status: true,
              });
            }
          }
        );
      }
    }
  );
});
app.post("/get-role", verifytoken, (req, res) => {
  con.query("select * from role", (err, result) => {
    if (err) throw err;
    res.status(200).json({ data: result });
  });
});
app.post("/status-role", verifytoken, (req, res) => {
  con.query(
    "UPDATE `role` SET `status`= ? WHERE `id` = ?",
    [req.body.status, req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).send({ error: false, status: true })
      }
    }
  );
});
app.post("/update-role", verifytoken, (req, res) => {
  con.query("UPDATE `role` SET `name` = ?, `display_name` = ?, `view` = ?, `delete_d` = ?, `update_d` = ?, `play_btn` = ? WHERE `id` = ?", [req.body.name, req.body.dname, (req.body.view_d).toString(), (req.body.delete_d).toString(), (req.body.update_d).toString(), (req.body.play_d).toString(), req.body.id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ error: false, status: true });
  });
});
app.post("/get-role-not-assign", verifytoken, (req, res) => {
  con.query("select * from role where role_assign = 'N'", (err, result) => {
    if (err) throw err;
    res.status(200).json({ data: result });
  });
});
app.post("/get-role-assign", verifytoken, (req, res) => {
  con.query("select * from role where role_assign = 'Y'", (err, result) => {
    if (err) throw err;
    res.status(200).json({ data: result });
  });
});

app.post("/add-game-mapping", verifytoken, (req, res) => {
  let num = req.body.color.length;
  let num2 = 0;
  for (var index = 0; index < req.body.color.length; index++) {
    num2 = num2 + 1;
    con.query(
      "INSERT INTO `game_mapping`(`for_color_or_number`, `color_id`, `number_id`, `game_type_id`, `multiple`) VALUES (?,?,?,?,?)",
      [
        req.body.for_color_or_number,
        req.body.color[index].id,
        req.body.number,
        req.body.game_type,
        req.body.multiple,
      ]
    );
  }
  if (num2 === num) {
    res.status(200).send({
      error: false,
      status: true,
      massage: "Add Game Mapping SuccessFully",
    });
  }
});
app.post("/get-game-mapping-number", verifytoken, (req, res) => {
  if (req.body.id == 0) {
    con.query(
      "SELECT gm.id, gt.nickname as game_type, gc.name as color_name, gc.code as color_code, gn.number as number, gm.multiple,gm.status, gm.date FROM game_mapping gm INNER JOIN game_color gc ON gc.id = gm.color_id INNER JOIN game_number gn ON gn.id = gm.number_id INNER JOIN game_type gt ON gt.id = gm.game_type_id ORDER BY CAST(number AS UNSIGNED INTEGER);",
      (err, result) => {
        if (err) throw err;
        if (result) res.status(200).send(result);
      }
    );
  } else {
    con.query(
      "SELECT gm.id, gt.nickname as game_type, gc.name as color_name, gc.code as color_code, gn.number as number, gm.multiple, gm.status, gm.date FROM game_mapping gm INNER JOIN game_color gc ON gc.id = gm.color_id INNER JOIN game_number gn ON gn.id = gm.number_id INNER JOIN game_type gt ON gt.id = gm.game_type_id where gm.game_type_id = ? ORDER BY CAST(number AS UNSIGNED INTEGER);",
      [req.body.id],
      (err, result) => {
        if (err) throw err;
        if (result) res.status(200).send(result);
      }
    );
  }
});
app.post("/get-game-mapping-number-id", verifytoken, (req, res) => {
  con.query(
    "SELECT gm.id, gm.for_color_or_number, gt.nickname as game_type, gc.name as color_name, gc.code as color_code, gn.number as number, gm.multiple,gm.status, gm.date FROM game_mapping gm INNER JOIN game_color gc ON gc.id = gm.color_id INNER JOIN game_number gn ON gn.id = gm.number_id INNER JOIN game_type gt ON gt.id = gm.game_type_id WHERE gm.id = ? ORDER BY CAST(number AS UNSIGNED INTEGER) ",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) res.status(200).send(result);
    }
  );
});
app.post("/del-game-mapping-number", verifytoken, (req, res) => {
  con.query(
    "delete from `game_mapping` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) res.status(200).send(true);
    }
  );
});
app.post("/get-game-mapping-color", verifytoken, (req, res) => {
  if (req.body.id == 0) {
    con.query(
      "SELECT gm.id, gm.for_color_or_number, gt.nickname as game_type, gc.name as color_name, gc.code as color_code, gm.multiple,gm.status, gm.date FROM game_mapping gm INNER JOIN game_color gc ON gc.id =  gm.color_id INNER JOIN game_type gt ON gt.id = gm.game_type_id where gm.for_color_or_number = 'only_color'",
      (err, result) => {
        if (err) throw err;
        if (result) res.status(200).send(result);
      }
    );
  } else {
    con.query(
      "SELECT gm.id, gm.for_color_or_number, gt.nickname as game_type, gc.name as color_name, gc.code as color_code, gm.multiple,gm.status, gm.date FROM game_mapping gm INNER JOIN game_color gc ON gc.id =  gm.color_id INNER JOIN game_type gt ON gt.id = gm.game_type_id where gm.for_color_or_number = 'only_color' AND gm.game_type_id = ?",
      [req.body.id],
      (err, result) => {
        if (err) throw err;
        if (result) res.status(200).send(result);
      }
    );
  }
});
app.post("/get-game-mapping-color-id", verifytoken, (req, res) => {
  con.query(
    "SELECT gm.id, gm.for_color_or_number, gt.nickname as game_type, gc.name as color_name, gc.code as color_code, gm.multiple,gm.status, gm.date FROM game_mapping gm INNER JOIN game_color gc ON gc.id =  gm.color_id INNER JOIN game_type gt ON gt.id =  gm.game_type_id where gm.for_color_or_number = 'only_color' AND gm.id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) res.status(200).send(result);
    }
  );
});

app.post("/add-module", verifytoken, (req, res) => {
  con.query(
    "select * from module where module_name = ?",
    [req.body.module_name],
    (err, result) => {
      if (err) throw err;
      if (result[0] == null) {
        con.query(
          "INSERT INTO `module`(`url`, `module_name`) VALUES (?,?)",
          [req.body.url, req.body.module_name],
          (err, result) => {
            if (err) throw err;
            else {
              res.status(200).send(true);
            }
          }
        );
      } else {
        res.send("Module name is already exist");
      }
    }
  );
});
app.post("/get-module", verifytoken, (req, res) => {
  con.query("select * from `module`", (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send({ data: result });
    }
  });
});
app.post("/status-module", verifytoken, (req, res) => {
  con.query(
    "UPDATE `module` SET `status` = ? WHERE `id` = ?",
    [req.body.status, req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});
app.post("/get-module-id", verifytoken, (req, res) => {
  con.query(
    "select * from `module` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(result);
      }
    }
  );
});
app.post("/update-module", (req, res) => {
  con.query(
    "UPDATE `module` SET `module_name` = ?, `url` = ? WHERE `id` = ?",
    [req.body.module_name, req.body.url, req.body.id],
    (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(403).send("module name is already exist");
        }
      } else {
        res.status(200).send(true);
      }
    }
  );
});
app.post("/del-module", verifytoken, (req, res) => {
  con.query("DELETE FROM `module` where id = ?", [req.body.id], (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send(true);
    }
  });
});
app.post("/assign-module", verifytoken, (req, res) => {
  for (var module of req.body.module) {
    con.query("INSERT INTO `assign_module`(`role`, `module`, `position`) VALUES (?,?,(SELECT MAX(m.`position`)+1 FROM `assign_module` as m))", [req.body.role_id, module])
  }
  con.query("UPDATE `role` SET `role_assign` = 'Y' WHERE `id` = ?", [req.body.role_id], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        message: "Module Assign Successfully"
      })
    }
  })
});
app.post("/get-assign-module", verifytoken, (req, res) => {
  con.query('SELECT am.id, m.module_name, r.display_name FROM `assign_module` am INNER join module m on am.module = m.id INNER JOIN role r on am.role = r.id WHERE am.role = ? order by position', [req.body.id], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result
      })
    }
  })
});
app.post("/update-assign-module", verifytoken, (req, res) => {
  con.query("DELETE FROM `assign_module` WHERE `role` = ?", [req.body.role_id], (error, resultt) => {
    if (error) {
      throw error;
    }
    if (resultt) {
      con.query('SELECT MAX(`position`) as max FROM `assign_module`', (errors, results) => {
        if (errors) { throw errors }
        if (results) {
          let max = results[0].max + 1;
          for (var module of req.body.module) {
            con.query("INSERT INTO `assign_module`(`role`, `module`, `position`) VALUES (?,?,?)", [req.body.role_id, module, max])
            max = max + 1;
          }
        }
      })
    }
    res.status(200).json({
      error: false,
      status: true,
      message: "Module Assign Upadated Successfully"
    })
  })

});
app.post("/get-assign-module-id", verifytoken, (req, res) => {
  con.query('SELECT am.module FROM `assign_module` am INNER join module m on am.module = m.id INNER JOIN role r on am.role = r.id WHERE am.role = ?', [req.body.id], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result
      })
    }
  })
});
app.post("/update-postion", verifytoken, (req, res) => {
  con.query("select role_id from role_assign where user_id = (SELECT id FROM `login` where `username` = ?);", [req.body.username], (role_err, role_result) => {
    if (role_err) throw role_err;
    if (role_result.length > 0) {
      con.query("SELECT am.id, m.module_name, m.url, am.position, am.status, am.date FROM assign_module as am inner Join module as m on am.module = m.id where role = ? ORDER BY am.position ASC;", [role_result[0].role_id], (ro_err, ro_result) => {
        if (ro_err) throw ro_err;
        if (ro_result) {
          for (let index = 0; index < req.body.data.length; index++) {
            con.query("UPDATE `assign_module` SET `position` = ? WHERE `id` = ?", [ro_result[index].position, req.body.data[index].id]);
          }
          res.status(200).json({
            error: false,
            status: true,
          })
        }
      })
    }
  })
});

app.post("/add-game-type", upload.single("game_type"), verifytoken, (req, res) => {
  con.query("select * from `game_type` where `nickname` = ?", [req.body.nickname], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send("Nickname is already exist");
    } else {
      con.query("INSERT INTO `game_type`(`name`, `nickname`, `img`, `timer`) VALUES (?,?,?,?)", [req.body.name, req.body.nickname, req.file.filename, 2], (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send(true);
        }
      }
      );
    }
  }
  );
});
app.post("/get-game-type", verifytoken, (req, res) => {
  con.query("select * from `game_type`", (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send({ data: result });
    }
  });
});
app.post("/status-game-type", verifytoken, (req, res) => {
  con.query(
    "UPDATE `game_type` SET `status` = ? WHERE `id` = ?",
    [req.body.status, req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});
app.post("/get-game-type-id", verifytoken, (req, res) => {
  con.query(
    "select * from `game_type` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(result);
      }
    }
  );
});
app.post("/update-game-type", (req, res) => {
  con.query(
    "UPDATE `game_type` SET `name` = ?, `nickname` = ? WHERE `id` = ?",
    [req.body.name, req.body.nickname, req.body.id],
    (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(403).send("Nickname is already exist");
        }
      } else {
        res.status(200).send(true);
      }
    }
  );
});
app.post("/del-game-type", verifytoken, (req, res) => {
  con.query(
    "DELETE FROM `game_type` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});

app.post("/add-game-color", verifytoken, (req, res) => {
  con.query(
    "select * from game_color where code = ?",
    [req.body.code],
    (err, result) => {
      if (err) throw err;
      if (result[0] == null) {
        con.query(
          "INSERT INTO `game_color`(`name`, `code`) VALUES (?,?)",
          [req.body.name, req.body.code],
          (err, result) => {
            if (err) throw err;
            else {
              res.status(200).send(true);
            }
          }
        );
      } else {
        res.send("Code is already exist");
      }
    }
  );
});
app.post("/get-game-color", verifytoken, (req, res) => {
  con.query("select * from `game_color`", (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send({ data: result });
    }
  });
});
app.post("/status-game-color", verifytoken, (req, res) => {
  con.query(
    "UPDATE `game_color` SET `status` = ? WHERE `id` = ?",
    [req.body.status, req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});
app.post("/get-game-color-id", verifytoken, (req, res) => {
  con.query(
    "select * from `game_color` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(result);
      }
    }
  );
});
app.post("/update-game-color", (req, res) => {
  con.query(
    "UPDATE `game_color` SET `name` = ?,`code` = ? WHERE `id` = ?",
    [req.body.name, req.body.code, req.body.id],
    (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(403).send("Nickname is already exist");
        }
      } else {
        res.status(200).send(true);
      }
    }
  );
});
app.post("/del-game-color", verifytoken, (req, res) => {
  con.query(
    "DELETE FROM `game_color` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});

app.post("/get-game-number", verifytoken, (req, res) => {
  con.query("select * from `game_number`", (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send({ data: result });
    }
  });
});

app.post("/get-pay-method", verifytoken, (req, res) => {
  con.query("select * from `new_payment_details`", (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        error: false,
        status: true,
        data: result,
      });
    }
  });
});
app.post("/add-payment-details-upi", upload.single("qr_code"), verifytoken, (req, res) => {
  var body = req.body;
  con.query("select * from `new_payment_details` where UPI_id = ?", [body.upi_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(302).json({
        error: true,
        status: false,
        massage: "UPI Id is Already exist",
      });
    } else {
      con.query("INSERT INTO ``new_payment_details``(`paymethod_id`, `name`, `UPI_id`, `QR_code`, `icons`, `mobile_no`) VALUES (?,?,?,?,?,?)",
        [body.payment_method, body.name, body.upi_id, req.file.filename, "paytm.png", body.upinumber], (err, result) => {
          if (err) throw err;
          if (result) {
            res.status(200).json({
              error: false,
              status: true,
              massage: "Paytm Details SuccessFully",
            });
          }
        }
      );
    }
  }
  );
});
app.post("/add-payment-detail-upi", verifytoken, (req, res) => {
  var body = req.body;
  con.query("select * from `new_payment_details` where UPI_id = ?", [body.upi_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(302).json({
        error: true,
        status: false,
        massage: "UPI Id is Already exist",
      });
    } else {
      {
        con.query(
          "INSERT INTO `new_payment_details`(`paymethod_id`, `name`, `UPI_id`, `icons`) VALUES (?,?,?,?)",
          [body.payment_method, body.name, body.upi_id, "upi.png"], (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json({
                error: false,
                status: true,
                massage: "Paytm Details SuccessFully",
              });
            }
          }
        );
      }
    }
  }
  );
});
app.post("/add-payment-details-bank", verifytoken, (req, res) => {
  var body = req.body;
  con.query(
    "select * from `new_payment_details` where account_no = ?",
    [body.account_no],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Account Number is Already exist",
        });
      } else {
        con.query(
          "INSERT INTO `payment_details`(`paymethod_id`, `name`, `bank_name`, `account_no`, `ifsc_code`, `account_type`) VALUES (?,?,?,?,?,?)",
          [
            parseInt(body.payment_method),
            body.name,
            body.bank_name,
            body.account_no,
            body.ifsc_code,
            body.account_type,
          ],
          (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json({
                error: false,
                status: true,
                massage: "Insert Bank Details SuccessFully",
              });
            }
          }
        );
      }
    }
  );
});
app.post("/get-payment-details", verifytoken, (req, res) => {
  con.query("select * from `new_payment_details`;",
    [req.body.method], (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).send({
          error: true,
          status: false,
          data: result
        });
      }
    }
  );
});
app.post("/status-payment-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `new_payment_details` SET `status` = ? WHERE `id` = ?",
    [req.body.method, req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: true,
          massage: " Status Changed SuccessFully",
        });
      }
    }
  );
});
app.post("/del-payment-details", verifytoken, (req, res) => {
  con.query(
    "DELETE FROM `payment_details` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) {
        if (true == (err.sqlMessage == "Cannot delete or update a parent row: a foreign key constraint fails (`colorgame`.`deposit`, CONSTRAINT `paymethod_id` FOREIGN KEY (`paymethod_id`) REFERENCES `payment_details` (`id`))")) {
          res.status(405).json({
            error: true,
            status: false,
            massage: "This payment method is already Used",
          });
        } else {
          throw err;
        }
      }
      else {
        res.status(200).json({
          error: false,
          status: true,
          massage: "Your file has been deleted.",
        });
      }
    }
  );
});
app.post("/update-payment-details", upload.single("qr_code"), verifytoken, (req, res) => {
  con.query(
    "UPDATE `payment_details` SET `name` = ?, `UPI_id` = ?, `QR_code` = ? WHERE `id` = ?",
    [req.body.name, req.body.upi_id, req.file.filename, req.body.id],
    (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(403).send("UPI Id is already exist");
        }
      }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Details SuccessFully",
        });
      }
    }
  );
});
app.post("/update-bank-payment-details", verifytoken, (req, res) => {
  var body = req.body;
  con.query("select id from `payment_details` where `account_no` = ?", [body.account_no], (errror, ressult) => {
    if (errror) throw errror;
    if (ressult.length > 0) {
      if (ressult[0].id == body.id) {
        con.query(
          "UPDATE `payment_details` SET `name` = ?, `bank_name` = ?, `account_no` = ?, `ifsc_code` = ?, `account_type` = ? WHERE `id` = ?",
          [
            body.name,
            body.bank_name,
            body.account_no,
            body.ifsc_code,
            body.account_type,
            body.id,
          ],
          (err, result) => {
            if (err) {
              throw err;
            }
            if (result) {
              res.status(200).send({ error: false, status: true, massage: "Details Updated SuccessFully" });
            }
          }
        );
      } else {
        res.status(302).send({ error: true, status: false, massage: "Account No is already exist" });
      }
    } else {
      con.query(
        "UPDATE `payment_details` SET `name` = ?, `bank_name` = ?, `account_no` = ?, `ifsc_code` = ?, `account_type` = ? WHERE `id` = ?",
        [
          body.name,
          body.bank_name,
          body.account_no,
          body.ifsc_code,
          body.account_type,
          body.id,
        ],
        (err, result) => {
          if (err) {
            throw err;
          }
          if (result) {
            res.status(200).send({ error: false, status: true, massage: "Details Updated SuccessFully" });
          }
        }
      );
    }
  })

});

app.post("/get-user-details", verifytoken, (req, res) => {
  con.query(
    "select ud.id as id, ud.mobile, ud.username,ud.email,ud.`bank_name`, (SELECT SUM(`amount`) FROM `statement` WHERE `mobile`  = ud.mobile) as total_earning, ud.`ac_no`, ud.`ifsc_code`, ud.`ac_name`, ud.uid,ud.reffer_by,ud.reffer_code, w.id as wid,w.winning_wallet, w.wallet_balance, ud.status, ud.date from user_details as ud inner join wallet as w on ud.mobile = w.user_name;",
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send({
          error: false,
          status: true,
          data: result,
        });
      }
    }
  );
});
app.post("/status-user-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `user_details` SET `status` = ? WHERE `id` = ?",
    [req.body.status, req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: true,
          massage: "Status Changed SuccessFully",
        });
      }
    }
  );
});
app.post("/del-user-details", verifytoken, (req, res) => {
  con.query("DELETE FROM `user_details` where id = ?", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result) {
      con.query(
        "DELETE FROM `wallet` where id=?",
        [req.body.wid],
        (err, result) => {
          if (err) throw err;
          if (result) {
            res.status(200).json({
              error: false,
              status: true,
              massage: "Your Details has been deleted.",
            });
          }
        }
      );
    }
  }
  );
});
app.post("/update-user-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `payment_details` SET `name` = ?, `UPI_id` = ?, `QR_code` = ? WHERE `id` = ?",
    [req.body.name, req.body.upi_id, req.file.filename, req.body.id],
    (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(403).send("UPI Id is already exist");
        }
      }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Details SuccessFully",
        });
      }
    }
  );
});

app.post("/get-assign-task", verifytoken, (req, res) => {
  if (req.body.status == 'Completed') {
    con.query("SELECT ast.id,ud.username as name,ud.mobile,ast.username,ast.url,twn.task_url,twn.type,(select p.`name` from `platforms` as p WHERE p.id = twn.platform_id) as platform,twn.comment_details,ast.status,ast.approved_declined_by,ast.date FROM `assign_task` as ast INNER join tasks_with_name as twn on ast.task_id = twn.id INNER join `user_details` as ud on ast.user_id = ud.id where ast.status = 'Completed'",
      [req.body.method],
      (err, result) => {
        if (err) throw err;
        else {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  } else if (req.body.status == 'Verifying') {
    con.query("SELECT ast.id,ud.username as name,ud.mobile,ast.username,ast.url,twn.task_url,twn.type,(select p.`name` from `platforms` as p WHERE p.id = twn.platform_id) as platform,twn.comment_details,ast.status,ast.approved_declined_by,ast.date FROM `assign_task` as ast INNER join tasks_with_name as twn on ast.task_id = twn.id INNER join `user_details` as ud on ast.user_id = ud.id where ast.status = 'Verifying'",
      [req.body.method],
      (err, result) => {
        if (err) throw err;
        else {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  } else if (req.body.status == 'Failed') {
    con.query("SELECT ast.id,ud.username as name,ud.mobile,ast.username,ast.url,twn.task_url,twn.type,(select p.`name` from `platforms` as p WHERE p.id = twn.platform_id) as platform,twn.comment_details,ast.status,ast.approved_declined_by,ast.date FROM `assign_task` as ast INNER join tasks_with_name as twn on ast.task_id = twn.id INNER join `user_details` as ud on ast.user_id = ud.id where ast.status = 'Failed'",
      [req.body.method],
      (err, result) => {
        if (err) throw err;
        else {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  } else {
    con.query("SELECT ast.id,ud.username as name,ud.mobile,ast.username,ast.url,twn.task_url,twn.type,(select p.`name` from `platforms` as p WHERE p.id = twn.platform_id) as platform,twn.comment_details,ast.status,ast.approved_declined_by,ast.date FROM `assign_task` as ast INNER join tasks_with_name as twn on ast.task_id = twn.id INNER join `user_details` as ud on ast.user_id = ud.id WHERE ast.status != 'Pending'",
      [req.body.method],
      (err, result) => {
        if (err) throw err;
        else {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  }
});
app.post("/approve-assign-task", verifytoken, (req, res) => {
  con.query("UPDATE `assign_task` SET `status` = 'Completed', `approved_declined_by` = ? WHERE `id` = ?", [req.body.username, req.body.id], (error, result) => {
    if (error) throw error;
    if (result) {
      con.query("UPDATE `wallet` SET `winning_wallet` = ROUND(`winning_wallet` + (SELECT (select IF(twn.`type`='COMMENT', '0.75',IF(twn.`type`='LIKE','0.40','1.67')) from `tasks_with_name` as twn where twn.`id` = at.task_id) as price FROM `assign_task` as at WHERE at.`id` = ?), 2) WHERE `user_name` = ?;",
        [req.body.id, req.body.mobile], (err, resultt) => {
          if (err) throw err;
          if (resultt) {
            con.query("INSERT INTO `statement`(`mobile`, `type`, `amount`, `total_balance`) VALUES (?,(SELECT (select twn.`type` from `tasks_with_name` as twn where twn.`id` = at.task_id) FROM `assign_task` as at WHERE at.`id` = ?),ROUND((SELECT (select IF(twn.`type`='COMMENT', '0.75',IF(twn.`type`='LIKE','0.40','1.66')) from `tasks_with_name` as twn where twn.`id` = at.task_id) as price FROM `assign_task` as at WHERE at.`id` = ?),2),(select w.`winning_wallet` from `wallet` as w where w.`user_name` = ?))", [req.body.mobile, req.body.id, req.body.id, req.body.mobile], (err, result3) => {
              if (err) throw err;
              if (result3) {
                res.status(200).send({
                  error: false,
                  status: true,
                  massage: "Wallet Update SuccessFully",
                });
              }
            })
          }
        }
      );
    }
  }
  );
});
app.post("/decline-assign-task", verifytoken, (req, res) => {
  con.query(
    "UPDATE `assign_task` SET `status` = 'Canceled', `Approved_declined_By` = ? WHERE `id` = ?",
    [req.body.username, req.body.id],
    (err, resultt) => {
      if (err) throw err;
      if (resultt) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Deatils SuccessFully",
        });
      }
    }
  );
});

app.post("/get-deposit-request", verifytoken, (req, res) => {
  if (req.body.status === "Pending") {
    con.query(
      "SELECT cd.id, cd.user_name, cd.image, cd.transaction_id, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd where cd.payment_type = 'Deposit' and cd.`status` = 'Pending';",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  } else if (req.body.status === "Success") {
    con.query(
      "SELECT cd.id, cd.user_name, cd.image, cd.transaction_id, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd where cd.payment_type = 'Deposit' and cd.`status` = 'Success';",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  } else if (req.body.status === "Canceled") {
    con.query(
      "SELECT cd.id, cd.user_name, cd.image, cd.transaction_id, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd where cd.payment_type = 'Deposit' and cd.`status` = 'Canceled';",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  } else {
    con.query("SELECT cd.id, cd.user_name, cd.image, cd.transaction_id, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd where cd.payment_type = 'Deposit'",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            error: false,
            status: true,
            data: result,
          });
        }
      }
    );
  }
});
app.post("/approve-deposit-request", verifytoken, (req, res) => {
  con.query("UPDATE `deposit` SET `status` = 'Success', `Approved_declined_By` = ? WHERE `id` = ?", [req.body.username, req.body.id], (error, result) => {
    if (error) throw error;
    if (result) {
      con.query("UPDATE `wallet` SET `wallet_balance` = wallet_balance + (SELECT `balance` from `deposit` where `id` = ?) WHERE `user_name` = ?;",
        [req.body.id, req.body.mobile], (err, resultt) => {
          if (err) throw err;
          if (resultt) {
            res.status(200).send({
              error: false,
              status: true,
              massage: "Wallet Update SuccessFully",
            });
          }
        }
      );
    }
  }
  );
});
app.post("/decline-deposit-request", verifytoken, (req, res) => {
  con.query(
    "UPDATE `deposit` SET `status` = ?, `reason` = ?, `Approved_declined_By` = ? WHERE `id` = ?",
    ["Canceled", req.body.reason, req.body.username, req.body.id],
    (err, resultt) => {
      if (err) throw err;
      if (resultt) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Deatils SuccessFully",
        });
      }
    }
  );
});

app.post("/get-bank-details", verifytoken, (req, res) => {
  if (req.body.status === "Pending") {
    con.query(
      "SELECT * FROM `userbankdeatils` where `status` = ?",
      [req.body.status],
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, data: result });
        }
      }
    );
  } else if (req.body.status === "Success") {
    con.query(
      "SELECT * FROM `userbankdeatils` where `status` = ?",
      [req.body.status],
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, data: result });
        }
      }
    );
  } else if (req.body.status === "Canceled") {
    con.query(
      "SELECT * FROM `userbankdeatils` where `status` = ?",
      [req.body.status],
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, data: result });
        }
      }
    );
  } else {
    con.query("SELECT * FROM `userbankdeatils`", (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).send({ error: false, status: true, data: result });
      }
    });
  }
});
app.post("/approve-bank-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `userbankdeatils` SET `status` = 'Success', `approved_or_denied_by` = ? WHERE `id` = ?",
    [req.body.username, req.body.id],
    (error, result) => {
      if (error) throw error;
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Approved Bank SuccessFully",
        });
      }
    }
  );
});
app.post("/decline-bank-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `userbankdeatils` SET `status` = ?, `reason` = ?,`approved_or_denied_by` = ? WHERE `id` = ?",
    ["Canceled", req.body.reason, req.body.username, req.body.id],
    (err, resultt) => {
      if (err) throw err;
      if (resultt) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Decline Bank Details!",
        });
      }
    }
  );
});

app.post("/get-withdrawal-request", verifytoken, (req, res) => {
  if (req.body.status === "Pending") {
    con.query(
      "SELECT cd.id, cd.user_name, ud.bank_name, ud.ifsc_code, ud.ac_no, ud.ac_name, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd INNER join user_details as ud on cd.user_name = ud.mobile where cd.payment_type = 'Withdrawal' and cd.status = 'Pending'",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, data: result });
        }
      }
    );
  } else if (req.body.status === "Success") {
    con.query(
      "SELECT cd.id, cd.user_name, ud.bank_name, ud.ifsc_code, ud.ac_no, ud.ac_name, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd INNER join user_details as ud on cd.user_name = ud.mobile where cd.payment_type = 'Withdrawal' and cd.status = 'Success'",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, data: result });
        }
      }
    );
  } else if (req.body.status === "Canceled") {
    con.query(
      "SELECT cd.id, cd.user_name, ud.bank_name, ud.ifsc_code, ud.ac_no, ud.ac_name, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd INNER join user_details as ud on cd.user_name = ud.mobile where cd.payment_type = 'Withdrawal' and cd.status = 'Canceled'",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, data: result });
        }
      }
    );
  } else {
    con.query(
      "SELECT cd.id, cd.user_name, ud.bank_name, ud.ifsc_code, ud.ac_no, ud.ac_name, cd.reason, cd.payment_type, cd.balance, cd.status, cd.Approved_declined_By, cd.date FROM `deposit` as cd INNER join user_details as ud on cd.user_name = ud.mobile where cd.payment_type = 'Withdrawal'",
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, data: result });
        }
      }
    );
  }
});
app.post("/approve-withdrawal-request", verifytoken, (req, res) => {
  con.query(
    "UPDATE `deposit` SET `Approved_declined_By`=?,`status`='Success' WHERE `id`=? AND `user_name`=?",
    [req.body.username, req.body.id, req.body.mobile],
    (error, result) => {
      if (error) throw error;
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Approved User Details SuccessFully",
        });
      }
    }
  );
});
app.post("/decline-withdrawal-request", verifytoken, (req, res) => {
  con.query("SELECT * FROM `deposit` WHERE `payment_type` = 'Withdrawal' AND `id` = ?;", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      if (result[0].status == 'Canceled') {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Already Declined Withdrawal Request",
        });
      } if (result[0].status == 'Success') {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Already SuccessFully Withdrawal",
        });
      } else {
        con.query("UPDATE `deposit` SET `reason` = ?, `Approved_declined_By` = ?, `status` = 'Canceled' WHERE `id` = ?",
          [req.body.reason, req.body.username, req.body.id], (err, resultt) => {
            if (err) throw err;
            if (resultt) {
              con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?);",
                [req.body.id, req.body.id], (err, resultt) => {
                  if (err) throw err;
                  if (resultt) {
                    res.status(200).send({
                      error: false,
                      status: true,
                      massage: "Wallet Update SuccessFully",
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

app.post("/add-platform", verifytoken, (req, res) => {
  con.query(
    "INSERT INTO `platforms`(`name`) VALUES (?)",
    [req.body.name],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Added Details SuccessFully",
        });
      }
    }
  );
});
app.post('/get-platform-details', verifytoken, (req, res) => {
  con.query('SELECT * FROM `platforms` ', (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, data: result })
    }
  })
});
app.post("/update-platform-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `platforms` SET `name` = ? WHERE `id` = ?",
    [req.body.name, req.body.id],
    (err, result) => {
      if (err) {
        throw err;
      } if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Details SuccessFully",
        });
      }
    }
  );
});
app.post("/del-platform", verifytoken, (req, res) => {
  con.query("DELETE FROM `tasks_with_name` WHERE `platform_id` = ?", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result) {
      con.query("DELETE FROM `platforms` WHERE `id` = ?", [req.body.id], (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({ error: false, status: true, massage: 'PlatFrom Deleted SuccessFully' })
        }
      })
    }
  })
});

app.post("/add-level", verifytoken, (req, res) => {
  con.query("select * from `level` where `name` = ?", [req.body.name], (error, result2) => {
    if (error) { throw error }
    if (result2.length > 0) {
      res.status(302).json({
        error: false,
        status: true,
        massage: `Level ${req.body.name} is already Exist.`
      })
    } else {
      con.query("INSERT INTO `level`(`name`, `price`) VALUES (?,?)",
        [req.body.name, req.body.price],
        (err, result) => {
          if (err) {
            throw err;
          }
          if (result) {
            res.status(200).send({
              error: false,
              status: true,
              massage: "Added Details SuccessFully",
            });
          }
        }
      );
    }
  })
});
app.post('/get-level-details', verifytoken, (req, res) => {
  con.query('SELECT * FROM `level` ', (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, data: result })
    }
  })
});
app.post("/update-level-details", verifytoken, (req, res) => {
  con.query("select * from `level` where `name` = ?", [req.body.name], (error, result2) => {
    if (error) { throw error }
    if (result2.length > 0) {
      if (result2[0].id == req.body.id) {
        con.query("UPDATE `level` SET `name` = ?, `price` = ? WHERE `id` = ?", [req.body.name, req.body.price, req.body.id],
          (err, result) => {
            if (err) {
              throw err;
            } if (result) {
              res.status(200).send({
                error: false,
                status: true,
                massage: "Update Details SuccessFully",
              });
            }
          }
        );
      } else {
        res.status(302).json({
          error: false,
          status: true,
          massage: `Level ${req.body.name} is already Exist.`
        })
      }
    } else {
      con.query("UPDATE `level` SET `name` = ?, `price` = ? WHERE `id` = ?", [req.body.name, req.body.price, req.body.id],
        (err, result) => {
          if (err) {
            throw err;
          } if (result) {
            res.status(200).send({
              error: false,
              status: true,
              massage: "Update Details SuccessFully",
            });
          }
        }
      );
    }
  })
});
app.post("/del-level", verifytoken, (req, res) => {
  con.query("DELETE FROM `level` WHERE `id` = ?", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, massage: 'Level Details Deleted SuccessFully' })
    }
  })
});

app.post("/add-plan", verifytoken, (req, res) => {
  con.query(
    "INSERT INTO `plan`(`name`, `price`, `total_video`, `total_comment`, `total_like`, `total_video_price`, `total_video_comment`, `total_video_like`, `earn_upto`) VALUES (?,?,?,?,?,?,?,?,?)",
    [req.body.name, req.body.plan_price, req.body.video, req.body.comment, req.body.like, req.body.video_price, req.body.comment_price, req.body.like_price, req.body.monthly_income],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Added Details SuccessFully",
        });
      }
    }
  );
});
app.post('/get-plan-details', verifytoken, (req, res) => {
  con.query('SELECT * FROM `plan`', (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, data: result })
    }
  })
});
app.post("/update-plan-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `plan` SET `name` = ?, `price` = ? , `total_video` = ? , `total_comment` = ?, `total_like` = ?, `total_video_price` = ?, `total_video_comment` = ?, `total_video_like` = ?, `earn_upto` = ? WHERE `id` = ?",
    [req.body.name, req.body.plan_price, req.body.video, req.body.comment, req.body.like, req.body.video_price, req.body.comment_price, req.body.like_price, req.body.monthly_income, req.body.id],
    (err, result) => {
      if (err) {
        throw err;
      } if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Details SuccessFully",
        });
      }
    }
  );
});
app.post("/del-plan", verifytoken, (req, res) => {
  con.query("DELETE FROM `plan` WHERE `id` = ?", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, massage: 'Plan Deleted SuccessFully' })
    }
  })
});

app.post('/get-task-details', verifytoken, (req, res) => {
  con.query('SELECT tn.id,tn.task_url,tn.type,IFNULL(tn.`comment_details`, "") as comment_details,p.name,p.id as p_id,tn.date FROM `tasks_with_name` as tn INNER join platforms as p on tn.platform_id = p.id where tn.`type` = ? order by date(tn.`date`);', [req.body.type], (err, result2) => {
    if (err) throw err;
    if (result2) {
      con.query("SELECT ud.id,ud.mobile,(select SUM(p.total_video) as 'video' from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.status = 'Active' and bp.user_id = ud.mobile) as video,(select SUM(p.total_comment) as 'comment' from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.status = 'Active' and bp.user_id = ud.mobile) as 'comment',(select SUM(p.total_like) as 'like' from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.status = 'Active' and bp.user_id = ud.mobile) as 'like' FROM `user_details` as ud ", (err, result) => {
        if (err) throw err;
        if (result) {
          const video = result.reduce((prev, current) => ((prev.video > current.video) ? prev : current), 0);
          const like = result.reduce((prev, current) => ((prev.like > current.like) ? prev : current), 0);
          const comment = result.reduce((prev, current) => ((prev.comment > current.comment) ? prev : current), 0);
          con.query("select (SELECT COUNT(*) FROM `tasks_with_name` WHERE `type` = 'LIKE' and date(`date`) = CURRENT_DATE()) as 'like', (SELECT COUNT(*) FROM `tasks_with_name` WHERE `type` = 'VIDEO' and date(`date`) = CURRENT_DATE()) as video, (SELECT COUNT(*) FROM `tasks_with_name` WHERE `type` = 'COMMENT' and date(`date`) = CURRENT_DATE()) as comment", (err, resultt) => {
            if (err) throw err;
            if (resultt) {
              res.status(200).json({
                error: false,
                status: true,
                data: result2,
                today_task_video: resultt[0].video,
                video: video.video,
                today_task_like: resultt[0].like,
                like: like.like,
                today_task_comment: resultt[0].comment,
                comment: comment.comment
              })
            }
          })
        }
      })
    }
  })
});
app.post("/add-task-details", verifytoken, (req, res) => {
  if (req.body.type != 'LIKE') {
    if (req.body.comment == "") {
      con.query("SELECT * FROM `commets` ORDER BY RAND() LIMIT 1;", (err, resultt) => {
        if (err) throw err;
        if (resultt) {
          con.query(
            "INSERT INTO `tasks_with_name`(`task_url`, `type`, `platform_id`,`comment_details`) VALUES (?,?,?,?)",
            [req.body.url, req.body.type, req.body.platform, resultt[0].details],
            (err, result) => {
              if (err) {
                throw err;
              }
              if (result) {
                res.status(200).send({
                  error: false,
                  status: true,
                  massage: "Added Details SuccessFully",
                });
              }
            }
          );
        }
      })
    } else {
      con.query(
        "INSERT INTO `tasks_with_name`(`task_url`, `type`, `platform_id`,`comment_details`) VALUES (?,?,?,?)",
        [req.body.url, req.body.type, req.body.platform, req.body.comment],
        (err, result) => {
          if (err) {
            throw err;
          }
          if (result) {
            res.status(200).send({
              error: false,
              status: true,
              massage: "Added Details SuccessFully",
            });
          }
        }
      );
    }
  } else {
    con.query(
      "INSERT INTO `tasks_with_name`(`task_url`, `type`, `platform_id`) VALUES (?,?,?)",
      [req.body.url, req.body.type, req.body.platform],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).send({
            error: false,
            status: true,
            massage: "Added Details SuccessFully",
          });
        }
      }
    );
  }
});
app.post("/update-task-details", verifytoken, (req, res) => {
  con.query("UPDATE `tasks_with_name` SET `task_url` = ?, `type` = ?, `platform_id` = ?, `comment_details` = ?, `date` = ? WHERE `id` = ?",
    [req.body.url, req.body.type, req.body.platform, req.body.comment, req.body.date, req.body.id], (err, result) => {
      if (err) { throw err; }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Added Details SuccessFully",
        });
      }
    });
});
app.post("/add-video-task", vupload.single("video"), verifytoken, (req, res) => {
  con.query(
    "INSERT INTO `tasks_with_name`(`task_url`, `type`, `platform_id`) VALUES (?,?,?)",
    [req.file.destination + '/' + req.file.filename, req.body.type, req.body.platform],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Added Details SuccessFully",
        });
      }
    }
  )
});
app.post("/add-shopping-details", upload.single("s_image"), verifytoken, (req, res) => {
  con.query(
    "INSERT INTO `items`( `item_image`, `item_oprice`, `item_dprice`) VALUES (?,?,?)",
    [req.file.filename, req.body.oprice, req.body.dprice],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Added Details SuccessFully",
        });
      }
    }
  );
});
app.post('/get-shopping-details', verifytoken, (req, res) => {
  con.query('SELECT * FROM `items`', (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, data: result })
    }
  })
});

// BONUS Reffer 
app.post("/add-reffer-details", verifytoken, (req, res) => {
  con.query(
    "INSERT INTO `reffer_bonus`(`referral`, `applier`) VALUES (?,?)",
    [req.body.referral, req.body.applier],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Added Reffer Details SuccessFully",
        });
      }
    }
  );
});
app.post('/get-reffer-details', verifytoken, (req, res) => {
  con.query('SELECT * FROM `reffer_bonus`', (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, data: result })
    }
  })
});
app.post("/update-reffer-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `reffer_bonus` SET `referral` = ?, `applier` = ? WHERE `id` = ?",
    [req.body.referral, req.body.applier, req.body.id],
    (err, result) => {
      if (err) {
        throw err;
      } if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Details SuccessFully",
        });
      }
    }
  );
});
app.post("/del-reffer-details", verifytoken, (req, res) => {
  con.query(
    "DELETE FROM `reffer_bonus` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: true,
          massage: "Your Details has been deleted.",
        });
      }
    }
  );
});
app.post("/status-reffer-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `reffer_bonus` SET `status` = 'N' WHERE `status` = 'Y'",
    (err, result) => {
      if (err) throw err;
      if (result) {
        con.query(
          "UPDATE `reffer_bonus` SET `status` = ? WHERE `id` = ?",
          [req.body.status, req.body.id],
          (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json({
                error: false,
                status: true,
                massage: "Status Changed SuccessFully",
              });
            }
          }
        );
      }
    }
  );
});

// BONUS Offer 
app.post("/add-offer-details", verifytoken, (req, res) => {
  con.query("select * from `payment_bonus` where `offer_name` = ?", [req.body.offer_name], (err, results) => {
    if (err) {
      throw err;
    } if (results.length > 0) {
      res.status(302).send({
        error: true,
        status: false,
        massage: "Offer name is Already Exist",
      });
    } else {
      con.query(
        "INSERT INTO `payment_bonus`(`offer_name`, `percentage`, `amount_start`, `amount_end`, `times`, `end_date`) VALUES (?,?,?,?,?,?)",
        [req.body.offer_name, req.body.percentage, req.body.amount_from, req.body.amount_to, req.body.times, req.body.end_date],
        (err, result) => {
          if (err) {
            throw err;
          }
          if (result) {
            res.status(200).send({
              error: false,
              status: true,
              massage: "Added Offer Details SuccessFully",
            });
          }
        }
      );
    }
  })
});
app.post('/get-offer-details', verifytoken, (req, res) => {
  con.query('SELECT * FROM `payment_bonus`', (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({ error: false, status: true, data: result })
    }
  })
});
app.post("/update-offer-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `payment_bonus` SET `offer_name` = ?, `percentage` = ?, `amount_start` = ?, `amount_end` = ?,`times` = ?, `end_date` = ? WHERE `id` = ?",
    [req.body.offer_name, req.body.percentage, req.body.amount_from, req.body.amount_to, req.body.times, req.body.end_date, req.body.id],
    (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(302).send({
            error: true,
            status: false,
            massage: "Offer Name is already exist",
          });
        }
      } if (result) {
        res.status(200).send({
          error: false,
          status: true,
          massage: "Update Details SuccessFully",
        });
      }
    }
  );
});
app.post("/del-offer-details", verifytoken, (req, res) => {
  con.query(
    "DELETE FROM `payment_bonus` where id = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: true,
          massage: "Your Details has been deleted.",
        });
      }
    }
  );
});
app.post("/status-offer-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `payment_bonus` SET `status` = ? WHERE `id` = ?",
    [req.body.status, req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: true,
          massage: "Status Changed SuccessFully",
        });
      }
    }
  );
});


function verifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, SECRET_KEY_ADMIN, (err, auth) => {
      if (err) {
        jwt.verify(
          req.token,
          SECRET_KEY_SUPERADMIN,
          (err, auth) => {
            if (err) {
              res.status(403).send('Token Expire');
            } else {
              if (auth.username != req.body.username) {
                res.status(403).send("false");
              } else {
                next();
              }
            }
          }
        );
      } else {
        if (auth.username != req.body.username) {
          res.status(403).send("false");
        } else {
          next();
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
}
function agent(amount, user) {
  const percentage2 = ((5 / 100) * parseFloat(amount)).toFixed(2);
  const percentage3 = ((3 / 100) * parseFloat(amount)).toFixed(2);
  const percentage4 = ((2 / 100) * parseFloat(amount)).toFixed(2);
  const percentage5 = ((2 / 100) * parseFloat(amount)).toFixed(2);
  const percentage6 = ((1 / 100) * parseFloat(amount)).toFixed(2);
  const percentage7 = ((1 / 100) * parseFloat(amount)).toFixed(2);
  con.query("SELECT `reffer_code` as rc FROM `user_details` WHERE `user_name` = ?", [user], (err, result) => {
    if (err) throw err;
    if (result) {
      con.query("SELECT * FROM `user_level` WHERE `user_reffral` = ?", [result[0].rc], (err, level1) => {
        if (err) throw err;
        if (level1[0].level_1) {
          con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage2, level1[0].level_1]);
          con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, percentage2, 'Level 1']);
          if (level1[0].level_2 != null) {
            con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage3, level1[0].level_2]);
            con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_2, percentage3, 'Level 2']);
            if (level1[0].level_3 != null) {
              con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage4, level1[0].level_3]);
              con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_3, percentage4, 'Level 3']);
              if (level1[0].level_4 != null) {
                con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage5, level1[0].level_4]);
                con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_4, percentage5, 'Level 4']);
                if (level1[0].level_5 != null) {
                  con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage6, level1[0].level_5]);
                  con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_5, percentage6, 'Level 5']);
                  if (level1[0].level_6 != null) {
                    con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage7, level1[0].level_6]);
                    con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_6, percentage7, 'Level 6']);
                  } else {
                    con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage7).toFixed(2), level1[0].level_1]);
                    con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage7).toFixed(2), 'Level 1']);
                  }
                } else {
                  con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage6).toFixed(2), level1[0].level_1]);
                  con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage6).toFixed(2), 'Level 1']);
                }
              } else {
                con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage5).toFixed(2), level1[0].level_1]);
                con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage5).toFixed(2), 'Level 1']);
              }
            } else {
              con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage4).toFixed(2), level1[0].level_1]);
              con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage4).toFixed(2), 'Level 1']);
            }
          } else {
            con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage3).toFixed(2), level1[0].level_1]);
            con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage3).toFixed(2), 'Level 1']);
          }
        } else {
          con.query("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage2).toFixed(2), level1[0].level_1]);
          con.query("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage2).toFixed(2), 'Level 1']);
        }
      })
    }
  })
}

module.exports = app;