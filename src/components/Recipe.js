import React, { useState, useEffect } from 'react'
import RecipeItem from './RecipeItem'
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'


const Recipe = (props) => {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateRecipe = async () => {
        props.setProgress(10);
        const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${props.cuisine}&limitLicense=true&number=${props.number}&apiKey=${props.apiKey}&addRecipeInformation=true`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setResults(parsedData.results)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.cuisine)} `;
        updateRecipe();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${props.cuisine}&number=${props.number}&limitLicense=true&apiKey=${props.apiKey}&addRecipeInformation=true`
        let data = await fetch(url)
        let parsedData = await data.json()
        setResults(results.concat(parsedData.results))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };
    return (
        <>
            <h1 className='text-center'>Popular {capitalizeFirstLetter(props.cuisine)} Dishes</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={results.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {results.map((element) => {
                            return <div className="col-md-4" key={element.id}>
                                <RecipeItem title={element.title} description={`${element.title} offers a delightful blend of cuisines, sourced from ${element.sourceName}, boasts a health score of ${element.healthScore}. With a reasonable price per serving at $${element.pricePerServing}. You can whip up this meal in just ${element.readyInMinutes} minutes, making it a convenient choice for ${element.servings} servings.`} imageUrl={element.image} newsUrl={element.sourceUrl} />
                            </div>

                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

Recipe.defaultProps = {
    cuisine: 'indian',
    number:0
}

Recipe.propTypes = {
    cuisine: propTypes.string,
    number: propTypes.number
}


export default Recipe
