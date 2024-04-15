import styled from "styled-components";
import {motion} from "framer-motion";

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: black;
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
    normal:{
        fillOpacity:1,
    },
    active:{
        fillOpacity: 0,
    },
}

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
    left: -150px;
`;