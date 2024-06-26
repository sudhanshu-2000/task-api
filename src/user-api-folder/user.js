const express = require("express");
const app = express.Router();
exports.app = app;
const con = require("../db/conn");
var jwt = require("jsonwebtoken");
var atob = require('atob');
var btoa = require('btoa');
const cors = require("cors");
app.use(cors());
require("dotenv").config();
SECRET_KEY_USER = ':3.*1>.<2e_1>&b:5.9x_d,86ac3b:-5%1$%?0$*c>4e7,6aa<e?3.8:<8%28<801?0c66d885!?%6@d:_2a_07-1!+c?+%@4$.?>c<d&?<a$b5:*^b9&-&70d-3&@<&&4^e?99$@:1<fdd@9?bc,-?5*d4e_1f6?%,.5c08c6b_1_^,%1.7:4<,341,d%9d-3e4%d6-9.-:f@+$bc5&!-@24e^7cac*+ee:@4>8-+@0!8*&0f<8<.$^&$b43f!d<-$@d3<+a5c_&19^4a2^_?c0d:_6c1+d*_a_:6:3c43.41^2:59ae%b_e&^-d4a$*4b8c+<0@!1a%59.<e3_:68-_e8+4%d!4-360$5%1@+&0!^?d6fcf,?_.8..-f62-+<,_!bf&>a+?f2*0c61!-^7__1448c:60*^?_!9&:1b7>d^@2fa78^2%44*--d.86a<b<8d681^bb5*396&dd_6.^.^$d2:!!<,8@5&^&+*32506658>!_fd8.04@&*5%-.6^4>e99_0ce*@f6$*-d?d4<5?*cd7-26a%&,!4%4904,a!4*12_+93c&+^$24ad_8974d-!.0a$:<:>9&7@&+.a!?0_%*<-69@a07-^_5ce.&cb>32a626,>@,6_6!:5+:2c_7<bc34%8-3^_4<,5%1-@7a,^>>0:+0:2&a^_^9_.b>::^&f+d+@?ded9d7,dc5?3:@1-??7@c0**47-a2c4b:%f&5-!>e_<95d<7.ff--_a-9b&ac:?,6332f!5_>>f>6c@1!:<<__:>0>.^>c@$935?+&--&->$f%23<fa4<44^,>c8-_@a@bd*:e7838*c!>b>,!9%b52!*<*?029.9-44%9@70!^.5bc%b&d4bb$@6&9@8!69+*4$,96<4816c&8+0e4a372e,<47+%5_^bbce-3^409-0f%44!:2e@5+-f3,8_d.de3d_7&a72:,*5-!-c255!&^.1@&:0e&$2!5c9+*e-+fd*+@6%7&0<>-0%c$d^4!-';
SECRET_KEY_VERIFY = ':3.*1>.<2e_1>&b:5.9x_d,86ac3b:-5%1$%?0$*c>4e7,6aa<e?3.6d885!?%6@d:_2a_07-1!+c?+%@4$.?>c<d&?<a$b5:*^b9&-&wetfghjdskf3&@<&&4^e?99$@:1<fdd@9?bc,-?5*d4e_1f6?%,.5c08c6b_1_^,%1.7:4<,341,d%9d-3e4%d6-9.-:f@+$bc5&!-@24e^7cac*+ee:@4>8-+@0!8*&0f<8<.$^&$b43f!d<-$@d3<+a5c_&19^4a2^_?c0d:_6c1+d*_a_:6:3c43.41^2:59ae%b_e&^-d4a$*4b8c+<0@!1a%59.<e3_:68-_e8+4%d!4-360$5%1@+&0!^?d6fcf,?_.8..-f62-+<,_!bf&>a+?f2*0c61!-^7__1448c:60*^?_!9&:1b7>d^@2fa78^2%44*--d.86a<b<8d681^bb5*396&dd_6.^.^$d2:!!<,8@5&^&+*32506658>!_fd8.04@&*5%-.6^4>e99_0ce*@f6$*-d?d4<5?*cd7-26a%&,!4%4904,a!4*12_+93c&+^$24ad_8974d-!.0a$:<:>9&7@&+.a!?0_%*<-69@a07-^_5ce.&cb>32a626,>@,6_6!:5+:2c_7<bc34%8-3^_4<,5%1-@7a,^>>0:+0:2&a^_^9_.b>::^&f+d+@?ded9d7,dc5?3:@1-??7@c0**47-a2c4b:%f&5-!>e_<95d<7.ff--_a-9b&ac:?,6332f!5_>>f>6c@1!:<<__:>0>.^>c@$935?+&--&->$f%23<fa4<44^,>c8-_@a@bd*:e7838*c!>b>,!9%b52!*<*?029.9-44%9@70!^.5bc%b&d4bb$@6&9@8!69+*4$,96<4816c&8+0e4a372e,<47+%5_^bbce-3^409-0f%44!:2e@5+-f3,8_d.de3d_7&a72:,*5-!-c255!&^.1@&:0e&$2!5c9+*e-+fd*+@6%7&0<>-0%c$d^4!-';
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var multer = require("multer");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000,
}));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/deposit");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: storage });
const fs = require('fs');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  name: "mail.earnkrobharat.com",
  host: "mail.earnkrobharat.com",
  port: 465,
  secure: true,
  auth: {
    user: "otp@earnkrobharat.com",
    pass: "BXk)79NHb6si",
  },
});
app.get('/get', (req, res) => {
  res.status(200).send("Hello");
});

app.post("/register", (req, res) => {
  let codecode = code();
  con.query("SELECT * FROM `user_details` WHERE `email` = ?;", [req.body.email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(302).json({
        error: true,
        status: false,
        message: "Email Id is Already Exist",
      });
    } else {
      con.query("SELECT * FROM `user_details` WHERE `mobile` = ?;", [req.body.mobile], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.status(302).json({
            error: true,
            status: false,
            message: "Mobile Number is Already Exist",
          });
        } else {
          con.query("SELECT (IFNULL(MAX(uid),100000)) as id FROM user_details", (err, ides) => {
            if (err) throw err;
            if (result) {
              const hash = bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync(12)
              );
              if (req.body.reffer_by == "" || JSON.stringify(req.body.reffer_by) == "null") {
                con.query("INSERT INTO `user_details`(`mobile`, `username`, `password`,`email`, `uid`, `reffer_by`, `reffer_code`) VALUES (?,?,?,?,?,?,?)",
                  [req.body.mobile, req.body.user_name, hash, req.body.email, parseInt(ides[0].id) + 1, '5Zw8gbwv', codecode], (err, result) => {
                    if (err) throw err;
                    if (result) {
                      con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                      reffer(codecode, '5Zw8gbwv');
                      res.status(200).json({
                        error: false,
                        status: true,
                        message: "Registered Successfully",
                      });
                    }
                  }
                );
              } else {
                con.query("select * from user_details where `reffer_code` = ?", [req.body.reffer_by], (err, result) => {
                  if (err) throw err;
                  if (result.length > 0) {
                    con.query("INSERT INTO `user_details`(`mobile`, `username`, `password`, `email`, `uid`, `reffer_by`, `reffer_code`) VALUES (?,?,?,?,?,?,?)",
                      [req.body.mobile, req.body.user_name, hash, req.body.email, parseInt(ides[0].id) + 1, req.body.reffer_by, codecode], (err, result) => {
                        if (err) throw err;
                        if (result) {
                          con.query("SELECT MAX(`name`) as c FROM `level`", (err0, result0) => {
                            if (err0) { throw err0; }
                            if (result0[0].c == 1) {
                              reffer(codecode, '5Zw8gbwv');
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else if (result0[0].c == 2) {
                              reffer2(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else if (result0[0].c == 3) {
                              reffer3(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else if (result0[0].c == 4) {
                              reffer4(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else if (result0[0].c == 5) {
                              reffer5(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else if (result0[0].c == 6) {
                              reffer6(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else if (result0[0].c == 7) {
                              reffer7(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else if (result0[0].c == 8) {
                              reffer8(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            } else {
                              reffer9(codecode, req.body.reffer_by);
                              con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                              res.status(200).json({
                                error: false,
                                status: true,
                                message: "Registered Successfully",
                              });
                            }
                          })
                        }
                      }
                    );
                  } else {
                    res.status(404).json({
                      error: true,
                      status: false,
                      message: "This refferal Code is not valid.",
                    });
                  }
                })
              }
            }
          });
        }
      }
      );
    }
  }
  );
});
app.post("/login", (req, res) => {
  if (typeof (req.body.password) == 'number') {
    res.status(302).json({
      error: true,
      status: false,
      message: "Password Must be require String value",
    });
  }
  else
    con.query(
      "select * from user_details where mobile = ?",
      [req.body.mobile],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const status = bcrypt.compareSync(
            req.body.password,
            result[0].password
          );
          if (status == true) {
            var token = jwt.sign(
              { username: result[0].mobile },
              SECRET_KEY_USER, { expiresIn: '1d' },
            );
            con.query("SELECT * FROM `buy_plan` WHERE `user_id` = ? AND `status` = 'Active'", [req.body.mobile], (err, result32) => {
              if (err) throw err;
              if (result32) {
                con.query("UPDATE `user_details` SET `is_active` = 'Y' WHERE `mobile` = ?", [req.body.mobile], (err, resulrt) => {
                  if (err) { throw err; }
                  if (resulrt) {
                    res.status(200).json({
                      error: false,
                      status: true,
                      ID: result[0].uid,
                      username: result[0].username,
                      mobile: result[0].mobile,
                      message: "Login Successfully",
                      token,
                    });
                  }
                });
              }
            })
          } else {
            res.status(404).json({
              error: true,
              status: false,
              message: "Mobile Or Password is Wrong",
            });
          }
        } else {
          res.status(404).json({
            error: true,
            message: "Mobile Number is Not Exist",
          });
        }
      }
    );
});
app.post("/logout", (req, res) => {
  con.query("UPDATE `user_details` SET `is_active` = 'N' WHERE `mobile` = ?", [req.body.mobile], (err, result) => {
    if (err) { throw err; }
    if (result) {
      res.status(200).json({ error: false, status: true });
    }
  })
});
app.post('/buy-plan', verifytoken, (req, res) => {
  con.query("select * from `plan` where `id` = ?", [req.body.id], (err, result1) => {
    if (err) { throw err }
    if (result1.length == 0) {
      res.status(302).json({
        error: true,
        status: false,
        massage: "Invaild Plan Id",
      });
    } else {
      if (req.body.id == 1) {
        res.status(302).json({
          error: true,
          status: false,
          massage: "You can't Purchase this Plan.",
        });
      } else {
        con.query("SELECT IF(`wallet_balance` >= ?, 'true', 'false') as result FROM wallet WHERE `user_name` = ?;",
          [parseInt(result1[0].price), req.body.mobile], (error, result) => {
            if (error) {
              throw error;
            }
            if (result[0].result === "true") {
              con.query("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?",
                [parseInt(result1[0].price), req.body.mobile], (err, resultt) => {
                  if (err) throw err;
                  if (resultt) {
                    con.query("INSERT INTO `buy_plan`(`user_id`, `plan_id`, `expire_date`) VALUES (?, ?, DATE_ADD(CURDATE(), INTERVAL 30 DAY))", [req.body.mobile, req.body.id], (err, result) => {
                      if (err) throw err;
                      if (result) {
                        con.query("INSERT INTO `deposit`(`user_name`, `balance`, `status`, `payment_type`, `Approved_declined_By`) VALUES (?, ?, 'Success', 'Plan Buy', 'By User')", [req.body.mobile, parseInt(result1[0].price)]);
                        reffer_bonus(req.body.mobile);
                        res.status(200).json({
                          error: false,
                          status: true
                        });
                      }
                    });
                  }
                }
              );
            } else {
              res.status(302).json({
                error: true,
                status: false,
                massage: "Insufficient Balance in your Winning wallet",
              });
            }
          }
        );
      }
    }
  })
})
app.post("/get-plans", (req, res) => {
  // req.body = JSON.parse(atob(req.body.data));
  con.query("select * from `plan`", (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result
      });
    }
  })
})
app.post('/check-user-existance', (req, res) => {
  con.query("SELECT * FROM `user_details` WHERE `email` = ?;", [req.body.email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json({
        error: true,
        status: false,
        message: "Email Id is Already Exist",
      });
    } else {
      con.query("SELECT * FROM `user_details` WHERE `mobile` = ?;", [req.body.mobile], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.status(200).json({
            error: true,
            status: false,
            message: "Mobile Number is Already Exist",
          });
        } else {
          if (req.body.reffer_by == "" || JSON.stringify(req.body.reffer_by) == "null") {
            res.status(200).json({
              error: false,
              status: true
            });
          } else {
            con.query("select * from user_details where `reffer_code` = ?", [req.body.reffer_by], (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                res.status(200).json({
                  error: false,
                  status: true
                });
              } else {
                res.status(200).json({
                  error: true,
                  status: false,
                  message: "This refferal Code is not valid.",
                });
              }
            })
          }
        }
      }
      );
    }
  }
  );
})
// get-current-plans
app.post("/get-current-plans", (req, res) => {
  con.query("select bp.id,p.name,p.price,p.total_video,p.total_comment,p.total_like,p.total_video_price,bp.status,p.total_video_comment,p.total_video_like,p.earn_upto,bp.expire_date,bp.date from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?", [req.body.mobile], (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result
      });
    }
  })
})
app.post("/change-password", verifytoken, (req, res) => {
  con.query("select * from user_details where `mobile` = ?", [req.body.mobile], (err, result) => {
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
        con.query("UPDATE `user_details` SET `password` = ? WHERE `mobile` = ?", [hash, req.body.mobile], (err, result) => {
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
app.post("/forget-password", (req, res) => {
  jwt.verify(req.body.token, SECRET_KEY_VERIFY, (err, auth) => {
    if (err) {
      res.status(200).json({
        error: true,
        status: false,
        message: "Invaild Details.",
      });
    } else {
      if (auth.email == req.body.email) {
        con.query("select * from user_details where `email` = ?", [req.body.email], (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            const hash = bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(12)
            );
            con.query("UPDATE `user_details` SET `password` = ? WHERE `email` = ?", [hash, req.body.email], (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).json({
                  error: false,
                  status: true,
                  message: "Forget Password Successfully",
                });
              }
            }
            );
          } else {
            res.status(200).json({
              error: true,
              message: "Email Id is Not Exist.",
            });
          }

        }
        );
      } else {
        res.status(200).json({
          error: true,
          status: false,
          message: "Invaild Details.",
        });
      }
    }
  });
});
app.post("/user-details", verifytoken, (req, res) => {
  con.query("SELECT ud.id, ud.username as uname, ud.mobile,(SELECT IF(COUNT(*) = 0 , 'false', 'true') FROM `buy_plan` WHERE `user_id` = ud.mobile AND `status` = 'Active') as pstatus, (SELECT sum(amount) FROM `statement` WHERE `mobile` = ud.mobile) as total_earnning, w.wallet_balance, w.winning_wallet as winning_balance, ud.email, ud.bank_name, ud.ifsc_code, ud.ac_no, ud.ac_name, ud.pincode, ud.uid, ud.reffer_code, ud.plan_type, (select SUM(p.total_video) from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?) as total_video,(select SUM(p.total_comment) from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?) as total_comment, (select SUM(p.total_like) from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?) as total_like,(select SUM(p.total_video_price) from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?) as total_video_price,(select SUM(p.total_video_comment) from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?) as total_comment_price,(select SUM(p.total_video_like) from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?) as total_like_price, ud.date FROM `user_details` as ud INNER join `wallet` as w on ud.`mobile` = w.user_name WHERE `mobile` = ?",
    [req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile,], (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          stutus: true,
          data: result,
        });
      }
    }
  );
});
app.post("/update-user-details", verifytoken, (req, res) => {
  const cid = req.body.mobile;
  let
    allowedcolumns = ["username", "pincode", "upi_id", "bank_name", "ifsc_code", "ac_no", "ac_name"],
    stmts = [],
    values = [];
  for (let c of allowedcolumns) {
    if (c in req.body) {
      stmts.push(`${c} = ?`),
        values.push(req.body[c]);
    }
  }
  if (stmts.length == 0) {
    return res.sendStatus(204);
  }
  values.push(cid);
  con.query(`UPDATE user_details SET ${stmts.join(", ")} WHERE mobile = ?`, values, (err, result) => {
    if (err) {
      con.query("SELECT email FROM `user_details` WHERE `mobile` = ?", [req.body.mobile], (err2, email) => {
        if (err2) { throw err2; };
        if (email[0].email == null) {
          res.status(302).json({
            error: true,
            status: false,
            massage: "Email id id already Exist"
          })
        } else {
          if (email[0].email == (err.sqlMessage).split("'")[1]) {
            con.query(`UPDATE user_details SET ${stmts.join(", ")} WHERE mobile = ?`, values)
          } else
            res.status(302).json({
              error: true,
              status: false,
              massage: "Email id id already Exist"
            })
        }
      })
    };
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        // data: result,
      });
    }
  })

});
app.post("/get-pay-method", verifytoken, (req, res) => {
  con.query("SELECT * FROM `new_payment_details` WHERE status = 'Y'", (err, result) => {
    if (err) throw err;
    if (result)
      res.status(200).json({
        error: false,
        status: true,
        data: result,
      });
  }
  );
});
app.post("/wallet-balance", verifytoken, (req, res) => {
  // req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT * FROM `wallet` WHERE user_name = ?",
    [req.body.mobile],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: "Success",
          data: result
        });
      }
    }
  );
});

app.post("/get-statement", verifytoken, (req, res) => {
  con.query(
    "SELECT s.mobile, s.type, s.amount, s.total_balance,s.date FROM `statement` as s WHERE `mobile` = ?", [req.body.mobile],
    (err, result) => {
      if (err) throw err;
      if (result)
        res.status(200).json({
          error: false,
          status: true,
          data: result,
        });
    }
  );
})
app.post("/get-statement-date", verifytoken, (req, res) => {
  con.query('select (SELECT IFNULL(sum(`amount`), 0) as today FROM `statement` WHERE date(`date`)= CURRENT_DATE() and `mobile`= ?) as today, (SELECT IFNULL(sum(`amount`), 0) as yesterday FROM `statement` WHERE date(`date`)= CURRENT_DATE()-1  and `mobile`= ?) as yesterday, (SELECT IFNULL(sum(`amount`), 0) as week FROM `statement` WHERE date(`date`)  BETWEEN CURRENT_DATE()-7 AND CURRENT_DATE()  and `mobile`= ?) as week, (SELECT IFNULL(sum(`amount`), 0) as month FROM `statement` WHERE date(`date`)  BETWEEN CURRENT_DATE()-30 AND CURRENT_DATE() and `mobile`= ?) as month', [req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result,
      });
    }
  })
})

app.post("/withdrawal-balace", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT `wallet_balance` FROM `wallet` WHERE user_name = ?",
    [req.body.mobile],
    (err, result) => {
      if (err) throw err;
      if (result) {
        con.query(
          "UPDATE `wallet` SET `wallet_balance` = ?, WHERE mobile = ?",
          req.body.wallet,
          (err, result) => {
            if (err) {
              throw err;
            }
            if (result.length > 0) {
              res.status(200).json({
                error: false,
                status: true,
                msg: "your wallet is update",
              });
            } else {
              res.status(403).json({
                error: false,
                status: true,
                msg: "your wallet is not a update",
              });
            }
          }
        );
      }
    }
  );
});

app.post("/get-otp", (req, res) => {
  const val = Math.floor(1000 + Math.random() * 9000);
  const hash = bcrypt.hashSync(val.toString(), bcrypt.genSaltSync(12));
  con.query("SELECT * FROM `otp` WHERE `number` = ?", [req.body.email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      transporter.sendMail({
        from: 'otp@earnkrobharat.com',
        to: req.body.email,
        subject: "OTP Verification",
        text: "To Create your Acoount",
        html: `Your OTP is <b>${val.toString()}</b>, valid for 10 min`,
      });
      con.query("DELETE FROM `otp` WHERE `date` < DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL -10 MINUTE)");
      con.query("UPDATE `otp` SET `otp` = ? WHERE `number` = ?", [hash, req.body.email], (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).json({
            error: false,
            status: true,
          });
        }
      });
    } else {
      con.query("DELETE FROM `otp` WHERE `date` < DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL -10 MINUTE)");
      transporter.sendMail({
        from: 'otp@earnkrobharat.com',
        to: req.body.email,
        subject: "OTP Verification",
        text: "To Create your Acoount",
        html: `Your OTP is <b>${val.toString()}</b>, valid for 10 min`,
      });
      con.query("INSERT INTO `otp`(`otp`, `number`) VALUES (?,?)", [hash, req.body.email], (err, result) => {
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
app.post("/verify-otp", (req, res) => {
  con.query("SELECT * FROM `otp` where number = ?", [req.body.email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const match = bcrypt.compareSync((req.body.otp).toString(), result[0].otp);
      if (match == true) {
        con.query("delete from `otp` where number = ?", [req.body.email]);
        var token = jwt.sign(
          { email: req.body.email },
          SECRET_KEY_VERIFY, { expiresIn: '5M' },
        );
        res.status(200).json({
          error: false,
          status: true,
          token,
          msg: "OTP Verifyed",
        });
      } else {
        res.status(200).json({
          error: true,
          status: false,
          msg: "Wrong OTP",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        status: false,
        msg: "OTP Expired",
      });
    }
  }
  );
});

app.post("/get-pay-deatils", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT cpd.id, cpd.mobile_no, cpm.name as pname, cpd.name, cpd.UPI_id, cpd.QR_code, cpd.bank_name, cpd.account_no, cpd.ifsc_code, cpd.account_type, cpm.icon, cpd.status, cpd.date FROM `payment_details` as cpd inner join payment_method as cpm on cpd.paymethod_id = cpm.id where cpd.status = 'Y' and cpd.paymethod_id = ?;",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result)
        res.status(200).json({
          error: false,
          status: true,
          data: result,
        });
    }
  );
});

app.post("/deposit-request", upload.single("d_image"), verifytoken, (req, res) => {
  con.query("SELECT * FROM `deposit` WHERE `user_name` = ? and `payment_type` = 'Deposit' and `status`= 'Pending'", [req.body.mobile], (err, result) => {
    if (err) { throw err; }
    if (result.length == 0) {
      if (req.file == undefined) {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Image Required",
        });
      } else {
        con.query("INSERT INTO `deposit`(`user_name`, `balance`, `image`,`image_path`, `payment_type`, `paymethod_id`,`transaction_id`) VALUES (?,?,?,?,?,?,?)",
          [req.body.mobile, req.body.amount, req.file.filename, req.file.destination + '/', 'Deposit', req.body.deposit_id, req.body.transection_id],
          (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(201).json({
                error: false,
                status: true,
                massage: "Add Deposit Request",
              });
            }
          }
        );
      }
    } else {
      if (req.file == undefined) {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Already Added Deposit Request.",
        });
      } else {
        deleteImage(req.file.destination + '/' + req.file.filename);
        res.status(302).json({
          error: true,
          status: false,
          massage: "Already Added Deposit Request.",
        });
      }
    }
  })
});
app.post("/get-deposit-request", verifytoken, (req, res) => {
  con.query(
    "SELECT cd.id,cd.user_name,cd.balance as amount,cd.image,cd.upi_id,cd.image_path,cd.reason,cd.transaction_id,cd.payment_type, cd.status,pd.name,pd.upi_id,pd.qr_code,pd.number,pd.ac_holder_name,pd.ac_no,cd.bank_name as ubank_details, cd.ifsc_code as uifsc_code, cd.ac_no as uac_no, cd.ac_name as uac_holder_name, pd.ac_type,pd.ifsc_code,pd.bank_name,pd.type,cd.date FROM `deposit` as cd LEFT JOIN `new_payment_details` as pd on cd.paymethod_id = pd.id where cd.`user_name` = ?;",
    [req.body.mobile],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: true,
          data: result,
        });
      }
    }
  );
});
app.post("/add-withdrawal-request", verifytoken, (req, res) => {
  con.query("SELECT * FROM `deposit` WHERE `user_name` = ? and `payment_type` = 'Withdrawal' and `status`= 'Pending'", [req.body.mobile], (err, result) => {
    if (err) { throw err; }
    if (result.length == 0) {
      if (99 > parseInt(req.body.amount)) {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Minimum Balance withdrawal is 100.",
        });
      } else {
        if (req.body.amount == '' || req.body.mobile == '') {
          res.status(302).json({
            error: true,
            status: false,
            massage: "You Must have to fill all the details.",
          });
        } else {
          con.query('SELECT `bank_name`,`ifsc_code`,`ac_no`,`ac_name` FROM `user_details` WHERE `mobile` = ?', [req.body.mobile], (err1, result1) => {
            if (err1) throw err1;
            if (result1) {
              if (!result1[0].bank_name) {
                res.status(302).json({
                  error: true,
                  status: false,
                  massage: "You Must have to fill Bank Name.",
                });
              } else if (!result1[0].ifsc_code) {
                res.status(302).json({
                  error: true,
                  status: false,
                  massage: "You Must have to fill IFSC Code.",
                });
              } else if (!result1[0].ac_no) {
                res.status(302).json({
                  error: true,
                  status: false,
                  massage: "You Must have to fill Account No.",
                });
              } else if (!result1[0].ac_name) {
                res.status(302).json({
                  error: true,
                  status: false,
                  massage: "You Must have to fill Account Name.",
                });
              } else {
                con.query("SELECT IF(`winning_wallet` >= ?, 'true', 'false') as result FROM wallet WHERE `user_name` = ?;",
                  [parseInt(req.body.amount), req.body.mobile],
                  (error, result) => {
                    if (error) {
                      throw error;
                    }
                    if (result[0].result === "true") {
                      con.query(
                        "UPDATE `wallet` SET `winning_wallet` = `winning_wallet` - ? WHERE `user_name` = ?",
                        [parseInt(req.body.amount), req.body.mobile],
                        (err, resultt) => {
                          if (err) throw err;
                          if (resultt) {
                            con.query(
                              "INSERT INTO `deposit`(`user_name`, `balance`, `payment_type`,`bank_name`,`ifsc_code`,`ac_no`,`ac_name`) VALUES (?,?,'Withdrawal',?,?,?,?)",
                              [
                                req.body.mobile,
                                req.body.amount,
                                result1[0].bank_name,
                                result1[0].ifsc_code,
                                result1[0].ac_no,
                                result1[0].ac_name
                              ],
                              (err, resultt) => {
                                if (err) throw err;
                                if (resultt) {
                                  res.status(200).json({
                                    error: false,
                                    status: true,
                                    massage: "Added withdrawal Request SuccessFully",
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    } else {
                      res.status(302).json({
                        error: true,
                        status: false,
                        massage: "Insufficient Balance in your Winning wallet",
                      });
                    }
                  }
                );
              }
            }
          })
        }
      }
    } else {
      res.status(302).json({
        error: true,
        status: false,
        massage: "Already Added Withdrawal Request.",
      });
    }
  })
});
app.post("/decline-withdrawal-request", verifytoken, (req, res) => {
  con.query("SELECT * FROM `deposit` WHERE `payment_type` = 'Withdrawal' AND `id` = ?;", [req.body.id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      if (result[0].status == 'Cancelled') {
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
        con.query("UPDATE `deposit` SET `reason` = ?, `Approved_declined_By` = ?, `status` = 'Cancelled' WHERE `id` = ? AND `user_name` = ?",
          ['.', 'By User', req.body.id, req.body.mobile], (err, resultt) => {
            if (err) throw err;
            if (resultt) {
              con.query(
                "UPDATE `wallet` SET `winning_wallet` = winning_wallet + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = ?;",
                [req.body.id, req.body.mobile], (err, resultt) => {
                  if (err) throw err;
                  if (resultt) {
                    res.status(200).json({
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
    } else {
      res.status(302).json({
        error: true,
        status: false,
        massage: "This is an withdrawal Request.you can't decline Deposit Request",
      });
    }
  })
});
app.post("/get-task-like", verifytoken, (req, res) => {
  let aa = [];
  let dataArray = [];
  let newArray = [];
  con.query("SELECT twn.id, twn.id as 'tid',twn.task_url,twn.type,(SELECT p.name from platforms as p where p.id = twn.platform_id) as platform,'Pending' as 'status' FROM `tasks_with_name` as twn WHERE date(twn.`date`) = CURRENT_DATE() and twn.type = 'LIKE';", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      dataArray = result;
      con.query("SELECT att.id,att.task_id as 'tid',tn.task_url,tn.type,(select p.name from platforms as p where p.id = tn.platform_id) as platform,att.status FROM `assign_task` as att INNER join user_details as ud on att.user_id=ud.id INNER join tasks_with_name as tn on att.task_id = tn.id where ud.mobile = ? && tn.type = 'LIKE' and date(att.date) = CURRENT_DATE();", [req.body.mobile], (err, result2) => {
        if (err) throw err;
        if (result2) {
          aa = dataArray.concat(result2);
          let uniqueObject = {};
          for (let i in aa) {
            objTitle = aa[i]['tid'];
            uniqueObject[objTitle] = aa[i];
          }
          for (i in uniqueObject) {
            newArray.push(uniqueObject[i]);
          }
          res.status(200).json({
            error: false,
            status: true,
            data: newArray
          });
        }
      })
    }
  })
})
app.post("/get-task-comment", verifytoken, (req, res) => {
  let aa = [];
  let dataArray = [];
  let newArray = [];
  con.query("SELECT twn.id,twn.id as 'tid',twn.task_url,twn.type,(SELECT p.name from platforms as p where p.id = twn.platform_id) as platform,'Pending' as 'status' FROM `tasks_with_name` as twn WHERE date(twn.`date`) = CURRENT_DATE() and twn.type = 'COMMENT';", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      dataArray = result;
      con.query("SELECT att.id,att.task_id as 'tid',ud.mobile,tn.task_url,tn.type,(select p.name from platforms as p where p.id = tn.platform_id) as platform,att.status FROM `assign_task` as att INNER join user_details as ud on att.user_id=ud.id INNER join tasks_with_name as tn on att.task_id = tn.id where ud.mobile = ? && tn.type = 'COMMENT' and date(att.date) = CURRENT_DATE();", [req.body.mobile], (err, result2) => {
        if (err) throw err;
        if (result2) {
          aa = dataArray.concat(result2);
          let uniqueObject = {};
          for (let i in aa) {
            objTitle = aa[i]['tid'];
            uniqueObject[objTitle] = aa[i];
          }
          for (i in uniqueObject) {
            newArray.push(uniqueObject[i]);
          }
          let newObjects = newArray.flatMap(e =>
            Array(e.tid).fill({ id: e.id, task_url: e.task_url, type: e.type, platform: e.platform, status: e.status })
          );
          res.status(200).json({
            error: false,
            status: true,
            data: newArray
          });
        }
      })
    }
  })
})
app.post("/get-video-task", verifytoken, (req, res) => {
  let aa = [];
  let dataArray = [];
  let newArray = [];
  con.query("SELECT twn.id,twn.id as 'tid',twn.task_url,twn.type,(SELECT p.name from platforms as p where p.id = twn.platform_id) as platform,'Pending' as 'status' FROM `tasks_with_name` as twn WHERE date(twn.`date`) = CURRENT_DATE() and twn.type = 'VIDEO';", (err, result) => {
    if (err) throw err;
    if (result) {
      dataArray = result;
      con.query("SELECT att.id,att.task_id as 'tid',ud.mobile,tn.task_url,tn.type,(select p.name from platforms as p where p.id = tn.platform_id) as platform,att.status FROM `assign_task` as att INNER join user_details as ud on att.user_id=ud.id INNER join tasks_with_name as tn on att.task_id = tn.id where ud.mobile = ? && tn.type = 'VIDEO' and date(att.date) = CURRENT_DATE();", [req.body.mobile], (err, result2) => {
        if (err) throw err;
        if (result2) {
          aa = dataArray.concat(result2);
          let uniqueObject = {};
          for (let i in aa) {
            objTitle = aa[i]['tid'];
            uniqueObject[objTitle] = aa[i];
          }
          for (i in uniqueObject) {
            newArray.push(uniqueObject[i]);
          }
          let newObjects = newArray.flatMap(e =>
            Array(e.tid).fill({ id: e.id, task_url: e.task_url, type: e.type, platform: e.platform, status: e.status })
          );
          res.status(200).json({
            error: false,
            status: true,
            data: newArray
          });
        }
      })
    }
  })
})
app.post("/update-task", verifytoken, (req, res) => {
  if (req.body.username == "") {
    res.status(302).json({
      error: true,
      status: false,
      massage: "Username is required",
    });
  } else if (req.body.status == "") {
    res.status(302).json({
      error: true,
      status: false,
      massage: "Status is required",
    });
  } else if (req.body.mobile == "") {
    res.status(302).json({
      error: true,
      status: false,
      massage: "Mobile Number is required",
    });
  } else if (req.body.id == "") {
    res.status(302).json({
      error: true,
      status: false,
      massage: "Id is required",
    });
  }
  else {
    if (req.body.status == "Pending") {
      con.query("SELECT * FROM `assign_task` WHERE `user_id` = (select ud.id from user_details as ud where ud.mobile = ?) AND `username` = ? AND `task_id` = ? AND date(`date`) = CURRENT_DATE();",
        [req.body.mobile, req.body.username, req.body.id], (err1, result1) => {
          if (err1) { throw err1 }
          if (result1.length > 0) {
            res.status(302).json({
              error: true,
              status: false,
              massage: "This Username Is Already Used",
            });
          } else {
            con.query("INSERT INTO `assign_task`(`user_id`, `task_id`, `username`, `status`) VALUES ((select ud.id from user_details as ud where ud.mobile = ?),?,?,'Verifying')",
              [req.body.mobile, req.body.id, req.body.username], (err, result) => {
                if (err) throw err;
                if (result) {
                  res.status(200).json({
                    error: false,
                    status: true,
                    massage: "Update Task SuccessFully",
                  });
                }
              })
          }
        })
    } else {
      con.query("SELECT * FROM `assign_task` WHERE `user_id` = (select ud.id from user_details as ud where ud.mobile = ?) AND `id` = ? AND date(`date`) = CURRENT_DATE();",
        [req.body.mobile, req.body.id], (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            con.query("SELECT * FROM `assign_task` WHERE `username` = ? AND `id` = ? AND date(`date`) = CURRENT_DATE();", [req.body.username, req.body.id], (err1, result1) => {
              if (err1) { throw err1 }
              if (result1.length > 0) {
                res.status(302).json({
                  error: true,
                  status: false,
                  massage: "This Username Is Already Used",
                });
              } else {
                con.query("UPDATE `assign_task` SET `username`=?, `status` = ?,`approved_declined_by`= '' WHERE `id` = ? AND `user_id` = (select ud.id from user_details as ud where ud.mobile = ?) AND date(date) = CURRENT_DATE()", [req.body.username, 'Verifying', req.body.id, req.body.mobile], (err2, result2) => {
                  if (err2) { throw err2 }
                  if (result2) {
                    res.status(200).json({
                      error: false,
                      status: true,
                      massage: "Update Task SuccessFully",
                    });
                  }
                })
              }
            })
          }
        })
    }
  }
})
app.post("/update-video-task", verifytoken, (req, res) => {
  if (req.body.url == "") {
    res.status(302).json({
      error: true,
      status: false,
      message: "url is required",
    });
  } else {
    con.query("SELECT * FROM `assign_task` WHERE `user_id` = (select ud.id from user_details as ud where ud.mobile = ?) AND `task_id` = ? AND date(`date`) = CURRENT_DATE();",
      [req.body.mobile, req.body.id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          con.query("SELECT * FROM `assign_task` WHERE `url` = ? AND `task_id` = ? AND date(`date`) = CURRENT_DATE();", [req.body.url, req.body.id], (err1, result1) => {
            if (err1) { throw err1 }
            if (result1.length > 0) {
              res.status(302).json({
                error: true,
                status: false,
                massage: "This Url Is Already Used",
              });
            } else {
              con.query("UPDATE `assign_task` SET `url`=? WHERE `task_id` = ? AND `user_id` = (select ud.id from user_details as ud where ud.mobile = ?) AND date(date) = CURRENT_DATE() ", [req.body.url, req.body.id, req.body.mobile], (err2, result2) => {
                if (err2) { throw err2 }
                if (result2) {
                  res.status(200).json({
                    error: false,
                    status: true,
                    massage: "Update Task SuccessFully",
                  });
                }
              })
            }
          })
        } else {
          con.query("SELECT * FROM `assign_task` WHERE `url` = ? AND `task_id` = ? AND date(`date`) = CURRENT_DATE();",
            [req.body.username, req.body.id], (err1, result1) => {
              if (err1) { throw err1 }
              if (result1.length > 0) {
                res.status(302).json({
                  error: true,
                  status: false,
                  massage: "This Url Is Already Used",
                });
              } else {
                con.query("INSERT INTO `assign_task`(`user_id`, `task_id`, `url`, `status`) VALUES ((select ud.id from user_details as ud where ud.mobile = ?),?,?,'Verifying')",
                  [req.body.mobile, req.body.id, req.body.url], (err, result) => {
                    if (err) throw err;
                    if (result) {
                      res.status(200).json({
                        error: false,
                        status: true,
                        massage: "Update Task SuccessFully",
                      });
                    }
                  })
              }
            })
        }
      })
  }
})

//Bank Deatils
app.post("/add-bankdetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "select * from userbankdeatils where account_no = ?",
    [req.body.account_no],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(302).json(btoa(JSON.stringify({
          error: true,
          status: false,
          massage: "Account No is already exist",
        })));
      } else {
        con.query(
          "INSERT INTO `userbankdeatils`(`username`, `account_no`, `ifsc_code`, `account_holder_name`, `bankname`, `account_type`) VALUES (?,?,?,?,?,?)",
          [
            req.body.mobile,
            req.body.account_no,
            req.body.ifsc,
            req.body.name,
            req.body.bankname,
            req.body.account_type,
          ],
          (errr, resultt) => {
            if (errr) throw errr;
            if (resultt) {
              res.status(201).json(btoa(JSON.stringify({
                error: false,
                status: true,
                massage: "Add bank deatils, Wait for Varification",
              })));
            }
          }
        );
      }
    }
  );
});
app.post("/get-bankdetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT `id`, `username`, `account_no`, `ifsc_code`, `account_holder_name`, `bankname`, `account_type`, `status`, `reason`, `date` FROM `userbankdeatils` WHERE `username` = ?",
    [req.body.mobile],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })));
      }
    }
  );
});
app.post("/delete-bankdetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "DELETE FROM `userbankdeatils` WHERE `id` = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res
          .status(200)
          .json(btoa(JSON.stringify({ error: false, status: true, massge: "Deleted Successfully" })));
      }
    }
  );
});

//number Deatils
app.post("/add-numberdetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT * FROM `usernumberdetails` WHERE `number` = ? and `type` = ?",
    [req.body.number, req.body.type],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(302).json(btoa(JSON.stringify({
          error: true,
          status: false,
          massage: "Mobile No is already exist",
        })));
      } else {
        con.query(
          "INSERT INTO `usernumberdetails`(`username`, `name`, `type`, `number`) VALUES (?,?,?,?)",
          [req.body.mobile, req.body.name, req.body.type, req.body.number],
          (errr, resultt) => {
            if (errr) throw errr;
            if (resultt) {
              res.status(201).json(btoa(JSON.stringify({
                error: false,
                status: true,
                massage: "Added Successfully",
              })));
            }
          }
        );
      }
    }
  );
});
app.post("/get-numberetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT * FROM `usernumberdetails` WHERE `username` = ?",
    [req.body.mobile],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })));
      }
    }
  );
});
app.post("/delete-numberetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "DELETE FROM `usernumberdetails` WHERE `id` = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res
          .status(200)
          .json(btoa(JSON.stringify({ error: false, status: true, massge: "Deleted Successfully" })));
      }
    }
  );
});

//UPI Details
app.post("/add-upidetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT * FROM `userupidetails` WHERE `UPI_id` = ?",
    [req.body.upiid],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(302).json(btoa(JSON.stringify({
          error: true,
          status: false,
          massage: "UPI Id is already exist",
        })));
      } else {
        con.query(
          "INSERT INTO `userupidetails`( `username`, `name`, `UPI_id`) VALUES (?,?,?)",
          [req.body.mobile, req.body.name, req.body.upiid],
          (errr, resultt) => {
            if (errr) throw errr;
            if (resultt) {
              res.status(201).json(btoa(JSON.stringify({
                error: false,
                status: true,
                massage: "Added Successfully",
              })));
            }
          }
        );
      }
    }
  );
});
app.post("/get-upidetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT * FROM `userupidetails` WHERE `username` = ?",
    [req.body.mobile],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })));
      }
    }
  );
});
app.post("/delete-upidetails", verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "DELETE FROM `userupidetails` WHERE `id` = ?",
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res
          .status(200)
          .json(btoa(JSON.stringify({ error: false, status: true, massge: "Deleted Successfully" })));
      }
    }
  );
});

app.post('/get-current-offer', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT  COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'First' and (`status` = 'Success' OR `status` = 'Pending')", [req.body.mobile], (err, result) => {
    if (err) { throw err; }
    if (result[0].count == 0) {
      con.query("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 0", (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
        }
      })
    } else {
      con.query("SELECT  COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'SECOND' and (`status` = 'Success' OR `status` = 'Pending')", [req.body.mobile], (err, result) => {
        if (err) { throw err; }
        if (result[0].count == 0) {
          con.query("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 1", (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
            }
          })
        } else {
          con.query("SELECT  COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'THIRD' and (`status` = 'Success' OR `status` = 'Pending')", [req.body.mobile], (err, result) => {
            if (err) { throw err; }
            if (result[0].count == 0) {
              con.query("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 2", (err, result) => {
                if (err) throw err;
                if (result) {
                  res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
                }
              })
            } else {
              con.query("SELECT  COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'FOURTH' and (`status` = 'Success' OR `status` = 'Pending')", [req.body.mobile], (err, result) => {
                if (err) { throw err; }
                if (result[0].count == 0) {
                  con.query("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 3", (err, result) => {
                    if (err) throw err;
                    if (result) {
                      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
                    }
                  })
                } else {
                  con.query("SELECT  COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'FIFTH' and (`status` = 'Success' OR `status` = 'Pending')", [req.body.mobile], (err, result) => {
                    if (err) { throw err; }
                    if (result[0].count == 0) {
                      con.query("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 4", (err, result) => {
                        if (err) throw err;
                        if (result) {
                          res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
                        }
                      })
                    } else {
                      con.query("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 100 OFFSET 5", (err, result) => {
                        if (err) throw err;
                        if (result) {
                          res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});
app.post('/check-coupon-code', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT * FROM `payment_bonus` WHERE `offer_name` = ? AND `status` = 'Y'", [req.body.code], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      if (parseInt(req.body.balance) >= parseInt(result[0].amount_start) && parseInt(req.body.balance) <= parseInt(result[0].amount_end)) {
        res.status(200).json(btoa(JSON.stringify({ error: false, status: true, massage: "Apply SuccessFully", })));
      } else {
        res.status(200).json(btoa(JSON.stringify({ error: true, status: false, massage: "Invalid Coupon Code", })));
      }
    } else {
      res.status(200).json(btoa(JSON.stringify({ error: true, status: false, massage: "Invalid Coupon Code", })));
    }
  })
});

// agents
app.post('/get-today-income', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT SUM(`amount`) as agents_wallet FROM `agents_statement` WHERE `mobile` = ? and DATE(`date`) = CURDATE();", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
    }
  })
});
app.post('/get-total-income', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT SUM(`amount`) as agents_wallet FROM `agents_statement` WHERE `mobile` = ?;", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
    }
  })
});
app.post('/get-total-invite', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT COUNT(*) as agents_wallet FROM `user_details` WHERE `reffer_by` = (SELECT `reffer_code` FROM `user_details` WHERE `user_name` = ?)", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
    }
  })
});
app.post('/get-today-invite', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT COUNT(*) as agents_wallet FROM `user_details` WHERE `reffer_by` = (SELECT `reffer_code` FROM `user_details` WHERE `user_name` = ?) and DATE(`date`) = CURDATE();", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
    }
  })
});
app.post('/get-total-invite-level', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("select(SELECT COUNT(*) FROM`user_level` WHERE`level_1` = (SELECT`reffer_code` FROM`user_details` WHERE`user_name` = ?)) as level_1, (SELECT COUNT(*) FROM `user_level` WHERE`level_2` = (SELECT`reffer_code` FROM `user_details` WHERE`user_name` = ?)) as level_2, (SELECT COUNT(*) FROM `user_level` WHERE`level_3` = (SELECT`reffer_code` FROM `user_details` WHERE`user_name` = ?)) as level_3, (SELECT COUNT(*) FROM `user_level` WHERE`level_4` = (SELECT`reffer_code` FROM `user_details` WHERE`user_name` = ?)) as level_4, (SELECT COUNT(*) FROM `user_level` WHERE`level_5` = (SELECT`reffer_code` FROM `user_details` WHERE`user_name` = ?)) as level_5, (SELECT COUNT(*) FROM `user_level` WHERE`level_6` = (SELECT`reffer_code` FROM `user_details` WHERE`user_name` = ?)) as level_6;", [req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile, req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
    }
  })
});
app.post('/get-total-invite-level-all', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT ul.id,IF((SELECT `reffer_code` FROM `user_details` WHERE `user_name` = ?) = ul.level_1, 'Level 1', IF((SELECT `reffer_code` FROM `user_details` WHERE `user_name` = ?) = ul.level_2, 'Level 2', 'Level 3')) as level,ud.uid,ud.date FROM `user_level` as ul INNER join `user_details` as ud on ul.user_reffral = ud.reffer_code WHERE (SELECT `reffer_code` FROM `user_details` WHERE `user_name` = ?) IN (ul.`level_1`,ul.`level_2`,ul.`level_3`);", [req.body.mobile, req.body.mobile, req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })));
    }
  })
});
app.post('/get-reffral-code', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT `reffer_code` FROM `user_details` WHERE `user_name` = ?", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
    }
  })
});
app.post('/get-daily-income', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT ass.id, ud.uid, ass.amount, ass.discription, ass.date FROM `agents_statement` as ass INNER join `user_details` as ud on ass.mobile = ud.user_name WHERE ass.`mobile` = ?;", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })));
    }
  })
});
app.post('/get-today-total-bet', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT count(*) as count_v FROM `bet-table` WHERE `username` = ? and DATE(`date`) = CURDATE();", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })))
    }
  })
});
app.post('/check-first-deposit', verifytoken, (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT * FROM `deposit` WHERE `status` = 'Success' and `user_name` = ?", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: true })));
    } else {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: false })));
    }
  })
});
app.post("/add-contact-us", upload.single("image"), (req, res) => {
  if (req.file == undefined) {
    con.query("INSERT INTO `contact`(`email`, `subject`, `message`) VALUES (?,?,?)",
      [req.body.email, req.body.subject, req.body.message],
      (errr, resultt) => {
        if (errr) throw errr;
        if (resultt) {
          res.status(201).json({
            error: false,
            status: true,
            massage: "Added Successfully",
          });
        }
      }
    );
  } else {
    con.query("INSERT INTO `contact`(`email`, `subject`, `message`, `image`) VALUES (?,?,?,?)",
      [req.body.email, req.body.subject, req.body.message, req.file.filename],
      (errr, resultt) => {
        if (errr) throw errr;
        if (resultt) {
          res.status(201).json({
            error: false,
            status: true,
            massage: "Added Successfully",
          });
        }
      }
    );
  }
});
app.post("/token-check", (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, SECRET_KEY_USER, (err, auth) => {
      if (err) {
        res.status(302).json({
          error: true,
          status: false,
          massage: 'Token Invalid'
        })
      } else {
        if ((req.body.mobile) != undefined) {
          if (auth.username == req.body.mobile) {
            res.status(200).json({
              error: false,
              status: true,
              massage: 'Token valid'
            })
          } else {
            res.status(403).send("false");
          }
        }
        if ((req.body.data) != undefined) {
          if ((auth.username == JSON.parse(atob(req.body.data)).mobile)) {
            res.status(200).json({
              error: false,
              status: true,
              massage: 'Token valid'
            })
          } else {
            res.status(403).send("false");
          }
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
});
app.post("/get-level", (req, res) => {
  let dataArray = [];
  con.query("SELECT ul.id,ud.uid,ud.username,'level_1' as level,(select price from `level` where `name` = '1') as amount,ul.status1 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_1` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      dataArray = dataArray.concat(result);
      con.query("SELECT ul.id,ud.uid,ud.username,'level_2' as level,(select price from `level` where `name` = '2') as amount,ul.status2 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_2` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result2) => {
        if (err) throw err;
        if (result2) {
          dataArray = dataArray.concat(result2);
          con.query("SELECT ul.id,ud.uid,ud.username,'level_3' as level,(select price from `level` where `name` = '3') as amount,ul.status3 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_3` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result3) => {
            if (err) throw err;
            if (result3) {
              dataArray = dataArray.concat(result3);
              con.query("SELECT ul.id,ud.uid,ud.username,'level_4' as level,(select price from `level` where `name` = '4') as amount,ul.status4 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_4` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result4) => {
                if (err) throw err;
                if (result4) {
                  dataArray = dataArray.concat(result4);
                  con.query("SELECT ul.id,ud.uid,ud.username,'level_5' as level,(select price from `level` where `name` = '5') as amount,ul.status5 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_5` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result5) => {
                    if (err) throw err;
                    if (result5) {
                      dataArray = dataArray.concat(result5);
                      con.query("SELECT ul.id,ud.uid,ud.username,'level_6' as level,(select price from `level` where `name` = '6') as amount,ul.status6 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_6` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result6) => {
                        if (err) throw err;
                        if (result6) {
                          dataArray = dataArray.concat(result6);
                          con.query("SELECT ul.id,ud.uid,ud.username,'level_7' as level,(select price from `level` where `name` = '7') as amount,ul.status7 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_7` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result7) => {
                            if (err) throw err;
                            if (result7) {
                              dataArray = dataArray.concat(result7);
                              con.query("SELECT ul.id,ud.uid,ud.username,'level_8' as level,(select price from `level` where `name` = '8') as amount,ul.status8 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_8` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result8) => {
                                if (err) throw err;
                                if (result8) {
                                  dataArray = dataArray.concat(result8);
                                  con.query("SELECT ul.id,ud.uid,ud.username,'level_9' as level,(select price from `level` where `name` = '9') as amount,ul.status9 as status,ul.date FROM `user_level` as ul INNER join user_details as ud on ul.user_reffral = ud.reffer_code WHERE ul.`level_9` = (SELECT udd.reffer_code from user_details as udd WHERE udd.mobile=?)", [req.body.mobile], (err, result9) => {
                                    if (err) throw err;
                                    if (result9) {
                                      dataArray = dataArray.concat(result9);
                                      dataArray.sort((a, b) => a.date - b.date);
                                      res.status(200).json({
                                        error: false,
                                        status: true,
                                        data: dataArray.reverse()
                                      });
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})

// increase user refresh
app.post("/get-increase-user", (req, res) => {
  con.query("SELECT  `count` as a,`widthrawal` as b FROM `increase` WHERE id = 1", (err, result) => {
    if (err) { throw err; }
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        total: result[0].a,
        widthrawal: result[0].b
      });
    }
  })
});
app.post("/update-increase-user", (req, res) => {
  con.query("UPDATE `increase` SET `count` = `count` + 1, `widthrawal` = `widthrawal` + ?;", [Math.floor(Math.random() * 31) + 50], (err, result) => {
    if (err) { throw err; }
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
      });
    }
  });
});


function verifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, SECRET_KEY_USER, (err, auth) => {
      if (err) {
        res.status(403).send('Token Expire');
      } else {
        if ((req.body.mobile) != undefined) {
          if (auth.username == req.body.mobile) {
            next();
          } else {
            res.status(403).send("false");
          }
        }
        if ((req.body.data) != undefined) {
          if ((auth.username == JSON.parse(atob(req.body.data)).mobile)) {
            next();
          } else {
            res.status(403).send("false");
          }
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
}
function code() {
  let x = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let a = "";
  for (let index = 0; index < 8; index++) {
    a += x[Math.floor(Math.random() * x.length)];
  }
  con.query(
    "select * from user_details where `reffer_code` = ?",
    [a],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        code();
      } else {
        return a;
      }
    })
  return a;
}
function deleteImage(imagePath) {
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return;
    }
    fs.unlink(imagePath, (err) => {
      if (err) {
        return;
      }
    });
  });
}
function reffer(ba, ab) {
  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
}
function reffer2(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
    }
  })
}
function reffer3(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
        } else {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
        }
      })
    }
  })
}
function reffer4(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
        } else {
          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level2[0].reff], (err, level3) => {
            if (err) throw err;
            if (level3[0].reff == '') {
              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
            } else {
              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff]);
            }
          })
        }
      })
    }
  })
}
function reffer5(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
        } else {
          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level2[0].reff], (err, level3) => {
            if (err) throw err;
            if (level3[0].reff == '') {
              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
            } else {
              con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level3[0].reff], (err, level4) => {
                if (err) throw err;
                if (level4[0].reff == '') {
                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff]);
                } else {
                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`) VALUES (?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff]);
                }
              })
            }
          })
        }
      })
    }
  })
}
function reffer6(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
        } else {
          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level2[0].reff], (err, level3) => {
            if (err) throw err;
            if (level3[0].reff == '') {
              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
            } else {
              con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level3[0].reff], (err, level4) => {
                if (err) throw err;
                if (level4[0].reff == '') {
                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff]);
                } else {
                  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level4[0].reff], (err, level5) => {
                    if (err) throw err;
                    if (level5[0].reff == '') {
                      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`) VALUES (?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff]);
                    } else {
                      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`) VALUES (?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff]);
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}
function reffer7(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
        } else {
          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level2[0].reff], (err, level3) => {
            if (err) throw err;
            if (level3[0].reff == '') {
              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
            } else {
              con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level3[0].reff], (err, level4) => {
                if (err) throw err;
                if (level4[0].reff == '') {
                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff]);
                } else {
                  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level4[0].reff], (err, level5) => {
                    if (err) throw err;
                    if (level5[0].reff == '') {
                      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`) VALUES (?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff]);
                    } else {
                      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level5[0].reff], (err, level6) => {
                        if (err) throw err;
                        if (level6[0].reff == '') {
                          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`) VALUES (?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff]);
                        } else {
                          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`, `lavel_7`) VALUES (?,?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff, level6[0].reff]);
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}
function reffer8(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
        } else {
          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level2[0].reff], (err, level3) => {
            if (err) throw err;
            if (level3[0].reff == '') {
              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
            } else {
              con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level3[0].reff], (err, level4) => {
                if (err) throw err;
                if (level4[0].reff == '') {
                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff]);
                } else {
                  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level4[0].reff], (err, level5) => {
                    if (err) throw err;
                    if (level5[0].reff == '') {
                      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`) VALUES (?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff]);
                    } else {
                      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level5[0].reff], (err, level6) => {
                        if (err) throw err;
                        if (level6[0].reff == '') {
                          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`) VALUES (?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff]);
                        } else {
                          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level6[0].reff], (err, level7) => {
                            if (err) throw err;
                            if (level7[0].reff == '') {
                              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`, `lavel_7`) VALUES (?,?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff, level6[0].reff]);
                            } else {
                              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`, `lavel_7`, `lavel_8`) VALUES (?,?,?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff, level6[0].reff, level7[0].reff]);
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}
function reffer9(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
        } else {
          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level2[0].reff], (err, level3) => {
            if (err) throw err;
            if (level3[0].reff == '') {
              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
            } else {
              con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level3[0].reff], (err, level4) => {
                if (err) throw err;
                if (level4[0].reff == '') {
                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff]);
                } else {
                  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level4[0].reff], (err, level5) => {
                    if (err) throw err;
                    if (level5[0].reff == '') {
                      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`) VALUES (?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff]);
                    } else {
                      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level5[0].reff], (err, level6) => {
                        if (err) throw err;
                        if (level6[0].reff == '') {
                          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`) VALUES (?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff]);
                        } else {
                          con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level6[0].reff], (err, level7) => {
                            if (err) throw err;
                            if (level7[0].reff == '') {
                              con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`, `lavel_7`) VALUES (?,?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff, level6[0].reff]);
                            } else {
                              con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level7[0].reff], (err, level8) => {
                                if (err) throw err;
                                if (level8[0].reff == '') {
                                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`, `lavel_7`, `lavel_8`) VALUES (?,?,?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff, level6[0].reff, level7[0].reff]);
                                } else {
                                  con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`, `lavel_7`, `lavel_8`, `lavel_9`) VALUES (?,?,?,?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff, level6[0].reff, level7[0].reff, level8[0].reff]);
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}
function reffer_bonus(ba) {
  let a = 0;
  con.query("SELECT IFNULL(ul.`level_1`,0) as level_1,IFNULL(ul.`level_2`,0) as level_2,IFNULL(ul.`level_3`,0) as level_3,IFNULL(ul.`level_4`,0) as level_4,IFNULL(ul.`level_5`,0) as level_5,IFNULL(ul.`level_6`,0) as level_6,IFNULL(ul.`level_7`,0) as level_7,IFNULL(ul.`level_8`,0) as level_8,IFNULL(ul.`level_9`,0) as level_9 FROM `user_level` as ul WHERE ul.user_reffral = (SELECT ud.`reffer_code` FROM `user_details` as ud WHERE ud.`mobile` = ?);", [ba], (err1, result1) => {
    if (err1) throw err1;
    if (result1) {
      let a = Object.values(result1[0]);
      for (let index = 0; index < a.length; index++) {
        const element = a[index];
        con.query("SELECT COUNT(*) as c FROM `buy_plan` WHERE `user_id` = (select mobile from user_details where reffer_code = ?) and `plan_id` != '1'", [element], (error1, resultt1) => {
          if (error1) { throw error1 }
          if (resultt1[0].c > 0) {
            con.query(`UPDATE user_level as ul SET ul.status${index + 1} = 'Success' WHERE ul.user_reffral = (SELECT reffer_code FROM user_details as ud WHERE ud.mobile = ?)`, [ba]);
            con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [index + 1, index + 1, element]);
          } else {

          }
        })
      }
      // if (result1[0].level_1 != 0) {
      //   con.query("SELECT COUNT(*) as c FROM `buy_plan` WHERE `user_id` = (select mobile from user_details where reffer_code = ?) and `plan_id` != '1'", [result1[0].level_1], (error1, resultt1) => {
      //     if (error1) { throw error1 }
      //     if (resultt1[0].c > 0) {
      //       con.query("UPDATE `user_level` as ul SET ul.`status` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //       con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [1, 1, result1[0].level_1]);
      //     } else {
      //       if (result1[0].level_2 != 0) {
      //         con.query("UPDATE `user_level` as ul SET ul.`status2` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //         con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [2, 2, result1[0].level_2]);
      //         if (result1[0].level_3 != 0) {
      //           con.query("UPDATE `user_level` as ul SET ul.`status3` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //           con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [3, 3, result1[0].level_3]);
      //           if (result1[0].level_4 != 0) {
      //             con.query("UPDATE `user_level` as ul SET ul.`status4` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //             con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [4, 4, result1[0].level_4]);
      //             if (result1[0].level_5 != 0) {
      //               con.query("UPDATE `user_level` as ul SET ul.`status5` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //               con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [5, 5, result1[0].level_5]);
      //               if (result1[0].level_6 != 0) {
      //                 con.query("UPDATE `user_level` as ul SET ul.`status6` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //                 con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [6, 6, result1[0].level_6]);
      //                 if (result1[0].level_7 != 0) {
      //                   con.query("UPDATE `user_level` as ul SET ul.`status7` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //                   con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [7, 7, result1[0].level_7]);
      //                   if (result1[0].level_8 != 0) {
      //                     con.query("UPDATE `user_level` as ul SET ul.`status8` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //                     con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [8, 8, result1[0].level_8]);
      //                     if (result1[0].level_9 != 0) {
      //                       con.query("UPDATE `user_level` as ul SET ul.`status9` = 'Success' WHERE ul.`user_reffral` = (SELECT reffer_code FROM `user_details` as ud WHERE ud.`mobile` = ?)", [ba]);
      //                       con.query("UPDATE `wallet` SET `winning_wallet` = `winning_wallet` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [9, 9, result1[0].level_9]);
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   })
      // }
    }
  })
}

module.exports = app;
