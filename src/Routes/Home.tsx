import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import {Banner, Box, Loader, Overview, Row, rowVariants, Slider, Title, Wrapper} from "../Styles";
import {makeImagePath} from "../utils";
import {AnimatePresence} from "framer-motion";
import {useState} from "react";

function Home() {
    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const increaseIndex = () => setIndex((prev) => prev + 1);
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
                    <AnimatePresence>
                        <Row
                            key={index}
                            variants={rowVariants}
                            initial="hidden"
                            animate = "visible"
                            exit = "exit"
                            transition={{type:"tween", duration:1}}
                        >
                            {[1,2,3,4,5,6].map((i) => (
                                <Box key={i}>{i}</Box>
                            ))}
                        </Row>
                    </AnimatePresence>
                </Slider>
            </>}
    </Wrapper>;
}

export default Home;