//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById() {
  let headers = new Headers();
  let init = {
    method: "GET",
    headers: headers,
    mode: "cors",
    cache: "default",
  };
  let request = new Request(
    "http://localhost:5500/data/photographers.json",
    init
  );

  try {
    let res = await fetch(request, init);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  const { media } = await getPhotographerById();
  const param = new URLSearchParams(new URL(window.location).searchParams);
  const id = parseInt(param.get("id"));
  const filteredMedia = media.filter((el) => el.photographerId === id);
  console.log(filteredMedia);
}

init();
