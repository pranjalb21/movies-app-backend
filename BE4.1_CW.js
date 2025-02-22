const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.models");

app.use(express.json());

initializeDatabase();

async function createMovie(newMovie) {
    try {
        const movie = new Movie(newMovie);
        const savedMovie = await movie.save();
        // console.log("New Movie data:", savedMovie);
        return savedMovie;
    } catch (error) {
        throw error;
    }
}
// createMovie(newMovie)

app.post("/movies", async (req, res) => {
    try {
        const savedMovie = await createMovie(req.body);
        res.status(201).json({
            message: "Movie added successfully.",
            movie: savedMovie,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to add movie." });
    }
});

// Find a movie with a partucular title
async function readMovieByTitle(movieTitle) {
    try {
        const movie = await Movie.find({ title: movieTitle });
        return movie;
    } catch (error) {
        throw error;
    }
}
// readMovieByTitle('Dilwale Dulhania Le Jayenge')
app.get("/movies/:title", async (req, res) => {
    try {
        const movie = await readMovieByTitle(req.params.title);
        if (movie.length > 0) {
            res.json(movie);
        } else {
            res.status(404).json({ error: "Movie not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie." });
    }
});
// Find a movie with a partucular genre
async function readMovieByGenre(movieGenre) {
    try {
        const movie = await Movie.find({ genre: movieGenre });
        return movie;
    } catch (error) {
        throw error;
    }
}
// readMovieByGenre('Action')
app.get("/movies/genre/:genre", async (req, res) => {
    try {
        const movie = await readMovieByGenre(req.params.genre);
        if (movie.length > 0) {
            res.json(movie);
        } else {
            res.status(404).json({ error: "Movie not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie." });
    }
});

// Get all the movies in the database
async function readAllMovies() {
    try {
        const allMovies = await Movie.find();
        return allMovies;
    } catch (error) {
        console.log(error);
    }
}
// readAllMovies()
app.get("/movies", async (req, res) => {
    try {
        const movies = await readAllMovies();
        if (movies.length > 0) {
            res.json(movies);
        } else {
            res.status(404).json({ error: "No movie found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie." });
    }
});

// Get all the movies in the database
async function readMovieByDirector(directorName) {
    try {
        const movieByDirector = await Movie.find({ director: directorName });
        return movieByDirector;
    } catch (error) {
        console.log(error);
    }
}
// readMovieByDirector("Aditya Roy Chopra")
app.get("/movies/director/:directorName", async (req, res) => {
    try {
        const movies = await readMovieByDirector(req.params.directorName);
        if (movies.length > 0) {
            res.json(movies);
        } else {
            res.status(404).json({ error: "No movie found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie." });
    }
});

// Find movie by id and update it's rating
async function updateMovie(movieId, dataToUpdate) {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            dataToUpdate,
            { new: true }
        );
        return updatedMovie;
    } catch (error) {
        console.log("Error in updating the reting", error);
    }
}
// updateMovie('67b583d74c11c117ba3fe093',{releaseYear:2010})
app.post("/movies/:movieId", async (req, res) => {
    try {
        const updatedMovie = await updateMovie(req.params.movieId, req.body);
        if (updatedMovie.length > 0) {
            res.status(200).json({
                message: "Movie updated successfully.",
                updatedMovie,
            });
        } else {
            res.status(404).json({ error: "Movie not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update movie." });
    }
});

// Find movie by id and delete
async function deleteMovie(movieId) {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        return deleteMovie;
    } catch (error) {
        console.log("Error in changing data:", error);
    }
}
app.delete("/movies/:movieId",async(req,res)=>{
    try {
        const deletedMovie = await deleteMovie(req.params.movieId)
        if(deleteMovie.length>0){
            res.status(200).json({
                message: "Movie deleted successfully.",
                deletedMovie,
            });
        } else {
            res.status(404).json({ error: "Movie not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete movie." });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server connected on PORT:", PORT);
});
