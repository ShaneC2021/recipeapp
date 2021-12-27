


document.addEventListener("DOMContentLoaded", () => {
  const fetchRecipe = () => {
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
  }; 

  fetchRecipe();
});



load = (responseObject) => {
  let randomRecipe = document.getElementById("randomrecipe");
  let node;
  let embedStr;
  let ingredient;
  let textNode;
  const intsructions = document.getElementById("instructions");
  
  let obj = responseObject.data.meals[0];

  const arrayOfObjProps = Object.keys(obj);
  const mealThumb = document.getElementById("mealthumb");

  const arrayOfKeys = [];

  const arrayOfIngredients = [];

  randomRecipe.innerText = responseObject.data.meals[0].strMeal;
  mealThumb.src = obj.strMealThumb;

  for (let i = 0; i < arrayOfObjProps.length; i++) {
    if (arrayOfObjProps[i].includes("strIngredient")) {
      arrayOfKeys.push(arrayOfObjProps[i]);
    }
  }
  for (let i = 0; i < arrayOfKeys.length; i++) {
    if (obj[arrayOfKeys[i]] !== null && obj[arrayOfKeys[i]] !== "") {
      arrayOfIngredients.push(obj[arrayOfKeys[i]]);
    }
  }

  intsructions.innerText = obj.strInstructions;
  embedStr = obj.strYoutube;
  
  embedVid(embedStr);

  /*  Could be it's own function ,dynamically creates a list from the array of ingredients returned from the api response object*/ 
  for(let i=0; i<arrayOfIngredients.length; i++) {
     node = document.createElement("LI");
     ingredient = arrayOfIngredients[i];
     console.log(ingredient);
     textNode = document.createTextNode(ingredient);
     node.appendChild(textNode);
     document.getElementById("ingredients").appendChild(node);
  }

};

/* grabs id string specific  to each youtube videos to enable them to be embedded in the site dynamically
   Did this to find away around having to leave the site when clicking on a button to see the video.
   Initially was running into cross origin blocks "Corbs" when i tried to link the video via it's src attribute
   whereas using  a href element worked fine when I used the source strYoutube returned by the api response object.
   And embeeding videos on the page worked fine. So I figured if I could grab the specific ids and update the video src
   dynamically. Developer console i saying the page has errors due to this but it's working  ??

*/ 
function embedVid(string) {
  const video = document.getElementById("vid");
  let index = string.length-11;
  const idArray=[];
  let id;
  
  for(let i = (string.length-1); i >= index ; i--) {
    idArray.push(string[i]);
}
idArray.reverse();
id = idArray.join("");
video.src=`https://www.youtube.com/embed/${id}`;
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
};