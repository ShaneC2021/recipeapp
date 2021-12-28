document.addEventListener("DOMContentLoaded", () => {
 fetch();
});

load = (responseObject) => {
  const intsructions = document.getElementById("instructions");
  const randomRecipe = document.getElementById("randomrecipe");
  const mealThumb = document.getElementById("mealthumb");
  const obj = responseObject.data.meals[0];
  const arrayOfObjProps = Object.keys(obj);
  const arrayOfKeys = [];
  const arrayOfIngredients = [];
  let embedStr;

  randomRecipe.innerText = responseObject.data.meals[0].strMeal;
  mealThumb.src = obj.strMealThumb;

  for (let properties of arrayOfObjProps) {
    if (properties.includes("strIngredient")) {
      arrayOfKeys.push(properties);
    }
  }

  for (let keys of arrayOfKeys) {
    if (obj[keys] !== null && obj[keys] !== "") {
      arrayOfIngredients.push(obj[keys]);
    }
  }

  intsructions.innerText = obj.strInstructions;
  embedStr = obj.strYoutube;

  embedVid(embedStr);
  getIngredients(arrayOfIngredients);
};

const getIngredients = (array) => {
  let node;
  let textNode;
  let ingredient;

  for (let element of array) {
    node = document.createElement("LI");
    ingredient = element;
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
