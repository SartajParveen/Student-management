function thanks()
{
    var form=document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
      });
    window.location.href="thankYou.html";
}

function paymentSuccess()
{
    var form=document.getElementById("paymentForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
      });
    window.location.href="paymentSuccess.html";
}