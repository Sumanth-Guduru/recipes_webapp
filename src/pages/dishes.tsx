'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import Cook from '../app/images/cooking (1).png';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
};

export default function RecipePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
 
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      console.log(data);
  
      if (data.meals) {
        setRecipes(data.meals.slice(0, 8)); // Sets the first 8 recipes
        setAllRecipes(data.meals); // Sets all the recipes if needed
      } else {
        setRecipes([]); // Handles the case where no recipes are returned
        setAllRecipes([]); // Sets an empty array for allRecipes as well
      }
    };
  
    fetchRecipes();
  }, []);
  

  return (
    <main className="">
      <div className='text-center'>
        <div className='flex justify-center inline-block space-y-12'>
          <Image alt='' src={Cook} width={100} height={100}/>
          <h1 className='font-Burtons text-large sm:text-8xl'>Cookbook</h1>
        </div>
        <p className='font-cevaet'>Welcome!! Here are few Dishes... </p>
      </div>
      <div className="text-center">
        <h1 className="font-lemone text-8xl text-orange-400">Dishes</h1>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-6">
        {recipes.map((recipe) => (
          <Link key={recipe.idMeal} href={`/recipe_detail/${recipe.idMeal}`} passHref>
            <Card as="a" className="shadow-sm">
              <CardBody className="p-0 overflow-hidden">
                <Image
                  layout="responsive"
                  width={300}
                  height={200}
                  alt={recipe.strMeal}
                  src={recipe.strMealThumb || '/path/to/placeholder.png'} // Fallback image
                  className="object-cover"
                />
              </CardBody>
              <CardFooter className="text-center">
                <b>{recipe.strMeal}</b>
              </CardFooter>
            </Card>
          </Link>
        ))}
       
      </div>
    </main>
  );
}
