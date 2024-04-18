import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import {Banner, Loader, Overview, Title, Wrapper} from "../Styles";
import {makeImagePath} from "../utils";

function Home() {
    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    console.log(data);
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
            </>}
    </Wrapper>;
}

export default Home;