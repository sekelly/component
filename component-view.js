const client = ZoomMtgEmbedded.createClient();

let meetingSDKElement = document.getElementById("meetingSDKElement");

var authEndpoint = "https://meetingsdk-sample-signature-node-js-iota.vercel.app/";
var meetingNumber = "95160050210";
var passWord = "123";
var role = 1;
var userName = "Component View";
var userEmail = "component@@kelkel.com";
var registrantToken = "";
var zakToken = "";

function getSignature() {
  fetch(authEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      startMeeting(data.signature);
    })
    .catch((error) => {
      console.log(error);
    });
}

function startMeeting(signature) {
  client
    .init({
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      patchJsMedia: true,
      leaveOnPageUnload: true,
    })
    .then(() => {
      client
        .join({
          signature: signature,
          meetingNumber: meetingNumber,
          password: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
        })
        .then(() => {
          console.log("joined successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
