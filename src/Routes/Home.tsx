import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import {
    Banner,
    Box,
    BoxVariants,
    Info,
    InfoVariant,
    Loader,
    Overview,
    Row,
    rowVariants,
    Slider,
    Title,
    Wrapper
} from "../Styles";
import {makeImagePath} from "../utils";
import {AnimatePresence} from "framer-motion";
import {useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {motion} from "framer-motion";

const offset = 6;

function Home() {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data?.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset);
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId:number) => {
        history.push(`/movies/${movieId}`)
    }
    const [leaving, setLeaving] = useState(false);
    return <Wrapper>
        {isLoading ? <Loader>Loading...</Loader> :
            <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>
                        {data?.results[0].title}
                    </Title>
                    <Overview>
                        {data?.results[0].overview}
                    </Overview>
                </Banner>
                <Slider>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row
                            key={index}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{type: "tween", duration: 1}}
                        >
                            {data?.results
                                .slice(1)
                                .slice(offset * index, offset * index + offset)
                                .map((movie) => (
                                    <Box
                                        layoutId={movie.id + ""}
                                        key={movie.id}
                                        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                        variants={BoxVariants}
                                        whileHover="hover"
                                        initial="normal"
                                        transition={{type: "tween"}}
                                        onClick={() => onBoxClicked(movie.id)}
                                    >
                                        <Info variants={InfoVariant}>
                                            <h4>{movie.title}</h4>
                                        </Info>
                                    </Box>
                                ))}
                        </Row>
                    </AnimatePresence>
                </Slider>
                <AnimatePresence>
                    {bigMovieMatch ? (
                        <motion.div
                            layoutId={bigMovieMatch.params.movieId}
                            style={{
                                position: "absolute",
                                width: "40vw",
                                height: "80vh",
                                backgroundColor: "red",
                                top: 50,
                                left: 0,
                                right: 0,
                                margin: "0 auto",
                            }}
                        />
                    ) : null}
                </AnimatePresence>
            </>}
    </Wrapper>;
}

export default Home;