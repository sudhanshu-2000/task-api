const express = require("express");
const app = express.Router();
exports.app = app;
const con = require("../db/conn");
var jwt = require("jsonwebtoken");
var atob = require('atob');
var btoa = require('btoa');
const cors = require("cors");
// app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(cors());
require("dotenv").config();
SECRET_KEY_USER = ': 3. * 1 >.<2e_1 >& b: 5.9x_d, 86ac3b: -5 % 1$ %? 0$ * c > 4e7, 6aa < e ? 3.8 :< 8 % 28 < 801 ? 0c66d885! ?% 6@d: _2a_07 - 1! + c ? +% @4$.?> c < d &? <a$b5:*^ b9 & -& 70d - 3 & @<&& 4 ^ e ? 99$ @: 1 < fdd@9?bc, -? 5 * d4e_1f6 ?%, .5c08c6b_1_ ^,% 1.7: 4 <, 341, d % 9d - 3e4 % d6 - 9. -:f @+$bc5 & !-@24e ^ 7cac * +ee: @4> 8 - +@0!8 *& 0f < 8 <.$ ^& $b43f!d < -$@d3< +a5c_ & 19 ^ 4a2 ^ _ ? c0d : _6c1 + d * _a_: 6: 3c43.41 ^ 2: 59ae % b_e &^ -d4a$ * 4b8c +< 0@!1a % 59. < e3_: 68 - _e8 + 4 % d!4 - 360$5 % 1@+& 0! ^? d6fcf,?_.8..- f62 - +<, _!bf &> a +? f2 * 0c61! -^7__1448c: 60 *^? _!9 &: 1b7 > d ^ @2fa78 ^ 2 % 44 * --d.86a < b < 8d681 ^ bb5 * 396 & dd_6.^.^ $d2: !!<,8@5&^& +* 32506658 > !_fd8.04@&* 5 % -.6 ^ 4 > e99_0ce * @f6$ * -d ? d4 < 5 ?* cd7 - 26a %&, !4 % 4904, a!4 *12_ + 93c & +^ $24ad_8974d - !.0a$:<:> 9 & 7@& +.a! ?0_ %*< -69@a07-^ _5ce.& cb > 32a626,> @, 6_6!: 5 +: 2c_7 < bc34 % 8 - 3 ^ _4 <, 5 % 1 - @7a,^>> 0: +0: 2 & a ^ _ ^9_.b >::^& f + d + @? ded9d7, dc5 ? 3 : @1 -?? 7@c0** 47 - a2c4b:% f & 5 - !> e_ < 95d < 7.ff--_a - 9b & ac:?, 6332f!5_ >> f > 6c @1!:<< __:> 0 >.^> c@$935?+& --& -> $f % 23 < fa4 < 44 ^,> c8 - _@a @bd*: e7838 * c! > b >, !9 % b5,,, 2! *<*?029.9 - 44 % 9@70!^ .5bc % b & d4bb$@6& 9@8!69 +* 4$, 96 < 4816c & 8 + 0e4a372e,< 47 +%5_ ^ bbce - 3 ^ 409 - 0f % 44!: 2e@5+-f3,8_d.de3d_7 & a72:,* 5 - !-c255! &^ .1@&: 0e & $2!5c9 +* e - +fd * +@6 % 7 & 0 <> -0 % c$d ^ 4! -';
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
app.get('/get', (req, res) => {
  res.status(200).send('Hello')
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
                  [req.body.mobile, req.body.user_name, hash, req.body.email, parseInt(ides[0].id) + 1, 'GJpQpVEO', codecode], (err, result) => {
                    if (err) throw err;
                    if (result) {
                      con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                      reffer(codecode, 'GJpQpVEO');
                      res.status(200).json({
                        error: false,
                        status: true,
                        message: "Registered Successfully",
                      });
                    }
                  }
                );
              }
              else {
                con.query("select * from user_details where `reffer_code` = ?", [req.body.reffer_by], (err, result) => {
                  if (err) throw err;
                  if (result.length > 0) {
                    con.query("INSERT INTO `user_details`(`mobile`, `username`, `password`, `email`, `uid`, `reffer_by`, `reffer_code`) VALUES (?,?,?,?,?,?,?)",
                      [req.body.mobile, req.body.user_name, hash, req.body.email, parseInt(ides[0].id) + 1, req.body.reffer_by, codecode], (err, result) => {
                        if (err) throw err;
                        if (result) {
                          reffer(codecode, req.body.reffer_by);
                          con.query("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,?)", [req.body.mobile, 0]);
                          res.status(200).json({
                            error: false,
                            status: true,
                            message: "Registered Successfully",
                          });
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
      con.query(
        "SELECT IF(`wallet_balance` >= ?, 'true', 'false') as result FROM wallet WHERE `user_name` = ?;",
        [parseInt(result1[0].price), req.body.mobile], (error, result) => {
          if (error) {
            throw error;
          }
          if (result[0].result === "true") {
            con.query(
              "UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?",
              [parseInt(result1[0].price), req.body.mobile], (err, resultt) => {
                if (err) throw err;
                if (resultt) {
                  con.query(
                    "INSERT INTO `buy_plan`(`user_id`, `plan_id`, `expire_date`) VALUES (?,?,DATE_ADD(CURDATE(), INTERVAL 30 DAY))",
                    [req.body.mobile, req.body.id], (err, result) => {
                      if (err) throw err;
                      if (result) {
                        con.query("INSERT INTO `deposit`(`user_name`, `balance`,`status`, `payment_type`) VALUES (?,?,'Success','Plan Buy')", [req.body.mobile, parseInt(result1[0].price),])
                        res.status(200).json({
                          error: false,
                          status: true
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
// get-current-plans
app.post("/get-current-plans", (req, res) => {
  con.query("select bp.id,p.name,p.price,p.total_video,p.total_comment,p.total_like,p.total_video_price,p.total_video_comment,p.total_video_like,p.earn_upto,bp.expire_date,bp.date from `buy_plan` as bp INNER join plan as p on bp.plan_id = p.id where bp.user_id = ?", [req.body.mobile], (err, result) => {
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
  // req.body = JSON.parse(atob(req.body.data));
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
        con.query(
          "UPDATE `user_details` SET `password` = ? WHERE `mobile` = ?",
          [hash, req.body.mobile],
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
app.post("/user-details", verifytoken, (req, res) => {
  con.query(
    "SELECT ud.id, ud.username as uname, ud.mobile, w.wallet_balance,w.winning_wallet as winning_balance, ud.email,ud.bank_name,ud.ifsc_code,ud.ac_no,ud.ac_name, ud.pincode, ud.uid, ud.upi_id, ud.reffer_code, ud.plan_type, p.name, p.price, p.total_video, p.total_comment, p.total_like, p.total_video_price, p.total_video_comment as 'total_comment_price', p.total_video_like as 'total_like_price', p.earn_upto,ud.date FROM `user_details` as ud INNER join `wallet` as w on ud.`mobile` = w.user_name INNER JOIN `plan` as p on ud.plan_type = p.id WHERE `mobile` = ?",
    [req.body.mobile],
    (err, result) => {
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
    allowedcolumns = ["username", "email", "pincode", "upi_id", "bank_name", "ifsc_code", "ac_no", "ac_name"],
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
  con.query(
    "SELECT * FROM `new_payment_details` WHERE status = 'Y'",
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
  req.body = JSON.parse(atob(req.body.data));
  const val = Math.floor(1000 + Math.random() * 9000);
  const hash = bcrypt.hashSync(val.toString(), bcrypt.genSaltSync(12));
  con.query(
    "SELECT * FROM `otp` WHERE `number` = ?",
    [req.body.number],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        con.query(
          "UPDATE `otp` SET `otp` = ? WHERE `number` = ?",
          [hash, req.body.number],
          (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json(btoa(JSON.stringify({
                number: req.body.number,
                otp: val.toString(),
              })));
            }
          }
        );
      } else {
        con.query(
          "INSERT INTO `otp`(`otp`, `number`) VALUES (?,?)",
          [hash, req.body.number],
          (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json(btoa(JSON.stringify({
                number: req.body.number,
                otp: val.toString(),
              })));
            }
          }
        );
      }
    }
  );
});
app.post("/verify-otp", (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query(
    "SELECT * FROM `otp` where number = ?",
    [req.body.number],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const match = bcrypt.compareSync(req.body.otp, result[0].otp);
        if (match == true) {
          res.status(200).json(btoa(JSON.stringify({
            error: false,
            status: true,
            msg: "Verify OTP",
          })));
        } else {
          res.status(404).json(btoa(JSON.stringify({
            error: true,
            status: false,
            msg: "Wrong OTP",
          })));
        }
      } else {
        res.status(200).json(btoa(JSON.stringify({
          error: true,
          status: false,
          msg: "number is not exist",
        })));
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
  con.query(
    "INSERT INTO `deposit`(`user_name`, `balance`, `image`,`image_path`, `payment_type`, `paymethod_id`,`transaction_id`) VALUES (?,?,?,?,?,?,?)",
    [
      req.body.mobile,
      req.body.amount,
      req.file.filename,
      req.file.destination + '/',
      'Deposit',
      req.body.id,
      req.body.transection_id
    ],
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
});
app.post("/get-deposit-request", verifytoken, (req, res) => {
  con.query(
    "SELECT cd.id,cd.user_name,cd.balance as amount,cd.image,cd.upi_id,cd.image_path,cd.transaction_id,cd.payment_type,cd.status,cd.date FROM `deposit` as cd where cd.`user_name` = ?;",
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
      con.query('SELECT `bank_name`,`ifsc_code`,`ac_no`,`ac_name` FROM `user_details` WHERE `mobile` = ?',[req.body.mobile],(err1,result1)=>{
        if(err1)throw err1;
        if(result1){
          if (!result1[0].bank_name){
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
          }else{
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
                          "INSERT INTO `deposit`(`user_name`, `balance`, `payment_type`) VALUES (?,?,'Withdrawal')",
                          [
                            req.body.mobile,
                            req.body.amount
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
        con.query(
          "UPDATE `deposit` SET `reason` = ?, `Approved_declined_By` = ?, `status` = 'Canceled' WHERE `id` = ? AND `user_name` = ?",
          ['.', 'By User', req.body.id, req.body.mobile],
          (err, resultt) => {
            if (err) throw err;
            if (resultt) {
              con.query(
                "UPDATE `wallet` SET `winning_wallet` = winning_wallet + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = ?;",
                [req.body.id, req.body.mobile],
                (err, resultt) => {
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
  con.query('SELECT att.id,ud.mobile,tn.task_url,tn.type,(select p.name from platforms as p where p.id = tn.platform_id) as platform,att.status FROM `assign_task` as att INNER join user_details as ud on att.user_id=ud.id INNER join tasks_with_name as tn on att.task_id = tn.id where ud.mobile = ? && tn.type = "LIKE"', [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result
      });
    }
  })
})
app.post("/get-task-comment", verifytoken, (req, res) => {
  con.query('SELECT att.id,ud.mobile,tn.comment_details,tn.task_url,tn.type,(select p.name from platforms as p where p.id = tn.platform_id) as platform,att.status FROM `assign_task` as att INNER join user_details as ud on att.user_id=ud.id INNER join tasks_with_name as tn on att.task_id = tn.id where ud.mobile = ? && tn.type = "COMMENT"', [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result
      });
    }
  })
})
app.post("/get-video-task", verifytoken, (req, res) => {
  con.query('SELECT att.id,ud.mobile,tn.task_url,att.url,tn.type,(select p.name from platforms as p where p.id = tn.platform_id) as platform,att.status FROM `assign_task` as att INNER join user_details as ud on att.user_id=ud.id INNER join tasks_with_name as tn on att.task_id = tn.id where ud.mobile = ? && tn.type = "VIDEO"', [req.body.mobile], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result
      });
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
  } else {
    con.query("SELECT * FROM `assign_task` WHERE `task_id` = (select ud.id from user_details as ud where ud.mobile = ?) AND `username` = ?",
      [req.body.id, req.body.username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.status(302).json({
            error: true,
            status: false,
            massage: "This Username Is Already Used",
          });
        } else {
          con.query("UPDATE `assign_task` as att SET att.`id`= ?, att.`username`= ?, att.`status`='Verifying' WHERE att.`user_id` = (select ud.id from user_details as ud where ud.mobile = ?) && att.id = ?", [req.body.id, req.body.username, req.body.mobile, req.body.id], (err, result) => {
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
app.post("/update-video-task", verifytoken, (req, res) => {
  if (req.body.url == "") {
    res.status(302).json({
      error: true,
      status: false,
      message: "url is required",
    });
  } else {
    con.query("SELECT * FROM `assign_task` WHERE `url` = ?",
      [req.body.url], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.status(302).json({
            error: true,
            status: false,
            message: "This url is Already Used",
          });
        } else {
          con.query("UPDATE `assign_task` as att SET att.`id`= ?, att.`url`= ?, att.`status`='Verifying' WHERE att.`user_id` = (select ud.id from user_details as ud where ud.mobile = ?) && att.id = ?", [req.body.id, req.body.url, req.body.mobile, req.body.id], (err, result) => {
            if (err) throw err;
            if (result) {
              res.status(200).json({
                error: false,
                status: true,
                message: "Update Task SuccessFully",
              });
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

// // statement
// app.post("/get-statement", verifytoken, (req, res) => {
//   req.body = JSON.parse(atob(req.body.data));
//   let limit = 10;
//   let offset = limit * req.body.page - limit;
//   con.query("SELECT s.id, s.bet_or_type, s.period, s.Select, s.bet_from, s.bet_balance, s.total_balance, (select COUNT(*) FROM `statement` WHERE `username` = ?) as count, s.date FROM `statement` s WHERE s.`username` = ? ORDER by s.id DESC LIMIT ? OFFSET ?", [req.body.mobile, req.body.mobile, limit, offset], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     if (result) {
//       res.status(200).json(btoa(JSON.stringify({
//         error: false,
//         status: true,
//         data: result
//       })))
//     }
//   })
// });

app.post('/get-shopping-details', (req, res) => {
  req.body = JSON.parse(atob(req.body.data));
  con.query("SELECT * FROM `items` where `status` = 'Y'", (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })));
    }
  })
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
})
// level("GJpQpVEO");
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
function reffer(ba, ab) {
  con.query("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab], (err, level1) => {
    if (err) throw err;
    if (level1[0].ref == '') {
      con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
      con.query('INSERT INTO `reffal_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ab, ba]);
    } else {
      con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref], (err, level2) => {
        if (err) throw err;
        if (level2[0].reff == '') {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
          con.query('INSERT INTO `reffal_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [level1[0].ref, ab, ba]);
        } else {
          con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
          con.query('INSERT INTO `reffal_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [level2[0].reff, level1[0].ref, ab, ba]);
          // con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level2[0].reff], (err, level3) => {
          //   if (err) throw err;
          //   if (level3[0].reff == '') {
          //     con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
          //     con.query('INSERT INTO `reffal_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [level2[0].reff, level1[0].ref, ab, ba]);
          //   } else {
          //     con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level3[0].reff], (err, level4) => {
          //       if (err) throw err;
          //       if (level4[0].reff == '') {
          //         con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff]);
          //         con.query('INSERT INTO `reffal_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`) VALUES (?,?,?,?,?)', [level3[0].reff, level2[0].reff, level1[0].ref, ab, ba]);
          //       } else {
          //         con.query("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level4[0].reff], (err, level5) => {
          //           if (err) throw err;
          //           if (level5[0].reff == '') {
          //             con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`) VALUES (?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff]);
          //             con.query('INSERT INTO `reffal_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`) VALUES (?,?,?,?,?,?)', [level4[0].reff, level3[0].reff, level2[0].reff, level1[0].ref, ab, ba]);
          //           } else {
          //             con.query('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`) VALUES (?,?,?,?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff, level3[0].reff, level4[0].reff, level5[0].reff]);
          //             con.query('INSERT INTO `reffal_level`(`user_reffral`, `level_1`, `level_2`, `level_3`, `level_4`, `level_5`, `lavel_6`) VALUES (?,?,?,?,?,?,?)', [level5[0].reff, level4[0].reff, level3[0].reff, level2[0].reff, level1[0].ref, ab, ba]);
          //           }
          //         })
          //       }
          //     })
          //   }
          // })
        }
      })
    }
  })
}
function agent(amount, user) {
  con.query("SELECT `reffer_code` as rc FROM `user_details` WHERE `user_name` = ?", [user], (err, result) => {
    if (err) throw err;
    if (result) {
      con.query("SELECT * FROM `user_level` WHERE `user_reffral` = ?", [result[0].rc], (err, level1) => {
        if (err) throw err;
        const percentage2 = ((5 / 100) * parseFloat(amount)).toFixed(2);
        const percentage3 = ((3 / 100) * parseFloat(amount)).toFixed(2);
        const percentage4 = ((2 / 100) * parseFloat(amount)).toFixed(2);
        const percentage5 = ((2 / 100) * parseFloat(amount)).toFixed(2);
        const percentage6 = ((1 / 100) * parseFloat(amount)).toFixed(2);
        const percentage7 = ((1 / 100) * parseFloat(amount)).toFixed(2);
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
function level(code){ 
  let array,array2,array3,main; 
  con.query("SELECT *,'level_1' as level FROM `user_details` WHERE `reffer_by` =?",[code],(err,result)=>{
    if(err)throw err;
    if(result){
      console.log(result);
      for (const a of result) {
        con.query("SELECT *,'level_2' as level FROM `user_details` WHERE `reffer_by` =?", [a.reffer_by], (err, resultt) => {
          if(err)throw err;
          if(resultt){
            console.log(resultt);
            for (const b of resultt) {
              con.query("SELECT *,'level_3' as level FROM `user_details` WHERE `reffer_by` =?", [b.reffer_by], (err, result2) => {
                if (err) throw err;
                if (result2) {
                  console.log(result2);
                  for (const c of result2) {
                    con.query("SELECT *,'level_4' as level FROM `user_details` WHERE `reffer_by` =?", [c.reffer_by], (err, result3) => {
                      if (err) throw err;
                      if (result3) {
                        console.log(result3);
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
      console.log(main);
      return main
    }
  } )
}
module.exports = app;