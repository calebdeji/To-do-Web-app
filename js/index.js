window.addEventListener("load", function () {
    //to load directly from the server rather than cache
    // document.location.reload(true);
    /**
     * to register service worker
     */
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
    uiChange();
});
document.getElementById("button_save").addEventListener("click", function () {
    addItem(document.getElementById("to_do_item").value);
});
document.getElementById("button_clear").addEventListener("click", function () {
    clearAll();
}); {
    let url = window.location;
    let urlLenght = url.length;
    if (url[urlLenght - 1] == "#") {
        window.location = "index.html";
    }
}

function addItem(text) {
    let textValue = text;
    if (textValue.length !== 0) {
        if (localStorage.length != 0) {
            let arrayContainer = JSON.parse(localStorage.getItem("list"));
            let lengthArray = arrayContainer.length;
            let tempObject = {
                [lengthArray]: textValue
            };
            arrayContainer.push(tempObject);
            localStorage.setItem("list", JSON.stringify(arrayContainer));
            //console.log("ArrayContainer after parse is : ", arrayContainer);
            //console.log("I can see localstorage with length not equals to 0");
        } else {
            let arrayContainer = [];
            let tempObject = {
                0: textValue
            };
            arrayContainer.push(tempObject);
            localStorage.setItem("list", JSON.stringify(arrayContainer));
            //console.log("I can see localStorage with length 0");
        }

        //console.log("Your text value is okay to be processed");
    } else {
        //console.log("Your text value won't be processed");
        alert("Input is empty, fill input");
    }
    document.getElementById("to_do_item").value = "";
    uiChange();
}

function uiChange() {
    let divContainer = document.getElementById("container-item-list");
    divContainer.innerHTML = "";
    let arrayContainer = JSON.parse(localStorage.getItem("list"));

    if (arrayContainer != null) {
        let arrayContainerLength = arrayContainer.length;
        for (i = 0; i < arrayContainerLength; i++) {
            let stringId = i + "element";
            divContainer.innerHTML +=
                '<p><span class = "span" style = "display:inline-block"><input type = "checkbox" class = "filled-in checkbox-orange" id =' +
                i +
                ' onclick= "clickEffect(' +
                i +
                ')"/> <label for=' +
                i +
                " id =" +
                stringId +
                ">" +
                arrayContainer[i][Object.keys(arrayContainer[i])[0]] +
                '</label></span><span class ="delete" style = "display:inline-block"><button onclick= "deleteItem(' +
                i +
                ')" class = "waves-effect waves-light btn"> Delete </button> </span> </p>';
        }
        for (let j = 0; j < arrayContainerLength; j++) {
            // this is to update the ui of checked element
            if (JSON.parse(localStorage.getItem("list"))[j].clicked == "true") {
                document.getElementById(j).checked = true;
                document.getElementById(j + "element").style.textDecoration =
                    "line-through";
            } else {
                document.getElementById(j).checked = false;
                document.getElementById(j + "element").style.textDecoration = "none";
            }
        }
    }
}

function clickEffect(id) {
    let elementClicked = document.getElementById(id + "element");
    let localStorageContent = JSON.parse(localStorage.getItem("list"));
    let localStorageElement = JSON.parse(localStorage.getItem("list"))[id];
    // localStorageElement.clicked = 'true';

    if (localStorageElement.clicked) {
        if (localStorageElement.clicked == "true") {
            localStorageElement.clicked = "false";
            elementClicked.style.textDecoration = "none";
        } else {
            localStorageElement.clicked = "true";
            elementClicked.style.textDecoration = "line-through";
        }
    } else {
        localStorageElement.clicked = "true";
    }
    localStorageContent[id].clicked = localStorageElement.clicked;
    localStorage.setItem("list", JSON.stringify(localStorageContent));
    //console.log("Clicked : ", localStorageElement);
    uiChange();
}

function deleteItem(item) {
    //console.log("Delete button seen");
    let localStorageContent = JSON.parse(localStorage.getItem("list"));
    localStorageContent.splice(item, 1);
    localStorage.setItem("list", JSON.stringify(localStorageContent));
    uiChange();
}

function clearAll() {
    localStorage.clear();
    uiChange();
}
// console.table(localStorage);