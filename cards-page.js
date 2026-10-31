
document.addEventListener("DOMContentLoaded", () => {

  const list = document.getElementById("card-list");
  const count = document.getElementById("card-count");

  const keyword = document.getElementById("card-keyword");
  const element = document.getElementById("card-element");
  const type = document.getElementById("card-type");
  const cost = document.getElementById("card-cost");
  const series = document.getElementById("card-series");
  const reset = document.getElementById("card-reset");

  const cardData =
    typeof CARD_LIST !== "undefined"
      ? CARD_LIST
      : typeof cards !== "undefined"
        ? cards
        : [];

  if (!Array.isArray(cardData) || cardData.length === 0) {
    count.textContent =
      "カードデータを読み込めませんでした。";
    return;
  }

  function fillOptions(select, values) {

    const unique = [...new Set(
      values
        .filter(v => v !== undefined && v !== null)
        .map(String)
    )];

    unique.sort((a, b) =>
      a.localeCompare(b, "ja", { numeric: true })
    );

    unique.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

//----------------------------------
// 属性検索
// 火 → 風 → 水 → 土
//----------------------------------

const elementOptions = [
    { value: "火", label: "Ignis（火）" },
    { value: "風", label: "Aer（風）" },
    { value: "水", label: "Aqua（水）" },
    { value: "土", label: "Terra（土）" }
];

elementOptions.forEach(item => {

    const option = document.createElement("option");

    option.value = item.value;
    option.textContent = item.label;

    element.appendChild(option);

});


//----------------------------------
// タイプ・コスト検索
//----------------------------------

fillOptions(type, cardData.map(c => c.type));
fillOptions(cost, cardData.map(c => c.cost));
  function render() {

    const word = keyword.value.trim().toLowerCase();

    const filtered = cardData.filter(card => {

      return (
        String(card.name || "")
          .toLowerCase()
          .includes(word) &&

        (!element.value ||
          card.element === element.value) &&

        (!type.value ||
          card.type === type.value) &&

        (!cost.value ||
          String(card.cost) === cost.value) &&

        (!series.value ||
          card.series === series.value)
      );
    });

    count.textContent =
      `${filtered.length} / ${cardData.length} 枚`;

    list.replaceChildren();

    filtered.forEach(card => {

      const item = document.createElement("article");
      item.className = "official-card-item";

      const img = document.createElement("img");
      img.src = "./" + card.image.replace(/^\.?\//, "");
      img.alt = card.name;
      img.loading = "lazy";

      const name = document.createElement("p");
      name.textContent = card.name;

      const info = document.createElement("p");
      info.className = "official-card-info";
      info.textContent =
        `${card.element} / ${card.type} / COST ${card.cost}`;

      item.appendChild(img);
      item.appendChild(name);
      item.appendChild(info);

      list.appendChild(item);
    });

    if (filtered.length === 0) {
      list.textContent = "該当するカードがありません。";
    }
  }

  const filters = [
    keyword,
    element,
    type,
    cost,
    series
  ];

  filters.forEach(input => {
    input.addEventListener("input", render);
  });

  reset.addEventListener("click", () => {

    filters.forEach(input => {
      input.value = "";
    });

    render();
  });

  render();

});
