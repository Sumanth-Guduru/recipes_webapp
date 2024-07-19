'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import Cook from '../app/images/cooking (1).png';


export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      // const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const response = await fetch('http://18.217.159.5:8000/api/recipes/');
      const data = await response.json();
      console.log(data);
      setRecipes(data.slice(0, 8));
      setAllRecipes(data); // Store all recipes for filtering lat
    };

    fetchRecipes();
  }, []);

  return (
    <main className="">
      <div className='text-center'>
        <div className='flex justify-center inline-block space-y-12'><Image alt=''src= {Cook} width={100} height={100}/><h1 className='font-Burtons text-large sm:text-8xl '>Cookbook</h1></div>
        <p className='font-cevaet'>Welcome!! Here are few Dishes... </p>
      </div>
      <div className="text-center">
        <h1 className="font-lemone text-8xl text-orange-400">Dishes</h1>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-6">
        {recipes.map((recipe, index) => (
          <Link key={recipe.idMeal} href={`/recipe_detail/${recipe.idMeal}`} passHref>
            <Card as="a" className="shadow-sm">
              <CardBody className="p-0 overflow-hidden">
                <Image
                  layout="responsive"
                  width={300}
                  height={200}
                  alt={recipe.strMeal}
                  src={recipe.strMealThumb}
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
