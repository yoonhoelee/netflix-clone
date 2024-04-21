import styled from "styled-components";
import {motion} from "framer-motion";

export const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    font-size: 14px;
    padding: 20px 60px;
    color: white;
`;

export const Col = styled.div`
    display: flex;
    align-items: center;
`;

export const Logo = styled(motion.svg)`
    margin-right: 50px;
    width: 95px;
    height: 25px;
    fill: ${(props) => props.theme.red};

    path {
        stroke-width: 6px;
        stroke: white;
    }
`;

export const Items = styled.ul`
    display: flex;
    align-items: center;
`;

export const Item = styled.li`
    margin-right: 20px;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;


export const Search = styled.span`
    color: white;
    display: flex;
    align-items: center;
    position: relative;
    svg {
        height: 25px;
    }
`;

export const logoVariants = {
    normal: {
        fillOpacity: 1,
    },
    active: {
        fillOpacity: [0, 1, 0],
        transition: {
            repeat: Infinity,
        },
    },
};

export const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    bottom: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${(props) => props.theme.red};
`;

export const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 0px;
    padding: 5px 10px;
    padding-left: 40px;
    z-index: -1;
    color: white;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
`;

export const navVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)",
    },
};

export const Wrapper = styled.div`
    background: black;
`;

export const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${(props) => props.bgPhoto});
    background-size: cover;
`;

export const Title = styled.h2`
    font-size: 60px;
    margin-bottom: 20px;
`;

export const Overview = styled.p`
    font-size: 28px;
    width: 50%;
`;

export const Slider = styled.div`
    position: relative;
    top: -100px;
`;

export const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 5px;
    position: absolute;
    width: 100%;
`;

export const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    height: 200px;
    background-image: url(${props => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    font-size: 64px;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child{
        transform-origin: center right;
    }
`;

export const rowVariants = {
    hidden :{
        x:window.outerWidth +5,
    },
    visible: {
        x:0,
    },
    exit: {
        x:-window.outerWidth -5,
    },
};

export const BoxVariants ={
    normal:{
        scale:1,
    },
    hover:{
        scale: 1.3,
        y:-50,
        transition: {
            delay: 0.5,
            duration:0.3,
            type:"tween",
        },
    }
}

export const Info = styled(motion.div)`
    padding: 20px;
    background-color: ${props => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

export const InfoVariant = {
    hover: {
        opacity:1,
        transition: {
            delay: 0.5,
            duration:0.3,
            type:"tween",
        },
    }
};