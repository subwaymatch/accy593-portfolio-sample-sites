import s from "./showcase.module.css";

const recipes = [
  {
    name: "Party jollof rice",
    serves: "Serves 6 · about 1 hr 30",
    ink: "#ff6a3d",
    ingredients: [
      "4 plum tomatoes",
      "2 red bell peppers",
      "1 scotch bonnet (half if you are nervous)",
      "2 onions, one for blending and one sliced",
      "⅓ cup vegetable oil",
      "3 tbsp tomato paste",
      "2 tsp curry powder, 1 tsp dried thyme, 2 bay leaves",
      "2 stock cubes, crumbled",
      "3 cups long-grain parboiled rice, washed",
      "2½ cups chicken stock",
    ],
    steps: [
      "Blend the tomatoes, peppers, scotch bonnet and one onion until smooth. Boil it down in a pot for 15 minutes until thick.",
      "In your biggest pot, fry the sliced onion in the oil until soft, then add the tomato paste and fry for 5 minutes until it darkens.",
      "Add the reduced pepper base, curry, thyme, bay and stock cubes. Cook for about 20 minutes, until the oil rises to the top.",
      "Stir in the rice and add stock until it is just covered. Cover the pot with foil and then the lid.",
      "Cook on low for 30 minutes, stirring once halfway. For the last 5 minutes turn the heat up and do not stir. The slightly burnt layer at the bottom is the best part. Mum insists.",
    ],
  },
  {
    name: "Dodo (fried plantain)",
    serves: "Serves 4 · 15 min",
    ink: "#ffc61a",
    ingredients: ["3 very ripe plantains (skins mostly black)", "Pinch of salt", "Oil, about 1 cm deep in a pan"],
    steps: [
      "Peel the plantains and slice them on a diagonal, about 1 cm thick.",
      "Toss with a little salt.",
      "Fry in hot oil for 2 to 3 minutes a side until deep golden with dark edges. Drain on paper towel and eat too many while the rest cook.",
    ],
  },
  {
    name: "Puff-puff",
    serves: "Makes about 30 · 1 hr 20 with rising",
    ink: "#00877d",
    ingredients: [
      "2 cups plain flour",
      "½ cup sugar",
      "2¼ tsp instant yeast",
      "½ tsp salt and a grating of nutmeg",
      "1¼ cups warm water",
      "Oil for deep frying",
    ],
    steps: [
      "Whisk the dry ingredients, then beat in the warm water until you have a sticky, stretchy batter.",
      "Cover and leave somewhere warm for an hour, until doubled and bubbly.",
      "Heat oil to 175°C (350°F). Squeeze batter through your fist and scoop off balls with a spoon into the oil.",
      "Fry about 3 minutes, turning, until golden all over. Dust with sugar if you like. My mum does not, and she is right.",
    ],
  },
];

export default function RecipeCards() {
  return (
    <div className={s.recipes}>
      {recipes.map((r) => (
        <article key={r.name} className={s.recipe} style={{ ["--card-ink" as string]: r.ink }}>
          <header className={s.recipeHead}>
            <h3>{r.name}</h3>
            <p>{r.serves}</p>
          </header>
          <div className={s.recipeBody}>
            <h4>You need</h4>
            <ul>
              {r.ingredients.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <h4>Method</h4>
            <ol>
              {r.steps.map((st) => (
                <li key={st}>{st}</li>
              ))}
            </ol>
          </div>
        </article>
      ))}
    </div>
  );
}
