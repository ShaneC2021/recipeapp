document.addEventListener("DOMContentLoaded", //() => {
  fetch() );
//});

load = (responseObject) => {
  const intsructions = document.getElementById("instructions");
  const randomRecipe = document.getElementById("randomrecipe");
  const mealThumb = document.getElementById("mealthumb");
  const obj = responseObject.data.meals[0];
  const arrayOfObjProps = Object.keys(obj);
  const arrayOfKeys = [];
  const arrayOfIngredients = [];
  let embedStr;

  randomRecipe.innerText = obj.strMeal;
  mealThumb.src = obj.strMealThumb;

  for (let properties of arrayOfObjProps) {
    if (properties.includes("strIngredient")) {
      arrayOfKeys.push(properties);
    }
  }
  getAllKeys(arrayOfKeys, obj, arrayOfIngredients);
  intsructions.innerText = obj.strInstructions;
  embedStr = obj.strYoutube;
  embedVid(embedStr);
  getIngredients(arrayOfIngredients);
  console.log(arrayOfIngredients);
};

const getAllKeys = (array, obj, arrayOfIngredients) => {
  for (let keys of array) {
    if (obj[keys] !== null && obj[keys] !== "") {
      arrayOfIngredients.push(obj[keys]);
    }
  }
};

const getIngredients = (array) => {
  let node;
  let textNode;
  document.getElementById("ingredients").innerText = "";

  for (let ingredient of array) {
    node = document.createElement("LI");
    textNode = document.createTextNode(ingredient);
    node.appendChild(textNode);
    document.getElementById("ingredients").appendChild(node);
  }
};

/* grabs id string specific  to each youtube videos to enable them to be embedded in the site dynamically
   Did this to find away around having to leave the site when clicking on a button to see the video.

*/
function embedVid(string) {
  const video = document.getElementById("vid");
  let index = string.length - 11;
  const idArray = [];
  let id;

  for (let i = string.length - 1; i >= index; i--) {
    idArray.push(string[i]);
  }
  idArray.reverse();
  id = idArray.join("");
  video.src = `https://www.youtube.com/embed/${id}`;
  console.log(video.src);
}

function fetch() {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(function (response) {
      // handle success
      console.log(response.data.meals);
      load(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
