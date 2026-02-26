import React, { useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import RecipesScreen from "./screens/RecipesScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import RecipeModal from "./screens/RecipeModal";

const Stack = createNativeStackNavigator();

export default function App() {
  const [recipes, setRecipes] = useState([
    {
      id: "1",
      title: "Pancakes",
      text: "Mix flour, eggs, and milk. Cook on a pan until golden. Serve with syrup.",
    },
    {
      id: "2",
      title: "Baconator",
      text: "Stack two quarter-pound square beef patties, six strips of crispy bacon, two slices of American cheese, mayonnaise, and ketchup on a toasted bun",
    },
  ]);

  const addRecipe = (title, text) => {
    const newRecipe = {
      id: Date.now().toString(),
      title: title.trim(),
      text: text.trim(),
    };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const getRecipeById = (id) => recipes.find((r) => r.id === id);

  // Keep prop objects stable where possible
  const recipesScreenProps = useMemo(
    () => ({
      recipes,
      onDelete: deleteRecipe,
    }),
    [recipes]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home */}
        <Stack.Screen
          name="Home"
          options={{ title: "Home" }}
        >
          {(navProps) => <HomeScreen {...navProps} />}
        </Stack.Screen>

        {/* Recipes list */}
        <Stack.Screen
          name="Recipes"
          options={{ title: "Recipes" }}
        >
          {(navProps) => (
            <RecipesScreen
              {...navProps}
              recipes={recipesScreenProps.recipes}
              onDelete={recipesScreenProps.onDelete}
            />
          )}
        </Stack.Screen>

        {/* Add recipe */}
        <Stack.Screen
          name="AddRecipe"
          options={{ title: "Add Recipe" }}
        >
          {(navProps) => (
            <AddRecipeScreen
              {...navProps}
              onSave={addRecipe}
            />
          )}
        </Stack.Screen>

        {/* Modal view recipe */}
        <Stack.Screen
          name="RecipeModal"
          options={{
            title: "Recipe",
            presentation: "modal",
          }}
        >
          {(navProps) => (
            <RecipeModal
              {...navProps}
              getRecipeById={getRecipeById}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}