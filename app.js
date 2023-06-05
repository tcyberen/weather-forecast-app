const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const searchBox = document.querySelector(".search-box");

function turkishToEnglish(text) {
  const charMap = {
    ğ: "g",
    ü: "u",
    ş: "s",
    ı: "i",
    ö: "o",
    ç: "c",
    // Büyük harfler için de aynı şekilde tanımlama yapılabilir.
    Ğ: "G",
    Ü: "U",
    Ş: "S",
    I: "I", // Türkçedeki noktasız büyük İ harfi
    İ: "i", // Türkçedeki noktalı küçük i harfi
    Ö: "O",
    Ç: "C",
  };

  return text.replace(/[ğüşıöç]/gi, function (matched) {
    return charMap[matched];
  });
}

const api = {
  base: "https://api.weatherapi.com/v1/current.json",
  key: "ccde31fa515d428cb4141525230206",
};

async function fetchData(cityName) {
  try {
    const response = await fetch(`${api.base}?key=${api.key}&q=${cityName}`, {
      mode: "cors",
    });
    const data = await response.json();

    console.log(data);
    temp.innerText = `${data.current.temp_c}°C`;
    city.innerText = `${data.location.name.toUpperCase()}, ${
      data.location.country
    }`;
    weather.innerText = `${data.current.condition.text}`;
  } catch (error) {
    console.log(error);
  }
}

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    console.log(event.target.value);
    const inputText = event.target.value;
    event.target.value = turkishToEnglish(inputText);
    fetchData(event.target.value);
    searchBox.value = "";
  }
});
