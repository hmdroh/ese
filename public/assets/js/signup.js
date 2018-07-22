$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstnameInput = $("input#first_name");
  var lastnameInput = $("input#last_name");
  var displaynameInput = $("input#display-name");
  var genderInput = $("select#gender");
  var dobInput = $("input#DOB"); 
  var accountTypeInput = $("select#account-type");
  var zipcodeInput = $("input#zip-code");

  
  //displayname, gender, dob, activitylevel, 
  //activity, dietaryres, zipcode


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    
 
    ///we just changed it to string from object to handle multiple input boxes input values for our prject in today
    
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstname: firstnameInput.val().trim(),
      lastname: lastnameInput.val().trim(),
      displayname: displaynameInput.val().trim(),
      gender: genderInput.val(),
      dob: dobInput.val(),
      accountType: accountTypeInput.val(),
      zipcode: zipcodeInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.firstname || !userData.lastname || !userData.displayname || !userData.gender || !userData.dob || !userData.accountType || !userData.zipcode) {
      var selected =false;
      //hide all dangers before unhiding the unfilled
      $("[id$='danger']").hide();
    
      if(!userData.email ){
        $("#email_danger").show();
        if(selected === false){
          selected = $("input#email-input");
        }
      }

      if( !userData.password ){
        $("#password_danger").show();
        if(selected === false){
          selected = $("input#password-input");
        }
      }

      if(!userData.firstname ){
        $("#first_name_danger").show();
        if(selected === false){
          selected = $("input#first_name");
        }

      }

      if(!userData.lastname ){
        $("#last_name_danger").show();
        if(selected === false){
          selected = $("input#last_name");
        }

      }

      if(!userData.displayname){
        $("#display-name_danger").show();
        if(selected === false){
          selected = $("input#display-name");
        }

      }

      if(!userData.gender){
        $("#gender_danger").show();
        if(selected === false){
          selected = $("#gender");
        }

      }

      if(!userData.dob){
        $("#DOB_danger").show();
        if(selected === false){
          selected = $("#DOB");
        }

      }

      if(!userData.accountType ){
        $("#account_danger").show();
        if(selected === false){
          selected = $("#account-type");
        }


      }


      if(!userData.zipcode){
        $("#zip_danger").show();
        if(selected === false){
          selected = $("#zip-code");
        }
        
      }
      //go to first missing item:
      selected.focus();
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.displayname, userData.firstname, userData.lastname, userData.gender, userData.dob, userData.accountType, userData.zipcode);
    

  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, displayname, firstname, lastname, gender, dob, accountType, zipcode) {
    $.post("/api/signup", {
      email: email,
      password: password,
      displayname: displayname,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      accounttype: accountType,
      zipcode: zipcode
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});


