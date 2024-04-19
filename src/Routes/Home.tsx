import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import {Banner, Box, Loader, Overview, Row, rowVariants, Slider, Title, Wrapper} from "../Styles";
import {makeImagePath} from "../utils";
import {AnimatePresence} from "framer-motion";
import {useState} from "react";

const offset = 6;

function Home() {
    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data?.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset);
            setIndex((prev) => (prev === maxIndex? 0: prev + 1));
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
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
                                        key={movie.id}
                                        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                    />
                                ))}
                        </Row>
                    </AnimatePresence>
                </Slider>
            </>}
    </Wrapper>;
}

export default Home;