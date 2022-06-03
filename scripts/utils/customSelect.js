const updateSelectBox = (e) => {
  let select =
    e.currentTarget.parentNode.parentNode.getElementsByTagName("select")[0];
  let selectLength = select.length;
  let prevSibling = e.currentTarget.parentNode.previousSibling;
  //TO-DO : change forEach loop with classic for loop because enable to break on forEach
  for (i = 0; i < selectLength; i++) {
    if (select.options[i].innerHTML === e.currentTarget.innerHTML) {
      select.selectedIndex = i;
      sortDataBy(select.options[select.selectedIndex].value);
      prevSibling.innerHTML = e.currentTarget.innerHTML;
      let sameAsSelected =
        e.currentTarget.parentNode.getElementsByClassName("same-as-selected");
      let sameAsSelectedLength = sameAsSelected.length;
      for (i = 0; i < sameAsSelectedLength; i++) {
        sameAsSelected[i].removeAttribute("class");
      }

      e.currentTarget.setAttribute("class", "same-as-selected");
      break;
    }
  }
  prevSibling.click();
};

const openCustomSelect = (e) => {
  e.stopPropagation();
  console.log(e.currentTarget);
  e.currentTarget.nextSibling.classList.toggle("select-hide");
  //Add Arrow here
};

const customSort = (data, sortBy) => {
  switch (sortBy) {
    case "likes":
      data.sort((a, b) => {
        return a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0;
      });
      console.log(data);
      return data;
    case "date":
      data.sort((a, b) => {
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
      });
      console.log(data);
      return data;
    case "title":
      data.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      console.log(data);
      return data;
    default:
      return data;
  }
};

const sortDataBy = (filter) => {
  const mediaSection = document.querySelector(".media-section");
  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.lastChild);
  }
  const { media, photographer } = JSON.parse(
    window.localStorage.getItem("photographerData")
  );

  const sortedMedia = customSort(media, filter);

  sortedMedia.forEach((el) => {
    const mediaModel = mediaFactory(el, photographer.name);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
};

let originalSelect = document.querySelector(".custom-select");

let selectElement = originalSelect.getElementsByTagName("select")[0];
let customSelect = document.createElement("div");
customSelect.className = "select-selected ";
customSelect.innerHTML = selectElement.options[0].innerHTML;

originalSelect.appendChild(customSelect);

let optionList = document.createElement("div");
optionList.className = "select-items select-hide";

[...selectElement].forEach((element, index) => {
  if (index !== 0) {
    let customOptions = document.createElement("div");
    customOptions.innerHTML = selectElement.options[index].innerHTML;
    customOptions.addEventListener("click", (e) => updateSelectBox(e));
    optionList.appendChild(customOptions);
  }
});

originalSelect.appendChild(optionList);
customSelect.addEventListener("click", (e) => openCustomSelect(e));
