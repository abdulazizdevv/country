let elBtnPrev = document.querySelector(".index");
setTimeout(() => {
  let data = JSON.parse(localStorage.getItem("data"));

  console.log(data);

  document.querySelector(".list").innerHTML = `<div class="card shadow bg-light col-12 col-md-3 col-lg-4 p-0 mx-auto" style="width: 18rem">
<img class="card-img-top img-fluid js-img" src=${data[0].flags.svg} alt="" />
<div class="card-body p-3">
	<h5 class="card-title item-title">${data[0].name.common}</h5>
	<p class="card-text item-popular">${data[0].population}</p>
	<p class="card-text item-capital">${data[0].capital}</p>
	<p class="card-text item-region">${data[0].region}</p>
</div>
</div>`;
}, 1000);
elBtnPrev.addEventListener("click", () => {
  window.location.replace("index.html");
  localStorage.removeItem("data");
});
