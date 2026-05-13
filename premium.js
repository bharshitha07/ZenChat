async function buyPlan(plan){

  try{

    const response = await fetch(

      "http://localhost:5000/create-payment",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          plan:plan
        })

      }

    );

    const data = await response.json();

    // OPEN PHONEPE PAYMENT PAGE

    window.location.href =
    data.redirectUrl;

  }

  catch(error){

    console.log(error);

    alert("Payment Failed");

  }

}


// ======================
// BACK BUTTON
// ======================

function goBack(){

  window.location.href =
  "index.html";

}