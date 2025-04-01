// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map((movie) => movie.director);
  return [...new Set(directors)]; // Remove duplicates
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;

  const totalScore = moviesArray.reduce((sum, movie) => {
    return movie.score ? sum + movie.score : sum;
  }, 0);

  return Number((totalScore / moviesArray.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes("Drama")
  );
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return [...moviesArray].sort((a, b) =>
    a.year === b.year ? a.title.localeCompare(b.title) : a.year - b.year
  );
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .map((movie) => movie.title)
    .sort()
    .slice(0, 20);
}


// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((movie) => {
    let duration = movie.duration;
    let minutes = 0;

    if (typeof duration === "string") {
      let timeParts = duration.match(/(\d+)h|(\d+)min/g);
      if (timeParts) {
        timeParts.forEach((part) => {
          if (part.includes("h")) minutes += parseInt(part) * 60;
          if (part.includes("min")) minutes += parseInt(part);
        });
      }
    }
    return { ...movie, duration: minutes };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) return null;
    
    let yearScores = {};
    moviesArray.forEach(movie => {
        if (!yearScores[movie.year]) yearScores[movie.year] = [];
        yearScores[movie.year].push(movie.score);
    });
    
    let bestYear = null;
    let bestAvg = 0;
    
    for (let year in yearScores) {
        let avg = scoresAverage(yearScores[year].map(score => ({ score })));
        if (avg > bestAvg || (avg === bestAvg && year < bestYear)) {
            bestYear = year;
            bestAvg = avg;
        }
    }
    
    return `The best year was ${bestYear} with an average score of ${bestAvg}`;
}

