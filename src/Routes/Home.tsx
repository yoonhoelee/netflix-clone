import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import {
    Banner, BigCover, BigMovie, BigOverview, BigTitle,
    Box,
    BoxVariants,
    Info,
    InfoVariant,
    Loader, Overlay,
    Overview,
    Row,
    rowVariants,
    Slider,
    Title,
    Wrapper
} from "../Styles";
import {makeImagePath} from "../utils";
import {AnimatePresence, useViewportScroll} from "framer-motion";
import {useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {motion} from "framer-motion";

const offset = 6;

function Home() {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`)
    }
    const [leaving, setLeaving] = useState(false);
    const onOverlayClick = () => history.push("/");
    const {scrollY} = useViewportScroll();
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId);
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{type: "tween", duration: 1}}
                                key={index}
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(offset * index, offset * index + offset)
                                    .map((movie) => (
                                        <Box
                                            layoutId={movie.id + ""}
                                            key={movie.id}
                                            whileHover="hover"
                                            initial="normal"
                                            variants={BoxVariants}
                                            onClick={() => onBoxClicked(movie.id)}
                                            transition={{type: "tween"}}
                                            bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
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
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    exit={{opacity: 0}}
                                    animate={{opacity: 1}}
                                />
                                <BigMovie
                                    style={{top: scrollY.get() + 100}}
                                    layoutId={bigMovieMatch.params.movieId}
                                >
                                    {clickedMovie &&
                                        <>
                                            <BigCover
                                                style={{
                                                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                        clickedMovie.backdrop_path,
                                                        "w500"
                                                    )})`,
                                                }}
                                            />
                                            <BigTitle>{clickedMovie.title}</BigTitle>
                                            <BigOverview>{clickedMovie.overview}</BigOverview>
                                        </>
                                    }
                                </BigMovie>
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Home;