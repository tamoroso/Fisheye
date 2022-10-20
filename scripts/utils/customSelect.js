const customSort = (data, sortBy) => {
  switch (sortBy) {
    case "likes":
      data.sort((a, b) => {
        return a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0;
      });
      return data;
    case "date":
      data.sort((a, b) => {
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
      });
      return data;
    case "title":
      data.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      return data;
    default:
      return data;
  }
};

const sortDataBy = (filter) => {
  const mediaSection = document.querySelector(".media-section");
  let articleArray = [];
  while (mediaSection.firstChild) {
    articleArray.unshift(mediaSection.lastChild);
    mediaSection.removeChild(mediaSection.lastChild);
  }
  const { media } = JSON.parse(window.localStorage.getItem("photographerData"));

  const sortedMedia = customSort(media, filter);
  const sortedArticle = sortedMedia.map((media) => {
    return articleArray.find((el) => media.id === parseInt(el.id));
  });

  sortedArticle.forEach((el) => {
    mediaSection.appendChild(el);
  });
};

const SPACEBAR_KEY_CODE = "Space";
const ENTER_KEY_CODE = "Enter";
const DOWN_ARROW_KEY_CODE = "ArrowDown";
const UP_ARROW_KEY_CODE = "ArrowUp";
const ESCAPE_KEY_CODE = "Escape";

const list = document.querySelector(".dropdown__list");
const listContainer = document.querySelector(".dropdown__list-container");
const dropdownArrow = document.querySelector(".dropdown__arrow");
const listItems = document.querySelectorAll(".dropdown__list-item");
const dropdownSelectedNode = document.querySelector("#dropdown__selected");

const listItemsIds = [];

dropdownSelectedNode.addEventListener("click", (e) => {
  toggleListVisibility(e);
});
dropdownSelectedNode.addEventListener("keydown", (e) =>
  toggleListVisibility(e)
);

listItems.forEach((item) => listItemsIds.push(item.id));
listItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    setselectedListItem(e);
    sortDataBy(e.target.id);
    closeList();
  });
  item.addEventListener("keydown", (e) => {
    switch (e.code) {
      case ENTER_KEY_CODE:
        setselectedListItem(e);
        sortDataBy(e.target.id);
        closeList();
        return;
      case DOWN_ARROW_KEY_CODE:
        focusNextListItem(DOWN_ARROW_KEY_CODE);
        return;
      case UP_ARROW_KEY_CODE:
        e.preventDefault();
        focusNextListItem(UP_ARROW_KEY_CODE);
        return;
      case ESCAPE_KEY_CODE:
        closeList();
        return;
      default:
        return;
    }
  });
});

const setselectedListItem = (e) => {
  let selectedTextToAppend = document.createTextNode(e.target.innerText);
  dropdownSelectedNode.innerHTML = null;
  dropdownSelectedNode.appendChild(selectedTextToAppend);
};

const closeList = () => {
  list.classList.remove("open");
  dropdownArrow.classList.remove("expanded");
  listContainer.setAttribute("aria-expanded", false);
  listItems.forEach((el) => el.toggleAttribute("tabindex"));
  dropdownSelectedNode.focus();
};

const toggleListVisibility = (e) => {
  let openDropDown =
    SPACEBAR_KEY_CODE.includes(e.code) || e.code === ENTER_KEY_CODE;
  if (e.type === "click" || openDropDown) {
    listItems.forEach((el) => el.setAttribute("tabindex", 0));
    listItems[0].focus();
    list.classList.toggle("open");
    dropdownArrow.classList.toggle("expanded");
    listContainer.setAttribute(
      "aria-expanded",
      list.classList.contains("open")
    );
  }
  if (e.code === DOWN_ARROW_KEY_CODE) {
    listItems.forEach((el) => el.setAttribute("tabindex", 0));
    focusNextListItem(DOWN_ARROW_KEY_CODE);
  }
  if (e.code === UP_ARROW_KEY_CODE) {
    listItems.forEach((el) => el.setAttribute("tabindex", 0));
    focusNextListItem(UP_ARROW_KEY_CODE);
  }
};

const focusNextListItem = (direction) => {
  const activeElementId = document.activeElement.id;
  if (activeElementId === "dropdown__selected") {
    document.querySelector(`#${listItemsIds[1]}`).focus();
  } else {
    const currentActiveElementIndex = listItemsIds.indexOf(activeElementId);
    if (direction === DOWN_ARROW_KEY_CODE) {
      currentActiveElementIndex < listItemsIds.length - 1 &&
        document
          .querySelector(`#${listItemsIds[currentActiveElementIndex + 1]}`)
          .focus();
    } else if (direction === UP_ARROW_KEY_CODE) {
      currentActiveElementIndex > 0 &&
        document
          .querySelector(`#${listItemsIds[currentActiveElementIndex - 1]}`)
          .focus();
    }
  }
};
