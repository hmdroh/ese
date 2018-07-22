
// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express");

// Dependencies
// =============================================================
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");
var request = require("request");
// var meetup = require("../controllers/meetup");
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {

  // app.get("/list", function (req, res) {
  //   res.redirect("/list/1");
  // });

  

  app.get("/", function (req, res) {
    res.render("home");
  });



  app.get("/signup", function (req, res) {
    res.render("signup");
  });



  app.get("/success", function (req, res) {

    res.render("success");

  });


  // app.get("/activities", function (req, res) {
  //   var page = 100;
  //   var text = req.user.activity;
  //   var radius = 25.0;
  //   var lng = req.user.lng;
  //   var lat = req.user.lat;
  //   var key = process.env.MEETUP_KEY;
  //   meetup.getMeetupData(key, page, text,radius,lng,lat,key, function(data){

  //     if (parseInt(req.params.offset) + 1 > 1) {
  //       var firstOffset = false;
  //     } else {
  //       var firstOffset = true;
  //     }

  //     res.render("activities", {
  //       page: {
  //         title: "List of events",
  //         nextOffset: parseInt(req.params.offset) + 1,
  //         firstOffset: firstOffset
  //       },
  //       boo: data
  //     });
  //   });

  // });



  app.get("/favorites", function (req, res) {
    var key = process.env.MEETUP_KEY;

    db.Fevent.findAll({
      where:{
        userId: req.user.id
      }
    }).then(function(sqldata){

      res.render("fav", {
        page: {
          title: "Favorate People",
          nextOffset: parseInt(req.params.offset) + 1
        },
        boo: sqldata
      });

    });
  });


  app.get("/search/:url/:id", function (req, res) {
    var id = req.params.id;
    var url = req.params.url;
res.end();
  });



  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });



};
